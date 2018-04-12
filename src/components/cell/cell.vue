<template>
  <a class="mint-cell" @click="handleClick">
      <span class="mint-cell-mask" v-if="isLink"></span>
      <div class="mint-cell-left">
        <slot name="left"></slot>
      </div>
      <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
              <slot name="icon">
                  <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
              </slot>
              <slot name="title">
                  <span class="mint-cell-text" v-text="title"></span>
                  <span v-if="label" class="mint-cell-label" v-text="label"></span>
                  <span v-if="label2" class="mint-cell-label mint-cell-label2" v-text="label2"></span>
                  <font v-if="star" color="red"> * </font> 
              </slot>
          </div>
          <div class="mint-cell-value" :class="{ 'is-link' : isLink }">
              <slot>
                  <span v-text="value"></span>
              </slot>
          </div>
      		<i v-if="isLink" class="mint-cell-allow-right"></i>
      </div>
      <div class="mint-cell-right">
          <slot name="right"></slot>
      </div>

  </a>
</template>

<script>
/**
 * mt-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mt-cell title="标题文字" icon="back" is-link value="描述文字"></mt-cell>
 * <mt-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mt-cell>
 */
export default {
  name: 'mt-cell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    label2: String,
    isLink: Boolean,
    value: {},
    clickMethod:Function,
    star: {type:Boolean, default:false}
  },
  methods: {
     // 李钊鸿修改的源码
     handleClick ($event) {
      this.clickMethod && this.clickMethod();
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "./../../sass/variables";
  @import "./../../sass/func";




.mint-cell {
    background-color: #fff;
    box-sizing: border-box;
    color: inherit;
    min-height: pxToRem(48px * 2);
    display: block;
    overflow: hidden;
    /*position: relative;*/
    text-decoration: none;

    &:first-child {
        .mint-cell-wrapper {
            background-origin: border-box;
        }
    }

    &:last-child {
      /*
        background-image: linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
        background-size: 100% 2px;
        background-repeat: no-repeat;
        background-position: bottom;
      */
    }

    .mint-cell-wrapper {
        position: relative;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        display: flex;
        font-size: pxToRem(32px);
        line-height: 1;
        min-height: inherit;
        overflow: hidden;
        padding: 0 pxToRem(10px * 2);
        width: 100%;
        z-index: 1;
        
        &:after {
        	@include border('bottom', #d9d9d9);
        }
    }

    .mint-cell-mask {
        &::after {
            background-color: #000;
            content: " ";
            opacity: 0;
            position: absolute 0;
        }

        &:active::after {
            opacity: .1;
        }
    }

     .mint-cell-text {
        vertical-align: middle;
      }

      .mint-cell-label {
        color: #888;
        display: block;
        font-size: pxToRem(12px * 2);
        margin-top: pxToRem(10px * 2);
        line-height:pxToRem(40px);

        &.mint-cell-label2 {
          text-align: right;
        }
      }

      img {
        vertical-align: middle;
      }

      .mint-cell-title {
        flex: 1;
      }

      .mint-cell-value {
        color: #888;
        display: flex;
        align-items: center;

        .is-link {
          margin-right: pxToRem(24px * 2);
        }
      }

      .mint-cell-left {
        position: absolute;
        height: 100%;
        left: 0;
        transform: translate3d(-100%, 0, 0);
      }

      .mint-cell-right {
        position: absolute;
        height: 100%;
        right: 0;
        top: 0;
        transform: translate3d(100%, 0, 0);
        z-index:1;
      }

      .mint-cell-allow-right::after {
        border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        position: absolute;
        top: 50%;
        right: pxToRem(20px * 2);
        height: pxToRem(5px * 2);
        width:pxToRem(5px * 2);
        transform: translateY(-50%) rotate(45deg);
      }
}

/* 李钊鸿添加的个性化代码 */
.mint-cell {
  // 效果图给的高度  
  // height:pxToRem(87px);

  // 添加四周的圆角
  &:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
  }

  &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
  }
}
</style>
