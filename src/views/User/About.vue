<template>
<div>
	<cs-header :header-title="appTitle" :has-back="hasBack"></cs-header> 
	<div class="about-content">
		<div class="about-header">
			<span class="about-icon" id="entry"></span>
			<span class="about-version">V {{ version }}</span>
		</div>
		<div class="about-text">
		信贷中心app
		</div>
	</div>
</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'

export default {
	data () {
		return {
			appTitle: '关于',
			hasBack: true,
			version:'2.0.0'
		}
	},
	components: {
			csHeader
	},
	mounted () {
		// 从store中获取版本信息
		let version = this.$store.getters.AppData.Version
		// 如果版本信息存在则使用
		if (version) this.version = version
	}
}
</script>

<style lang="scss" scoped>
	@import "./../../sass/variables";
	@import "./../../sass/func";

	.icon-base {
		display: block;
		background-size:contain;
		background-repeat:no-repeat;
		background-position:center;
		margin: auto;
	}

	.icon-small {
		@extend .icon-base;
		width:pxToRem(132px);
		height: pxToRem(132px);
	}

	.about-content {
		padding-top: pxToRem(140px);
	}

	.about-header {
		margin-bottom: pxToRem(30px);

		.about-icon {
	    	@extend .icon-small;
			background-image:url(../../images/home/icon_smyw.png);
		}

		.about-version {
			@include pxToPx(font-size,24);
			text-align: center;
	    	margin: auto;
	    	display: block;
	    	margin-top: pxToRem(20px);
		}
	}
	.about-text {
		@include pxToPx(font-size,28);
		text-align: center;
	}
</style>