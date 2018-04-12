<template>
    <div class="content">
        <bsnheader :headerTitle="'附件上传'" :has-back="true"></bsnheader>

        <div class="approval">
            <div class="approval-record">
                <i class="sprite-icon-manage-car" v-show="isShowCarIcon"></i>
                <div class='record-detail'>
                    <p class="row">
                        客户: {{resultUploadList.business_model
                        .name}}<a class="left" v-text="businessId"></a>
                    </p>
                    <p class="row">
                        {{resultUploadList.business_model.apply_money}}
                        （{{resultUploadList.business_model.apply_time_limit_ex}}）
                    </p>
                </div>
            </div>
        </div>

        <div v-for="temp in this.resultUploadList.data_group" class="filebox" v-if="temp.data_list">
            <div class="title">
                {{temp.name}}
            </div>
            <div class="btn-list">
                <div class="btn-item" v-for="item in temp.data_list">
                    {{item.PARA_VALUE}}
                    <i class="right-iocn">&gt;</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import bsnheader from 'mycomponents/Header.vue';
import Toast from 'components/toast/index.js';
export default {
    name: 'uploadFile',
    data() {
        return {
            businessId: this.$route.params.businessId,
            resultUploadList: {},
            isShowCarIcon: false
        }
    },
    components: {
        bsnheader,
        Toast
    },
    beforeMount() {
        this.api.Common.CommonApi_GetUploadFileList(this.businessId).then(Result => {
            console.log(Result);
            this.resultUploadList = Result.Data;
            this.isShowCarIcon = this.resultUploadList.business_model.business_type === "车易贷";
        });
    }
}
</script>

<style lang="scss" scoped>
    @import "./../../sass/reset";
    @import "./../../sass/variables";
    @import "./../../sass/func";
    @import "./../../sass/common";

    .approval {
        padding: pxToRem(14px) pxToRem(36px) 0 pxToRem(36px);
    }

    .approval-record {
        padding: pxToRem(70px) pxToRem(36px) 0 pxToRem(36px);
        margin-bottom: pxToRem(32px);
        background-color: #fff;
        height: pxToRem(250px);
        box-sizing: border-box;
        position: relative;

        .sprite-icon-manage-car {
            display: block;
            background: url(../../images/CAR.png) no-repeat;
            background-size: 100%;
            width: pxToRem(80px);
            height: pxToRem(90px);
            position: absolute;
            top: pxToRem(-9.6px);
            left: pxToRem(22px);
            z-index: 100;
        }

        .record-detail {
            flex: 1;
            -webkit-flex: 1;
            -webkit-box-flex: 1;

            .row {
                font-size: pxToRem(30px);
                color: #212121;
                padding-bottom: pxToRem(20px);
                padding-top: pxToRem(10px);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                border-bottom: 1px solid #9a978f;

                .left {
                    margin-left: 30px;
                    color: #1864fb;
                }
            }
        }
    }

    .filebox {
        padding: pxToRem(15px) pxToRem(36px) pxToRem(10px) pxToRem(36px);

        .title {
            background-color: #fefdf3;
            font-size: pxToRem(30px);
            text-align: center;
            padding: pxToRem(20px) 0 pxToRem(20px) 0;
            border-top: 1px solid #333333;
            border-bottom: 1px solid #333333;
        }

        .btn-list {
            padding: pxToRem(15px) pxToRem(20px) pxToRem(15px) pxToRem(20px);
            background-color: #ffffff;

            .btn-item {
                margin-top: pxToRem(20px);
                text-align: center;
                position: relative;
                font-size: pxToRem(25px);
                background-color: #efefef;
                height: pxToRem(65px);
                line-height: pxToRem(65px);

                .right-iocn {
                    position: absolute;
                    right: pxToRem(20px);
                    font-size: pxToRem(30px);
                }
            }

            .btn-item:first-child {
                margin-top: 0px;
            }
        }
    }
</style>