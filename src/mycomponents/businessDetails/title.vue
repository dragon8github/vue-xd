<template>
  <div id="BusinessDetails_title">
      <div class="container_item_title" @click="slideupList">
            <span>{{ this.title }}</span>
            <i class="icon" v-if="count">{{ count }}</i>
            <i class="sprite-icon-detail-arrow-down" :class="{rotate180 : rotate}"></i>
      </div>
      <div class="container_item_list" v-show="toggle">
            <slot name="list"></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'details_title',
  data () {
    return {
      rotate: false,
      toggle: false,
    }
  },
  props:['title', 'count'],
  methods: {
    slideupList () {
        this.rotate = !this.rotate;
        this.toggle = !this.toggle; 
    }
  }
};
</script>

<style lang="scss">
  @import "./../../sass/variables";
  @import "./../../sass/func";
#BusinessDetails_title {
		background: #EBEBEB;
		
    .icon {
        $size:40px;
        width:pxToRem($size);
        height:pxToRem($size);
        right: pxToRem(100px);
				text-align:center;
        position: absolute;
        line-height:pxToRem($size);
        background-color:#2DA5FF;
        border-radius:100%;
        top:50%;
        transform: translateY(-50%);
        color:#fff;
        @include pxToPx(font-size, 16);
        box-sizing: border-box;
    }
     .mint-cell {
        background: transparent;
        
	     .mint-cell-title {
      	    max-width: 85%;
	      }
     }

     .container_item_list {
        overflow:hidden;
        background: #ebebeb;
     }

     .container_item_title {
 	        position:relative;
          display: flex;
          justify-content:space-between;
          align-items: center;
          font-size: pxToRem(32px);
          height:pxToRem(87px);
          background: #fff;
          text-align: center;
          clear: both;
          z-index: 1;
          padding-left:pxToRem(30px);

          &:after {
             @include border('bottom', #d9d9d9);
          }
       
          .circle {
              width: pxToRem(15px);
              height: pxToRem(15px);
              border-radius: pxToRem(10px);
              display: inline-block;
              transform: translateX(pxToRem(50px));
          }

          .sprite-icon-detail-arrow-down {
              background-image: url(./../../images/arrow-down-light.png);
              background-repeat: no-repeat;
              background-size: pxToRem(36px) pxToRem(36px);
              background-position: 95% 50%;
              background-color: transparent;
              height: pxToRem(35px * 2);
              width: pxToRem(40px);
              transform: translateX(pxToRem(-40px));

              &.rotate180 {
                  transform: translateX(-0.53333rem) rotate(180deg);
              }
          }
          
          
    }
    .container_item_list_children {
        margin: pxToRem(55px);
    }
    .mint-cell-wrapper {
        font-size:pxToRem(28px);
        
        .mint-field-core {
            background: transparent;
            color:#999;
        }
        
        &:after {
          	 @include border('bottom', #ccc);
        }
    }
}
</style>