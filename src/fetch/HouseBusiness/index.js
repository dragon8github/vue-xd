import ajax from '../handleFetch.js'

/**
 * core methods
 * 房速贷数据管理数据获取(HouseBusinessApi_GetHouseBusinessList)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseBusinessList = (where, isQuiet) => {
    return ajax.postData('', {
        "Data": `{
          "business_id": "${where.business_id}",
    		  "cust_name": "${where.cust_name}",
    		  "page_index": "${where.page_index}",
              "business_type":"${where.business_type}"
      }`,
        "MethodName": "HouseBusinessApi_GetHouseBusinessList"
    }, isQuiet);
}

/**
 * core methods
 * 获取房速贷客户信息(HouseBusinessApi_GetHouseCustomerInfo)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseCustomerInfo = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseCustomerInfo"
    });
}


/**
 * core methods
 * 获取房速贷贷款申请信息(HouseBusinessApi_GetHouseDetails)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseDetails = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseDetails"
    });
}


/**
 * core methods
 * 获取房速贷房产情况(HouseBusinessApi_GetHouseInfo)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseInfo = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseInfo"
    });
}

/**
 * core methods
 * 获取房速贷征信信息(HouseBusinessApi_GetHouseCredit)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseCredit = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseCredit"
    });
}

/**
 * core methods
 * 获取房速贷事件调查信息(HouseBusinessApi_GetHouseInspect)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseInspect = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseInspect"
    });
}

/**
 * core methods
 * 获取房速贷担保措施信息(HouseBusinessApi_GetHouseAssure)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseAssure = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseAssure"
    });
}

/**
 * core methods
 * 获取房速贷财产清单信息(HouseBusinessApi_GetHouseTenure)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseTenure = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseTenure"
    });
}



/**
 * core methods
 * 获取房贷审批意见信息(HouseBusinessApi_GetHouseBusinessApproval)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseBusinessApproval = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseBusinessApproval"
    });
}



/**
 * core methods
 * 获取房贷防范措施信息(HouseBusinessApi_GetHouseApproveMeasure)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const HouseBusinessApi_GetHouseApproveMeasure = (orderid) => {
    return ajax.postData('', {
        "Data": orderid,
        "MethodName": "HouseBusinessApi_GetHouseApproveMeasure"
    });
}

/**
 * core methods
 * 查询搜索列表所需的列表项【业务类型】(HouseBusinessApi_GetSearchConditions)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_GetSearchConditions = (orderid) => {
    return ajax.postData('', {
        "Data": ``,
        "MethodName": "HouseBusinessApi_GetSearchConditions"
    }, true);
}




/**
 * core methods
 * 房速贷审批意见信息(HouseBusinessApi_HouseApproval)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_HouseApproval = (orderid) => {
    return ajax.postData('', {
        "Data": `${orderid}`,
        "MethodName": "HouseBusinessApi_HouseApproval"
    });
}

/**
 * core methods
 * 银行流水按账号汇总(HouseBusinessApi_BankFlowGroupByAccounts)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_BankFlowGroupByAccounts = (businessId) => {
    return ajax.postData('', {
        "Data": `${businessId}`,
        "MethodName": "HouseBusinessApi_BankFlowGroupByAccounts"
    });
}

/**
 * core methods
 * 银行流程按月份汇总(HouseBusinessApi_BankFlowGroupByMonths)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_BankFlowGroupByMonths = (businessId) => {
    return ajax.postData('', {
        "Data": `${businessId}`,
        "MethodName": "HouseBusinessApi_BankFlowGroupByMonths"
    });
}

/**
 * core methods
 * 房速贷人工派件搜索条件数据获取(HouseBusinessApi_GetSeachCondition)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_GetSeachCondition = () => {
    return ajax.postData('', {
        "Data": ``,
        "MethodName": " HouseBusinessApi_GetSeachCondition"
    });
}

/**
 * core methods
 * 房速贷人工派件管理数据(HouseBusinessApi_GetAduitAssignDatas)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_GetAduitAssignDatas = (data, isQuiet = false) => {
    return ajax.postData('', {
        "Data": `{
            "audit_center": "${data.audit_center}",
            "serach_dept": "${data.serach_dept}",
            "business_type": "${data.business_type}",
            "business_id": "${data.business_id}",
            "customer_name": "${data.customer_name}",
            "page_index": ${data.page_index}
        }`,
        "MethodName": "HouseBusinessApi_GetAduitAssignDatas"
    }, isQuiet);
}

/**
 * core methods
 * 重新派件(HouseBusinessApi_AgainAssign)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_AgainAssign = (data) => {
    return ajax.postData('', {
        "Data": `{
            "business_id":"${data.business_id}",
            "business_type":"${data.business_type}"
        }`,
        "MethodName": "HouseBusinessApi_AgainAssign"
    });
}

/**
 * core methods
 * 保存重新派件的数据(HouseBusinessApi_SaveAgainAssign)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_SaveAgainAssign = (data) => {
    return ajax.postData('', {
        "Data": `{
            "business_id": "${data.business_id}",
            "audit_center": "${data.audit_center}",
            "assign_group": "${data.assign_group}"
        }`,
        "MethodName": "HouseBusinessApi_SaveAgainAssign"
    });
}

/**
 * core methods
 * 根据审批中心获取对应的审批小组(HouseBusinessApi_GetDeptList)
 * 技术开发人员：林子尧
 */
const HouseBusinessApi_GetDeptList = (data) => {
    return ajax.postData('', {
        "Data": `{
            "audit_center": "${data.audit_center}",
            "business_type": "${data.business_type}"
        }`,
        "MethodName": "HouseBusinessApi_GetDeptList"
    });
}



export default {
    HouseBusinessApi_GetHouseBusinessList,
    HouseBusinessApi_GetHouseCustomerInfo,
    HouseBusinessApi_GetHouseDetails,
    HouseBusinessApi_GetHouseInfo,
    HouseBusinessApi_GetHouseCredit,
    HouseBusinessApi_GetHouseInspect,
    HouseBusinessApi_GetHouseAssure,
    HouseBusinessApi_GetHouseTenure,
    HouseBusinessApi_GetHouseBusinessApproval,
    HouseBusinessApi_GetHouseApproveMeasure,
    HouseBusinessApi_GetSearchConditions,
    HouseBusinessApi_HouseApproval,
    HouseBusinessApi_BankFlowGroupByAccounts,
    HouseBusinessApi_BankFlowGroupByMonths,
    HouseBusinessApi_GetSeachCondition,
    HouseBusinessApi_GetAduitAssignDatas,
    HouseBusinessApi_AgainAssign,
    HouseBusinessApi_SaveAgainAssign,
    HouseBusinessApi_GetDeptList
}