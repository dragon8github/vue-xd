<template>
  <div id="message">
     <cs-header :header-title="'消息中心'" :has-back="true"></cs-header> 
     <panel :_loadTop = "busilistloadTop" 
            :_loadBottom = "busilistloadBottom" 
            :_isEmpty="isEmpty" 
            :_bottomDisabled = "bottomDisabled">
                 <div slot="body">
                     <cell class="cellswipe"
                           v-for="(data, index) in myData"
                           :key="index" 
                           :class="{Unread : !data.IsRead}"
                           :clickMethod="goToDetails(data.TurnUrl, data.MsgContent, data.LogId, data.IsRead, index)"
                           :label="data.MsgContent"
                           :label2="data.CreateTime"
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
      myData: null,
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
      // 设置消息为已读(已废弃)
      MarkAsReaded (logId, index, cb) {
          this.api.Notification.PushNotification_MarkAsReaded(logId).then(Result => {
               // 静态设置已读
               this.myData[index].IsRead = true
               // 回调函数
               cb && cb(Result)
          })
      },
      // 进入详情页
      goToDetails (url, content, logId, isRead, index) {
        return  () => {
          // 如果Url不存在。说明该消息不支持APP阅读和操作
          if (!url) {
             // 如果url不存在但消息可读。弹出提示
             if (isRead) {              
                return Toast('App目前不支持该业务的操作，请在电脑上操作，谢谢')

             // 如果url不存在并且消息不可读
             } else {
                // 将该条消息修改为已读标识，然后弹出提示
                this.MarkAsReaded(logId, index, _ => {
                    Toast('App目前不支持该业务的操作，请在电脑上操作，谢谢')
                })
             }
          // 如果url正常存在，直接跳转即可
          } else {
            // 将该条消息修改为已读标识，然后跳转到指定页(已废弃)
            //this.MarkAsReaded(logId, index, _ => {
            //    this.$router.push(url)
            //})
            this.$router.push(url)
          }
        }
      },
      // 获取数据
      getData (cb) { 
          this.api.Notification.PushNotification_GetAll(this.where).then(Result => {
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
  beforeMount () {
     // 初始化数据
     this.getData(data => {
         // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
         this.isEmpty = data.length === 0
         // 替换数组
         this.myData = data
     })
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