import ajax from '../handleFetch.js'

/**
 * core methods
 * 车易贷数据管理数据获取(CarBusinessApi_GetCatBusinessDatas)
 * 技术开发人员：林子尧
 */
const CarBusinessApi_GetCatBusinessDatas = (where, isQuiet = false) => {
    return ajax.postData('', {
        "Data": `{
          "car_business_id": "${where.business_id}",
          "cust_name": "${where.cust_name}",
          "page_index": "${where.page_index}",
          "business_type":"${where.business_type}"
      }`,
        "MethodName": "CarBusinessApi_GetCatBusinessDatas"
    }, isQuiet);
}

/**
 * core methods
 * 车贷审批信息(CarBusinessApi_CarBusinessApproval)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CarBusinessApi_CarBusinessApproval = (orderid) => {
    return ajax.postData('', {
        "Data": `{
            "business_id": "${orderid}"
      }`,
        "MethodName": "CarBusinessApi_CarBusinessApproval"
    });
}

/**
 * core methods
 * 车贷贷款申请表信息(CarBusinessApi_BusinessLoan)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CarBusinessApi_BusinessLoan = (orderid) => {
    return ajax.postData('', {
        "Data": `{
         "business_id": "${orderid}"
      }`,
        "MethodName": "CarBusinessApi_BusinessLoan"
    });
}

/**
 * core methods
 * 车贷贷款申请表信息(CarBusinessApi_GetCarInfoDetail)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CarBusinessApi_GetCarInfoDetail = (orderid) => {
    return ajax.postData('', {
        "Data": `{
         "business_id": "${orderid}"
      }`,
        "MethodName": "CarBusinessApi_GetCarInfoDetail"
    });
}


/**
 * core methods
 * 查询搜索列表所需的列表项【业务类型】(CarBusinessApi_GetSearchConditions)
 * 技术开发人员：林子尧
 */
const CarBusinessApi_GetSearchConditions = () => {
    return ajax.postData('', {
        "Data": ``,
        "MethodName": "CarBusinessApi_GetSearchConditions"
    }, true);
}

/**
 * core methods
 * 获取车贷主借款人信息(CarBusinessApi_GetMainCustomer)
 * 技术开发人员：林子尧
 */
const CarBusinessApi_GetMainCustomer = (businessId) => {
    return ajax.postData('', {
        "Data": businessId,
        "MethodName": 'CarBusinessApi_GetMainCustomer'
    });
}

/**
 * core methods
 * 车贷基本信息列表(CarBusinessApi_CarBaseInfoDatas)
 * 技术开发人员：林子尧
 */
const CarBusinessApi_CarBaseInfoDatas = (businessId) => {
    return ajax.postData('', {
        "Data": businessId,
        "MethodName": 'CarBusinessApi_CarBaseInfoDatas'
    });
}


export default {
    CarBusinessApi_GetCatBusinessDatas,
    CarBusinessApi_CarBusinessApproval,
    CarBusinessApi_BusinessLoan,
    CarBusinessApi_GetCarInfoDetail,
    CarBusinessApi_GetSearchConditions,
    CarBusinessApi_GetMainCustomer,
    CarBusinessApi_CarBaseInfoDatas
}