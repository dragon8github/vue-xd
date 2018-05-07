<template>
  <div class="mybusinessContainer"> 
      <bsnheader :bsn-title="'我的业务'" :businessType="businessType" :searchFn="searchFn" :isLoading="currTag.isLoading"  ref="header" :path="path"></bsnheader>
        <navbar v-model="selected">
            <tabitem id="tab-container0" :fontSize="'32'">待审业务</tabitem>
            <tabitem id="tab-container1" :fontSize="'32'">已审业务</tabitem> 
            <tabitem id="tab-container2" :fontSize="'32'">我的业务</tabitem>
        </navbar>
          
        <tabcontainer  v-model="selected" swipeable>
            <tabcontaineritem  id="tab-container0" >
              <panel ref="pannel0" :_loadTop = "loadTop" :_loadBottom = "loadBottom" :_isEmpty="tag[0]['isEmpty']" :_bottomDisabled = "tag[0]['bottomDisabled']">
                  <div slot="body">
                      <businessitem 
                      v-for="(item,index) in tag[0]['list']" 
                      :data="item"
                      :key="index" 
                      :_EditPageType="item.EditPageType"
                      :_isEditable="item.IsEditable" 
                      :_isApproval="true"
                      :_isCanUndo="false" 
                      :_Approval="Approval">                        
                      </businessitem>
                  </div>
              </panel>
            </tabcontaineritem>


              <tabcontaineritem id="tab-container1">
                <panel ref="pannel1" :_loadTop = "loadTop" :_loadBottom = "loadBottom"   :_isEmpty="tag[1]['isEmpty']" :_bottomDisabled = "tag[1]['bottomDisabled']">
                    <div slot="body">
                         <businessitem  
                         v-for="(item,index) in tag[1]['list']"
                         :data="item"
                         :key="index" 
                         :_index = "index"
                         :_isCanUndo="item.IsUndoable"  
                         :_isApproval="false"
                         :_Canel="canelBusiness">                         
                         </businessitem>
                    </div>
                </panel>
              </tabcontaineritem>


              <tabcontaineritem id="tab-container2">
                <panel ref="pannel2" :_loadTop = "loadTop" :_loadBottom = "loadBottom"  :_isEmpty="tag[2]['isEmpty']" :_bottomDisabled = "tag[2]['bottomDisabled']">
                   <div slot="body">
                        <businessitem 
                        v-for="(item,index) in tag[2]['list']" 
                        :data="item"
                        :key="index" 
                        :_isBtn="false">                        
                        </businessitem>
                    </div>
                </panel>
              </tabcontaineritem>

        </tabcontainer>

        <cs-footer></cs-footer>   
  </div>
</template>

<script>
// nav组件
import navbar from 'components/navbar/navbar.vue'
import tabitem from 'components/tabItem/tabItem.vue'

// tabcontainer组件
import tabcontainer from 'components/tabcontainer/tabcontainer.vue'
import tabcontaineritem from 'components/tabContainerItem/tabContainerItem.vue'

// panel组件
import panel from 'mycomponents/common/panel.vue'

// header组件
import bsnheader from 'mycomponents/common/header.vue'

// 我的业务列表组件
import businessitem from 'mycomponents/common/businessitem.vue'

//Toast组件
import Toast from 'components/toast/index.js'

// Messagebox 组件
import MessageBox from 'components/messagebox/messagebox.js'

// 脚部组件
import csFooter from 'mycomponents/Footer.vue'

