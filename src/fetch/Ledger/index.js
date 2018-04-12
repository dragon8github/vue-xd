import ajax from '../handleFetch.js'


/**
 * core methods
 * 获取台账列表(Ledger_GetAllLedger)
 * 技术开发人员：余飞
 */
const Ledger_GetAllLedger = (data, isQuiet = false) => {
   return ajax.postData('', {
     "Data": `{
          "AfterLoanType"               : "${data.business_status}",
          "BusinessType"                : "${data.business_type}",
          "BusinessId"                  : "${data.business_id}",
          "CustomerName"                : "${data.cust_name}",
          "PageIndex"                   : "${data.PageIndex}",
          "PageSize"                    : "${data.PageSize}"
      }`,
      "MethodName":"Ledger_GetAllLedger"
    }, isQuiet);
}


/**
 * core methods
 * 获取还款登记记录 models=null时 未找到贷后信息(Ledger_GetAllRepaymentRecord)
 * 技术开发人员：余飞
 */
const Ledger_GetAllRepaymentRecord = (data) => {
   return ajax.postData('', {
      "Data": `${JSON.stringify(data)}`,
      "MethodName":"Ledger_GetAllRepaymentRecord"
    });
}



/**
 * core methods
 * 获取台账查询条件(Ledger_GetLedgerSearchConditions)
 * 技术开发人员：余飞
 */
const Ledger_GetLedgerSearchConditions = () => {
   return ajax.postData('', {
    "Data": null,
      "MethodName":"Ledger_GetLedgerSearchConditions"
    });
}



/**
 * core methods
 * 获取客户还款登记 models=null时 未找到还款登记信息(Ledger_GetRepaymentRecordDetails)
 * 技术开发人员：余飞
 */
const Ledger_GetRepaymentRecordDetails = (data) => {
   return ajax.postData('', {
      "Data": `{
                "Id": "${data.Id}",
                "BusinessId": "${data.BusinessId}",
                "AfterBusinessId": "${data.AfterBusinessId}",
               }`,
      "MethodName":"Ledger_GetRepaymentRecordDetails"
    });
}


/**
 * core methods
 * 登记还款记录(Ledger_AddOrUpdateRepaymentRecord)
 * 技术开发人员：余飞
 */
const Ledger_AddOrUpdateRepaymentRecord = (data) => {
   return ajax.postData('', {
      "Data": `${JSON.stringify(data)}`,
      "MethodName":"Ledger_AddOrUpdateRepaymentRecord"
    });
}


/**
 * core methods
 * 删除还款记录(Ledger_DeleteRepaymentRecord)
 * 技术开发人员：余飞
 */
const Ledger_DeleteRepaymentRecord = () => {
   return ajax.postData('', {
      "Data": 1,
      "MethodName":"Ledger_DeleteRepaymentRecord"
    });
}

export default {
  Ledger_GetAllLedger,
  Ledger_GetAllRepaymentRecord,
  Ledger_GetLedgerSearchConditions,
  Ledger_GetRepaymentRecordDetails,
  Ledger_AddOrUpdateRepaymentRecord,
  Ledger_DeleteRepaymentRecord
}
