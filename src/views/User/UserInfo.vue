<template>
  <div class='page'>
     <cs-header :header-title="'我'" :has-back='true'></cs-header> 
     <div class='content usercont' >
      <div class='topcont'>
        <div class='avatcont'>
          <img :src='baseData.AvatarPath'>
        </div>
        <span class='namecont'>{{baseData.UserName}}</span>
        <span class='apatcont'>{{baseData.DeptName}}</span>
      </div>
      <ul class='basiccont'>
        <li>
          <div class='iconcont'><i class='itemicon icon-tel' ></i></div>
          <div class='txt'>{{baseData.PhoneNumber}}</div>
          <div>
            <i class='icon-arrow'></i>
          </div>
        </li>
        <li>
          <div class='iconcont'><i class='itemicon icon-mail' ></i></div>
          <div class='txt'>{{baseData.EmailAddr}}</div>
          <div> <i class='icon-arrow'></i> </div> 
        </li>
        <li v-if="baseData.qq">
          <div class='iconcont'><i class='itemicon icon-qq'></i></div>
          <div class='txt'>{{baseData.qq}}</div>
          <div> <i class='icon-arrow'></i> </div> 
        </li>
        <li v-if="baseData.MyBigQrCodeUrl" @click="goToQrCode">
          <div class='iconcont'><i class='itemicon icon-QrCode'></i></div>
          <div class='txt'>我的二维码</div>
          <div> <i class='icon-arrow'></i> </div> 
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
import csFooter from 'mycomponents/Footer.vue'
import messagebox from 'components/messagebox/messagebox'
export default {
  data () {
    return {
      baseData: {
        AvatarPath: '',
        UserName: '',
        DeptName: '',
        PhoneNumber: '',
        EmailAddr: '',
        qq: '',
        MyBigQrCodeUrl:'',
        MyQrCodeUrl:''
      }
    }
  },
  methods: {
    goToQrCode () {
      this.$router.push('/user/userinfo/myqrcode')
    }
  },
  components: {
    csHeader,
    csFooter
  },
  created () {
    this.$store.dispatch('setUserinfo', (data) => {
      this.baseData = data
    })
  }
}
</script>


<style lang='scss' scoped>
  @import './../../sass/variables';
  @import './../../sass/func';
  .usercont {
    overflow: hidden !important;
  }

  .topcont {
    width: 100%;
    height: pxToRem(342px);
    text-align: center;
    @include pxToPx(font-size, 28);
    @include bg();
  }
  .avatcont {
  img {
    width: pxToRem(180px);
    height: pxToRem(180px);
    display: inline-block;
    margin: auto;
    border-radius: pxToRem(180px);
    margin-top: pxToRem(40px);
  }
 }
  .namecont {
     display: inline-block;
     width: 100%;
     text-align: center;
     margin-top: pxToRem(24px);
     color: #fff;
     font-size:pxToRem(32px);
  }
 .apatcont {
    width: 100%;
    margin-top: pxToRem(15px);
    display: inline-block;
    color:#fff;
    font-size:pxToRem(26px);
    opacity:0.6;
  }



 .basiccont {
    width: 100%;
    background-color: #fff;
    @include pxToPx(font-size,34);
    color: #333;

    li {
      width: 100%;
      min-height: pxToRem(120px);
      display: flex;
      position: relative;
      
      &:after {
      	 @include border('bottom', #d9d9d9);
      	 left:pxToRem(30px);
      }

      .iconcont {
        display:flex;
        justify-content: center;
        align-items: center;
      }

      .txt {
        padding: pxToRem(43px) 0;
        width: pxToRem(590px);
        overflow-wrap: break-word;
        font-size:pxToRem(32px);
        color:#333;
      }
    }


   .icon-arrow {
      width: pxToRem(20px);
      height: pxToRem(34px);
      display: inline-block;
      background-image: url('../../images/icon_arrow.png');
      background-size: cover;
      position: absolute;
      right: pxToRem(38px);
      top: 50%;
      margin-top: pxToRem(-17px);
    }

    .itemicon {
      width: pxToRem(48px);
      height: pxToRem(48px);
      background-size: contain;
      display: inline-block;
      margin: 0 pxToRem(30px);
      background-repeat: no-repeat;
    }
    .icon-tel {
      background-image: url('../../images/icon_tel.png');
    }
    .icon-mail {
      background-image: url('../../images/icon_mail.png');
    }
    .icon-qq {
      background-image: url('../../images/icon_qq.png');
    }
    .icon-QrCode {
      background-image: url('../../images/QrCode.png');
    }
    .icon-setting {
      background-image: url('../../images/setting.png');
    }
 }
 .exeit {
    margin-top: pxToRem(20px);
    width: 100%;
    height: pxToRem(120px);
    line-height: pxToRem(120px);
    text-align: center;
    @include pxToPx(font-size, 34);
    color: #fb6041;
    background-color: #fff;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
 }
</style>
