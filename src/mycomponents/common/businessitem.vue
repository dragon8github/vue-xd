<template>
		<li class="listviewItem">
			<i class="sprite-icon-manage" :class="iconShow(data.business_type_name || data.business_type)"></i>
			<div class="busitem" @click="gotoDetails(data.business_type_name||data.business_type, data.business_id)">

				<div class="row">
					<div class="left-warp">
						<a class="username">{{data.name|| data.customer_name}}</a>
						<span :class="fsdFormat(data.business_type_name || data.business_type)" class="fsd"></span>
					</div>
					<div class="right-warp">
						<a class="business_id">{{data.business_id}}</a>
					</div>
				</div>

				<div class="row flex">
					<div class="left-warp">
						<span class="num-span">
                            {{ data.apply_money == null ? 0.00:data.apply_money  }}
                        </span>元
						<span class="num-span">
                            {{ data.apply_time_limit_ex == null ? '0个月':data.apply_time_limit_ex | monthFormat }}
                        </span>个月
					</div>
					<div class="right-warp" v-if="_isBtn">
						<div v-if="_isEditable" class="btn btn-white" @click.stop="goToEdit(data.business_id,data.approve_id,data.flow_business_type,data.after_id)">编 辑</div>
						<div v-if="_isApproval" class="btn btn-blue" @click.stop="goToApproval(data.business_id,data.approve_id,data.flow_business_type,data.after_id)">审 批</div>
						<div v-if="_isCanUndo" class="btn btn-blue" @click.stop="goToCanel(data.business_id,data.approve_id,data.flow_business_type,data.after_id)">撤 销</div>
					</div>
				</div>
				<div class="row flex">
					<div class="left-warp">
						<span class="text-span">{{ data.original_name }}</span> （{{data.business_location}}）
					</div>
					<div class="right-warp">
						<i class="circle circle-blue"></i>
						<span class="text-span">{{data.business_status_name}}</span>
					</div>
				</div>
			</div>
		</li>
</template>

<script>
	// Toast 组件
	import Toast from 'components/toast/index.js'

	export default {
		name: 'businessitem',
		props: {
			// 数据源
			data: {
				type: Object,
				default: []
			},
			// 当前item的索引
			_index: {
				type: Number
			},
			// 是否显示按钮群
			_isBtn: {
				type: Boolean,
				default: true
			},
			// 是否显示【编辑】按钮
			_isEditable: {
				type: Boolean,
				default: false
			},
			// 是否显示【审批】按钮
			_isApproval: {
				type: Boolean,
				default: false
			},
			// 是否显示【撤销】按钮
			_isCanUndo: {
				type: Boolean,
				default: false
			},
			// 撤销按钮的回调函数
			_Canel: {
				type: Function
			},
			// 审批按钮的回调函数
			_Approval: {
				type: Function
			},
			// 需要编辑的页面类型 CarGps:0 CarEvaluate:1
			_EditPageType: {
				type: Number,
				default: 1
			}
		},
		methods: {
			// 跳转到订单详情
			gotoDetails(businessType, id) {
				console.log(businessType, id)
				// 根据不同的type，跳转到不同的详情中去
				if(this.isCarBusiness(businessType)) {
					this.$router.push(`/CarBusinessDetails/id/${id}`)
				} else {
					this.$router.push(`/HouseBusinessDetails/id/${id}`)
				}
			},
			// 跳转到审批页面
			goToApproval(business_id, approve_id, flow_business_type, after_id) {
				this._Approval && this._Approval(business_id, approve_id, flow_business_type, after_id)
			},
			// 撤销审批
			goToCanel(business_id, approve_id, flow_business_type, after_id) {
				this._Canel && this._Canel(business_id, approve_id, flow_business_type, after_id, this._index)
			},
			// 跳转到编辑页
			goToEdit(business_id, approve_id, flow_business_type, after_id) {
				if(this._EditPageType == 1) {
					this.$router.push(`/editCarBusiness/${business_id}/${approve_id}/${flow_business_type}/${after_id}`)
				} else if(this._EditPageType == 0) {
					this.$router.push(`/gpsEdit/${business_id}/${approve_id}/${flow_business_type}/${after_id}`)
				}
			},
			// 根据业务类型显示icon
			iconShow(businessTypeName) {
				return this.isCarBusiness(businessTypeName) ? 'car' : 'house'
			},
			// 判断车易贷还是房易贷
			isCarBusiness(businessTypeName) {
				return businessTypeName != null && businessTypeName.indexOf("车") >= 0
			},
			// 判断房速贷类型
			fsdFormat(str) {
				switch(str) {
					case '房速贷标准件':
						return 'span-am';
					case '房速贷非标准件':
						return 'span-mistake';
					default:
						return '';
				}
			}
		},
		filters: {
			monthFormat(month) {
				var length = month.length,
					num = month.substring(0, month.length - 2);
				return num;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../sass/list";
</style>