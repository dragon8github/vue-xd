<template>
<div id="HouseBusinessDetails">
    <!-- 头部 -->
    <bsnheader :headerTitle="'房速贷详情页'" :has-back='true'>
        <a slot="expandHeader" v-if="IsParagraph" @click="transition">出款详情</a>
    </bsnheader>
    <!-- 之所以要使用panel，是因为正常是scroll-y会导致渲染问题。非常难看。算是hack吧 -->
    <panel :Top="false" :Bottom = "false">
          <div id="HouseBusinessDetailsBody" slot="body">
              <!-- 头部swiper -->
              <swiperheader :swiperAction="swiperAction" :swpierList="swpierList" :userInfo="userInfo"></swiperheader>
              <!-- 子路由 -->
              <!-- <keep-alive> --><router-view></router-view><!-- </keep-alive> -->
           </div>
    </panel>
</div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Header.vue'

// 自定义的swiper组件
import swiperheader from 'mycomponents/businessDetails/swiperheader.vue'

// panel组件
import panel from 'mycomponents/common/panel.vue'

export default {
  name: 'HouseBusinessDetails',
  data () {
    return {
      // 菜单列表
      swpierList : [{title:"基本信息"   ,path:"CustBasicInfo"},
                    {title:"贷款信息"   ,path:"HouseDetails"},
                    {title:"房产信息"   ,path:"HouseInfo"},
                    {title:"征信情况"   ,path:"HouseCredit"},
                    {title:"事件调查"   ,path:"HouseInspect"},
                    {title:"担保措施"   ,path:"HouseAssure"},
                    {title:"财产清单"   ,path:"HouseTenure"},
                    {title:"业务流程"   ,path:"BusinessMaps"},
                    {title:"审批意见书" ,path:"HouseBusinessApproval"},
                    {title:"上传文档"   ,path:"UploadFileList"}],
        userInfo : {},
        IsParagraph: false
    }
  },
  components: {
      bsnheader,
      swiperheader,
      panel
  },
  computed: {
    swiperAction () {
      // 获取当前完整路由
      let path = this.$route.path
      // 获取核心参数
      path = path.substring(path.lastIndexOf('/') + 1)
      // 遍历自定义的列表。从中匹配到当前的索引
      for (let [index, ele] of this.swpierList.entries()) {
         // 如果找到对应的path属性，则赋值索引并且中断循环
         if (ele.path === path) return ele.title
      }
      // 如果遍历没有则返回空，有一种情况会让swiperAction为空，就是当path其实是afterId的时候。
      return ""
    }
  }, 
  methods: {
    transition () {
        this.$router.push(`/lentOutDetail/id/${this.$route.params.id}`);
    }
  },
  beforeMount () {
     // 有一种情况会让swiperAction为空，就是当path其实是afterId的时候。
     if (this.swiperAction === '' && this.$route.params.afterId) {
         // 业务需求：如果存在afterId参数，说明是【台账管理】或者【贷后管理】，需要加入两个新页面
         this.swpierList.push({title: '贷后信息', path: 'AfterLoan'}, {title: '还款计划', path: 'RepayPlan'})
     }
     
     // 获取当前详情的用户信息
     this.api.HouseBusiness.HouseBusinessApi_GetHouseCustomerInfo(this.$route.params.id).then(result => {
        this.userInfo = result.Data.length > 0 ?  result.Data[0]['customer_list'] : {name : "未知", mobile_phone : "未知"}
     })

     // 获取当前是否有出款详情
     this.api.Common.CommonApi_IsParagraph(this.$route.params.id).then(result => {
        this.IsParagraph = result.Data;
     })
  }
}
</script>

<style lang="scss">
@import "./../../sass/variables";
@import "./../../sass/func"; 
#HouseBusinessDetailsBody {
    padding-top:pxToRem(116px);
    margin:0 pxToRem(30px) pxToRem(60px);
}

#HouseBusinessDetails {
  .mint-loadmore {
        overflow: visible !important;
  }
}
</style>