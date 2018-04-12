<template>
  <x-cell
    @click.native="clickHandler()"
    @touchstart.native="startDrag"
    @touchmove.native="onDrag"
    @touchend.native="endDrag"
    class="mint-cell-swipe"
    :title="title"
    :icon="icon"
    :label="label"
    :label2="label2"
    :to="to"
    :is-link="isLink"
    ref="cell"
    :value="value">
    <div
      slot="right"
      class="mint-cell-swipe-buttongroup"
      ref="right">
      <a
        class="mint-cell-swipe-button"
        v-for="btn in right"
        :style="btn.style"
        @click.stop="btn.handler && btn.handler(), swipeMove()"
        v-html="btn.content"></a>
    </div>
    <div
      slot="left"
      class="mint-cell-swipe-buttongroup"
      ref="left">
      <a
        class="mint-cell-swipe-button"
        v-for="btn in left"
        :style="btn.style"
        @click.stop="btn.handler && btn.handler(), swipeMove()"
        v-html="btn.content"></a>
    </div>
    <slot></slot>
    <span
      v-if="$slots.title"
      slot="title">
      <slot name="title"></slot>
    </span>
    <span
      v-if="$slots.icon"
      slot="icon">
      <slot name="icon"></slot>
    </span>
  </x-cell>
</template>
<script>
import { once } from './dom.js';
/* XCell 中 v-clickoutside:touchstart="swipeMove" 这段代码很实用，但和我的做法冲突了。杀掉 */
import XCell from 'components/cell/cell.vue';   
import Clickoutside from './clickoutside.js';

/**
 * mt-cell-swipe
 * @desc 类似 iOS 滑动 Cell 的效果
 * @module components/cell-swipe
 *
 * @example
 * <mt-cell-swipe
 *   :left=[
 *     {
 *       content: 'text',
 *       style: {color: 'white', backgroundColor: 'red'},
 *       handler(e) => console.log(123)
 *     }
 *   ]
 *   :right=[{ content: 'allowed HTML' }]>
 *   swipe me
 * </mt-cell-swipe>
 */
export default {
  name: 'mt-cell-swipe',

  components: { XCell },

  directives: { Clickoutside },

  props: {
    to: String,
    left: Array,
    right: Array,
    icon: String,
    title: String,
    label: String,
    label2: String,
    isLink: Boolean,
    value: {},
    clickMethod:Function
  },

  data() {
    return {
      start: { x: 0, y: 0 },
      opened:false,
    };
  },

  mounted() {
    this.wrap = this.$refs.cell.$el.querySelector('.mint-cell-wrapper');
    this.leftElm = this.$refs.left;
    this.rightElm = this.$refs.right;
    this.leftWrapElm = this.leftElm.parentNode;
    this.rightWrapElm = this.rightElm.parentNode;
    this.leftWidth = this.leftElm.getBoundingClientRect().width;
    this.rightWidth = this.rightElm.getBoundingClientRect().width;

    this.leftDefaultTransform = this.translate3d(-this.leftWidth - 1);
    this.rightDefaultTransform = this.translate3d(this.rightWidth);

    this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
    this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
  },

  methods: {
    clickHandler () {
      if (this.$store.state.translateX == 0) this.clickMethod && this.clickMethod();
      else this.swipeMove();
    },
    resetSwipeStatus() {
      this.swiping = false;
      this.opened = true;
      this.offsetLeft = 0;
    },

    translate3d(offset) {
      return `translate3d(${offset}px, 0, 0)`;
    },

    swipeMove(offset = 0) {
      // 李钊鸿加入的代码设置全局X轴坐标，是为了不让Y轴的下拉起作用
      this.$store.dispatch('set_translateX',offset)
      this.wrap.style.webkitTransform = this.translate3d(offset);
      this.rightWrapElm.style.webkitTransform = this.translate3d(this.rightWidth + offset);
      this.leftWrapElm.style.webkitTransform = this.translate3d(-this.leftWidth + offset);
      this.swiping = true;
    },

    swipeLeaveTransition(direction) {
      setTimeout(() => {
        this.swipeLeave = true;

        // left （基本都用这个吧）
        if (direction > 0 && -this.offsetLeft > this.rightWidth * 0.4) {
          this.swipeMove(-this.rightWidth);
          this.resetSwipeStatus();
          return;
        // right 
        } else if (direction < 0 && this.offsetLeft > this.leftWidth * 0.4) {
          this.swipeMove(this.leftWidth);
          this.resetSwipeStatus();
          return;
        }

        // 当拖拉的距离不够时（this.leftWidth * 0.4）,自动收缩回去
        this.swipeMove(0);
        once(this.wrap, 'webkitTransitionEnd', _ => {
          this.wrap.style.webkitTransform = '';
          this.rightWrapElm.style.webkitTransform = this.rightDefaultTransform;
          this.leftWrapElm.style.webkitTransform = this.leftDefaultTransform;
          this.swipeLeave = false;
          this.swiping = false;
        });
      }, 0);
    },

    startDrag(evt) {
      evt = evt.changedTouches ? evt.changedTouches[0] : evt;
      this.dragging = true;
      this.start.x = evt.pageX;
      this.start.y = evt.pageY;
    },

    onDrag(evt) {
      if (this.opened) {
        !this.swiping && this.swipeMove(0);
        this.opened = false;
        return;
      }
      if (!this.dragging) return;
      let swiping;
      const e = evt.changedTouches ? evt.changedTouches[0] : evt;
      const offsetTop = e.pageY - this.start.y;
      const offsetLeft = this.offsetLeft = e.pageX - this.start.x;

      if ((offsetLeft < 0 && -offsetLeft > this.rightWidth) ||
        (offsetLeft > 0 && offsetLeft > this.leftWidth) ||
        (offsetLeft > 0 && !this.leftWidth) ||
        (offsetLeft < 0 && !this.rightWidth)) {
        return;
      }

      const y = Math.abs(offsetTop);
      const x = Math.abs(offsetLeft);

      swiping = !(x < 5 || (x >= 5 && y >= x * 1.73));
      if (!swiping) return;
      evt.preventDefault();
      this.swipeMove(offsetLeft);
    },

    endDrag() {
      if (!this.swiping) return;
      this.swipeLeaveTransition(this.offsetLeft > 0 ? -1 : 1);
    }
  }
};
</script>

<style lang="scss">
  @import "./../../sass/variables";
  @import "./../../sass/func";
.mint-cell-swipe {
    .mint-cell-swipe-buttongroup{
         height: 100%;
         display:flex;
    }

    .mint-cell-swipe-button {
        display:flex;
        align-items: center;
        height: 100%;
        padding: 0 pxToRem(10px * 2);
        font-size:  pxToRem(14px * 2);
    }

    .mint-cell-wrapper,
    .mint-cell-left,
    .mint-cell-right {
        transition: transform 150ms ease-in-out;
    }
}
</style>
