import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import Loader from 'components/loader/index.js'

Vue.use(Router)

// 主页 
const Home = r => require.ensure([], () => r(require('../views/Home.vue')), 'Home')

// 操作指引 
const Help = r => require.ensure([], () => r(require('../views/Help/help.vue')), 'Help')

// 通知中心
const Notice = r => require.ensure([], () => r(require('../views/Notice/notice.vue')), 'Notice')
const NoticeDetails = r => require.ensure([], () => r(require('../views/Notice/noticeDetails.vue')), 'NoticeDetails')

// 消息中心
const Message = r => require.ensure([], () => r(require('../views/Message/message.vue')), 'Message')
const MessageDetails = r => require.ensure([], () => r(require('../views/Message/messageDetails.vue')), 'MessageDetails')
const MessageInfo = r => require.ensure([], () => r(require('../views/Message/MessageInfo.vue')), 'MessageInfo')
const messageErr = r => require.ensure([], () => r(require('../views/Message/messageErr.vue')), 'messageErr')

// 用户中心
const User = r => require.ensure([], () => r(require('../views/User/Index.vue')), 'User')
const UserInfo = r => require.ensure([], () => r(require('../views/User/UserInfo.vue')), 'UserInfo')
const MyQrCode = r => require.ensure([], () => r(require('../views/User/MyQrCode.vue')), 'MyQrCode')
const Feedback = r => require.ensure([], () => r(require('../views/User/Feedback.vue')), 'Feedback')
const About = r => require.ensure([], () => r(require('../views/User/About.vue')), 'About')
const Password = r => require.ensure([], () => r(require('../views/User/Pwd.vue')), 'Password')
const LogPwd = r => require.ensure([], () => r(require('../views/User/LogPwd.vue')), 'LogPwd')


// 我的业务
const MyBusiness = r => require.ensure([], () => r(require('../views/MyBusiness/MyBusiness.vue')), 'MyBusiness')
const approval = r => require.ensure([], () => r(require('../views/MyBusiness/approval.vue')), 'approval')
const uploadFile = r => require.ensure([], () => r(require('../views/MyBusiness/uploadFile.vue')), 'uploadFile')


// 房速贷
const houseBusinessDetails = r => require.ensure([], () => r(require('../views/houseBusiness/houseBusinessDetails.vue')), 'houseBusinessDetails')
const houseBusiness = r => require.ensure([], () => r(require('../views/HouseBusiness/houseBusiness.vue')), 'houseBusiness')
const addhouseBusiness = r => require.ensure([], () => r(require('../views/HouseBusiness/addhouseBusiness.vue')), 'addhouseBusiness')

// 车易贷
const CarBusinessDetails = r => require.ensure([], () => r(require('../views/carBusiness/CarBusinessDetails.vue')), 'CarBusinessDetails')
const carBusiness = r => require.ensure([], () => r(require('../views/carBusiness/carBusiness.vue')), 'carBusiness')
const addCarBusiness = r => require.ensure([], () => r(require('../views/CarBusiness/addCarBusiness.vue')), 'addCarBusiness')
const editCarBusiness = r => require.ensure([], () => r(require('../views/CarBusiness/editCarBusiness.vue')), 'editCarBusiness')
const gpsEdit = r => require.ensure([], () => r(require('../views/MyBusiness/gpsEdit.vue')), 'gpsEdit')

// 台账管理
const allLedger = r => require.ensure([], () => r(require('../views/Ledger/allLedger.vue')), 'allLedger')
const customerRegister = r => require.ensure([], () => r(require('../views/Ledger/customerRegister.vue')), 'customerRegister')
const addRegister = r => require.ensure([], () => r(require('../views/Ledger/addRegister.vue')), 'addRegister')

// 代扣查询
const autoRepay = r => require.ensure([], () => r(require('../views/ThirdRepayment/AutoRepay.vue')), 'autoRepay')
const repayLog = r => require.ensure([], () => r(require('../views/ThirdRepayment/RepayLog.vue')), 'repayLog')

// 扫码业务
const QrCode = r => require.ensure([], () => r(require('../views/Qrcode/qrcode.vue')), 'QrCode')
const editQrCode = r => require.ensure([], () => r(require('../views/Qrcode/editQrCode.vue')), 'editQrCode')

