<template>
	<div id="swiperheader">
		<div v-if="userInfo">
			<mt-field label="合同编号" :value="businessId" :readonly='true'></mt-field>
			<mt-field label="客户姓名" :value="userInfo.customer_name || userInfo.name" :readonly='true'></mt-field>
			<mt-field label="手机号码" :value="userInfo.phone_number|| userInfo.mobile_phone" :readonly='true'></mt-field>
		</div>
		<div class="swiper-div">
			<!-- index为当前索引的标志 -->
			<swiper :options="swiperOption" :index="swiperAction" ref="swiperRef">
				<!-- 渲染出头部菜单 -->
				<swiper-slide v-for="(item, index) in swpierList" :key="index"  :title="item.title" :clickMethod="MenuListClick(item.title,item.path)"></swiper-slide>
				<!-- 占位符作用 -->
				<swiper-slide>&nbsp&nbsp&nbsp&nbsp</swiper-slide>
			</swiper>

			<!-- 通过showList来控制true/false 进而控制高度来达到收展的效果 -->
			<div class="show-swiper-list" :class="{rotate180 : showList}" @click="showList = !showList"></div>
			<!-- 通过showList来控制true/false 进而控制高度来达到收展的效果 -->
			<div class="showList" :style="showList ? 'height:auto' : 'height:0;'">
				<!-- 渲染出便捷菜单,clickMethod为点击事件 -->
				<mt-cell v-for="(item,index) in swpierList" :key="index"  :title="item.title" :clickMethod="MenuListClick(item.title,item.path)" is-link></mt-cell>
			</div>
		</div>
	</div>
</template>

<script>
	// cell组件
	import mtCell from 'components/cell/cell.vue'

	// swiper组件
	import { swiper, swiperSlide } from 'components/swiper'

	// mtField组件
	import mtField from 'components/field/field.vue';

	export default {
		name: 'swiperheader',
		data() {
			return {
				// swiper组件的配置
				swiperOption: {
					slidesPerView: 'auto', // 'auto' 让每个slide的大小自适应
					freeModeMomentumVelocityRatio: 0.7, // free模式惯性速度，设置越大，释放后滑得越快。
					freeMode: true
				},
				// 菜单列表开关
				showList: false,
				businessId: this.$route.params.id
			};
		},
		components: {
			swiper,
			swiperSlide,
			mtCell,
			mtField
		},
		props: {
			swiperAction: {
				type: String,
				default: ""
			},
			swpierList: {
				type: Array,
				default: []
			},
			userInfo: {
				type: Object
			}
		},
		methods: {
			// 接受三个参数，第一个参数为标题，第二个参数为索引，第三个参数为即将前往的路由
			MenuListClick(title, to) {
				return function() {
					for(var ele of document.querySelectorAll(".container_item_list")) {
						ele.style.height = 0
					}
					// 关闭快捷菜单
					this.showList = false
					// 路由跳转
					this.$router.push(to)
				}.bind(this)
			},
			changeSwiperAction() {
				this.$nextTick(() => {
					for(let [index, elem] of this.swpierList.entries()) {
						if(elem.title === this.swiperAction) return this.$refs.swiperRef.swiper.slideTo(index, 300, false)
					}
				})
			},
			showSearch () {
				console.log(123)
			}
		},
		watch: {
			// 监听title的变化，一旦变化就滑向（swiper）对应的索引中去
			swiperAction(curVal, oldVal) {
				this.changeSwiperAction()
			}
		},
		mounted () {
			this.changeSwiperAction()
		}
	};
</script>

<style lang="scss" scoped>
	@import "./../../sass/variables";
	@import "./../../sass/func";
	.swiper-div {
		position: relative;
		margin: pxToRem(20px) 0;
		width: pxToRem(690px);
		.is-select {
			background: #2DA5FF;
			border-radius: 5px;
			color: #fff !important;
		}
		.show-swiper-list {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
			width: pxToRem(100px);
			box-shadow: -19px 0 25px #d3d4d6;
			box-sizing: border-box;
			height: pxToRem(60px);
			background: #eae7e7 url("./../../images/arrow-down-dark.png") no-repeat center center;
		}
		.showList {
			overflow: hidden;
			transition: .35s ease height;
			position: absolute;
			width: 100%;
			z-index: 2;
			background: #fff;
			width: pxToRem(690px);
		}
		.rotate180 {
			box-shadow: 18px 0 25px #d3d4d6 !important;
			transform: rotate(180deg);
		}
		.swiper-container {
			overflow: hidden;
			/* 必须配合这个css属性来使用 */
			background: #fdfdfc;
			
			&:after {
				@include border('bottom', #d9d9d9);
			}
			
			.swiper-wrapper {
				.swiper-slide {
					font-size: pxToRem(30px);
					padding: 0 pxToRem(30px);
					text-align: center;
					width: auto;
					height: pxToRem(60px);
					line-height: pxToRem(60px);
					font-size: pxToRem(32px);
					color: #999;
				}
			}
		}
	}
</style>