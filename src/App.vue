<template>
   <div id="app">
      <transition :name="transitionName" @afterLeave="clearTransition">
          <keep-alive include="carBusiness,houseBusiness,QrcodeBusiness,allLedger,AutoRepay,auditAssign,MyBusiness,notice,message">
              <router-view class="view"></router-view>
          </keep-alive> 
      </transition>
  </div>
</template>

<script>  
import { mapState } from 'vuex';

export default {
  name: 'app',
  data () {
    return {
       isFirst: true
    }
  },
  methods: {
    clearTransition () {
        this.$store.commit('transition/setTransition', '');
    }
  },
  watch: {
      $route(to, from, next) {
        // 第一次不需要进行操作
        if (this.isFirst) return this.isFirst = !this.isFirst;

        if (to.meta.footer && from.meta.footer) {
            // 当两个页面都为底部页面的时候，是不需要进行动画的
            // some code...
        } else {
            // 当两个页面都是底部页面的时候，是不需要进行动画转场的
            if (to.path === this.$store.getters.siteMap) {
                this.$store.commit('transition/setTransition', 'turn-off');
            } else {
                this.$store.commit('transition/setTransition', 'turn-on');
            }
        }
        // 全站路由的核心算法。
        this.$store.dispatch('setSiteMap', { name: to.name, path: to.path })
      }
  },
  computed: {
      ...mapState('transition', ['transitionName']),
  }
}
</script>

<style lang="scss" scoped>
  @import "sass/variables";
  @import "sass/func";
  .view {
    position: absolute;
    height: 100%;
    margin: 0 auto;
    transition: all .3s ease-in-out;
    box-sizing: border-box;
    background-color: $bg;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
    overflow-y: scroll;
    // bottom: 0;
  }

  // Page Turn on Transian Effect
  .turn-on {
    &-enter {
      transform: translate3d(100%, 0, 0);
    }
    &-leave-to {
      transform: translate3d(-20%, 0, 0);
    }
    &-enter-active, &-leave-active  {
      transition: transform .4s ease;
    }
  }

  // Page Turn Off Transian Effect
  .turn-off {
      &-enter {
        transform: translate3d(-20%, 0, 0);
        z-index: 0
      }
      &-leave-to {
        transform: translate3d(100%, 0, 0);
      }
      &-leave-active {
        z-index: 2;
      }
      &-enter-active, &-leave-active  {
        transition: transform .4s ease;
      }
  }
</style>