// 新车易贷详情子页面
const CarBusinessDetails_BusinessLoan = r => require.ensure([], () => r(require('../views/CarBusiness/page/BusinessLoan.vue')), 'CarBusinessDetails_BusinessLoan')
const CarBusinessDetails_BusinessMaps = r => require.ensure([], () => r(require('../views/CarBusiness/page/BusinessMaps.vue')), 'CarBusinessDetails_BusinessMaps')
const CarBusinessDetails_CarBusinessApproval = r => require.ensure([], () => r(require('../views/CarBusiness/page/CarBusinessApproval.vue')), 'CarBusinessDetails_CarBusinessApproval')
const CarBusinessDetails_CarInfoDetail = r => require.ensure([], () => r(require('../views/CarBusiness/page/CarInfoDetail.vue')), 'CarBusinessDetails_CarInfoDetail')
const CarBusinessDetails_GetUploadFileList = r => require.ensure([], () => r(require('../views/CarBusiness/page/GetUploadFileList.vue')), 'CarBusinessDetails_GetUploadFileList')
const CarBusinessDetails_OutPut = r => require.ensure([], () => r(require('../views/CarBusiness/page/OutPut.vue')), 'CarBusinessDetails_OutPut')
const CarBusinessDetails_CarBaseInfo = r => require.ensure([], () => r(require('../views/CarBusiness/page/CarBaseInfo.vue')), 'CarBusinessDetails_CarBaseInfo')

// 新房速贷详情子页面
const houseBusinessDetails_BusinessMaps = r => require.ensure([], () => r(require('../views/HouseBusiness/page/BusinessMaps.vue')), 'houseBusinessDetails_BusinessMaps')
const houseBusinessDetails_CustBasicInfo = r => require.ensure([], () => r(require('../views/HouseBusiness/page/CustBasicInfo.vue')), 'houseBusinessDetails_CustBasicInfo')
const houseBusinessDetails_HouseAssure = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseAssure.vue')), 'houseBusinessDetails_HouseAssure')
const houseBusinessDetails_HouseBusinessApproval = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseBusinessApproval.vue')), 'houseBusinessDetails_HouseBusinessApproval')
const houseBusinessDetails_HouseCredit = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseCredit.vue')), 'houseBusinessDetails_HouseCredit')
const houseBusinessDetails_HouseDetails = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseDetails.vue')), 'houseBusinessDetails_HouseDetails')
const houseBusinessDetails_HouseInfo = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseInfo.vue')), 'houseBusinessDetails_HouseInfo')
const houseBusinessDetails_HouseInspect = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseInspect.vue')), 'houseBusinessDetails_HouseInspect')
const houseBusinessDetails_HouseTenure = r => require.ensure([], () => r(require('../views/HouseBusiness/page/HouseTenure.vue')), 'houseBusinessDetails_HouseTenure')
const houseBusinessDetails_UploadFileList = r => require.ensure([], () => r(require('../views/HouseBusiness/page/UploadFileList.vue')), 'houseBusinessDetails_UploadFileList')

// 贷后详情子页面
const afterLoan = r => require.ensure([], () => r(require('../views/ThirdRepayment/AfterLoan.vue')), 'afterLoan')
const repayPlan = r => require.ensure([], () => r(require('../views/ThirdRepayment/RepayPlan.vue')), 'repayPlan')

// 画展
const drawMap = r => require.ensure([], () => r(require('../views/DrawMap/drawMap.vue')), 'drawMap')

// 后台专用入口
const member = r => require.ensure([], () => r(require('../views/Member/member.vue')), 'member')

//房速贷派件管理
const auditAssign = r => require.ensure([], () => r(require('../views/Audit/auditAssign.vue')), 'auditAssign')
const actionAgainAssign = r => require.ensure([], () => r(require('../views/Audit/actionAgainAssign')), 'actionAgainAssign')

