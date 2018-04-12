import ajax from '../handleFetch.js'


/**
 * core methods
 * 代扣查询(ThirdRepayment_GetAllThirdRepaymentProcessLogs)
 * 技术开发人员：余飞
 */
const ThirdRepayment_GetAllThirdRepaymentProcessLogs = (data, isQuiet = false) => {
   return ajax.postData('', {
     "Data": `${JSON.stringify(data)}`,
      "MethodName":"ThirdRepayment_GetAllThirdRepaymentProcessLogs"
    },isQuiet);
}


/**
 * core methods
 * 单笔代扣处理过程记录 ：查看扣款列表(ThirdRepayment_GetPerBusinessThirdRepaymentProcessLogs)
 * 技术开发人员：余飞
 */
const ThirdRepayment_GetPerBusinessThirdRepaymentProcessLogs = (data) => {
   return ajax.postData('', {
      "Data": `${JSON.stringify(data)}`,
      "MethodName":"ThirdRepayment_GetPerBusinessThirdRepaymentProcessLogs"
    });
}



/**
 * core methods
 * 代扣查询参数(ThirdRepayment_GetSearchConditions)
 * 技术开发人员：余飞
 */
const ThirdRepayment_GetSearchConditions = () => {
   return ajax.postData('', {
      "Data": null,
      "MethodName":"ThirdRepayment_GetSearchConditions"
    });
}



export default {
  ThirdRepayment_GetAllThirdRepaymentProcessLogs,
  ThirdRepayment_GetPerBusinessThirdRepaymentProcessLogs,
  ThirdRepayment_GetSearchConditions
}
