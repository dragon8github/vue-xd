import ajax from '../handleFetch.js'

/**
 * core methods
 * 获取通知公告列表页（Notice_GetAll）
 * 技术开发人员：余飞
 */
const Notice_GetAll = (data, isQuiet = false) => {
    return ajax.postData('', {
        "Data": `{
                "PageIndex":"${data.PageIndex}",
                "PageSize":"${data.PageSize}"
             }`,
        "MethodName": "Notice_GetAll"
    }, isQuiet);
}

/**
 * core methods
 * 查看通知公告详情（Notice_Get）
 * 技术开发人员：余飞
 */
const Notice_Get = (businessId, isQuiet = false) => {
    return ajax.postData('', {
        "Data": `${businessId}`,
        "MethodName": "Notice_Get"
    }, isQuiet);
}


/**
 * core methods
 * 标记为已读（Notice_MarkAsReaded）
 * 技术开发人员：余飞
 */
const Notice_MarkAsReaded = (logId) => {
    return ajax.postData('', {
        "Data": `${logId}`,
        "MethodName": "Notice_MarkAsReaded"
    })
}


export default {
    Notice_GetAll,
    Notice_Get,
    Notice_MarkAsReaded
}