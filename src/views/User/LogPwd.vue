<template>
  <div class="page">
    <cs-header :header-title="'修改密码'" :has-back="true"></cs-header> 
    <div class="content" >
        <ul class="inputcont">
            <li>
                <div>旧密码</div>
                <div><input type="password" placeholder='原登录密码' v-model="oldpsd" maxlength="20" /></div>
            </li>
             <li>
                <div>新密码</div>
                <div><input type="password" placeholder='含字母、数字或特殊字符的8-20个字符' v-model="newpsd" maxlength="20" /></div>
            </li>
             <li>
                <div>确认密码</div>
                <div><input type="password" placeholder='再次输入新密码' v-model="repeatpsd" maxlength="20" /></div>
            </li>
        </ul>
        <div class="btns">
           <div @click="commitChange();"><i class="btn-yel btn-commit">提交</i></div>
           <div @click="reset();"><i class="btn-yel btn-reset">清空</i></div>
        </div>
    </div>
  </div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
import Toast from 'components/toast/index.js'
import msg from 'components/messagebox/messagebox.js'
export default {
  data () {
    return {
      oldpsd: '',
      newpsd: '',
      repeatpsd: ''
    }
  },
  components: {
      csHeader
  },
  methods: {
    commitChange () {
        let vm = this
        if (vm.oldpsd.trim().length === 0)  return Toast('原登录密码不能为空！')
        if (vm.newpsd.trim().length === 0) return Toast('新密码不能为空！')
        if (vm.newpsd !== vm.repeatpsd) return Toast('两次输入的密码不一致！')
        if (/^(?:\d+|[a-zA-Z]+|[~!@#\$%\^&*()_\-\+=\{\}\[\]|\\''`:?\/>\.<,]+)$/.test(vm.newpsd) || vm.newpsd.trim().length < 8 || vm.newpsd.trim().length > 20) {
          return Toast('请输入8-16位，由字母、数字、特殊字符至少两项组成的密码')
        }
        this.api.User.User_ChangePassword({
            OldPassword: vm.oldpsd.replace(/\"/g,'\\"'),
            NewPassword: vm.newpsd.replace(/\"/g,'\\"'),
            ConfirmPassword: vm.repeatpsd.replace(/\"/g,'\\"')
        }).then(data => {
            // 修改密码错误，输出错误信息
            if (data.ReturnCode != 1) return Toast(data.ReturnMessage)
            // 修改密码正确，弹出提示信息并且跳转到首页去
            msg.alert(data.ReturnMessage).then(() => { 
              this.reset(); 
              this.$router.push('/home') }
            );
        })
    },
    reset () {
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

  .inputcont {
    width: 100%;
    margin-top: pxToRem(20px);
    box-sizing: border-box;

    li {
      display: flex;
      width: 100%;
      height: pxToRem(90px);
      line-height: pxToRem(90px);
      box-sizing: border-box;
      background-color: #fff;
      border-bottom: 1px solid $border-color;
      padding: 0 pxToRem(20px);
      font-size: pxToRem(32px);
    
      
      & > div:first-child {
        width: 22%;
        height: 100%;
      }

      & > div:last-child {
        width: 78%;
        height: 100%;
      }
    }

    & > li:nth-child(2) {
      margin-top: pxToRem(20px);
    }

    & > li:not(:last-child) {
      border-top: 1px solid $border-color;
    }

    input {
      width: 100%;
      height: pxToRem(80px);
      box-sizing: border-box;
      border: 0;
      font-size: pxToRem(32px);
    }

    input.errtip::-webkit-input-placeholder {
        color: red;
    }
  }

  .btns {
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: pxToRem(40px);

    & > div {
      width: 50%;
    }

    .btn-yel {
      width: pxToRem(300px);
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
