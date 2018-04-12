<template>
  <div v-if="myData">
      <div class="container_item" v-for="(item,index) in myData['bank_card_list']">
          <mtitle :title="item.customer_name">
            <div slot='list'>
                <mt-field label="开户名" :value="item.customer_name" :readonly='true'></mt-field>
                <mt-field label="银行卡账号" :value="item.bank_account" :readonly='true'></mt-field>
                <mt-field label="开户行" :value="item.bank_name" :readonly='true'></mt-field>
                <mt-field label="支行名称" :value="item.bank_sub_name" :readonly='true'></mt-field>
                <mt-field label="银行卡归属地省" :value="item.bank_prvince" :readonly='true'></mt-field>
                <mt-field label="银行卡归属地市" :value="item.bank_city" :readonly='true'></mt-field>
                <mt-field label="转账类型" :value="item.output_type" :readonly='true'></mt-field>
                <mt-field label="是否绑定银行卡代扣" :value="item.bind_status == 1 ? '已绑卡' : '未绑卡'" :readonly='true'></mt-field>
                <mt-field label="绑定代扣平台" :value="item.bind_platforms" :readonly='true'></mt-field>
                <mt-field label="代扣平台单笔限额" :value="item.platform_limit" :readonly='true'></mt-field>
                <mt-field label="代扣平台单日限额" :value="item.platform_day_limit" :readonly='true'></mt-field>
            </div>
          </mtitle>
      </div>
  </div>
</template>
<script>
    import mtField from 'components/field/field.vue';
    
    import mtitle from 'mycomponents/businessDetails/title.vue';

    export default {
        name: 'bankInformation',
        components: {
            mtField,
            mtitle
        },
        computed: {
            myData () {
                return this.$store.getters.LentOutDetailData;
            }
        }
    }
</script>
<style lang="scss">

</style>
