<template>
	<div id="noticeDetails" v-if="myData">
		<cs-header :header-title="'通知中心'" :has-back="true"></cs-header>
		<panel :Top="false" :Bottom="false">
			<div slot="body">
				<div class="notice-top">
					<p>{{ myData['notice_title'] }}</p>
					<p>{{ myData['create_time'] | timeYMD }}</p>
				</div>
				<div class="notice-body" v-html="myData['notice_content']"></div>
				<div class="notice-body" v-if="false"> 
					<p v-if="files.length > 0">
						附件列表：
					</p>
					<a class="notice-body-file" v-for="(o, index) in files" :href="o.file_url">{{ o.file_name }}</a>
				</div>
			</div>
		</panel>
	</div>
</template>

<script>
	// header组件
	import csHeader from 'mycomponents/Header.vue'
	// panel组件
	import panel from 'mycomponents/common/panel.vue'

	export default {
		name: 'noticeDetails',
		components: {
			csHeader,
			panel
		},
		data () {
			return {
				myData: null,
				title: "通知详情",
				files: []
			};
		},
		beforeMount() {
			this.api.Notice.Notice_Get(this.$route.params.id).then(result => {
				this.myData = result.Data['Notice']
				this.files = result.Data.Files;
			})
		}
	};
</script>

<style lang="scss">
	@import "./../../sass/variables";
	@import "./../../sass/func";
	#noticeDetails {
		padding-top: pxToRem(86px);
		
		
		.page-loadmore-wrapper {
			background: #fff;
		}
		
		.notice-top {
			border-bottom: 1px solid #d9d9d9;
			height: pxToRem(143px);
			margin: 0 pxToRem(30px);
			padding: 0 pxToRem(20px);
			display: flex;
			flex-direction: column;
			justify-content: center;
			p:first-child {
				font-size: pxToRem(28px);
				color: #000;
				margin-top: pxToRem(30px);
				margin-bottom: pxToRem(20px);
				word-break: break-all;
			}
			p:last-child {
				color: #999;
				font-size: pxToRem(24px);
				margin-bottom: pxToRem(30px);
			}
		}
		.notice-body {
			padding: pxToRem(30px) pxToRem(60px);
			color: #000 !important;
			line-height: pxToRem(44px) !important;
			font-size: pxToRem(28px) !important;
			background: transparent !important;
			word-break: break-all;
			* {
				font-size: inherit !important;
			}
			
			img {
				width:100%;
			}
		}
	}
</style>