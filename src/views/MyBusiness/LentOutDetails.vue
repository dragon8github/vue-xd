<template>
	<div id="LentOutDetails">
		<!-- 头部 -->
		<bsnheader :headerTitle="'出款详情页'" :has-back='true'>
			<a slot="expandHeader" @click="transition">业务详情</a>
		</bsnheader>
		<!-- 之所以要使用panel，是因为正常是scroll-y会导致渲染问题。非常难看。算是hack吧 -->
		<panel :Top="false" :Bottom="false">
			<div slot="body">
				<div id="_LentOutDetails">
					<!-- 头部swiper -->
					<swiperheader :swiperAction="swiperAction" :swpierList="swpierList" :userInfo="userInfo"></swiperheader>
					<!-- 子路由 -->
					<!-- <keep-alive> -->
					<router-view></router-view>
					<!-- </keep-alive> -->
				</div>
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

	import Toast from 'components/toast/index.js';

	export default {
		name: 'LentOutDetail',
		data() {
			return {
				// 菜单列表
				swpierList: [{
						title: "基本信息",
						path: "baseInfo"
					},
					{
						title: "计划出款",
						path: "planOutMoney"
					},
					{
						title: "备注",
						path: "remark"
					},
					{
						title: "银行卡信息",
						path: "bankInformation"
					}
				],
				userInfo: {},
				business_type: '房'
			}
		},
		computed: {
			swiperAction() {
				// 获取当前完整路由
				let path = this.$route.path
				// 获取核心参数
				path = path.substring(path.lastIndexOf('/') + 1)
				// 遍历自定义的列表。从中匹配到当前的索引
				for(let [index, ele] of this.swpierList.entries()) {
					// 如果找到对应的path属性，则赋值索引并且中断循环
					if(ele.path === path) return ele.title
				}
				// 如果遍历没有则返回空，有一种情况会让swiperAction为空，就是当path其实是afterId的时候。
				return ""
			}
		},
		components: {
			bsnheader,
			swiperheader,
			panel
		},
		methods: {
			transition() {
				if(this.business_type === '房') {
					this.$router.push(`/houseBusinessDetails/id/${this.$route.params.id}`);
				} else {
					this.$router.push(`/CarBusinessDetails/id/${this.$route.params.id}`);
				}
			}
		},
		beforeMount() {
			// 获取当前详情的用户信息
			this.api.Common.CommonApi_LentOutDetail(this.$route.params.id).then(result => {
				if(result.ReturnCode === 1) {

					let resultData = result.Data["lent_out_detail"];

					// 设置用户基本信息
					this.userInfo = {
						customer_name: resultData['output_info']['CUSTOMER_NAME'],
						phone_number: result.Data['phone_number'],
					}

					// 业务需求：房速贷业务有合同信息
					if(resultData['business_type'].indexOf('房') > -1) {
						this.business_type = '房'
						this.swpierList.push({
							title: '合同信息',
							path: 'contractInformation'
						});
					} else {
						this.business_type = '车'
					}

					// (核心)将数据放入vuex中，LentOutDetailPages中的子路由页面都使用该数据渲染界面
					this.$store.dispatch('setLenOutDatailData', result.Data);

				} else {
					Toast(result.ReturnMessage);
				}
			});
		}
	}
</script>

<style lang="scss">
	@import "./../../sass/variables";
	@import "./../../sass/func";
	#_LentOutDetails {
		padding-top: pxToRem(116px);
		margin: 0 pxToRem(30px);
	}
	
	#LentOutDetails {
		.mint-loadmore {
			overflow: visible !important;
		}
	}
</style>