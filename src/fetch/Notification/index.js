import ajax from '../handleFetch.js'

/**
 * core methods
 * 获取推送消息列表页(PushNotification_GetAll)
 * 技术开发人员：余飞
 */
const PushNotification_GetAll = (data) => {
    return ajax.postData('', {
        "Data": `{
                "BusinessType":null,
                "PageIndex":${data.PageIndex},
                "PageSize":${data.PageSize}
              }`,
        "MethodName": "PushNotification_GetAll"
    });
}


/**
 * core methods
 * 查询业务审批处理流程(用于业务员查看审批状态变更详情)(PushNotification_GetBusinessAuditProcessList)
 * 技术开发人员：余飞
 */
const PushNotification_GetBusinessAuditProcessList = (businessId) => {
    return ajax.postData('', {
        "Data": `${businessId}`,
        "MethodName": "PushNotification_GetBusinessAuditProcessList"
    });
}


/**
 * core methods
 * 标记为已读
 * 技术开发人员：余飞
 */
const PushNotification_MarkAsReaded = (logId) => {
    return ajax.postData('', {
        "Data": `${logId}`,
        "MethodName": "PushNotification_MarkAsReaded"
    });
}

export default {
    PushNotification_GetAll,
    PushNotification_GetBusinessAuditProcessList,
    PushNotification_MarkAsReaded
}