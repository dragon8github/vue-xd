import ajax from '../handleFetch.js'


/**
 * core methods
 * 获取用户信息(User_GetUserInfo)
 * 技术开发人员：余飞
 */
const User_GetUserInfo = () => {
 return ajax.postData('', {
     "Data": null,
     "MethodName":"User_GetUserInfo"
  });
}


/**
 * core methods
 * 修改密码(User_ChangePassword)
 * 技术开发人员：余飞
 */
const User_ChangePassword = (data) => {
 return ajax.postData('', {
     "Data": `{
        "OldPassword": "${data.OldPassword}",
        "NewPassword": "${data.NewPassword}",
        "ConfirmPassword": "${data.ConfirmPassword}",
     }`,
     "MethodName":"User_ChangePassword"
  });
}


/**
 * core methods
 * 用户反馈(User_SaveFeedback)
 * 技术开发人员：余飞
 */
const User_SaveFeedback = () => {
 return ajax.postData('', {
     "Data": `sample string 1`,
     "MethodName":"User_SaveFeedback"
  });
}

/**
 * core methods
 * 关于(User_GetAbout)
 * 技术开发人员：余飞
 */
const User_GetAbout = () => {
 return ajax.postData('', {
     "Data": null,
     "MethodName":"User_GetAbout"
  });
}


/**
 * （未完成）
 * core methods
 * 获取APP最新版本信息(Version_GetAppVersionInfo)
 * 技术开发人员：余飞
 */
const Version_GetAppVersionInfo = () => {
   return ajax.postData('', {
     "Data": `{
        "input_type":'null'
      }`,
      "MethodName":"Version_GetAppVersionInfo"
    });
}

/**
 * （未完成）
 * core methods
 * 获取用户有权限的列表(UserPermissions_UserModule)
 * 技术开发人员：蔡强
 */
const UserPermissions_UserModule = (isQuiet = false) => {
   return ajax.postData('', {
        "Data": null,
        "MethodName":"UserPermissions_UserModule"
   }, isQuiet);
}


/**
 * core methods
 * 上传文件（示例为头像）
 * 技术开发人员：余飞
 */
const Upload_Files = () => {
   return ajax.postData('', {
     "Data": `{"BusinessId":null,"FileBusinessType":3,"DocType":".png","Files":[{"Name":null,"ExtensionName":".png","Data":"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"}]}`,
     "MethodName":"File_UploadFiles"
    });
}

/**
 * core methods
 * 上传文件（示例为头像）
 * 技术开发人员：余飞
 */
const Account_Logout = () => {
   return ajax.postData('', {
     "Data": null,
     "MethodName":"Account_Logout"
    });
}


export default {
    User_GetUserInfo,
    User_ChangePassword,
    User_SaveFeedback,
    User_GetAbout,
    Version_GetAppVersionInfo,
    UserPermissions_UserModule,
    Upload_Files,
    Account_Logout
}