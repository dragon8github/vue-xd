<template>
<div v-if="syncDataCount === 0">
  <div class="container_item">
     <mtitle :title="'车辆基本情况'">
          <div slot="list">
              <mt-field label="车主"              :value = "myData['car_personal']['name']"                     :readonly = 'true'></mt-field>
              <mt-field label="车身颜色"          :value = "myData['car_info']['car_body_color']"               :readonly = 'true'></mt-field>
              <mt-field label="车牌号"            :value = "myData['car_info']['license_plate_number']"         :readonly = 'true'></mt-field>
              <mt-field label="汽车品牌"          :value = "myData['car_info']['car_brand']"                    :readonly = 'true'></mt-field>
              <mt-field label="品牌型号"          :value = "myData['car_info']['car_model_number']"             :readonly = 'true'></mt-field>
              <mt-field label="车型及版本配置"    :value = "myData['car_info']['other_facade_explain']"         :readonly = 'true'></mt-field>
              <mt-field label="过户次数"          :value = "myData['car_info']['transfer_times']"               :readonly = 'true'></mt-field>
              <mt-field label="汽车产地"          :value = "myData['car_origin']"                               :readonly = 'true'></mt-field>
              <mt-field label="车辆属地"          :value = "myData['car_info']['car_place']"                    :readonly = 'true'></mt-field>
              <mt-field label="排放标准"          :value = "myData['car_info']['emission_standards_cn']"        :readonly = 'true'></mt-field>
              <mt-field label="车架号"            :value = "myData['car_info']['chassis_number']"               :readonly = 'true'></mt-field>
              <mt-field label="发动机号"          :value = "myData['car_info']['engine_number']"                :readonly = 'true'></mt-field>
              <mt-field label="违章情况"          :value = "myData['car_info']['illegal_situation']"            :readonly = 'true'></mt-field>
              <mt-field label="发票价/新车指导价" :value = "myData['car_info']['invoice_cost'] | appendMoneyUnitIfNotNullOrEmpty"    :readonly = 'true'></mt-field>
              <mt-field label="保险到期日 "       :value = "myData['car_info']['insurance_due_date'] | timeYMD"                      :readonly = 'true'></mt-field>
              <mt-field label="车船税费用"        :value = "myData['car_info']['travel_tax'] | appendMoneyUnitIfNotNullOrEmpty"      :readonly = 'true'></mt-field>
              <mt-field label="统缴费用 "         :value = "myData['car_info']['unified_payment'] | appendMoneyUnitIfNotNullOrEmpty" :readonly = 'true'></mt-field>
              <mt-field label="排量"              :value = "myData['car_info']['displacement']"                 :readonly = 'true'></mt-field>
              <mt-field label="核对行驶资料"      :value = "myData['car_info']['drive_information']"            :readonly = 'true'></mt-field>
              <mt-field label="保险期内是否续保"  :value = "myData['car_info']['is_renewal_ever']"              :readonly = 'true'></mt-field>
              <mt-field label="燃油形式"          :value = "myData['car_info']['fqt_fuel_type']"                :readonly = 'true'></mt-field>
              <mt-field label="保险受益人"        :value = "myData['car_info']['insurance_beneficiary']"        :readonly = 'true'></mt-field>
              <mt-field label="汽车注册日期"      :value = "myData['car_info']['car_register_date'] | timeYMD"  :readonly = 'true'></mt-field>
              <mt-field label="年审到期日"        :value = "myData['car_info']['annual_due_date'] | timeYMD"    :readonly = 'true'></mt-field>
              <mt-field label="汽车抵押状况"      :value = "myData['car_info']['car_mortgage_status']"          :readonly = 'true'></mt-field>
              <mt-field label="GPS型号"           :value = "myData['gps_info']"                                 :readonly = 'true'></mt-field>
              <mt-field label="总费用"            :value = "myData['car_info']['car_all_cost'] | appendMoneyUnitIfNotNullOrEmpty" :readonly = 'true'></mt-field>
              <mt-field label="车辆保险公司"      :value = "myData['car_info']['insurance_company'] != '其他' ? myData['car_info']['insurance_company'] : myData['car_info']['other_insurance_company']"        :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

  <div class="container_item">
    <mtitle :title="'车辆外观情况'">
        <div slot="list">
            <mt-field label="里程表读数"        :value = "myData['car_info']['odometer_readings']"   :readonly = 'true'></mt-field>
            <mt-field label="燃油量（约余）"    :value = "myData['car_info']['fqt_fuel_quantity']"   :readonly = 'true'></mt-field>
            <mt-field label="中控台"            :value = "myData['car_info']['center_console']"      :readonly = 'true'></mt-field>
            <mt-field label="空调"              :value = "myData['car_info']['air_condition']"       :readonly = 'true'></mt-field>
            <mt-field label="车厢内饰"          :value = "myData['car_info']['car_interior']"        :readonly = 'true'></mt-field>
            <mt-field label="玻璃"              :value = "myData['car_info']['car_glass']"           :readonly = 'true'></mt-field>
            <mt-field label="水箱"              :value = "myData['car_info']['water_tank']"          :readonly = 'true'></mt-field>
            <mt-field label="发动机"            :value = "myData['car_info']['engine']"              :readonly = 'true'></mt-field>
            <mt-field label="车大梁"            :value = "myData['car_info']['car_girder']"          :readonly = 'true'></mt-field>
            <mt-field label="轮胎"              :value = "myData['car_info']['car_tyre']"            :readonly = 'true'></mt-field>
            <mt-field label="备用胎"            :value = "myData['car_info']['car_spare_tire']"      :readonly = 'true'></mt-field>
            <mt-field label="车门"              :value = "myData['car_info']['car_door']"            :readonly = 'true'></mt-field>
            <mt-field label="变速箱"            :value = "myData['car_info']['car_transmission']"    :readonly = 'true'></mt-field>
        </div>
    </mtitle>
  </div>

  <div class="container_item">
      <mtitle :title="'车辆行驶情况'">
          <div slot="list">
              <mt-field label="评估金额"      :value = "myData['car_info']['car_evaluate_money'] | appendMoneyUnitIfNotNullOrEmpty" :readonly = 'true'></mt-field>
              <mt-field label="使用权转移价"  :value = "myData['car_info']['borrowing_money'] | appendMoneyUnitIfNotNullOrEmpty"    :readonly = 'true'></mt-field>
              <mt-field label="动力性能"      :value = "myData['car_info']['power_performance']"         :readonly = 'true'></mt-field>
              <mt-field label="刹车性能"      :value = "myData['car_info']['brake_performance']"         :readonly = 'true'></mt-field>
              <mt-field label="刹车平衡性能"  :value = "myData['car_info']['brake_balance_performance']" :readonly = 'true'></mt-field>
              <mt-field label="方向性能"      :value = "myData['car_info']['direction_performance']"     :readonly = 'true'></mt-field>
              <mt-field label="挂挡性能"      :value = "myData['car_info']['gear_performance']"          :readonly = 'true'></mt-field>
              <mt-field label="其他情况说明"  :value = "myData['car_info']['other_drive_explain']"       :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>


  <div class="container_item">
      <mtitle :title="'现场核查'">
          <div slot="list">
              <mt-field label="车辆勘察"              :value = "myData['car_info_approve']['car_examine']"                    :readonly = 'true'></mt-field>
              <mt-field label="车架号是否一致"        :value = "myData['car_info_approve']['is_conformity_chassis_number']"   :readonly = 'true'></mt-field>
              <mt-field label="发动机号是否一致"      :value = "myData['car_info_approve']['is_conformity_engine_number']"    :readonly = 'true'></mt-field>
              <mt-field label="是否有事故痕迹"        :value = "myData['car_info_approve']['is_car_accident']"                :readonly = 'true'></mt-field>
              <mt-field label="是否有其他问题"        :value = "myData['car_info_approve']['is_other_trouble']"               :readonly = 'true'></mt-field>
              <mt-field label="车辆状况描述"          :value = "myData['car_info_approve']['other_trouble_explain']"          :readonly = 'true'></mt-field>
              <mt-field label="事故说明"              :value = "myData['car_info_approve']['injury_location_remark']"         :readonly = 'true'></mt-field>
              <mt-field label="有无大修"              :value = "myData['big_repair'] | booleanToCnString"                     :readonly = 'true'></mt-field>
              <mt-field label="备用钥匙是否确认可用"  :value = "myData['car_info_approve']['is_confirm_car_backup_key']"      :readonly = 'true'></mt-field>
          </div>
      </mtitle>
  </div>

</div>
</template>

<script>

// field组件
import mtField from 'components/field/field.vue'

// 详情组件
import mtitle from 'mycomponents/businessDetails/title.vue'

export default {
  name: 'businesscell',
  data () {
    return {
      myData: {},
      syncDataCount: 2
    }
  },
  components:{
    mtField,
    mtitle
  },
  methods: {
    merge (Result) {
      Object.assign(this.myData, Result.Data)
      this.syncDataCount--
    }
  },
  beforeMount () {
    let id = this.$route.params.id
    this.api.CarBusiness.CarBusinessApi_GetCarInfoDetail(id).then(this.merge)
    this.api.CarBusiness.CarBusinessApi_CarBusinessApproval(id).then(this.merge)
  }
};
</script>