/*
开发故事：
这个需求有点恐怖：当切换tag时，会重置搜索条件（where）.这其实很正常对吧。
但问题是，切换tag时还需要选择性重新加载数据。
如果该tag中的数据,之前不是通过搜索条件得来的。那么就不需要重新加载，因为它是纯洁的，也符合重置搜索条件。
如果该tag中的数据之前是通过搜索条件得来的。由于需要重置搜索条件嘛。所以理所当然的也要重新加载一次纯洁的数据。恶心。
也就是说，每次tag进行切换时，我要进行判断目标tag之前到底是纯洁还是不纯洁。这需要一个标识。不对，这需要三个标识来分别记录三个tag。你说恶心不了？
这就是为什么我使用了tag对象来维护isSearch对象来记录着这些状态。
*/
export default {
  name: 'MyBusiness',
  data () {
    return {
      path: '/',
      selected: 'tab-container' + this.$route.params.tag,    
      businessType:[],  // 业务类型HTTP数据
      where: {
        tag: this.$route.params.tag,    // 标签页[0：待审，1：已审，2：我的业务]
        business_type:'',               // 业务类型
        business_id: '',                // 业务单号
        cust_name: '',                  // 客户名
        page_index: 1,                  // 分页索引，从1开始
        page_size: 10                   // 每次获取的条数
      },
      tag: {
        '0':{isSearch:false, isEmpty:false,isLoading: false, LoadingTimer: 0, list:[], bottomDisabled: false, index: 0},
        '1':{isSearch:false, isEmpty:false,isLoading: false, LoadingTimer: 0, list:[], bottomDisabled: false, index: 1},
        '2':{isSearch:false, isEmpty:false,isLoading: false, LoadingTimer: 0, list:[], bottomDisabled: false, index: 2}
      },
      oldTag: null
    }
  },  
  components: {
      navbar,
      tabitem,
      tabcontainer,
      tabcontaineritem,
      bsnheader,
      panel,
      businessitem,
      csFooter
  },
  computed: {
      // 返回当前的tag对象
      currTag () {
        return this.tag[this.where.tag]
      }
  },
  methods: {
    // 获取数据
    getData (cb, isQuiet = false) {
       let currTag = this.currTag;
       this.api.MyBusiness.MyBusiness_GetMyAllBusinessAudit(this.where, isQuiet).then(Result => {
           if (Result.ReturnCode == 1) {
               // 当请求数据不为空的时候，重置展示状态
               if (Result.Data.length > 0) {
                 currTag.bottomDisabled = false;
                 currTag.isEmpty = false;
               }
           } else {
               Toast(Result.ReturnMessage);
               Result.Data=[];
           }
           cb && cb(Result.Data, currTag);
       })
    },
    // 重置数据
    resetWhere () {
      this.isEmpty = false
      this.bottomDisabled = false
       this.where = {
          tag: this.$route.params.tag,    // 标签页[0：待审，1：已审，2：我的业务]
          business_type:'',               // 业务类型
          business_id: '',                // 业务单号
          cust_name: '',                  // 客户名
          page_index: 1,                  // 分页索引，从1开始
          page_size: 10                   // 每次获取的条数
       }
       // 重置(清空)搜索框的数据
       this.$refs.header && this.$refs.header.resetWhere();
    },
    // 搜索数据
    searchFn (where) {
      // 将滚动条居顶
      this.$refs[`pannel${this.currTag.index}`].$el.scrollTop = 0
      // 合并搜索条件
      Object.assign(this.where, where)
      // 重置页面索引
      this.where.page_index = 1
      // 搜索数据
      this.getData((data, tag) => {
        // 搜索的数据如果没有，直接展示【没有数据哦~】
        if (data.length === 0) tag.isEmpty = true
        // 赋值
        tag.list = data
        // 标记为【搜索】
        this.currTag.isSearch = true
      })
    },
    loadTop (cb) {
       // 重置搜索条件和请求数据条件
       this.resetWhere()
       // 请求数据
       this.getData((data, tag) => {
          // 由于刷新而初始化了数据、所以无论如何已经不属于search的结果了。解除这个状态。这样做当tag切换回来的时候就不需要再次请求了
          tag.isSearch = false
          // 停止Loading
          cb && cb()
          // 赋值数组
          tag.list = data
          // 如果数组为空，那么展示【没有数据哦~】
          if (this.currTag.list.length === 0) this.currTag.isEmpty = true;
       }, true)
    },
    // 上拉加载的回调函数
    loadBottom (cb) {
      // 兼容一种特殊情况,只在多个tag且用户操作过急的情况才可能发生
      if (this.$refs[`pannel${this.currTag.index}`].loading === false) {
        this.$refs[`pannel${this.oldTag}`].$el.scrollTop = 0
        return cb && cb()
      }
      // 页面索引++
      this.where.page_index++
      // 开始请求数据
      this.getData((data, tag) => {
        // 如果请求数据为空，但原本存在数据。那就禁止【上拉加载更多】，展示【没有更多数据啦~】
        if (data.length === 0 && tag.list.length > 0) tag.bottomDisabled = true;
        // 累加到数组中
        tag.list.push(...data)
        // 执行回调函数：关闭loading
        cb && cb()
      })
    },
    // 撤销操作
    canelBusiness (business_id, approve_id, flow_business_type, after_id, index) {
        MessageBox.confirm('确定要撤销此项审批吗?', '提示').then(() => {
           // 发送撤销请求
           this.api.MyBusiness.MyBusiness_UndoBusinessAudit({business_id, approve_id, flow_business_type, after_id}).then(data=>{
              // 弹出请求的返回状态信息
              Toast(data.ReturnMessage);
              // 如果撤销成功的话
              if (data.ReturnCode== 1) {
                  // 从数组中删除该数据（只有tag【1】才可以进行撤销操作）
                  this.tag[1]['list'].splice(index, 1);
                  // 强制栽赃tag0。这样一来当切换回tag0时就会刷新数据了。（撤销的数据只有在tag【0】才能看到）
                  this.tag[0].isSearch = true
              }
          });
        }).catch(() => {
            console.log("取消撤销")
        })
    },
    // 审批
    Approval (business_id, approve_id, flow_business_type, after_id) {
        this.api.MyBusiness.MyBusiness_IsAuditableBusiness({business_id, approve_id, flow_business_type, after_id}).then(result => {
            if (result.ReturnCode === 1 && result.Data === true) {
                this.$router.push(`/approval/${approve_id}`);
            } else {
                Toast(result.ReturnMessage);
            }
        })
    },
    loadCache () {
       let self = this;
       // 获取当前tag
       let currTag = self.currTag;
       // 获取缓存数据，如果没有则为null
       let cache = self.$localStorage.get(self.$route.path)
       // 是否存在缓存数据
       if (cache) {
          // 缓存只能存储字符串，所以需要主动转化为object
          let cacheObject = JSON.parse(cache)
          // 重置纯净的缓存数据
          currTag.list = cacheObject;
          // 重置搜索条件
          self.resetWhere();
          // 开启Header-Loading
          currTag.isLoading = true;
          // 读取数据来判断
          self.getData((data, tag) => {
              // 如果最新的数据为空
              // 如果原本的数据为空
              // 如果最新的一条数据和缓存中最新的一条数据对比不一致
              // 以上情况都会替换数据,但说真的，直接替换好像更好一些不要判断了
              if (data.length === 0 || tag.list.length === 0 || data[0].business_id != tag.list[0].business_id) {
                  // 那么替换最新的十条数据
                  tag.list = data
                  // 如果时请求数据长度为0，那么展示【没有数据哦~】
                  if (tag.list.length === 0)  tag.isEmpty = true
                  // 设置缓存
                  self.$localStorage.set(self.$route.path, JSON.stringify(data))
               }
              // 关闭Header-Loading
              currTag.isLoading = false;
          }, true)
          // 计时器，如果header-loading超过10秒，那么还原
          let timer = setInterval(() => {
            if (currTag.isLoading && currTag.LoadingTimer <= 10) {
              currTag.LoadingTimer++;
            } else {
              currTag.isLoading = false;
              clearInterval(timer);
            }
          }, 1000)
       } else {
          self.getData((data, tag) => {
            // 初始化数组
            tag.list = data
            // 如果时请求数据长度为0，那么展示【没有数据哦~】
            if (tag.list.length === 0)  tag.isEmpty = true
            // 将最初纯净的数据加入到缓存之中.方便之后处理
            self.$localStorage.set(self.$route.path, JSON.stringify(data))
          })
       }
    }
  },
  watch: {
    // 通过监听navbar的切换（selected状态的变化），来请求数据并且赋值（仅加载一次）。
    selected (curVal, oldVal) {
         // 存储切换前的tag索引
         this.oldTag = oldVal.substr(-1, 1)
         // 重置搜索条件
         this.resetWhere();
         // 【设置当前操作tag对象】
         this.where.tag =  curVal.substr(-1, 1)
         // 修改路由
         this.$router.push(`/myBusiness/${this.where.tag}`)
    },
    // 首次进入页面不会触发，而后切换tag的时候才会触发。
    $route (to, from, next) {
        if (to.path.includes("myBusiness")) {
          this.loadCache();
        }
    }
  },
  beforeMount () {
      // 获取业务列表
      this.api.MyBusiness.MyBusiness_GetSearchConditions().then(Result => {
          for (let [index,v] of Result.Data.BusinessTypes.entries()) {
            this.businessType.push({id : v.Key, text: v.Value})
          }
      })
  },
  activated(){
      this.loadCache();
  },
  // 开发小故事：按照我地图链（/store/modules/siteMap）的概念。你从哪里前进，就会从哪个回来。但总有某些页面例外。比如说，作为底部三大页面（首页、我的业务、我）
  // 如果你是从【我】进入【我的业务】，那么按照地图链的概念你应该还是退回【我】界面。但这显然不太对。给人感觉还是得回到【首页】。于是有了以下代码
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.path === '/user') vm.path = '/'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./../../sass/variables";
@import "./../../sass/func"; 
  .mybusinessContainer {
         padding:pxToRem(86px) 0px pxToRem(86px);
  }
  @media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3)  {
    .mint-navbar{
      margin-top: 30px;
    }
  }
</style>