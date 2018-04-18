<template>
  <div class="mybusinessContainer"> 
      <bsnheader :bsn-title="'车易贷管理'" :searchFn="searchFn" :businessType="businessType" :addFun="goToAdd" :isLoading="isLoading" ref="header"></bsnheader>
      <panel :_loadTop = "busilistloadTop" :_loadBottom = "busilistloadBottom" :_isEmpty="isEmpty" :_bottomDisabled = "bottomDisabled">
          <div slot="body">
              <businessitem v-for="(item,index) in busilist" :key="index" :data="item" :_isBtn="false"></businessitem>
          </div>
      </panel>
  </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/common/header.vue'

// panel组件
import panel from 'mycomponents/common/panel.vue'

//Toast组件
import Toast from 'components/toast/index.js'

// 我的业务列表组件
import businessitem from 'mycomponents/common/businessitem.vue'

export default {
  name: 'carBusiness',
  data () {
    return {
      LoadingTimer: 0,    
      isLoading: false,    // 是否开启头部Loading菊花图
      isEmpty:false,       // 数据是否为空？
      busilist:[],
      bottomDisabled:false,
      businessType:[],      // 搜索栏中的业务类型列表
      where: {
        business_id: '',    // 业务单号
        business_type:'',   // 业务类型
        cust_name: '',      // 客户名
        page_index: 1       // 分页索引，从1开始
      }
    }
  },
  components: {
      bsnheader,
      panel,
      businessitem
  },
  methods: {
    // 重置数据
    resetWhere () {
       this.isEmpty = false
       this.bottomDisabled = false
       // 初始化搜索条件
       this.where = {
        business_id: '',    // 业务单号
        business_type:'',   // 业务类型
        cust_name: '',      // 客户名
        page_index: 1       // 分页索引，从1开始
      }
      // 重置(清空)搜索框的数据
      this.$refs.header.resetWhere();
    },
    // 获取数据
    getData (cb, isQuiet = false) {
         this.api.CarBusiness.CarBusinessApi_GetCatBusinessDatas(this.where, isQuiet).then(Result => {
            if (Result.ReturnCode >= 1) {
                // 如果有数据，还原正常配置
                if (Result.Data.data_list.length > 0) {
                    this.bottomDisabled = false;
                    this.isEmpty = false;
                }
            } else {
                 Toast(Result.ReturnMessage);
            }
            // 执行回调函数，并放入一个请求数据结果的参数
            cb && cb(Result.Data.data_list);
         })
    },
    busilistloadTop (cb) {
       // 重置搜索条件
       this.resetWhere();
       // 请求最新的数据
       this.getData(data => {
           // 加载最新的数据
           this.busilist = data
           // 停止下拉loading图
           cb && cb()
       }, true)
    },
    busilistloadBottom (cb) {
        // 页面索引++
        this.where.page_index++;
        this.getData(data => {
          // 如果请求数据为空，但原本存在数据。那就禁止【上拉加载更多】，展示【没有更多数据啦~】
          if (data.length === 0 && this.busilist.length > 0) this.bottomDisabled = true;
          // 累加到数组中
          this.busilist.push(...data);
          // 执行回调函数：关闭loading
          cb && cb();
        }, true)
    },
    searchFn (where) {
      // 合并搜索条件
      Object.assign(this.where, where)
      // 重置页面索引
      this.where.page_index = 1
      // 搜索数据
      this.getData(data => {
          // 搜索的数据如果没有，直接展示【没有数据哦~】
          if (data.length === 0) this.isEmpty = true
          // 替换数组
          this.busilist = data
      })
    },
    goToAdd () {
      this.$router.push('/carBusiness/addCarBusiness')
    }
  },
  beforeMount () {
    // 获取车易贷业务列表
    this.api.CarBusiness.CarBusinessApi_GetSearchConditions().then(Result => {
        for (let [index,v] of Result.Data.BusinessTypes.entries()) {
          this.businessType.push({id : v.Key, text: v.Value})
        }
    })
  },
  // 组件被激活的事件，这个事件不受keep-alive缓存限制。
  // 所以可以在此搞一些事情，如判断更新最新数据
  // 比如说，重新进入此页面的时候。应该重置搜索的条件和数据
  // 保持纯净的十条数据。这十条数据当然缓存在localstorage之中
  // TODO: 这里有个问题。当我第一次进入的时候，使用的是缓存。
  activated () {
      let self = this;
      // 获取缓存数据，如果没有则为null
      let cache = self.$localStorage.get(self.$route.path)
      // 是否存在缓存数据
      if (cache) {
        // 缓存只能存储字符串，所以需要主动转化为object
        let cacheObject = JSON.parse(cache)
        // 重置纯净的缓存数据: TODO: 这里渲染数据实在太慢了
        self.busilist = cacheObject;
        // 重置搜索条件
        self.resetWhere();
        // TODO:这个延迟主要是避免太快导致用户没看到有提示.就体验而言挺有必要的。看情况吧
        setTimeout(() => {
            // 开启Header-Loading
            self.isLoading = true;
            // 读取数据来判断
            self.getData(data => {
               // 如果最新的数据为空
               // 如果原本的数据为空
               // 如果最新的一条数据和缓存中最新的一条数据对比不一致
               // 以上情况都会替换数据
               if (data.length === 0 || self.busilist.length === 0 || data[0].business_id != self.busilist[0].business_id) {
                  // 那么替换最新的十条数据
                  self.busilist = data
                  // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
                  if (data.length === 0)  this.isEmpty = true
                  // 设置缓存
                  self.$localStorage.set(self.$route.path, JSON.stringify(data))
                }
                // 关闭Header-Loading
                self.isLoading = false;
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
        this.getData(data => {
            // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
            if (data.length === 0)  self.isEmpty = true
            // 替换数组
            self.busilist = data
            // 将最初纯净的数据加入到缓存之中.方便之后处理
            self.$localStorage.set(self.$route.path, JSON.stringify(data))
        }) 
      }
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/variables";
@import "./../../sass/func"; 
  .mybusinessContainer {
         padding-top:pxToRem(86px);
  }
</style>