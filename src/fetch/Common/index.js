import ajax from '../handleFetch.js'

/**
 * core methods
 * 创建业务(CommonApi_SaveBusinessBaseInfo)
 * 技术开发人员：林子尧
 * 测试Data:
 * {
          "business_type": "车易贷",
          "customer_name": "test",
          "phone_number": "13168955338",
          "document_id": "",
          "business_out_type": 1,
          "business_type_detail": "T141"
  }
 */
const CommonApi_SaveBusinessBaseInfo = (data) => {
    return ajax.postData('', {
        "Data": `${JSON.stringify(data)}`,
        "MethodName": "CommonApi_SaveBusinessBaseInfo"
    });
}

/**
 * core methods
 * 注销业务(CommonApi_CancelBusiness)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CommonApi_CancelBusiness = () => {
    return ajax.postData('', {
        "Data": `{
        "business_id": "TDF5012017032403",
        "log_remark": "sample string 2"
      }`,
        "MethodName": "CommonApi_CancelBusiness"
    });
}


/**
 * core methods
 * 【创建业务】页面选择框数据(CommonApi_InputBusiness)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CommonApi_InputBusiness = (type) => {
    return ajax.postData('', {
        "Data": `{
        "input_type": "${type}"
      }`,
        "MethodName": "CommonApi_InputBusiness"
    });
}


/**
 * core methods
 * 业务流程信息(CommonApi_BusinessMaps)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CommonApi_BusinessMaps = (businessId) => {
    return ajax.postData('', {
        "Data": `{
        "business_id":  "${businessId}"
      }`,
        "MethodName": "CommonApi_BusinessMaps"
    });
}



/**
 * core methods
 * 查看附件(CommonApi_BusinessFile)
 * 技术开发人员：林子尧
 * 测试Data:TDF5012017032403
 */
const CommonApi_BusinessFile = (data) => {
    return ajax.postData('', {
        "Data": `{
                "business_id": "${data.business_id}",
                "doc_name": "${data.doc_name}",
                "doc_type": "${data.doc_type}",
              }`,
        "MethodName": "CommonApi_BusinessFile"
    });
}



/**
 * 获取车贷和房贷以及合规岗上传文件信息(CommonApi_GetUploadFileList)
 * 技术开发人员：林子尧
 * @param businessId 业务单号
 */
const CommonApi_GetUploadFileList = (businessId) => {
    return ajax.postData('', {
        "Data": `{
        "business_id":"${businessId}",
        "type":""
      }`,
        "MethodName": "CommonApi_GetUploadFileList"
    });
}


/**
 * 出款信息详情(CommonApi_LentOutDetail)
 * 技术开发人员：林子尧
 * @param businessId 业务单号
 */
const CommonApi_LentOutDetail = (businessId) => {
    return ajax.postData('', {
        "Data": `${businessId}`,
        "MethodName": "CommonApi_LentOutDetail"
    });
}

/**
 * 贷后信息(CommonApi_GetAfterLoan)
 * 技术开发人员：林子尧
 * 测试Data:{businessid:'TDF1012016061301',afterbusinessid:1-00}
 */
const CommonApi_GetAfterLoan = (data) => {
    return ajax.postData('', {
        "Data": `{
          "businessid":"${data.businessid}",
          "afterbusinessid":"${data.afterbusinessid}"
        }`,
        "MethodName": "CommonApi_GetAfterLoan"
    });
}




/**
 * 还款计划(CommonApi_GetRepayPlan)
 * 技术开发人员：林子尧
 * 测试Data:{businessid:'TDF1012016061301',afterbusinessid:1-00}
 */
const CommonApi_GetRepayPlan = (businessId) => {
    return ajax.postData('', {
        "Data": `${businessId}`,
        "MethodName": "CommonApi_GetRepayPlan"
    });
}



/**
 * 获取当前是否有出款详情(CommonApi_IsParagraph)
 * 技术开发人员：林子尧
 */
const CommonApi_IsParagraph = (data) => {
    return ajax.postData('', {
        "Data": data,
        "MethodName": "CommonApi_IsParagraph"
    });
}

/**
 * 获取对应的上传文件配置所上传的文件数
 * 技术开发人员：林子尧
 */
const CommonApi_GetDocCountList = (data) => {
    return ajax.postData('', {
        "Data": data,
        "MethodName": "CommonApi_GetDocCountList"
    });
}


export default {
    CommonApi_SaveBusinessBaseInfo,
    CommonApi_CancelBusiness,
    CommonApi_InputBusiness,
    CommonApi_BusinessMaps,
    CommonApi_BusinessFile,
    CommonApi_GetUploadFileList,
    CommonApi_LentOutDetail,
    CommonApi_GetAfterLoan,
    CommonApi_GetRepayPlan,
    CommonApi_IsParagraph,
    CommonApi_GetDocCountList
}