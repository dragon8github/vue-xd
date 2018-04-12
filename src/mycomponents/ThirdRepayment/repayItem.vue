<template>
<div>
    <li class="listviewItem">
        <div class="busitem">
            <div class="flex bottom-wire">
                <div class="left-warp fixed-width">
                    交易流水号
                </div>
                <div class="right-warp warp-left">
                    <span class="span-bold">{{data.yb_order_id}}</span>
                </div>
            </div>
            <div class="flex bottom-wire">
                <div class="left-warp fixed-width">
                    代扣人
                </div>
                <div class="right-warp warp-left">
                    <span class="span-bold">{{data.update_user_name}}</span>
                </div>
            </div>
            <div class="flex bottom-wire">
                <div class="left-warp fixed-width">
                    代扣金额
                </div>
                <div class="right-warp warp-left">
                    <span class="span-bold">{{data.repay_money}}
                        元({{data.bind_platform_ex}})
                    </span>
                </div>
            </div>
                 <div class="flex bottom-wire">
                <div class="left-warp fixed-width">
                    代扣状态
                </div>
                <div class="right-warp warp-left">
                    <span class="span-bold">{{data.repay_status_ex}}</span>
                </div>
            </div>
                 <div class="flex bottom-wire">
                <div class="left-warp fixed-width">
                    代扣日期
                </div>
                <div class="right-warp warp-left">
                    <span class="span-bold">{{data.update_time}}</span>
                </div>
            </div>
        </div>
    </li>
    <p class="remark">备注：{{data.remark}}</p>
</div>
</template>

<script>
    export default {
        name: 'autoItem',
        props: ['data'],
        methods: {
            goToRepay (businessId, afterId) {
                this.$router.push(`/RepayLog/${businessId}/${afterId}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../sass/list";  

    .bottom-wire {
      height:pxToRem(108px);
    
      &:not(:last-child) {
         border-bottom: 1px solid #999999;
      }
    }

    .remark {
        color:#999;
        font-size:pxToRem(24px);
        margin: pxToRem(30px) pxToRem(40px);
    }

    .left-warp {
        flex: 1
    }

    .right-warp {
        flex: 3;
        font-size: pxToRem(28px);
        color: #000;
        text-align: left;
    }

   
</style>