//出款详情
const lentOutDetail = r => require.ensure([], () => r(require('../views/MyBusiness/LentOutDetails.vue')), 'lentOutDetail')
const baseInfo = r => require.ensure([], () => r(require('../views/MyBusiness/LentOutDetailPages/BaseInfo.vue')), 'baseInfo')
const planOutMoney = r => require.ensure([], () => r(require('../views/MyBusiness/LentOutDetailPages/PlanOutMoney.vue')), 'planOutMoney')
const remark = r => require.ensure([], () => r(require('../views/MyBusiness/LentOutDetailPages/Remark.vue')), 'remark')
const bankInformation = r => require.ensure([], () => r(require('../views/MyBusiness/LentOutDetailPages/BankInformation.vue')), 'bankInformation')
const contractInformation = r => require.ensure([], () => r(require('../views/MyBusiness/LentOutDetailPages/ContractInformation.vue')), 'contractInformation')


const router = new Router({
    mode: 'hash',
    routes: [
        //······················· 主页 ·······················
        { path: '/', redirect: '/home' },
        { path: '/home', name: 'Home', component: Home,  meta: {footer: true } },

        //······················· 通知中心 / 消息中心 / 操作指引 ·······················
        { path: '/help', name: 'Help', component: Help },
        { path: '/notice', name: 'Notice', component: Notice },
        { path: '/notice/:id', name: 'NoticeDetails', component: NoticeDetails },
        { path: '/message', name: 'Message', component: Message },
        { path: '/message/:id', name: 'MessageDetails', component: MessageDetails },
        { path: '/MessageInfo/:id', name: 'MessageInfo', component: MessageInfo },
        { path: '/messageErr', name: 'messageErr', component: messageErr },

        //······················· 用户中心 ·······················
        { path: '/user', name: 'User', component: User,  meta: {footer: true }}, 
        { path: '/user/userInfo', name: 'UserInfo', component: UserInfo },
        { path: '/user/userInfo/myqrcode', name: 'myqrcode', component: MyQrCode },
        { path: '/user/Password', name: 'Password', component: Password },
        { path: '/user/Password/LogPwd', name: 'LogPwd', component: LogPwd },
        { path: '/user/feedback', name: 'Feedback', component: Feedback },
        { path: '/user/about', name: 'About', component: About },

        //······················· 扫码业务 ·······················
        { path: '/QrCode', name: 'QrCode', component: QrCode },
        { path: '/editQrCode/:businessId?', name: 'editQrCode', component: editQrCode },

        //······················· 我的业务 / 车易贷 / 房易贷 ·······················
        { path: '/myBusiness', redirect: '/myBusiness/0' },
        { path: '/myBusiness/:tag([0-2]?)', name: 'MyBusiness', component: MyBusiness, meta: {footer: true } },
        { path: '/houseBusiness', name: 'houseBusiness', component: houseBusiness },
        { path: '/carBusiness', name: 'carBusiness', component: carBusiness },
        { path: '/approval', redirect: '/myBusiness' },
        { path: '/approval/:approve_id', name: 'approval', component: approval },
        { path: '/editCarBusiness', redirect: '/myBusiness' },
        { path: '/editCarBusiness/:business_id/:approve_id/:flow_business_type/:after_id', name: 'editCarBusiness', component: editCarBusiness },
        { path: '/carBusiness/addCarBusiness', name: 'addCarBusiness', component: addCarBusiness },
        { path: '/houseBusiness/addhouseBusiness', name: 'addhouseBusiness', component: addhouseBusiness },
        { path: '/gpsEdit/:business_id/:approve_id/:flow_business_type/:after_id', name: 'gpsEdit', component: gpsEdit },

        //······················· 客户还款登记 ······················
        { path: '/customerRegister/:businessId/:afterId', name: 'customerRegister', component: customerRegister },
        { path: '/addRegister/:businessId/:afterId', name: 'addRegister', component: addRegister },
        { path: '/allLedger', name: 'allLedger', component: allLedger },

        //······················· 代扣查询 ······················
        { path: '/AutoRepay', name: 'AutoRepay', component: autoRepay },
        { path: '/RepayLog/:businessId/:afterId', name: 'RepayLog', component: repayLog },

        //······················· 车易贷详情 与 重定向 ·······················
        { path: '/CarBusinessDetails/id/:id', redirect: '/CarBusinessDetails/id/:id/CarBusinessApproval' },
        { path: '/CarBusinessDetails/id/:id/afterId/:afterId', redirect: '/CarBusinessDetails/id/:id/afterId/:afterId/AfterLoan' },
        {
            path: '/CarBusinessDetails/id/:id/(afterId)?/:afterId?',
            name: 'CarBusinessDetails',
            component: CarBusinessDetails,
            children: [
                { path: 'BusinessLoan', component: CarBusinessDetails_BusinessLoan },
                { path: 'BusinessMaps', component: CarBusinessDetails_BusinessMaps },
                { path: 'CarBusinessApproval', component: CarBusinessDetails_CarBusinessApproval },
                { path: 'CarInfoDetail', component: CarBusinessDetails_CarInfoDetail },
                { path: 'GetUploadFileList', component: CarBusinessDetails_GetUploadFileList },
                { path: 'OutPut', component: CarBusinessDetails_OutPut },
                { path: 'AfterLoan', component: afterLoan },
                { path: 'RepayPlan', component: repayPlan },
                { path: 'CarBaseInfo', component: CarBusinessDetails_CarBaseInfo },
            ]
        },

        //······················· 房速贷详情 与 重定向 ·······················
        { path: '/houseBusinessDetails/id/:id', redirect: '/houseBusinessDetails/id/:id/CustBasicInfo' },
        { path: '/houseBusinessDetails/id/:id/afterId/:afterId', redirect: '/houseBusinessDetails/id/:id/afterId/:afterId/AfterLoan' },
        {
            path: '/houseBusinessDetails/id/:id/(afterId)?/:afterId?',
            name: 'houseBusinessDetails',
            component: houseBusinessDetails,
            children: [
                { path: 'CustBasicInfo', component: houseBusinessDetails_CustBasicInfo },
                { path: 'BusinessMaps', component: houseBusinessDetails_BusinessMaps },
                { path: 'HouseAssure', component: houseBusinessDetails_HouseAssure },
                { path: 'HouseBusinessApproval', component: houseBusinessDetails_HouseBusinessApproval },
                { path: 'HouseCredit', component: houseBusinessDetails_HouseCredit },
                { path: 'HouseDetails', component: houseBusinessDetails_HouseDetails },
                { path: 'HouseInfo', component: houseBusinessDetails_HouseInfo },
                { path: 'HouseInspect', component: houseBusinessDetails_HouseInspect },
                { path: 'HouseTenure', component: houseBusinessDetails_HouseTenure },
                { path: 'UploadFileList', component: houseBusinessDetails_UploadFileList },
                { path: 'AfterLoan', component: afterLoan },
                { path: 'RepayPlan', component: repayPlan }
            ]
        },

        //······················· 房速贷派件管理 ······················
        { path: '/auditAssign', name: 'auditAssign', component: auditAssign },
        { path: '/actionAgainAssign/:businessid/:businessType', name: 'actionAgainAssign', component: actionAgainAssign },

        //······················· 画展 ······················
        { path: '/drawMap', name: 'drawMap', component: drawMap },

        //······················· 上传资料 ······················
        { path: '/uploadFile/:businessId', name: 'uploadFile', component: uploadFile },

        //······················· 后台专用入口 ······················
        { path: '/member/:Ip/:SystemName/:Version/:Token/:UserId', name: 'member', component: member },

        //······················· 出款详情 ······················  
        { path: '/lentOutDetail/id/:id', redirect: '/lentOutDetail/id/:id/baseInfo' },
        {
            path: '/lentOutDetail/id/:id',
            name: 'lentOutDetail',
            component: lentOutDetail,
            children: [
                { path: 'baseInfo', component: baseInfo },
                { path: 'planOutMoney', component: planOutMoney },
                { path: 'remark', component: remark },
                { path: 'bankInformation', component: bankInformation },
                { path: 'contractInformation', component: contractInformation }
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    // 重置fetchCount.这样其他页面的请求不会被本页面的请求所影响而导致数据已经加载完成，但还在Loading
    store.dispatch('set_fetch_zero')

    // 允许通过
    next()
})

router.afterEach((to, from) => {
    // 关闭所有的loading
    Loader.hide();
})

export default router