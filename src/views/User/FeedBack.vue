<template>
<div class="page" id="feedbackView">
  <cs-header :header-title="appTitle" :has-back="hasBack"></cs-header> 
   <div class="content" >
    <ul class="inputCont">
      
       <li>
        <div>
          <textarea :placeholder="placeholder" v-model="content"></textarea>
        </div>
      </li>
    </ul>
    <div class="btns">
      <div @click="commitChange();"><i class="btn-yel btn-commit">提交</i></div>
    </div>
 
  </div>

</div>
 
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
import Toast from 'components/toast/index.js'
export default {
  data () {
    return {
      appTitle: '用户反馈',
      hasBack: true,
      placeholder: '请详细描述你的问题或建议，我们将及时跟进与解决',
      content: ''
    }
  },
  components: {
    csHeader
  },
  methods: {
    commitChange: function () {
      let vm = this
      if (!vm.content || vm.content.trim().length === 0) return Toast('请输入您的问题或建议')
      let commitData = {FeedbackContent: vm.content}
      let params = {
        'UserId': 'A6F28BA9C3BDA307',
        'Data': JSON.stringify(commitData),
        'MethodName': 'user_feedback'
      }
    },
    reset: function () {
      this.oldpsd = ''
      this.newpsd = ''
      this.repeatpsd = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../sass/variables";
  @import "./../../sass/func";
  #feedbackView .inputCont {
    width: 100%;
    margin-top: pxToRem(60px);
    box-sizing: border-box;

    li {
      width: 100%;
      height: pxToRem(270px);
      line-height: pxToRem(270px);
      box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid $border-color;
      font-size: pxToRem(32px);
      display: flex;

      & > div:first-child {
        width: 22%;
        height: 100%;
      }

      & > div:last-child {
        width: 100%;
        height: 100%;
      }
    }

    & > li:nth-child(2) {
      margin-top: pxToRem(20px);
    }

    & > li:not(:last-child) {
      border-top: 1px solid $border-color;
    }

    textarea {
      width: 100%;
      height: pxToRem(270px);
      box-sizing: border-box;
      border: 0;
      resize: none;
      padding: 0 pxToRem(20px);
      font-size: pxToRem(32px);
    }
    textarea.errtip::-webkit-input-placeholder {
      color: red;
    }
  }

  #feedbackView .btns {
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: pxToRem(40px);

    & > div {
      width: 100%;
    }

    .btn-yel {
      width: 100%;
      height: pxToRem(80px);
      line-height: pxToRem(80px);
      border-radius: 5px;
      color: #fff;
      background-color: #2DA5FF;
      text-align: center;
      @include pxToPx(font-size, 34);
      margin: auto;
      display: inline-block;
    }
  }
  
</style>
