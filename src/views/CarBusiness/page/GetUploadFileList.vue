<template>
	<div v-if="myData">
		<div v-for="(data, index) in myData" :key="index"  v-if="data.data_list" class="container_item">
			<!-- 获取某一栏的总数  -->
			<mtitle :title="data.name" :count="parentCountList[data.name] && parentCountList[data.name].Count">
				<div slot="list">
					<!-- 渲染出便捷菜单,clickMethod为点击事件 -->
					<mt-cell is-link v-for="(list, index) in data.data_list" :key="index"  :title="list.PARA_VALUE.trim()" :clickMethod="MenuListClick(data.name, list.PARA_VALUE.trim())">
						<i class="icon-uploadCount" v-if="parentCountList[data.name] && parentCountList[data.name][list.PARA_VALUE.trim()]">
							{{ parentCountList[data.name] && parentCountList[data.name][list.PARA_VALUE.trim()] }}
						</i>
					</mt-cell>
				</div>
			</mtitle>
		</div>
	</div>
</template>

<script>
	// cell组件
	import mtCell from 'components/cell/cell.vue'

	// field组件
	import mtField from 'components/field/field.vue'

	// Toast组件
	import Toast from 'components/toast/index.js'

	// 详情组件
	import mtitle from 'mycomponents/businessDetails/title.vue'

	export default {
		name: 'businesscell',
		data() {
			return {
				myData: null,
				parentCountList: {},
				childCountList: {}
			}
		},
		components: {
			mtField,
			mtitle,
			mtCell
		},
		methods: {
			/**
			 * @click method
			 * @desc - 点击进入源生相册界面
			 * @param {string} parent - 父栏目
			 * @param {string} child - 子栏目
			 * fileBusinessType： 车易贷 => 1 房速贷 => 2
			 * http://oatest.bujidele.com:8010/ApiDoc/Help/ResourceModel?modelName=BmPostedFileBusinessType
			 * */
			MenuListClick(parent, child) {
				return function() {
					this.Bridge.exec('UploadImg', (data) => {}, (err) => {}, {
						fileBusinessType: 1,
						docType: parent,
						businessId: this.$route.params.id,
						docName: child
					})
				}
			},
			/**
			 * @func
			 * @desc - 更新栏目的总数
			 * @param {number} Count - 数量
			 * @param {string} parent - 父栏目的名称
			 * @param {string} child - 子栏目的名称 
			 **/
			updateImgCount(currCount, parent, child) {
				// 获取子栏目之前的数量
				let beforeChildCount = this.parentCountList[parent][child]

				// 获取子栏目差集
				let n = currCount - (beforeChildCount || 0)

				// 更新父栏目的值
				this.parentCountList[parent].Count += n

				// 更新子栏目的值
				this.parentCountList[parent][child] = currCount
			},
			/**
			 * 加载主要数据
			 * */
			loadData(cb) {
				this.api.Common.CommonApi_GetUploadFileList(this.$route.params.id).then(result => {
					cb && cb(result)
				})
			},
			/**
			 * 加载数量大于0的子文档的数量
			 * */
			loadDocCount(cb) {
				this.api.Common.CommonApi_GetDocCountList(this.$route.params.id).then(result => {
					cb && cb(result)
				})
			},
			/**
			 * 通过传入两个数据集，让其相互融合产生我需要的数据集
			 * */
			fusion (docList) {
				// 遍历顶级栏目
				for (let v of this.myData) {
					let parentName = v.name
					let parnetCount = 0
					
					// 如果父标签还不存在，那么创建父标签
					if (this.parentCountList[parentName] == null) { 
						this.$set(this.parentCountList, parentName, {
							Count: 0
						})
					}
					
					// 如果有子栏目
					if (v.data_list) {						
						// 遍历子栏目
						for(let k of v.data_list) {	
							let childName = k.PARA_VALUE.trim()
							let childCount = 0		
							
							// TODO： 待优化
							for (let item of docList.values()) {
								if (childName == item.doc_name && item.doc_type == parentName) {
									childCount = item.doc_count	
									break
								}
							}		
							
							// 设置子栏目的总数
							this.parentCountList[parentName][childName] = childCount								
							// 累加
							parnetCount += childCount
						}
					}						
					// 设置父栏目的总数
					this.parentCountList[parentName].Count = parnetCount
				}
				// 不明白的同学打印一下就知道是什么意思了
				console.log(this.parentCountList);
			}
		},
		computed: {
			uploadInfo() {
				return this.$store.getters.uploadInfo;
			}
		},
		watch: {
			uploadInfo(val) {
				// 这里有个不能解释的坑，this.$store.getters.uploadInfo明明应该是object类型，通过watch获取后居然变成string类型了？
				// 以防万一还是在这里加个逻辑判断，需要的时候则进行JSON.parse
				let json = typeof val === 'object' ? val : JSON.parse(val)
				// != null 可以检测 undefined 和 null
				if(json.Count != null) this.updateImgCount(json.Count, json.docType, json.docName);
			}
		},
		beforeMount () {
			// 获取所有栏目
			this.api.Common.CommonApi_GetUploadFileList(this.$route.params.id).then(result => {
				// 设置核心数据
				this.myData = result.Data.data_group
				
				// 获取栏目中的图片数量
				this.api.Common.CommonApi_GetDocCountList(this.$route.params.id).then(doc => {
					//获取对应的上传文件配置所上传的文件数
					this.fusion(doc.Data)
				});
			});
		}
	};
</script>

<style lang="scss" scoped>
	@import "../../../sass/variables";
	@import "../../../sass/func";
	.lookUpload {
		color: #72ACE3;
	}
	
	.icon-uploadCount {
		$size: 40px;
		width: pxToRem($size);
		height: pxToRem($size);
		right: pxToRem(70px);
		position: absolute;
		line-height: pxToRem($size);
		background-color: #2DA5FF;
		border-radius: 100%;
		top: 50%;
		text-align: center;
		transform: translateY(-50%);
		color: #fff;
		@include pxToPx(font-size, 16);
		box-sizing: border-box;
	}
</style>