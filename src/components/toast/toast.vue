<template>
  <transition name="mint-toast-pop">
    <div class="mint-toast" v-show="visible" :class="customClass" >
      <i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="mint-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  /*@component-namespace mint {
    @component toast {
      position: fixed;
      max-width: 80%;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;
      z-index: 1000;
      transition: opacity .3s linear;
  
      @descendent icon {
        display: block;
        text-align: center;
        font-size: 56px;
      }
      
      @descendent text {
        font-size: 14px;
        display: block;
        text-align: center;
      }
      
      @when placetop {
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      
      @when placemiddle {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      @when placebottom {
        bottom: 50px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      
      @descendent pop-enter, pop-leave-active {
        opacity: 0;
      }
    }
  }*/
  //taost
@import "../../sass/variables.scss";
@import "../../sass/func.scss";
.mint-toast {
    position: fixed;
    max-width: 80%;
    border-radius: pxToRem(10px);
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1200;
    -webkit-transition: opacity .3s linear;
    transition: opacity .3s linear;
    padding: pxToRem(20px);
}

.mint-toast.is-placebottom {
    bottom: pxToRem(50px*2);
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0)
}

.mint-toast.is-placemiddle {
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%)
}

.mint-toast.is-placetop {
    top: pxToRem(50px * 2);
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0)
}

.mint-toast-icon {
    display: block;
    text-align: center;
    font-size: pxToRem(56px * 2);
}

.mint-toast-text {
    font-size: pxToRem(14px * 2);
    display: block;
    text-align: center;
    line-height: pxToRem(36px);
}

.mint-toast-pop-enter,
.mint-toast-pop-leave-active {
    opacity: 0
}
</style>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        visible: false
      }
    },

    computed: {
      customClass () {
        var classes = []
        switch (this.position) {
          case 'top':
            classes.push('is-placetop')
            break
          case 'bottom':
            classes.push('is-placebottom')
            break
          default:
            classes.push('is-placemiddle')
        }
        classes.push(this.className)

        return classes.join(' ')
      }
    }
  }
</script>