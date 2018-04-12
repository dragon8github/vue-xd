<template>
  <x-cell
    class="mint-field"
    :title="label"
    :star="star"
    v-clickoutside="doCloseActive"
    :class="[{
      'is-textarea': type === 'textarea',
      'is-nolabel': !label
    }]">
    
      <!-- 展示模式，当type没有做任何的设置 并且 当文字的长度大于某个长度时则自动开启 -->
      <p v-if="!type && currentValue && currentValue.length >= 12" 
         class="mint-field-core" 
      >
        {{ currentValue }}
      </p>  
     
      <!-- textarea模式 -->
      <textarea
          v-else-if="type === 'textarea'"
          @change="$emit('change', currentValue)"
          ref="textarea"
          class="mint-field-core"
          :placeholder="placeholder"
          :rows="rows"
          :disabled="disabled"
          v-model="currentValue">
      </textarea>


      <!-- 插槽类型 -->
      <div v-else-if="type === 'other'" 
           class="mint-field-other">
          <slot></slot>
      </div>


      <!-- 默认为普通模式 -->
      <input
          v-else
          @keyup="$emit('keyup', currentValue)"
          @change="$emit('change', currentValue)"
          ref="input"
          class="mint-field-core"
          :placeholder="placeholder"
          :type="type || 'text'" 
          @focus="active = true"
          :disabled="disabled"
          :readonly="readonly"
          :value="currentValue"
          @click="$emit('textClick')"
          @input="handleInput">

  </x-cell>
</template>

<script>
    import XCell from 'components/cell/cell.vue';
    import Clickoutside from './clickoutside';
    // require('components/cell/style.scss');
    /**
     * mt-field
     * @desc 编辑器，依赖 cell
     * @module components/field
     *
     * @param {string} [type=text] - field 类型，接受 text, textarea 等
     * @param {string} [label] - 标签
     * @param {string} [rows] - textarea 的 rows
     * @param {string} [placeholder] - placeholder
     * @param {string} [disabled] - disabled
     * @param {string} [readonly] - readonly
     * @param {string} [state] - 表单校验状态样式，接受 error, warning, success
     *
     * @example
     * <mt-field v-model="value" label="用户名"></mt-field>
     * <mt-field v-model="value" label="密码" placeholder="请输入密码"></mt-field>
     * <mt-field v-model="value" label="自我介绍" placeholder="自我介绍" type="textarea" rows="4"></mt-field>
     * <mt-field v-model="value" label="邮箱" placeholder="成功状态" state="success"></mt-field>
     */
    export default {
        name: 'mt-field',
        data() {
            return {
                active: false,
                currentValue: this.value
            };
        },
        computed: {
            // 获取value的长度，如果长度 > 10的话，那么就自动切换为textarea模式
            currentValueLength () {
                if (this.value && this.value.length) { 
                    return this.value.length 
                }
            }
        },
        directives: {
            Clickoutside
        },
        props: {
            value: {},
            rows: String,
            label: String,
            placeholder: String,
            readonly: Boolean,
            disabled: Boolean,
            disableClear: Boolean,
            attr: Object,
            type: {type: String},
            state: {type: String,default: 'default'},
            star: {type:Boolean, default: false}
        },
        components: {XCell},
        methods: {
            doCloseActive() {
                this.active = false;
            },
            handleInput(evt) {
                this.currentValue = evt.target.value;
            },
            handleClear() {
                if (this.disabled || this.readonly) return;
                this.currentValue = '';
            },
            change(){
                this.$emit('change',this.selectOption);
            }
        },
        watch: {
            value(val) {
                this.currentValue = val;
            },
            currentValue(val) {
                this.$emit('input', val);
            },
            attr: {
                immediate: true,
                handler(attrs) {
                    this.$nextTick(() => {
                        const target = [this.$refs.input, this.$refs.textarea];
                        target.forEach(el => {
                            if (!el || !attrs) return;
                            Object.keys(attrs).map(name => el.setAttribute(name, attrs[name]));
                        });
                    });
                }
            }
        }
    };
</script>

<!-- 这里必须不使用Scoped -->
<style lang="scss">
@import "./../../sass/variables";
@import "./../../sass/func";

.mint-field {

    display: flex;

    .mint-cell-title {
        // width: 40%;
        min-width:pxToRem(250px); 
        flex:none !important;
    }

    &.is-textarea {
        align-items: inherit;

        .mint-cell-title {
            padding: pxToRem(10px * 2) 0;
        }

        .mint-cell-value {
            padding: pxToRem(5px * 2) 0;
        }
    }

    .mint-cell-value {
        // flex: 2;
        // width: 57%;
        color: inherit;
        display: flex;
    }

    .mint-field-core {
        // flex: 1;
        border-radius: 0;
        border: 0;
        overflow-wrap: break-word;
        word-break: break-all;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
        text-align: right;
    }

    .mint-field-clear {
        opacity: .2;
    }

    .mint-field-state {
        color: inherit;
        margin-left: pxToRem(20px * 2);

        .mintui {
            font-size: pxToRem(20px * 2);
        }

        &.is-error {
            color: #f44336;
        }

        &.is-warning {
            color: #ffc107;
        }

        &.is-success {
            color: #4caf50;
        }

        &.is-default {
            margin-left: 0;
        }
    }

    .mint-field-other {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    &.is-nolabel {
        font-size: 99px;
        .mint-cell-title {
            display: none;
        }
    }

    select {
        border: 0;
        box-shadow: none;
        background-image: url(./../../images/arrow-down-light.png);
        background-repeat: no-repeat;
        background-size: 0.55467rem 0.55467rem;
        background-position: 95% 50%;
        background-color: transparent;
        margin: 0;
        font-size: pxToRem(30px);
        padding-right: pxToRem(65px);
        direction: rtl;
        max-width:pxToRem(400px);
    }
}
</style>
