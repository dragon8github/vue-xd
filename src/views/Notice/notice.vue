<template>
	<div id="notice">
		<cs-header :header-title="'通知中心'" :isLoading="isLoading" :has-back="true"></cs-header>
		<panel :_loadTop="busilistloadTop" :_loadBottom="busilistloadBottom" :_isEmpty="isEmpty" :_bottomDisabled="bottomDisabled">
			<div slot="body">
				<cell class="cellswipe" 
					  v-for="(data, index) in myData"  
					  :key="index"
					  :class="{Unread : !data.IsRead}" 
					  :clickMethod="goToDetails(data.NoticeId, index)" 
					  :label="data.UpdateTime | timeYMD" 
					  :title="data.NoticeTitle | subStr(20)"
					  is-link>
				</cell>
			</div>
		</panel>
	</div>
</template>

<script>
	// Toast 组件
	import Toast from 'components/toast/index.js'

	// header 组件
	import csHeader from 'mycomponents/Header.vue'

	// cellswipe 组件
	import cell from 'components/cell/cell.vue'

	// panel 组件
	import panel from 'mycomponents/common/panel.vue'

	export default {
		name: 'notice',
		data() {
			return {
				LoadingTimer: 0,   
				isLoading: false,    // 是否开启头部Loading菊花图
				myData: [],
				isEmpty: false,
				bottomDisabled: false,
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
				this.where = {
					PageIndex: 1,
					PageSize: 10
				}
			},
			// 设置消息为已读（已废弃）
			MarkAsReaded(logId, index, cb) {
				this.api.Notice.Notice_MarkAsReaded(logId).then(Result => {
					// 静态设置已读
					this.myData[index].IsRead = true
					// 回调函数
					cb && cb(Result)
				})
			},
			// 获取数据
			getData(cb, isQuiet = false) {
				this.api.Notice.Notice_GetAll(this.where, isQuiet).then(Result => {
					console.log(Result)
					// 如果有数据，还原正常配置
					if(Result.Data.length > 0) {
						this.bottomDisabled = false;
						this.isEmpty = false;
					}
					// 执行回调函数，并放入一个请求数据结果的参数
					cb && cb(Result.Data);
				})
			},
			goToDetails(logId, index) {
				return () => {
					this.$router.push(`/notice/${logId}`)
				}
			},
			busilistloadTop(cb) {
				this.where.PageIndex = 1;
				this.getData(data => {
					cb && cb()
					this.myData = data
				}, true)
			},
			busilistloadBottom(cb) {
				// 页面索引++
				this.where.PageIndex++;
				this.getData(data => {
					// 如果请求数据为空，但原本存在数据。那就禁止【上拉加载更多】，展示【没有更多数据啦~】
					if(data.length === 0 && this.myData.length > 0) this.bottomDisabled = true;
					// 累加到数组中
					this.myData.push(...data);
					// 执行回调函数：关闭loading
					cb && cb();
				}, true)
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
	          setTimeout(() => {
	          	  // 重置搜索条件
	          	  this.resetWhere();
	              // 开启Header-Loading
	              this.isLoading = true;
	              // 读取数据来判断
	              this.getData(data => {
	              		console.log("data", data)
	                  // 如果最新的数据为空
	                  // 如果原本的数据为空
	                  // 如果最新的一条数据和缓存中最新的一条数据对比不一致
	                  // 以上情况都会替换数据
	                  if (data.length === 0 || this.myData.length === 0 || data[0].business_id != this.myData[0].business_id) {
	                    // 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
             			this.isEmpty = data.length === 0
             			// 替换数组
             			this.myData = data;
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
	       		// 初始化数据
				this.getData(data => {
					// 如果首次加载页面时请求数据长度为0，那么展示【没有数据哦~】
					this.isEmpty = data.length === 0
					// 替换数组
					this.myData = data;
					// 将最初纯净的数据加入到缓存之中.方便之后处理
					this.$localStorage.set(this.$route.path, JSON.stringify(data))
				})
	       }
	    }
	}
</script>

<style lang="scss">
	@import "./../../sass/variables";
	@import "./../../sass/func";
	#notice {
		padding-top: pxToRem(86px);
		.cellswipe {
			.mint-cell-title {
				padding: pxToRem(35px) pxToRem(55px) pxToRem(35px) pxToRem(25px);
			}
			.mint-cell-text {
				font-size: pxToRem(28px);
				color: #000;
			}
			.mint-cell-label {
				color: #999;
				font-size: pxToRem(24px);
			}
			.mint-cell-wrapper {
				height: 2rem;
			}
		}
		.Unread .mint-cell-text {
			position: relative;
			&::before {
				content: " ";
				position: absolute;
				width: pxToRem(10px);
				height: pxToRem(10px);
				border-radius: 100%;
				top: 50%;
				transform: translateY(-50%);
				left: pxToRem(-20px);
				background-color: #2DA5FF;
			}
		}
	}
</style>