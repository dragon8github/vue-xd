<!--代扣查询-->
<template>
    <div class="mybusinessContainer">
        <bsnheader :bsn-title="'代扣查询'" :searchFn="searchFn" :paramsModel="queryModel" :isLoading="isLoading"  ref="header"></bsnheader>
        <panel  ref="pannel" :_loadTop="loadTop" :_loadBottom="loadBottom" :_isEmpty="isEmpty" :_bottomDisabled = "bottomDisabled">
            <div slot="body">
                <!-- 循环渲染自定义组件 -->
                <item v-for="(item,index)  in dataList" :key="index" :data="item"></item>
            </div>
        </panel>
    </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/ThirdRepayment/header.vue';

// panel组件
import panel from 'mycomponents/common/panel.vue';

//Toast组件
import Toast from 'components/toast/index.js';

import item from 'mycomponents/ThirdRepayment/autoItem.vue';

export default {
    name : 'AutoRepay',
    data () {
      return {
          LoadingTimer: 0,    
          isLoading: false,    // 是否开启头部Loading菊花图
          isEmpty:false,
          bottomDisabled:false,
          dataList:[],
          where : {
              "BusinessId": "",
              "BusinessType": "",
              "BranchId": "",
              "CustomerName": "",
              "BusinessOriginalUserName": "",
              "ProcessStatus": "",
              "Platform": "",
              "Remark": "",
              "BeginTime": "",
              "EndTime": "",
              "PageIndex": 1,
              "PageSize": 10
          },
          queryModel: {}
      }
    },
    components: {
        Toast,
        panel,
        bsnheader,
        item
    },
    methods: {
        // 重置数据
        resetWhere () {
           // 初始化搜索条件
           this.where = {
              "BusinessId": "",
              "BusinessType": "",
              "BranchId": "",
              "CustomerName": "",
              "BusinessOriginalUserName": "",
              "ProcessStatus": "",
              "Platform": "",
              "Remark": "",
              "BeginTime": "",
              "EndTime": "",
              "PageIndex": 1,
              "PageSize": 10
          }
          // 重置(清空)搜索框的数据
          this.$refs.header.resetWhere();
        },
        getData (cb, isQuiet = false) {
            this.api.ThirdRepayment.ThirdRepayment_GetAllThirdRepaymentProcessLogs(this.where, isQuiet).then(result => {
                // 获取数据成功!
                if (result.ReturnCode == 1) {
                    // 如果数据不为空，那么还原配置
                    if (result.Data.length > 0) {
                        this.isEmpty = false
                        this.bottomDisabled = false
                    }
                // 获取失败，弹出遗言
                } else {
                    Toast(result.ReturnMessage);
                }
                 cb && cb(result.Data)
            });
        },
        // 下拉刷新数据
        loadTop (cb) {
           this.resetWhere();
           this.getData(data => {
                // 初始化数据
                this.dataList = data
                // 停止loading
                cb && cb()
           }, true)
        },
        // 上拉加载更多
        loadBottom (cb) {
            // 页面索引++
            this.where.PageIndex++;
            // 获取更多的数据
            this.getData(data => {
                 // 如果请求数据为空，但原本存在数据。那就禁止【上拉加载更多】，展示【没有更多数据啦~】
                 if (data.length === 0 && this.dataList.length > 0) this.bottomDisabled = true;
                 // 累加到数组中
                  this.dataList.push(...data);
                  // 执行回调函数：关闭loading
                  cb && cb();
            });
        },
        searchFn (query) {
            // 集成条件
            this.where.PageIndex = 1;
            this.where.BusinessId = query.BusinessId;
            this.where.BusinessType = query.BusinessType;
            this.where.BranchId = query.BranchId;
            this.where.CustomerName = query.CustomerName;
            this.where.BusinessOriginalUserName = query.BusinessOriginalUserName;
            this.where.ProcessStatus = query.ProcessStatus;
            this.where.Platform = query.Platform;
            this.where.Remark = query.Remark;
            this.where.BeginTime = query.BeginTime;
            this.where.EndTime = query.EndTime;

            // 滚回顶部
            this.$refs.pannel.$el.scrollTop = 0
            
            // 搜搜
            this.getData(result => {
                // 如果初始化的时候数据为空，那么显示【没有数据哦】
                this.isEmpty = result.length === 0
                // 管你空不空都赋值啦~
                this.dataList = result
            })
        }
    },
    beforeMount () {
        // 初始化搜索数据列表
        this.api.ThirdRepayment.ThirdRepayment_GetSearchConditions().then(data => {
            this.queryModel = data.Data;
        });
    },
    // 组件被激活的事件，这个事件不受keep-alive缓存限制。
    // 所以可以在此搞一些事情，如判断更新最新数据
    // 比如说，重新进入此页面的时候。应该重置搜索的条件和数据
    // 保持纯净的十条数据。这十条数据当然缓存在localstorage之中
    activated () {
       // 获取缓存数据，如果没有则为null
       let cache = this.$localStorage.get(this.$route.path)
       // 是否存在缓存数据
       if (cache) {
          // 缓存只能存储字符串，所以需要主动转化为object
          let cacheObject = JSON.parse(cache)
          // 重置纯净的缓存数据
          this.dataList = cacheObject;
          // 重置搜索条件
          this.resetWhere();
          // TODO:这个延迟主要是避免太快导致用户没看到有提示.就体验而言挺有必要的。看情况吧
          setTimeout(() => {
              // 开启Header-Loading
              this.isLoading = true;
              // 读取数据来判断
              this.getData(data => {
                // 如果最新的数据为空
                // 如果原本的数据为空
                // 如果最新的一条数据和缓存中最新的一条数据对比不一致
                // 以上情况都会替换数据
                if (data.length === 0 || this.dataList.length === 0 || data[0].business_id != this.dataList[0].business_id) {
                   // 初始化数据列表
                   // 如果初始化的时候数据为空，那么显示【没有数据哦】
                   this.isEmpty = data.length === 0
                   // 管你空不空都赋值啦~
                   this.dataList = data
                   // 将最初纯净的数据加入到缓存之中.方便之后处理
                   this.$localStorage.set(this.$route.path, JSON.stringify(data))
                 }
                 // 关闭Header-Loading
                 this.isLoading = false;
              }, true)
              // 计时器，如果header-loading超过10秒，那么还原
              let timer = setInterval(() => {
                 if (self.isLoading && self.LoadingTimer <= 10) {
                   self.LoadingTimer++;
                 } else {
                   self.isLoading = false;
                   clearInterval(timer);
                 }
              }, 1000)
          }, 400)
       } else {
         // 初始化数据列表
          this.getData(data => {
              // 如果初始化的时候数据为空，那么显示【没有数据哦】
              this.isEmpty = data.length === 0
              // 管你空不空都赋值啦~
              this.dataList = data
              // 将最初纯净的数据加入到缓存之中.方便之后处理
              this.$localStorage.set(this.$route.path, JSON.stringify(data))
          })
       }
    }
}
</script>

<style lang="scss" scoped>
    @import "./../../sass/variables";
    @import "./../../sass/func";

    .mybusinessContainer {
        padding-top: pxToRem(86px);
    }
</style>