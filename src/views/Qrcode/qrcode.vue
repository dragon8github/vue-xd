<template>
  <div class="mybusinessContainer"> 
      <bsnheader :bsn-title="'扫码业务'" :searchFn="searchFn" :businessType="businessType" :businessStatus="businessStatus" :isLoading="isLoading" ref="header"></bsnheader>
      <panel :_loadTop = "busilistloadTop" :_loadBottom = "busilistloadBottom" :_isEmpty="isEmpty" :_bottomDisabled = "bottomDisabled">
          <div slot="body">
              <businessitem v-for="(item,index) in busilist" :key="index" :data="item" :_isBtn="false"></businessitem>
          </div>
      </panel>
  </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Qrcode/header.vue'

// item组件
import businessitem from 'mycomponents/Qrcode/item.vue'

// panel组件
import panel from 'mycomponents/common/panel.vue'

//Toast组件
import Toast from 'components/toast/index.js'


export default {
  name: 'QrcodeBusiness',
  data () {
    return {
      LoadingTimer: 0,
      isLoading: false,    // 是否开启头部Loading菊花图
      isEmpty:false,
      busilist:[],
      bottomDisabled:false,
      // 业务状态(这里后端要求写死)
      businessStatusData:[{Key: '0', Value: '待接洽'},{Key: '1', Value: '已转业务'},{Key: '2', Value: '不处理'}, {Key: '3', Value: '接洽中'}],  
      // 业务类型(这里后端要求写死)
      businessTypeData:[{Key: '1', Value: '房速贷'},{Key: '2', Value: '车易贷'}],  
      where: {
        Status: '',
        BorrowType: '',
        CustomerName: '',
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  components: {
      bsnheader,
      panel,
      businessitem
  },
  computed: {
    // 获取【业务类型】的键值作为select的option
    businessType () {
      let options = [];
         if (this.businessTypeData) {
            for (let [index,v] of this.businessTypeData.entries()) {
              options.push({id : v.Key, text: v.Value})
            }
         }
       return options;
    },
    // 获取【业务状态】的键值作为select的option
    businessStatus () {
      let options = [];
         if (this.businessStatusData) {
            for (let [index,v] of this.businessStatusData.entries()) {
              options.push({id : v.Key, text: v.Value})
            }
         }
       return options;
    }
  },
  methods: {
    // 获取数据
    getData (cb, isQuiet = false) {
       this.api.Qrcode.BusinessPrototype_GetAll(this.where, isQuiet).then(Result => {
          if (Result.ReturnCode >= 1) {
              // 如果有数据，还原正常配置
              if (Result.Data.length > 0) {
                  this.bottomDisabled = false;
                  this.isEmpty = false;
              }
          } else {
               Toast(Result.ReturnMessage);
          }
          // 执行回调函数，并放入一个请求数据结果的参数
          cb && cb(Result.Data);
       })
    },    
    busilistloadTop (cb) {
       // 重置数据
       this.resetWhere();
       // 重新初始化数据
       this.getData(data => {
           cb && cb()
           this.busilist = data
       }, true)
    },
    busilistloadBottom (cb) {
        // 页面索引++
        this.where.PageIndex++;
        this.getData(data => {
          // 如果请求数据为空，但原本存在数据。那就禁止【上拉加载更多】，展示【没有更多数据啦~】
          if (data.length === 0 && this.busilist.length > 0) this.bottomDisabled = true;
          // 累加到数组中
          this.busilist.push(...data);
          // 执行回调函数：关闭loading
          cb && cb();
        }, true)
    },
    // 重置数据
    resetWhere () {
      this.isEmpty = false
      this.bottomDisabled = false
       // 初始化搜索条件
       this.where = {
          Status: '',
          BorrowType: '',
          CustomerName: '',
          PageIndex: 1,
          PageSize: 10
       }
       // 重置(清空)搜索框的数据
       this.$refs.header.resetWhere();
    },
    searchFn (where) {
      // 合并搜索条件
      Object.assign(this.where, where)
      // 重置页面索引
      this.where.PageIndex = 1
      // 搜索数据
      this.getData(data => {
          // 搜索的数据如果没有，直接展示【没有数据哦~】
          if (data.length === 0) this.isEmpty = true
          // 替换数组
          this.busilist = data
      })
    }
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
        // 重置搜索条件
        this.resetWhere();
        // 重置纯净的缓存数据
        this.busilist = cacheObject;
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
               if (data.length === 0 || this.busilist.length === 0 || data[0].business_id != this.busilist[0].business_id) {
                   // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
                   if (data.length === 0)  this.isEmpty = true
                   // 替换数组
                   this.busilist = data;
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
        this.getData(data => {
          // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
          if (data.length === 0)  this.isEmpty = true
          // 替换数组
          this.busilist = data;
          // 将最初纯净的数据加入到缓存之中.方便之后处理
          this.$localStorage.set(this.$route.path, JSON.stringify(data))
      });
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