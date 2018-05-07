<template>
  <div id="message">
     <cs-header :header-title="'消息中心'" :has-back="true" :isLoading="isLoading" ></cs-header> 
     <panel :_loadTop = "busilistloadTop" 
            :_loadBottom = "busilistloadBottom" 
            :_isEmpty="isEmpty" 
            :_bottomDisabled = "bottomDisabled">
                 <div slot="body">
                     <cell class="cellswipe"
                           v-for="(data, index) in myData"
                           :key="index" 
                           :class="{Unread : !data.IsRead}"
                           :clickMethod="goToDetails(data.TurnUrl, data.MsgContent, data.LogId, data.IsRead, index, data.MsgType, data.MsgTitle, data.CreateTime)"
                           :label2="timeYMD(data.CreateTime)"
                           :title="data.MsgTitle"
                           is-link>
                     </cell>
                 </div>
     </panel>
  </div>
</template>

<script>
// Toast 组件
import Toast from 'components/toast/index.js'

// csHeader 组件
import csHeader from 'mycomponents/Header.vue'

// cellswipe 组件
import cell from 'components/cell/cell.vue'

// panel 组件
import panel from 'mycomponents/common/panel.vue'

export default {
  name: 'message',
  data () {
    return {
      isLoading: false,    // 是否开启头部Loading菊花图
      myData: [],
      isEmpty:false,
      bottomDisabled:false,
      where: {
        PageIndex: 1,
        PageSize: 10
      }
    }
  },
  components: {
    csHeader,
    cell,
    panel
  },
  methods: {
      resetWhere () {
        this.isEmpty = false;
        this.bottomDisabled = false;
        this.where =  {
          PageIndex: 1,
          PageSize: 10
        }
      },
      // 设置消息为已读
      MarkAsReaded (logId, index, cb) {
          this.api.Notification.PushNotification_MarkAsReaded(logId).then(Result => {
               // 静态设置已读
               this.myData[index].IsRead = true
               // 设置缓存
               this.$localStorage.set(this.$route.path, JSON.stringify(this.myData))
               // 回调函数
               cb && cb(Result)
          })
      },
      // 进入详情页
      goToDetails (url, content, logId, isRead, index, type, title, time) {
        return  () => {
          if (!url && !type) {
            return Toast('App目前不支持该业务的操作，请在电脑上操作，谢谢')
          } else if (!url) {
             // 获取业务类型
             var _type = type.substr(0, type.indexOf('-'))
             // 获取业务编号
             var _id = title.indexOf('（') >= 0 ? /（(.+)）/.exec(title)[1] : null;
             // 获取标题
             var _title = _id ? title.substr(0, title.indexOf('（')) : title;
             // 将该条消息修改为已读标识，然后跳转到指定页
             this.MarkAsReaded(logId, index, _ => {
                 // 设置缓存
                 this.$store.state.message = { content: content, time: time, type: _type, id: _id, title: _title }
                 // 跳转到消息详情
                 this.$router.push('/messageErr')
             })
          // 如果url正常存在，直接跳转即可
          } else {
            // 将该条消息修改为已读标识，然后跳转到指定页
            this.MarkAsReaded(logId, index, _ => {
               this.$router.push(url)
            })
          }
        }
      },
      // 获取数据
      getData (cb, Q = false) { 
          this.api.Notification.PushNotification_GetAll(this.where, Q).then(Result => {
              // 如果有数据，还原正常配置
              if (Result.Data.length > 0) {
                  this.bottomDisabled = false;
                  this.isEmpty = false;
              }
              // 执行回调函数，并放入一个请求数据结果的参数
              cb && cb(Result.Data);
         })
      },    
      busilistloadTop (cb) {
         this.where.PageIndex = 1;
         this.getData(data => {
           
           cb && cb()
           this.myData = data
        })
      },
      busilistloadBottom (cb) {
          // 页面索引++
          this.where.PageIndex++;
          this.getData(data => {
            // 如果请求数据为空，但原本存在数据。那就禁止【上拉加载更多】，展示【没有更多数据啦~】
            if (data.length === 0 && this.myData.length > 0) this.bottomDisabled = true;
            // 累加到数组中
            this.myData.push(...data);
            // 执行回调函数：关闭loading
            cb && cb();
          })
      }
  },
  activated () {
      let self = this;
      // 获取缓存数据，如果没有则为null
      let cache = self.$localStorage.get(self.$route.path)

      // 是否存在缓存数据
      if (cache) {
        // 缓存只能存储字符串，所以需要主动转化为object
        let cacheObject = JSON.parse(cache)
        // 重置纯净的缓存数据: TODO: 这里渲染数据实在太慢了
        self.myData = cacheObject;
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
               if (data.length === 0 || self.myData.length === 0 || data[0].LogId != self.myData[0].LogId) {
                  // 那么替换最新的十条数据
                  self.myData = data
                  // 设置缓存
                  self.$localStorage.set(self.$route.path, JSON.stringify(data))
                  // 展示空
                  self.isEmpty = true
                }
                // 关闭Header-Loading
                self.isLoading = false;
            }, true)
            // 计时器，如果header-loading超过10秒，那么还原
            let timer = setInterval(() => {
             if (this.isLoading && this.LoadingTimer <= 10) {
               this.LoadingTimer++;
             } else {
               this.isLoading = false;
               clearInterval(timer);
             }
           }, 1000)
        }, 400)
      } else {
        self.getData(data => {
            // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
            if (data.length === 0)  self.isEmpty = true
            // 替换数组
            self.myData = data
            // 将最初纯净的数据加入到缓存之中.方便之后处理
            self.$localStorage.set(self.$route.path, JSON.stringify(data))
        }) 
      }
  }
}
</script>

<style lang="scss">
@import "./../../sass/variables";
@import "./../../sass/func";
#message {
  padding-top:pxToRem(86px);

  .cellswipe {
    .mint-cell-title {
       padding: pxToRem(40px) pxToRem(55px) pxToRem(40px) pxToRem(25px);
    }

    .mint-cell-text {
        font-size:pxToRem(28px);
        color:#000;
    }

    .mint-cell-label {
        color:#999;
        font-size:pxToRem(24px);
    }
  }

  .mint-cell .mint-cell-label.mint-cell-label2 {
      text-align: left;
  }

  .Unread .mint-cell-text {
      position: relative;

      &::before {
        content:" ";
        position: absolute;
        width:pxToRem(10px);
        height: pxToRem(10px);   
        border-radius: 100%; 
        top:50%;
        transform: translateY(-50%);
        left:pxToRem(-20px);
        background-color:#2DA5FF;
      }
  }
}

</style>