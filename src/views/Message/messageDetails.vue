<template>
	<div id="messageDetails">
		 <cs-header :header-title="'消息中心详情'" :has-back="true"></cs-header> 
		 <div class="message-top">
				<p>业务单号TDF6012017031501已通过片区风控专员审核</p>
				<p>2017-03-12 10:00:00</p>
		 </div>
		<section class="message-body">
			您客户<font color="#2DA5FF">王源</font>的房速贷申请业务<font color="#2DA5FF">TDF6012017031501</font>已通过<font color="#2DA5FF">风控专员</font>审核，请耐心等待！
		</section>
		<h1 class="message-h1">消息流程如下：</h1>
		<div class="message-main">
				<div class="message-process" v-for="n in 3">
					<div class="message-table-div">
						<div class="message-table" data-content="2017-03-12 10:00:00">
							<div>流程状态：<span>业务接洽</span></div>
							<div><span>沉静（达州分公司）</span></div>
							<div>流程意见：业务接洽（PC）</div>
							<i></i>
						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'

export default {

  name: 'messageDetails',
	components: {
	  csHeader
	},
  data () {
    return {
    	myData : null
    };
  },
  beforeMount () {
  	this.api.Notification.PushNotification_GetBusinessAuditProcessList(this.$route.params.id).then(result => {
  		console.log(result)
  	})
  }
};
</script>

<style lang="scss" scoped>
@import "./../../sass/variables";
@import "./../../sass/func";
#messageDetails {
	padding-top:pxToRem(86px);
	font-size:pxToRem(30px);
  background: #eee;

	.message-top {
    height:pxToRem(170px);
    padding:0 pxToRem(30px);
    display:flex;
    flex-direction: column;
    justify-content: center;
    background: #fff;

	 	p:first-child { 
      font-size:pxToRem(28px);
      color:#000;
      margin-bottom:pxToRem(20px);
      text-indent: pxToRem(60px);
      line-height: pxToRem(44px);
    }

    p:last-child {
      color:#999;
      font-size:pxToRem(24px);
    }
	}

	.message-body {
		padding:pxToRem(30px);
 		line-height: pxToRem(44px);
 		height:pxToRem(160px);
 		text-indent: pxToRem(60px);
    box-sizing: border-box;
		font-size:pxToRem(28px);
		color:#000;

		& > .keyword {
			color:#2DA5FF;
		}
	}
	.message-h1 {
			margin-bottom:pxToRem(30px);
			padding-left:pxToRem(35px)
	}
	.message-process {
		&:after {
			content:"";
		    // background:url("./../../images/arrow-down-dark.png") no-repeat center;
		    // background-size:contain;
		    text-align:center;
		    height:pxToRem(88px);
		    width:100%; 
		    display:block;
		    margin:pxToRem(20px) auto
		}
	}

	.message-main {
		position: relative;

		&::before {
			width:1px;
			height:100%;
			content:" ";
			left:pxToRem(25px);
			background: #c7c7c7;
			position: absolute;
			top:0;
		}
	}

	.message-table-div {
		position: relative;
		width:pxToRem(613px);
		margin:auto;
		

		&::before {
				content:" ";
				width:pxToRem(30px);
				height:pxToRem(30px);
				background: #fff;
				position: absolute;
				left: pxToRem(-15px);
   		 	top: pxToRem(35px);
				z-index:1;
				transform: rotate(45deg);
				border-left:1px solid #ccc;
				border-bottom:1px solid #ccc;
		}
	}

	.message-table {
		position: relative;
    background: #fff;
		border:1px solid #ccc;
		padding:0 pxToRem(30px);
		box-sizing: border-box;
		border-radius: 5px;
		// z-index:1;

		&::after {
			content: attr(data-content);
      width: 100%;
      text-align: right;
			position: absolute;
	    @include pxToPx('bottom',-40)
			right: 0;
			color:#999;
			font-size:pxToRem(20px);
		}

		

		i {
			width:pxToRem(20px);
			height:pxToRem(20px);
			background: #2DA5FF;
			border-radius: 100%;
			position: absolute;
	    left: pxToRem(-54px);
    	top: pxToRem(34px);
		}

		& > div {
			width:100%;
			border-bottom:1px solid #ccc;
			margin-top:pxToRem(30px);
			padding-bottom:pxToRem(30px);
		  
		}

		& > div:last-child {
			border:0;
		}
	}
}
</style>