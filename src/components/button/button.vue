<template>
  <button
    :type="nativeType"
    class="mint-button"
    :class="['mint-button--' + type, 'mint-button--' + size, {
      'is-disabled': disabled,
      'is-plain': plain
    }]"
    @click="handleClick"
    :disabled="disabled">
    <span class="mint-button-icon" v-if="icon || $slots.icon">
      <slot name="icon">
        <i v-if="icon" class="mintui" :class="'mintui-' + icon"></i>
      </slot>
    </span>
    <label class="mint-button-text"><slot></slot></label>
  </button>
</template>

<script>
if (process.env.NODE_ENV === 'component') {
  require('mint-ui/packages/font/style.css');
}

/**
 * mt-header
 * @module components/button
 * @desc 按钮
 * @param {string} [type=default] - 显示类型，接受 default, primary, danger
 * @param {boolean} [disabled=false] - 禁用
 * @param {boolean} [plain=false] - 幽灵按钮
 * @param {string} [size=normal] - 尺寸，接受 normal, small, large
 * @param {string} [native-type] - 原生 type 属性
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {slot} - 显示文本
 * @param {slot} [icon] 显示图标
 *
 * @example
 * <mt-button size="large" icon="back" type="primary">按钮</mt-button>
 */
export default {
  name: 'mt-button',

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  },

  props: {
    icon: String,
    disabled: Boolean,
    nativeType: String,
    plain: Boolean,
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return [
          'default',
          'danger',
          'primary',
          'tuandai'
        ].indexOf(value) > -1;
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator(value) {
        return [
          'small',
          'normal',
          'large'
        ].indexOf(value) > -1;
      }
    }
  }
};

</script>

<style lang="scss" scoped>
@import "./../../sass/variables";
@import "./../../sass/func";

.mint-button {
      appearance: none;
      border-radius: 4px;
      border: 0;
      box-sizing: border-box;
      color: inherit;
      display: block;
      font-size: pxToRem(18px * 2);
      height: pxToRem(41px * 2);
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;

      &::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        position: absolute;
        top:0;
        right:0;
        bottom:0;
        left:0;
      }

      &:not(.is-disabled):active::after {
        opacity: .4;
      }

      .mint-button-icon {
        vertical-align: middle;
        display: inline-block;
      }

      &.mint-button--default {
        color: #656b79;
        background-color: #f6f8fa;
        box-shadow: 0 0 1px #b8bbbf;

       .is-plain {
            border: 1px solid #5a5a5a;
            background-color: transparent;
            box-shadow: none;
            color: #5a5a5a
        }
      }

     &.mint-button--primary {
        color: #fff;
        background-color: #26a2ff;

        .is-plain {
          border: 1px solid #26a2ff;
          background-color: transparent;
          color: #26a2ff
        }
      }


      &.mint-button--danger {
         color: #fff;
         background-color: #ef4f4f;

        .is-plain {
            border: 1px solid #ef4f4f;
            background-color: transparent;
            color: #ef4f4f;
          }
      }

       &.mint-button--tuandai {
         color: #fff;
         background-color: #FECF1F;

        .is-plain {
            border: 1px solid #FECF1F;
            background-color: transparent;
            color: rgba(255, 255, 255, 0.87);
          }
      }

      &.mint-button--large {
        display: block;
        width: 100%;
      }

      &.mint-button--normal {
        display: inline-block;
        padding: 0 pxToRem(12px * 2);
      }

      &.mint-button--small {
        display: inline-block;
        font-size: pxToRem(14px * 2);
        padding: 0 pxToRem(12px * 2);
        height: pxToRem(33px * 2);
      }

     &.is-disabled {
        opacity: .6;
      }
}

     

/*
  @component-namespace mint {
    @component button {
      appearance: none;
      border-radius: 4px;
      border: 0;
      box-sizing: border-box;
      color: inherit;
      display: block;
      font-size: 18px;
      height: 41px;
      outline: 0;
      overflow: hidden;
      position: relative;
      text-align: center;

      &::after {
        background-color: #000;
        content: " ";
        opacity: 0;
        position: absolute 0 0 0 0;
      }

      &:not(.is-disabled):active::after {
        opacity: .4;
      }

      @descendent icon {
        vertical-align: middle;
        display: inline-block;
      }

      @modifier default {
        color: $button-default-color;
        background-color: $button-default-background-color;
        box-shadow: $button-default-box-shadow;

        @when plain {
          border: 1px solid $button-default-plain-color;
          background-color: transparent;
          box-shadow: none;
          color: $button-default-plain-color;
        }
      }

      @modifier primary {
        color: $button-primary-color;
        background-color: $button-primary-background-color;

        @when plain {
          border: 1px solid $button-primary-background-color;
          background-color: transparent;
          color: $button-primary-background-color;
        }
      }

      @modifier danger {
        color: $button-danger-color;
        background-color: $button-danger-background-color;

        @when plain {
          border: 1px solid $button-danger-background-color;
          background-color: transparent;
          color: $button-danger-background-color;
        }
      }

      @modifier large {
        display: block;
        width: 100%;
      }

      @modifier normal {
        display: inline-block;
        padding: 0 12px;
      }

      @modifier small {
        display: inline-block;
        font-size: 14px;
        padding: 0 12px;
        height: 33px;
      }

      @when disabled {
        opacity: .6;
      }
    }
  }
*/
</style>
