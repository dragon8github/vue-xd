import ajax from '../handleFetch.js'


/**
 * core methods
 * 查询人员所在分公司信息(BusinessPrototype_GetCompanyInfo)
 * 技术开发人员：林子尧
 */
const BusinessPrototype_GetCompanyInfo = (data) => {
    return ajax.postData('', {
        "Data": data,
        "MethodName": "BusinessPrototype_GetCompanyInfo"
    });
}



/**
 * core methods
 * 编辑(BusinessPrototype_Edit)
 * 技术开发人员：林子尧
 */
const BusinessPrototype_Edit = (data) => {
    return ajax.postData('', {
        "data": JSON.stringify(data),
        "MethodName": "BusinessPrototype_Edit"
    });
}

/**
 * core methods
 * 获取详细数据(BusinessPrototype_Get)
 * 技术开发人员：林子尧
 */
const BusinessPrototype_Get = (data) => {
    return ajax.postData('', {
        "Data": `${data}`,
        "MethodName": "BusinessPrototype_Get"
    });
}

/**
 * core methods
 * 分页获取(BusinessPrototype_GetAll)
 * 技术开发人员：林子尧
 */
const BusinessPrototype_GetAll = (data, isQuiet = false) => {
    return ajax.postData('', {
        "Data": `{
                    "Status": "${data.Status}",
                    "BorrowType": "${data.BorrowType}",
                    "CustomerName": "${data.CustomerName}",
                    "PageIndex": "${data.PageIndex}",
                    "PageSize": "${data.PageSize}",
                }`,
        "MethodName": "BusinessPrototype_GetAll"
    }, isQuiet);
}

/**
 * core methods
 * 分页获取(BusinessPrototype_GetBusinessTypeSelect)
 * 技术开发人员：林子尧
 */
const BusinessPrototype_GetBusinessTypeSelect = () => {
    return ajax.postData('', {
        "Data": ``,
        "MethodName": "BusinessPrototype_GetBusinessTypeSelect"
    });
}

export default {
    BusinessPrototype_GetCompanyInfo,
    BusinessPrototype_Edit,
    BusinessPrototype_Get,
    BusinessPrototype_GetAll,
    BusinessPrototype_GetBusinessTypeSelect
}