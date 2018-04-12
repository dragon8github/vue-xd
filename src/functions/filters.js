// 如果数据中包含'null' 则替换为空字符串(仅仅清除字符串中的Null)
const clearNull = v => {

    return v && v.toString().replace(/null/g, '')
}

// 如果数据中包含'null'，则直接返回空
const notNull = v => {
    if (v && v.toString().includes('null')) return ''
}

// 替换：如果 v 是 null or empty，则返回 replace
const replaceIfNullOrEmpty = (v, replace) => {
    if (isNullOrEmpty(v)) return replace;

    return v;
}

// 追加 v + append
const appendIfNotNullOrEmpty = (v, append) => {
    if (isNullOrEmpty(v)) return '';
    return v + append
}

// 追加 v + append, 如果v为空且_default有值，那么_default则为默认值 + 单位（append）
const appendIfNotNullOrEmptyDefault = (v, append, _default) => {
    // v为非法数据
    if (isNullOrEmpty(v)) {
        // 这里必须判断是否不为undefined
        if (_default !== undefined) return _default + append
            // 如果连默认值都没有传递进来，则直接返回空
        else return ''
    }
    // v为合法数据，直接返回合并后的字符串
    return v + append
}

// 追加 金额 单位 元
const appendMoneyUnitIfNotNullOrEmpty = (v, vdefault) => {
    return appendUnitAfterMoneyIfNotNullOrEmpty(v, '元', vdefault)
}

// 追加 相关单位 至 金额 后面
const appendUnitAfterMoneyIfNotNullOrEmpty = (v, unit, vdefault) => {
    if (isNullOrEmpty(v)) {
        if (vdefault == undefined) return '';

        v = vdefault;
    } else {
        v = tryParseFloat(v);
        if (v == 0 && vdefault != 0) return '';
    }

    return appendIfNotNullOrEmpty(v.toFixed(2), unit)
}

// 追加 相关单位 至 数字 后面
const appendUnitAfterIntIfNotNullOrEmpty = (v, unit, vdefault) => {
    if (isNullOrEmpty(v)) {
        if (vdefault == undefined) return '';

        v = vdefault;
    } else {
        v = tryParseInt(v);
        if (v == 0 && vdefault != 0) return '';
    }

    return appendIfNotNullOrEmpty(v, unit)
}

// 追加 年 单位 年
const appendYearUnitIfNotNullOrEmpty = (v, vdefault) => {
    return appendUnitAfterIntIfNotNullOrEmpty(v, '年', vdefault)
}

// 追加 月份 单位 个月
const appendMonthUnitIfNotNullOrEmpty = (v, vdefault) => {
    return appendUnitAfterIntIfNotNullOrEmpty(v, '个月', vdefault)
}

// 追加 天 单位 天
const appendDayUnitIfNotNullOrEmpty = (v, vdefault) => {
    return appendUnitAfterIntIfNotNullOrEmpty(v, '天', vdefault)
}

// 包裹 left + v + right
const wrapIfNotNullOrEmpty = (v, left, right) => {
    if (isNullOrEmpty(v)) return '';
    return left + v + right;
}

// 判断是否为非法数据
const isNullOrEmpty = v => {
    return v === null || v === '' || v === 'null' || v === 'undefined' || v === undefined
}

// 如果 null 则返回 空
const toEmptyIfNull = v => {
    return v == null ? '' : v;
}

// BOOL 转 中文
const booleanToCnString = v => {
    if (isNullOrEmpty(v)) return ''
    return v == 1 || v == true ? '是' : '否'
}

// 三元表达式 
const ternaryExpression = (isTrue, vTrue, vFalse) => {
    return isTrue ? vTrue : vFalse;
}

const tryParseFloat = v => {
    try {
        var r = parseFloat(v);
        if (isNaN(r)) return 0;

        return r;
    } catch (e) {
        return 0;
    }

}

const tryParseInt = v => {
    try {
        var r = parseInt(v);
        if (isNaN(r)) return 0;

        return r;
    } catch (e) {
        return 0;
    }

}

const sumMoney = (...money) => {
    var v = 0;
    for (var i = 0; i < money.length; i++) {
        var m = tryParseFloat(money[i]);
        v = v + m;
    }
    return v.toFixed(2);
}

// 截取字符串
const subStr = (v, n) => {
    if (v && v.length > n) return v.substr(0, n) + '...';
    return v;
}

// 时间补0辅助函数
const padNumber = (num, fill) => {
    //改自：http://blog.csdn.net/aimingoo/article/details/4492592
    var len = ('' + num).length;
    return (Array(
        fill > len ? fill - len + 1 || 0 : 0
    ).join(0) + num);
}

// 转化时间格式为年月日
const timeYMD = time => {
    // 如果传入非法参数，直接返回空
    if (isNullOrEmpty(time)) return null
    // 兼容安卓的恶心情况 2017-05-2021:53:13 或 2017-04-1000:00:00 替换为： 2017-05-20 21:53:13
    if (/(-|\/){1}(\d{4})/.test(time)) {
        // 获取中点
        const mid = time.lastIndexOf('-') + 3
        // 生成正确的时间字符串
        time = time.substr(0, mid) + ' ' + time.substr(mid)
    }
    // 兼容IOS和安卓
    var d = new Date(Date.parse(time.replace(/-/g, "/")))    
    // 如果转换成功
    if (d != 'Invalid Date') {
        time = d.getFullYear() + "-" + padNumber(d.getMonth() + 1, 2) + "-" + padNumber(d.getDate(), 2) + ' '
        // 如果时都不为0的时候，才叠加上
        if (d.getHours()) { 
            time += d.getHours() + ':'
             // 如果时分秒都不为0的时候，才叠加上
            time += padNumber(d.getMinutes(), 2) + ':'
             // 如果时分秒都不为0的时候，才叠加上
            time += padNumber(d.getSeconds(), 2)
        }
        // 返回转换成功后的值
        return time
    }
    // 否则返回转换失败的标记
    return 'Invalid Date'
}

// 获取字符串的长度
const getStrLen = str => {
    if (str && typeof(str) === "string") {
        return str.length
    }
    return 0
}

// 判断字符串是否大于或等于某个数值
const isStrLen_egt = (str, n) => {
    if (str && typeof(str) === "string") {
        return str.length >= +n
    }
    return false
}



const concat = (...items) => {
    var str = ''
    for (var i = 0; i < items.length; i++) {
        str += items[0]
    }
    return str;
}

let filters = {
    clearNull,
    notNull,
    subStr,
    appendIfNotNullOrEmpty,
    appendIfNotNullOrEmptyDefault,
    appendMoneyUnitIfNotNullOrEmpty,
    appendUnitAfterMoneyIfNotNullOrEmpty,
    appendYearUnitIfNotNullOrEmpty,
    appendMonthUnitIfNotNullOrEmpty,
    appendDayUnitIfNotNullOrEmpty,
    replaceIfNullOrEmpty,
    isNullOrEmpty,
    tryParseFloat,
    sumMoney,
    timeYMD,
    toEmptyIfNull,
    booleanToCnString,
    getStrLen,
    isStrLen_egt,
    wrapIfNotNullOrEmpty,
    ternaryExpression,
    concat
}

export default {
    filters,
    install(Vue) {
        Vue.prototype.filters = filters
    }
}