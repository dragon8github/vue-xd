<template>
	<div class="page">
		<cs-header :header-title="'信贷中心管理系统'"></cs-header>
		<div class="content">
			<!-- 头部消息中心、通知中心等推送栏目 -->
			<section class="centers-sec">
				<ul>
					<li v-for="msg in messageList" @click="gotoModule2(msg.path)">
						<i class="icon icon-big" :class="msg.icon"><i class="icon-red" v-if="msg.unread_count">{{msg.unread_count}}</i></i>
						<span>{{msg.module_name}}</span>
					</li>
				</ul>
			</section>

			<!-- 业务管理专栏 -->
			<section class="modules-sec">
				<p class="title">业务管理</p>
				<div class="modules">
					<div class="module" v-for="data in businessList" @click="gotoModule(data.path)">
						<i class="icon icon-small" :class="data.icon"><i class="icon-red" v-if="data.unread_count">{{data.unread_count}}</i></i>
						<span>{{data.module_name}}</span>
					</div>
				</div>
			</section>
		</div>
		<cs-footer></cs-footer>
	</div>
</template>

<script>
	import csHeader from 'mycomponents/Header.vue'
	import csFooter from 'mycomponents/Footer.vue'
	import Homejson from 'models/home'
	import Toast from 'components/toast/index.js'
	export default {
		name: "Home",
		data() {
			return {
				messageList: [],
				businessList: []
			}
		},
		components: {
			csHeader,
			csFooter
		},
		methods: {
			// 进行HTTP数据请求
			getData(isQuiet, cb) {
				// 如果isQuiet为true ，就会在后台偷偷摸摸运行，而不会显示loading图
				this.api.User.UserPermissions_UserModule(isQuiet).then(Result => {
					cb && cb(Result.Data);
				})
			},
			gotoModule2: function(url) {
				// return Toast("该功能正在开发中...")
				this.$router.push(url)
			},
			// 跳转路由
			gotoModule: function(url) {
				this.$router.push(url)
			},
			// 冒泡排序法
			bubbleSort(arr, key) {
				for(var i = 0; i < arr.length - 1; i++) {
					for(var j = 0; j < arr.length - 1 - i; j++) {
						// 注意，这里比较的是两个对象的值
						if(arr[j][key] > arr[j + 1][key]) {
							let temp = arr[j];
							arr[j] = arr[j + 1];
							arr[j + 1] = temp;
						}
					};
				};
				return arr;
			},
			// 根据类型设置数据
			setList(Data) {
				// 清空数据
				this.messageList = []
				this.businessList = []
				// 进行排序
				let SortData = this.bubbleSort(Data, 'seq');
				// 遍历数据，并且根据不同的数据合并不同的模型.之后存放在不同的状态数组中
				for(let [index, v] of SortData.entries()) {
					// 当is_menu 为 1 时，说明这条数据是业务数据
					if(v.is_menu) {
						this.businessList.push(Object.assign(v, Homejson[v.module_id]));
						// 当is_menu 为 0 时，说明是【消息中心】或者【通知中心】
					} else {
						this.messageList.push(Object.assign(v, Homejson[v.module_id]));
					}
				}
			}
		},
		/**
		开发故事：
		Home页面作为使用率和访问频率最高的页面。却因为必须由动态数据来渲染导致每次都需要进行HTTP请求。十分耗费网络资源。
		更别提每次请求时还自带loading闪烁。如果在手机端更是明显不爽。
		为了解决这个问题。显然需要使用缓存 + 偷偷摸摸请求数据对比渲染
		*/
		beforeMount() {
			// 获取缓存
			let store = this.$localStorage.get(`HomeData`)
			// 如果有缓存存在，就使用缓存数据
			if(store != null && store != "" && store != "null") {
				// 那么就继续使用缓存  
				this.setList(JSON.parse(store))
				// 虽然已经有缓存了。但我在后台偷偷摸摸的请求数据，然后对比更新,参数1为true时，不会显示loading图
				this.getData(true, data => {
					// 如果偷偷摸摸请求得来的数据和缓存的数据不一致
					if(store !== JSON.stringify(data)) {
						// 如果发现数据不一致，立刻使用新数据
						this.setList(data)
						// 并且加入缓存
						this.$localStorage.set(`HomeData`, JSON.stringify(data))
					}
				})
			} else {
				// 缓存不存在，立刻请求HTTP数据,参数1为false时，会显示loading图
				this.getData(false, data => {
					// 进行排序
					this.setList(data)
					// 添加到缓存
					this.$localStorage.set(`HomeData`, JSON.stringify(data))
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../sass/variables";
	@import "../sass/func";
	.centers-sec {
		padding: pxToRem(80px) 0 pxToRem(45px);
		border-bottom: 1px solid $border-color;
		@include bg();
		ul {
			display: flex;
			justify-content: space-around;
			@include pxToPx(font-size, 24);
			color: #fff;
			li {
				span {
					display: block;
					text-align: center;
					padding-top: pxToRem(18px);
				}
			}
		}
	}
	
	.modules-sec {
		margin-bottom: pxToRem(120px);

		.title {
			padding: pxToRem(34px) pxToRem(40px);
			@include pxToPx(font-size, 28);
			color: #999;
			background: #eee;
		}
		.modules {
			@include clearfix;
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			background: #fff;
			.module {
				position: relative;
				background: #fff;
				width: 33.1%;
				border-right: 1px solid #eee;
				border-bottom: 1px solid #eee;
				height: pxToRem(260px);
				box-sizing: border-box;
				padding: pxToRem(70px) 0px;
				overflow: hidden;
				span {
					display: block;
					text-align: center;
					padding-top: pxToRem(24px);
					width: 100%;
					position: relative;
					color: #666;
					@include pxToPx(font-size, 24);
				}
				&:nth-child(3n) {
					flex: auto;
				}
			}
		}
	}
	
	.icon {
		position: relative;
		margin: auto;
		.icon-red {
			$size:45px;
	        min-width:pxToRem($size);
	        height:pxToRem($size);
			position: absolute;
			right: pxToRem(-30px);
			top: pxToRem(-30px);
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffba00;
			border-radius: 100%;
			color: #fff;
			padding: pxToRem(10px);
			box-sizing: border-box;
			@include pxToPx(font-size, 20);
		}
	}
	
	.icon-big {
		display: block;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		width: pxToRem(70px);
		height: pxToRem(70px);
	}
	
	.icon-small {
		@extend .icon-big;
		width: pxToRem(50px);
		height: pxToRem(50px);
	}
	/* 消息中心 */
	
	.icon-msg {
		background-image: url(../images/home/icon-msg.png);
	}
	/* 通知中心 */
	
	.icon-notice {
		background-image: url(../images/home/icon-notice.png);
	}
	/* 操作指引 */
	
	.icon-lead {
		background-image: url(../images/home/icon-lead.png);
	}
	/* 扫码业务 */
	
	.icon-smyw {
		background-image: url(../images/home/icon-smyw.png);
	}
	/* 房速贷 */
	
	.icon-fsd {
		background-image: url(../images/home/icon-fsd.png);
	}
	/* 车易贷 */
	
	.icon-cyd {
		background-image: url(../images/home/icon-cyd.png);
	}
	/* 业务审批 */
	
	.icon-ywsp {
		background-image: url(../images/home/icon-ywsp.png);
	}
	/* 应收调整 */
	
	.icon-ystz {
		background-image: url(../images/home/icon-ystz.png);
	}
	/* 出款审批 */
	
	.icon-cksp {
		background-image: url(../images/home/icon-cksp.png);
	}
	/* 台帐管理 */
	
	.icon-tzgl {
		background-image: url(../images/home/icon-tzgl.png);
	}
	/* 代扣查询 */
	
	.icon-dkcx {
		background-image: url(../images/home/icon-dkcx.png);
	}
	/* 展期审批 */
	
	.icon-zqsp {
		background-image: url(../images/home/icon-zqsp.png);
	}
	/** 房速贷派件管理 **/
	
	.icon-pjgl {
		background-image: url(../images/home/icon-pjgl.png);
	}
</style>