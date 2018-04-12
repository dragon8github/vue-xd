<template>
	<div id="actionAgainAssign">
		<bsnheader :headerTitle="'派件管理'" :has-back="true"></bsnheader>
		<panel :Top="false" :Bottom="false">
			<div class="page-field" slot="body">
				<div class="page-part">
					<mt-field label="原审批中心：" v-model="old_audit_center" :readonly='true'></mt-field>
					<mt-field label="新审批中心：" :star="true" type="other">
						<select v-model="audit_center" @change="auditCenterChange()">
							<option v-for='v in audit_center_arr' :value='v.Value'>
								{{v.Text}}
							</option>
						</select>
					</mt-field>
					<mt-field label="业务审批小组：" :star="true" type="other">
						<select v-model="assign_group">
							<option v-for='v in assign_group_arr' :value='v.Value'>
								{{v.Text}}
							</option>
						</select>
					</mt-field>
				</div>
				<div class="page-button-group" @click="save()">提交</div>
			</div>
		</panel>
	</div>
</template>

<script>
	// header组件
	import bsnheader from 'mycomponents/Header.vue'

	//Toast组件
	import Toast from 'components/toast/index.js'

	// mtField组件
	import mtField from 'components/field/field.vue';

	// messagebox组件
	import msg from 'components/messagebox/messagebox.js'

	// panel组件
	import panel from 'mycomponents/common/panel.vue'

	export default {
		name: 'actionAgainAssign',
		data() {
			return {
				old_audit_center: '',
				audit_center_arr: [],
				assign_group_arr: [],
				assign_group: '',
				audit_center: ''
			}
		},
		components: {
			bsnheader,
			Toast,
			mtField,
			panel
		},
		methods: {
			auditCenterChange() {
				this.api.HouseBusiness.HouseBusinessApi_GetDeptList({
					audit_center: this.audit_center,
					business_type: this.$route.params.businessType
				}).then(result => {
					if(result.ReturnCode === 1) {
						this.assign_group_arr = result.Data;
						if(this.assign_group_arr.length > 0) this.assign_group = this.assign_group_arr[0].Value
					} else {
						Tost(result.ReturnMessage);
					}
				});
			},
			save() {
				if(this.audit_center.trim() === '') {
					return Toast('请选择新审批中心!');
				}

				if(this.assign_group.trim() === '') {
					return Toast('请选择审批小组!');
				}

				this.api.HouseBusiness.HouseBusinessApi_SaveAgainAssign({
					business_id: this.$route.params.businessid,
					audit_center: this.audit_center,
					assign_group: this.assign_group
				}).then(result => {
					Toast(result.Data);
					if(result.ReturnCode === 1) {
						this.$router.push(this.$store.getters.siteMap)
					}
				});
			}
		},
		beforeMount() {
			this.api.HouseBusiness.HouseBusinessApi_AgainAssign({
				business_id: this.$route.params.businessid,
				business_type: this.$route.params.businessType
			}).then(data => {
				if(data.ReturnCode === 1) {
					let result = data.Data;
					this.old_audit_center = result.old_audit_center;
					this.audit_center_arr = result.audit_center;
					this.assign_group_arr = result.assign_group;
				} else {
					Toast(data.ReturnMessage);
				}
			});
		}
	}
</script>

<style lang="scss">
	@import "./../../sass/variables";
	@import "./../../sass/func";
	@import "./../../sass/form";
	#actionAgainAssign {
		padding-top: pxToRem(86px);
		.radioStandards,
		.radioOrigin {
			display: flex;
			justify-content: flex-end;
			width: pxToRem(300px);
			&>.btn {
				border: 1px solid #2DA5FF;
				color: #2DA5FF;
				background-color: transparent;
				width: 48%;
				border-radius: 10px;
				width: pxToRem(100px);
				height: pxToRem(58px);
				line-height: pxToRem(58px);
				margin-left: pxToRem(30px);
				text-align: center;
				&.active {
					background: #2DA5FF;
					color: #fff;
				}
			}
		}
		.unread {
			.mint-cell-text {
				color: #999;
			}
		}
	}
</style>