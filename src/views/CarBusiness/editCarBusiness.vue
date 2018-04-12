<template>
    <div id="editCarBusiness">
        <bsnheader :headerTitle="'车易贷'" :has-back="true"></bsnheader>
        <panel :Top="false" :Bottom="false">
            <div class="page-field" v-if="model" slot="body">
                <div class="page-part">
                    <mt-field label="合同编号：" v-model="model.business_id" :readonly='true'></mt-field>
    
                    <div class="unread">
                        <mt-field label="申请金额：" v-model="model.apply_money" :readonly='true'></mt-field>
                        <mt-field label="车牌号：" v-model="model.license_plate_number" :readonly='true'></mt-field>
                        <mt-field label="车身颜色：" v-model="model.car_body_color" :readonly='true'></mt-field>
                        <mt-field label="汽车型号：" v-model="model.car_model_number" :readonly='true'></mt-field>
                        <mt-field label="评估金额：" v-model="model.car_evaluate_money" :readonly='true'></mt-field>
                    </div>
    
                    <mt-field label="车辆价值" @change='carEvaluateMoney()' v-model="model.car_money" placeholder="请输入车辆价值" type="number"></mt-field>
                    <mt-field label="其他价值" @change='carEvaluateMoney()' v-model="model.othervalue" placeholder="请输入其他价值" type="number"></mt-field>
    
    
                    <mt-field label="汽车品牌：" v-model="model.car_brand" placeholder="请输入汽车品牌" type="text"></mt-field>
                    <mt-field label="车型及版本配置：" v-model="model.other_facade_explain" placeholder="请输入车型及版本配置" type="text"></mt-field>
                    <mt-field label="排量：" v-model="model.displacement" placeholder="请输入排量" type="text"></mt-field>
                    <mt-field label="过户次数：" v-model="model.transfer_times" placeholder="请输入过户次数" type="number"></mt-field>
    
                    <mt-field label="排放标准：" type="other">
                        <div class="radioStandards">
                            <div class="btn" :class="{active : model.emission_standards == 1 || !model.emission_standards}" @click="model.emission_standards = 1">国Ⅳ</div>
                            <div class="btn" :class="{active : model.emission_standards == 2}" @click="model.emission_standards = 2">国Ⅴ</div>
                        </div>
                    </mt-field>
    
                    <mt-field label="汽车产地：" type="other">
                        <div class="radioOrigin">
                            <div class="btn" :class="{active : model.car_origin == 0 || !model.car_origin}" @click="model.car_origin = 0">国产</div>
                            <div class="btn" :class="{active : model.car_origin == 1}" @click="model.car_origin = 1">进口</div>
                        </div>
                    </mt-field>
    
                    <mt-field label="车辆属地：" v-model="model.car_place" placeholder="请输入车辆属地" type="text"></mt-field>
                    <mt-field label="里程表读数：" v-model="model.odometer_readings" placeholder="请输入里程表读数" type="number"></mt-field>
                    <mt-field label="违章费用：" v-model="model.car_violations" placeholder="请输入违章费用" type="number"></mt-field>
                </div>
                <div class="page-button-group" @click="save">提交</div>
            </div>
        </panel>
    
    </div>
</template>

<script>
// header组件
import bsnheader from 'mycomponents/Header.vue'

//Toast组件
import Toast from 'components/toast/index.js'

// mtField组件
import mtField from 'components/field/field.vue';

// messagebox组件
import msg from 'components/messagebox/messagebox.js'

// panel组件
import panel from 'mycomponents/common/panel.vue'

