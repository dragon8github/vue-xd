<template>
  <div id="gpsEdit">
      <bsnheader :headerTitle="'GPS编辑'" :has-back="true"></bsnheader>
      <ul class="gpsEdit_list" v-if="Model">
          <li v-for="(item, index) in Model">
              <div class="container_item_title" @click="slideupList(index)">
                    <span>{{ item.gps_type }}</span>
                    <i class="sprite-icon-detail-arrow-down" :class="{rotate180 : Model[index]['rotate']}"></i>
              </div>
              <div class="container_item_list" v-show="Model[index]['toggle']">
                   <div>
                     <span>新</span>
                     <select v-model="Model[index]['new_gps_count']">
                        <option value="null" disabled>点击选择GPS数量</option>
                        <option v-for="v in num_list"> {{ v }} </option>
                     </select>
                   </div>
                   <div>
                     <span>旧</span>
                     <select v-model="Model[index]['old_gps_count']">
                        <option value="null" disabled>点击选择GPS数量</option>
                        <option v-for="v in num_list"> {{ v }} </option>
                     </select>
                   </div>
              </div>
          </li>
      </ul>
      <div class="page-button-group" @click="saveData"> 保存 </div> 
  </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Header.vue'

// messagebox组件
import msg from 'components/messagebox/messagebox.js'

export default {
  name: 'gpsEdit',

  components: {
      bsnheader
  },
  data () {
    return {
      num_list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      Model: [],
      Audit: {}
    }
  },
  methods: {
    slideupList (index) {
        this.Model[index].rotate= !this.Model[index].rotate
        this.Model[index].toggle = !this.Model[index].toggle
        
        /**
         * 由于this.Model是对象数组，当其中一个对象变化的时候，vue不能监听到的，所以视图也不会刷新
         * this.$set 这个方法主要用于避开  Vue 不能检测属性更新的限制。
         * 但这个方法的使用需要注意几点:
         * - 我是对数组中的某个值（这个值是个对象）,直接重新赋值的。
         * 如果我这里直接对数组的某个对象中的某个属性赋值，那是不行的。
         * https://cn.vuejs.org/v2/api/#Vue-set
         * http://www.cnblogs.com/zhuzhenwei918/p/6893496.html
         * */
        this.$set(this.Model, index, this.Model[index])
    },
    saveData () {
    	// 检查是否所有选项都为Null，既没有进行任何选择。这时候提示用户需要选择才能保存
    	if (!this.checkNull()) {
	      this.api.MyBusiness.MyBusiness_SaveGpsInfo({
	        Model: this.Model,
	        Audit: this.Audit
	      }).then(data => {
	          // 如果订单不存在，弹出后端提示 然后返回到列表页
	          msg.alert(data.ReturnMessage).then(_ => {
	              if (data.ReturnCode == 1) this.$router.push(this.$store.getters.siteMap)
	          })
	      });
      } else {
      	 msg.alert('请选择GPS个数')
      }
    },
    checkNull () {
    	 // 默认假设所有都为null，既没有选
    	 let isAllNull = true;
    	 for (let v of this.Model.values()) {
    	 	  // 根据业务的说法，只需要一个不为null即可通过验证
    	 		if (v.new_gps_count != null || v.old_gps_count != null) isAllNull = false;
    	 }
    	 return isAllNull;
    }
  },
  beforeMount () {
    this.api.MyBusiness.MyBusiness_GetGpsInfo({
        "business_id": this.$route.params.business_id,
        "approve_id": this.$route.params.approve_id,
        "flow_business_type": this.$route.params.flow_business_type,
        "after_id": this.$route.params.after_id
    }).then(data => {
        if (data.ReturnCode == 1) {
            this.Audit = data.Data.Audit;
            this.Model = data.Data.Model;

            this.Model[0].rotate = true;
            this.Model[0].toggle = true;

            for (let i = 1; i < this.Model.length - 1; i++) {
              this.Model[i].rotate = false;
              this.Model[i].toggle = false;   
              
              // 修复Android时间兼容性问题
              this.Model[i].create_time = this.timeYMD(this.Model[i].create_time)
              this.Model[i].update_time = this.timeYMD(this.Model[i].update_time)
            }
        }
    });
  }
}
</script>

<style lang="scss">
  @import "./../../sass/variables";
  @import "./../../sass/func";

  #gpsEdit {
       padding-top: pxToRem(86px);

        .gpsEdit_list {
            background:  #fff;

            li {
              position: relative;

              &:after {
                @include border('bottom', #d9d9d9);
              }
            }
        }

       .container_item_list {
          height: pxToRem(88px);
          overflow:hidden;
          background: #fff;
          display:flex;
          align-items: center;
          justify-content: space-between;

          div {
            flex:1;
            display: flex;
            align-items: center;
          }

          span {
             margin:0 pxToRem(30px);
             font-size:pxToRem(28px);
          }

          select {
            color: #2DA5FF;
            border: 0;
            font-size:pxToRem(28px);
          }
       }

       .container_item_title {
            display: flex;
            justify-content:space-between;
            align-items: center;
            font-size: pxToRem(32px);
            height:pxToRem(87px);
            background: #fff;
            text-align: center;
            clear: both;
            padding-left:pxToRem(30px);

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

      .page-button-group {
        margin-top:pxToRem(50px);
        background:url('../../images/BarBusiness_button.png') no-repeat;
        height:pxToRem(89px);
        line-height:pxToRem(89px);
        background-size: 100%;
        text-align: center;
        color:#fff;
        font-size:pxToRem(40px);
        margin: pxToRem(50px);
      }
  }
</style>