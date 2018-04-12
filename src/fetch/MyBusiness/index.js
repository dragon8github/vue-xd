import ajax from '../handleFetch.js'

/**
 * core methods
 * 获取我的业务(MyBusiness_GetMyAllBusinessAudit)
 * 参数1 ： 业务状态，默认为1 （ 0-待审 1-已审 2-我的业务 ）
 * 技术开发人员：余飞
 */
const MyBusiness_GetMyAllBusinessAudit = (where, isQuiet = false) => {
  return ajax.postData('', {
    "Data":`{
      "Tag": "${where.tag}",
      "PageIndex": "${where.page_index}",
      "PageSize": "${where.page_size}",
      "CustomerName": "${where.cust_name}",
      "BusinessType":"${where.business_type}",
      "BusinessId":"${where.business_id}"
    }`,
    "MethodName":"MyBusiness_GetMyAllBusinessAudit"
  }, isQuiet);
}
  

/**
 * core methods
 * 获取业务审计详情(MyBusiness_GetMyBusinessAuditDetails)
 * 技术开发人员：余飞
 */
const MyBusiness_GetMyBusinessAuditDetails = (data) => {
  return ajax.postData('', {
    "Data":`${JSON.stringify(data)}`,
    "MethodName":"MyBusiness_GetMyBusinessAuditDetails"
  });
}

/**
 * core methods
 * 保存审批(MyBusiness_AuditBusiness)
 * 技术开发人员：余飞
 * "BusinessId": "sample string 1",
    "AuditReuslt": 2,
    "Remark": "sample string 3",
    "BackToWorkNodeId": 1,
    "IsDirect": true,
    "ProcessOrder": 4
 */
const MyBusiness_AuditBusiness = (data) => {
  return ajax.postData('', {
    "Data":`${JSON.stringify(data)}`,
    "MethodName":"MyBusiness_AuditBusiness"
  });
}


/**
 * core methods
 * 撤销审批(MyBusiness_UndoBusinessAudit)
 * 技术开发人员：余飞
 */
const MyBusiness_UndoBusinessAudit = (audit) => {
  return ajax.postData('', {
    "Data":`${JSON.stringify(audit)}`,
    "MethodName":"MyBusiness_UndoBusinessAudit"
  });
}



/**
 * core methods
 * 查询业务审批可以打回的节点(MyBusiness_GetWorkFlowNodesThatBusinessCanBackTo)
 * 技术开发人员：余飞
 */
const MyBusiness_GetWorkFlowNodesThatBusinessCanBackTo = (audit) => {
  return ajax.postData('', {
    "Data":`${JSON.stringify(audit)}`,
    "MethodName":"MyBusiness_GetWorkFlowNodesThatBusinessCanBackTo"
  });
}



/**
 * core methods
 * 查询车辆评估信息(MyBusiness_GetCarEvaluationInfo)
 * 技术开发人员：余飞
 */
const MyBusiness_GetCarEvaluationInfo = (audit) =>{
    return ajax.postData('',{
        "Data":`${JSON.stringify(audit)}`,
        "MethodName":"MyBusiness_GetCarEvaluationInfo"
    });
}


/**
 * core methods
 * 保存车辆评估信息(MyBusiness_SaveCarEvaluationInfo)
 * 技术开发人员：余飞
 */
const MyBusiness_SaveCarEvaluationInfo = (data) =>{
    return ajax.postData('',{
        "Data":`${JSON.stringify(data)}`,
        "MethodName":"MyBusiness_SaveCarEvaluationInfo"
    });
}


/**
 * core methods
 * 查询搜索列表所需的列表项【业务类型】(MyBusiness_GetSearchConditions)
 * 技术开发人员：余飞
 */
const MyBusiness_GetSearchConditions = () =>{
    return ajax.postData('',{
        "Data":``,
        "MethodName":"MyBusiness_GetSearchConditions"
    }, true);
}


/**
 * core methods
 * 是否可审批 (MyBusiness_IsAuditableBusiness)
 * 技术开发人员：余飞
 */
const MyBusiness_IsAuditableBusiness=(audit)=>{
    return ajax.postData('',{
        "Data":`${JSON.stringify(audit)}`,
        "MethodName":"MyBusiness_IsAuditableBusiness"
    });
}

/**
 * core methods
 * 查询Gps信息 (MyBusiness_GetGpsInfo)
 * 技术开发人员：余飞
 */
const MyBusiness_GetGpsInfo=(data)=>{
    return ajax.postData('',{
        "Data":`{
            "business_id": '${data.business_id}',
            "approve_id": '${data.approve_id}',
            "flow_business_type": '${data.flow_business_type}',
            "after_id": '${data.after_id}'
        }`,
        "MethodName":"MyBusiness_GetGpsInfo"
    });
}


/**
 * core methods
 * 保存Gps信息 (MyBusiness_SaveGpsInfo)
 * 技术开发人员：余飞
 */
const MyBusiness_SaveGpsInfo=(data)=>{
    return ajax.postData('',{
        "Data":`{
            Audit: ${JSON.stringify(data.Audit)},
            Model: ${JSON.stringify(data.Model)}
        }`,
        "MethodName":"MyBusiness_SaveGpsInfo"
    });
}





export default {
    MyBusiness_GetMyAllBusinessAudit,
    MyBusiness_GetMyBusinessAuditDetails,
    MyBusiness_AuditBusiness,
    MyBusiness_GetWorkFlowNodesThatBusinessCanBackTo,
    MyBusiness_GetCarEvaluationInfo,
    MyBusiness_SaveCarEvaluationInfo,
    MyBusiness_GetSearchConditions,
    MyBusiness_UndoBusinessAudit,
    MyBusiness_IsAuditableBusiness,
    MyBusiness_GetGpsInfo,
    MyBusiness_SaveGpsInfo
}