export default {
    name: 'editCarBusiness',
    data () {
        return {
            // 汽车排量标准：【国Ⅳ 1】 【国V 2】
            radioStandards: 2,
            // 汽车产地：【0国产】 【1进口】
            radioOrigin: 1,
            // 核心数据源
            model: {},
            // 核心参数
            audit: {}
        }
    },
    components: {
        bsnheader,
        Toast,
        mtField,
        panel
    },
    methods: {
        save () {
            /* 如果默认汽车产地为null，那么将它设置为国产 */
            if (!this.model.car_origin) this.model.car_origin = 0

            /* 如果默认汽车排量为null，那么将它设置为国Ⅳ */
            if (!this.model.emission_standards) this.model.emission_standards = 1

            /* 验证评审金额 */
            if (!this.model.car_evaluate_money || this.model.car_evaluate_money.toString().trim() === '') return Toast('评估金额不能为空！');
            if (Math.sign(this.model.car_evaluate_money) !== 1) return Toast('评估金额不能小于或等于0！');
            if (!this.model.car_money || this.model.car_money.toString().trim() === '') return Toast('车辆价值不能为空！');
            if (Math.sign(this.model.car_money) !== 1) return Toast('车辆价值不能小于或等于0！');

            /* 验证汽车品牌 */
            if (!this.model.car_brand || this.model.car_brand.trim() === '') return Toast('汽车品牌不能为空！');

            /* 验证车型及版本配置 */
            if (!this.model.other_facade_explain || this.model.other_facade_explain.trim() === '') return Toast('车型及版本配置不能为空！');

            /* 验证汽车排量 */
            if (!this.model.displacement || this.model.displacement.trim() === '') return Toast('汽车排量不能为空！');
            if ( this.model.displacement.length >= 8 ) return Toast('汽车排量不得超过8位！');
        
            /* 验证过户次数 */
            if (!this.model.car_place || this.model.car_place.trim() === '') return Toast('过户次数不能为空！');
            if (!/^[0-9]+$/.test(this.model.transfer_times)) return Toast('请正确填写过户次数！');
            if (+this.model.transfer_times >= 100)  return Toast('过户次数不得大于100！');

            /* 验证排放标准 */
            if (this.model.emission_standards !== 1 && this.model.emission_standards !== 2) return Toast('请选择排放标准');

            /* 验证汽车场地 */
            if (this.model.car_origin !== 0 && this.model.car_origin !== 1) return Toast('请选择汽车产地');

            /* 验证汽车属地 */
            if (!this.model.car_place || this.model.car_place.trim() === '') return Toast('车辆属地不能为空！');

            /* 验证里程表读数 */
            if (Math.sign(this.model.odometer_readings) !== 1) return Toast('里程表读数必须大于0，请检查！');
            if (this.model.odometer_readings.length > 8 ) return Toast('里程表读数不得大于8位');

            /* 验证违章费用 */
            if (!this.model.car_violations || !/^[0-9]+.?[0-9]*$/.test(this.model.car_violations.trim())) return Toast('请正确填写违章费用！')
            if (this.model.car_violations.length > 8 ) return Toast('违章费用不得大于8位');


            /* 提交表单 */
            this.api.MyBusiness.MyBusiness_SaveCarEvaluationInfo({
                "Model": this.model,
                "Audit": this.audit
            }).then(data => {
                if (data.ReturnCode == 1) this.$router.push(this.$store.getters.siteMap)
                return Toast(data.ReturnMessage);
            });
        },

        carEvaluateMoney () {
            let car_money = parseFloat(this.model.car_money);
            if (isNaN(car_money)) car_money = 0;

            let othervalue = parseFloat(this.model.othervalue);
            if (isNaN(othervalue)) othervalue = 0;

            this.model.car_evaluate_money = othervalue + car_money;
        }
    },

    beforeMount () {
        this.api.MyBusiness.MyBusiness_GetCarEvaluationInfo({
            "business_id": this.$route.params.business_id,
            "approve_id": this.$route.params.approve_id,
            "flow_business_type": this.$route.params.flow_business_type,
            "after_id": this.$route.params.after_id
        }).then(data => {
            if (data.ReturnCode == 1) {
                this.model = data.Data.Model;
                this.audit = data.Data.Audit;
                if (this.model && this.model.car_evaluate_money == 0) this.model.car_evaluate_money = null
            } else {
                // 如果订单不存在，弹出后端提示 然后返回到列表页
                msg.alert(data.ReturnMessage).then(_ => {
                    this.$router.push(this.$store.getters.siteMap)
                })
            }
        });
    }
}
</script>

<style lang="scss">
@import "./../../sass/variables";
@import "./../../sass/func";
@import "./../../sass/form";
    
#editCarBusiness {
    padding-top: pxToRem(86px);
    .radioStandards,
    .radioOrigin {
        display: flex;
        justify-content: flex-end;
        width: pxToRem(300px);
        &>.btn {
            border: 1px solid #2DA5FF;
            color: #2DA5FF;
            background-color: transparent;
            width: 48%;
            border-radius: 10px;
            width: pxToRem(100px);
            height: pxToRem(58px);
            line-height: pxToRem(58px);
            margin-left: pxToRem(30px);
            text-align: center;
            &.active {
                background: #2DA5FF;
                color: #fff;
            }
        }
    }

    .unread {
        .mint-cell-text {
            color: #999;
        }
    }
}
</style>