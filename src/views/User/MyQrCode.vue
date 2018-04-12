<template>
  <div class='page'>
     <cs-header :header-title="'我的二维码'" :has-back='true'></cs-header> 
     <div class="qrcode_warp">
        <img :src='BigQrCode === true ? $store.getters.userinfo.MyBigQrCodeUrl : $store.getters.userinfo.MyQrCodeUrl' 
             @click='sheetVisible = true'  
             :class="{allHeight : BigQrCode}"
              width='100%'/>
     </div>
     <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
// Header 组件
import csHeader from 'mycomponents/Header.vue'

// Actionsheet 组件
import mtActionsheet from 'components/actionsheet/actionsheet.vue'

// Toast 组件
import Toast from 'components/toast/index.js'

// loader 组件
import Loader from 'components/loader/index.js'

export default {
  data () {
    return {
      BigQrCode: true,
      actions: [{name: '换个样式', method: this.takePhoto }, {name: '保存到手机', method: this.openAlbum}],
      sheetVisible: false
    }
  },
  components: {
      csHeader,
      mtActionsheet
  },
  methods: {
    takePhoto () {
       this.BigQrCode = !this.BigQrCode
    },
    openAlbum () {
       // 获取当前的图片
       let url = this.BigQrCode === true ? this.$store.getters.userinfo.MyBigQrCodeUrl : this.$store.getters.userinfo.MyQrCodeUrl
       // 由于操作是异步的，所以开启一下loader
       Loader.show()
       // 调用保存插件
       this.Bridge.exec('SaveImg', (response) => {
           // 保存成功，关闭loader。
           Loader.hide()
           // 弹出提示
           Toast('保存成功，请查看你的相册')
       }, (err) => {
           // 保存失败，关闭loader。
           Loader.hide()
           // 弹出提示
           Toast('保存失败，请尝试手动截屏')
       }, url)
    }
  }
}
</script>


<style lang='scss' scoped>
  @import './../../sass/variables';
  @import './../../sass/func';
  
  .qrcode_warp{
      padding-top:pxToRem(86px);
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      box-sizing: border-box;
  }

  .allHeight {
     height: 100%;
  }
</style>
