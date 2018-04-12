<template>
    <li class="listviewItem" @click.stop="edit(data.business_id || data.id);">
        <i class="sprite-icon-manage" :class="iconShow(data.borrow_type)"></i>
        <div class="busitem">
            <div class="row">
                <div class="left-warp">
                    <a>{{data.customer_name}}</a>
                    <span class="fsd"></span>
                </div>  
                <div class="right-warp">
                    <a>{{data.phone}}</a>
                    <a>{{ data.phone_address }} ({{ data.phone_type | phone_type }})</a>
                </div>
            </div>

            <div class="row flex">
                <div class="left-warp">
                    <span class="num-span" v-text="data.borrow_money"></span><a>元</a>
                </div>
                <div class="right-warp">
                    <button class="btn btn-blue" v-if="data.status != 1" @click.stop="edit(data.business_id || data.id);">编辑</button>
                </div>
            </div>

            <div class="row flex">
                <div class="left-warp">{{ data.user_name }}{{ data.dept_name | kuohao }}</div>
                <div class="right-warp">
                    <i class="circle circle-blue"></i>
                    <span class="text-span">{{data.status | status}}</span>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'ListItem',
    props: ['data', 'index'],
    filters: {
       phone_type (v) {
          switch (v) {
              case 0:  return '未知运营商'; break;
              case 1:  return '中国移动'; break;
              case 2:  return '中国联通'; break;
              case 3:  return '中国电信'; break;
              default: return '未知';
          }
       },
       status (v) {
          switch (v) {
              case 0:  return '待接洽';break;
              case 1:  return '已转业务';break;
              case 2:  return '不处理';break;
              case 3:  return '接洽中';break;
              default: return '未知';
          }
       },
       kuohao (v) {
          if (v) return `(${v})`
       }
    },
    methods: {
        // 进入编辑页面
        edit (business_id) {
            this.$router.push(`/editQrcode/${business_id}`)
        },
        // 判断是房速贷（1）还是车易贷（2）
        iconShow (str) {
            return str == 1 ? 'house' : 'car'
        }
    }
}
</script>

<style lang="scss" scoped>
 @import "../../sass/list";
 .after_type {
    margin-left: pxToRem(30px);
 }
 .qi {
  margin-left: pxToRem(30px);
 }
</style>
