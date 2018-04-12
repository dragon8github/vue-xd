<template>
  <label class="mint-switch">
    <input class="mint-switch-input" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
    <span class="mint-switch-core"></span>
    <div class="mint-switch-label"><slot></slot></div>
  </label>
</template>

<script>
/**
 * mt-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <mt-switch v-model="value"></mt-switch>
 */
export default {
  name: 'mt-switch',
  props: {
    value: Boolean
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../sass/variables";
@import "./../../sass/func";

.mint-switch {
    display: flex;
    align-items: center;
    position: relative;

    * {
      pointer-events: none;
    }

    .mint-switch-label {
      margin-left: 10px;
      display: inline-block;
      &:empty {
        margin-left: 0;
      }
    }

    .mint-switch-core {
      display: inline-block;
      position: relative;
      width: pxToRem(52px * 2);
      height: pxToRem(30px * 2);
      border: 1px solid #d9d9d9;
      border-radius: pxToRem(16px * 2);
      box-sizing: border-box;
      background: #d9d9d9;
      &::after, &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        transition:transform .3s;
        border-radius: pxToRem(16px * 2)
      }
      &::after {
        width: pxToRem(30px * 2);
        height:pxToRem(29px * 2);
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
      }
      &::before {
        width: pxToRem(50px * 2);
        height: pxToRem(30px * 2);
        background-color: #fdfdfd;
      }
    }

    .mint-switch-input {
      display: none;
      &:checked {
        + .mint-switch-core {
          border-color: #26a2ff;
          background-color: #26a2ff;
          &::before {
            transform: scale(0);
          }
          &::after {
            transform: translateX(pxToRem(40px));
          }
        }
      }
    }
  }

/*
  @component-namespace mint {
    @component switch {
      display: flex;
      align-items: center;
      position: relative;
      * {
        pointer-events: none;
      }
      @descendent label {
        margin-left: 10px;
        display: inline-block;
        &:empty {
          margin-left: 0;
        }
      }
      @descendent core {
        display: inline-block;
        position: relative;
        size: 52px 32px;
        border: 1px solid #d9d9d9;
        border-radius: 16px;
        box-sizing: border-box;
        background: #d9d9d9;
        &::after, &::before {
          content: " ";
          position: absolute 0 * * 0;
          transition:transform .3s;
          border-radius: 15px;
        }
        &::after {
          size: 30px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        }
        &::before {
          size: 50px 30px;
          background-color: #fdfdfd;
        }
      }
      @descendent input {
        display: none;
        &:checked {
          + .mint-switch-core {
            border-color: $color-blue;
            background-color: $color-blue;
            &::before {
              transform: scale(0);
            }
            &::after {
              transform: translateX(20px);
            }
          }
        }
      }
    }
}
*/
</style>