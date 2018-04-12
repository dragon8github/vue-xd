<template>
<div>
   <cs-header :header-title="'您需要什么帮助'" :has-back='true'></cs-header> 
   <div id="content">
        <div id="s1-1" class="content">
            注册后在认证步骤中提交信息，或点击［三］－［个人头像］进入个人信息页，在［ofo 称号］中选择［点我认证］。其中：<br />
            大陆个人认证：注册后，在认证步骤中，输入姓名及中华人民共和国身份证号码并提交；<br />
            师生用户提交姓名、学生证或教职工号及证件正面照。<br />
            非大陆个人用户：请您将申请材料发邮件到support@ofo.so进行人工审核流程。人工审核申请材料包括：您的姓名，证件号码及国籍（确保填写的信息与证件信息一致），并上传两张照片：本人手持有效证件（台胞证，护照，港澳通行证）的正面合影照和有效证件正面照。
        </div>
        <div id="s1-2" class="content">
            1）提交认证信息后，您将于 24 小时内收到认证审核结果的通知。<br />
            2）审核通过后，您的头像下方会显示“认证用户”称号。您也可点击［我的］－［个人头像］，进入个人信息页，在［ofo 称号］中查询认证状态及进度。
        </div>
        <div id="s1-3" class="content">
            1. 请检查您认证时输入的姓名及相关证件号码是否正确。<br />
            2. 若您没有中国身份证或多次提交实名认证信息失败，请与客服联系，进行人工审核流程。
        </div>
         <div id="s1-4" class="content">
            如果您在注册或登录时迟迟收不到短信验证码，可如下顺序检查：<br />
            1. 若您安装了短信拦截软件，如 360、手机管家等，可设置取消拦截或暂时删除短信拦截软件，再次获取验证码即可。<br />
            2. 若您未安装短信拦截软件，请您及时与客服联系。
        </div>
        <div id="s1-5" class="content">
            您的注册手机号即是您的唯一专属的优惠码，在注册时输入好友的优惠码，双方均可获得邀请奖励。如果您喜欢 ofo，热爱绿色出行，认可共享单车的理念，尽快邀请您的亲朋好友一起使用吧！
        </div>
        <div id="s1-6" class="content">
            通过页面左上角［三］－［个人头像］，进入个人信息页，点击［绑定的手机号］－［更改手机号］。
        </div>
        <div id="s2-1" class="content">
            ofo 共享单车无固定停车点，可随时取用，结束使用后，将车辆停放至道路两旁的安全区域，方便他人取用。
        </div>
        <div id="s2-2" class="content">
            1. 拨轮锁开锁时，拨动密码盘，使密码对准锁身黄色标准线，按下圆形按钮，即可成功开锁。<br />
            2. 键盘锁开锁时，输入密码，按下密码盘下方的按钮，即可成功开锁。
        </div>
        <div id="s2-3" class="content">
            1. 拨轮锁关锁时，滑动锁环上的滑动锁扣，直至锁环扣合。为了防止车辆被他人恶意使用，影响您的信用纪录，请记得拨动拨轮上的密码使其复位。<br />
            2. 键盘锁关锁时，滑动锁环上的滑动锁扣，直至锁环扣合。为了防止车辆被他人恶意使用，影响您的信用纪录，请记得按动键盘背面的按键复位密码。
        </div>
        <div id="s2-4" class="content">
            1. 当您在 ofo 用车界面上输入车牌号并获得解锁码后，页面开始显示 80 秒倒计时，在倒计时结束前，如果您发现车辆无法正常使用，可点击页面右上角［报修］－选择报修项目－［确认报修］<br />
            2. 如果在行驶途中发现车辆问题，可在［结束用车］－［支付订单］后，点击页面右下角［报修］－选择报修项目－［确认报修］
        </div>
        <div id="s3-1" class="content">
            1. 押金为使用 ofo 共享单车的保证金。押金可随时申请提现，原路退还。<br />
            2. 目前充值押金有两种方式：微信支付或支付宝支付。<br />
            3. 为保证押金缴纳及退还的流畅性，ofo 共享单车将押金与充值余额分开。<br />
            温馨提醒：<br />
            余额用于支付用车订单，永不过期。<br />
            余额可申请退还（参与充送金额等活动的充值金额可部分退款）。余额提现需求，可与客服人员联系。
        </div>
        <div id="s3-2" class="content">
            1. 北京，上海的校园认证用户在使用双号车时需要缴纳99元押金；<br />
            2. 南宁的校园认证用户需要缴纳99元押金；<br />
            3. 社会认证用户需要缴纳99元押金；
        </div>
        <div id="s3-3" class="content">
            充值请点击页面左上角［ 三 ］－［我的钱包］进行充值。
        </div>
        <div id="s3-4" class="content">
            ofo 支持押金退款即时到账，退款余额会返回原充值帐户。但具体退款时间长短可能会受支付宝或微信的流程影响，若超过一天押金仍未到账，请及时与客服人员联系。
        </div>
        <div id="s3-5" class="content">
            ofo 共享单车是由一群有梦想的学生创业团队创办的，计价方面：<br />
            师生认证用户 0.5 元/小时，非师生认证用户 1 元/小时（不满 1 小时的部分按 1 小时计费）。
        </div>
        <div id="s4-1" class="content">
             北京，上海两地的校内认证用户不能将校内的单号车骑出校外。<br />
        </div>
        <div id="s4-2" class="content">
            北京、上海、南宁以外的城市，校园用车时，无需缴纳押金，所有车辆均不允许骑出校外。
        </div>
        <div id="s4-3" class="content">
            在广州、深圳和厦门的社会用户用车需要交纳99元押金，校园用户用车时无需交纳押金。
        </div>
        <div id="s5-1" class="content">
            1. 红包可在支付订单时使用，享受相应的优惠，一笔订单最多使用一张红包优惠券。<br />
            2. 一个红包需一次性使用，不可分开使用。红包不可兑换现金、不设找零。<br />
            3. 红包使用需在有效期内使用，过期的优惠券不可使用。<br />
            4. 在特定的活动中，按照活动规则获得红包。<br />
            5. 同一张优惠券仅供一个用户使用，同一个帐号、手机号均视为同一用户。
        </div>
        <div id="s5-2" class="content">
            请按如下顺序检查：<br />
            1. 请确保邀请者与受邀者未使用同一设备；<br />
            2. 请确定受邀者通过您发给对方的链接进行注册，或正确输入了您的优惠码；<br />
            3. 如果您按照正常的邀请流程和规则邀请后，仍未获得红包，可以联系客服进行查实。
        </div>
        <div id="s7-1" class="content">
            1. 直接在微信公众号搜索 ofobike 或扫描以下二维码，进入 ofo 共享单车服务号，即可留言，并等待客服人员的回复。<br />
            2. 拨打客服电话 4001-507507
        </div>
        <div id="s7-2" class="content">
            您对 ofo 共享单车有任何的意见与建议，欢迎通过邮件与我们联系：support@ofo.so
        </div>
        <div id="s7-3" class="content">
            公共事务咨询及合作，请发邮件至GR@ofo.so。
        </div>
        <div id="s8-1" class="body-group content">
            <div class="group-content">
                <div class="ins-title">ofo 用车所含保险</div>
                <div class="con">
                    <div class="ins-float left">
                        <div class="ins-icon a"></div>
                        <div class="ins-subtitle">意外伤害医疗保障：</div>
                        在规范使用ofo共享单车的骑行过程中，被保险人遭到意外伤害，可申请报销因本次意外导致的医疗费用，上限1万元。
                        <a >查看详情 <link class="rippleJS" /></a>
                    </div>
                    <div class="ins-center"></div>
                    <div class="ins-float right">
                        <div class="ins-icon b"></div>
                        <div class="ins-subtitle">意外身残、身故赔偿：</div>
                        在规范使用ofo共享单车的骑行过程中，被保险人遭到意外伤害导致身残、身故，可申请最高50万元赔偿。
                        <a >查看详情 <link class="rippleJS" /></a>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="space"></div>
                <div class="ins-title">如何出险</div>
                <div class="con">
                    1. 用户需在发生事故的24小时之内拨打保险公司报案电话，报备案情。24小时报案专线：400-671-0225；<br />
                    2. 报备案情后，按保险公司要求提供相应理赔资料，经过判定符合赔付条件后，获得相应赔偿。
                </div>
            </div>
            <div class="btn-wrap">
                <a >
                    点我报案
                    <link class="rippleJS" />
                </a>
            </div>
        </div>
        <div id="s8-2" class="body-group content">
            <div class="group-content">
                <div class="ins-title">ofo 用车所含保险</div>
                <div class="con">
                    <div class="ins-float left">
                        <div class="ins-icon a"></div>
                        <div class="ins-subtitle">附加意外伤害医疗保险C款</div>
                        在规范使用 ofo 共享单车的骑行过程中，被保险人遭意外伤害，可申请报销合理且必要的医疗费用，经判定，若符合被保条件，可获得最高 10000 元赔偿。
                        <a >查看详情 <link class="rippleJS" /></a>
                    </div>
                    <div class="ins-center"></div>
                    <div class="ins-float right">
                        <div class="ins-icon b"></div>
                        <div class="ins-subtitle">旅行人身伤害意外保险</div>
                        在规范使用 ofo 共享单车的骑行过程中，被保险人遭受意外伤害、身故或残疾，可申请按国家标准赔偿，经判定，若符合被保条件，可获得最高 300000 元赔偿。
                        <a >查看详情 <link class="rippleJS" /></a>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="space"></div>
                <div class="ins-title">如何出险</div>
                <div class="con">
                    1. 报案电话专线：010-83506220；被保险人发生事故时，请先联系ofo客服，告知事故发生情况备案。同时请拨打保险理赔报案电话，报备案情并进行有效保险流程。<br />
                    2. 根据具体情况，提交相关资料，经过判定符合赔付条件后，可获得相应赔偿。
                </div>
            </div>
            <div class="btn-wrap">
                <a >
                    点我出险
                    <link class="rippleJS" />
                </a>
            </div>
        </div>
         <div id="s8-3" class="body-group content">
            <div class="ins-title">附加意外伤害医疗保险详细介绍</div>
            <div class="con">
            保险责任：<br />
            在本保险的保险期间内，仅在保险期间内使用ofo共享单车官方平台提供车辆骑行过程中，被保险人遭受主险责任范围内的意外伤害，在中华人民共和国境内（不含港、澳、台地区）二级以上（含二级）或保险人认可的医疗机构治疗所支出的符合本保险单签发地政府社会医疗保险主管部门规定可以报销的合理且必要的医疗费用，保险人按下列约定承担保险金给付责任：<br />
            2.1 保险人对于每次事故的医疗费用，在扣除100元免赔额后按80％的给付比例、或按保险单约定的免赔额及给付比例，在保险金额内给付意外伤害医疗保险金。保险期间届满被保险人治疗仍未结束的，保险人继续承担保险金给付保险责任，除另有约定外，住院治疗者最长至意外伤害发生之日起第一百八十日止，门诊治疗者最长至意外伤害发生之日起第十五日止。<br />
            2.2 在保险期间内，保险人按照本条约定对被保险人所负的意外伤害医疗保险金给付责任以保险单所载该被保险人的意外伤害医疗保险金额为限，一次或累计给付的保险金达到意外伤害医疗保险金额时，保险人对该被保险人的本条保险责任终止。<br />
            2.3 本保险为费用补偿型保险，适用医疗费用补偿原则。若被保险人除本保险外还可从其它保险计划（包括农村合作医疗保险、社会基本医疗保险、工作单位、本公司在内的任何商业保险机构等）获得医疗费用补偿，保险人以意外伤害医疗保险金额为限，对被保险人获得补偿后的医疗费用的余额按照约定给付保险金。
            </div>
        </div>
        <div id="s8-4" class="body-group content">
            <div class="ins-title">旅行人身意外伤害保险详细介绍</div>
            <div class="con">
            保险责任：<br />
            仅在保险期间内使用ofo共享单车官方平台提供车辆骑行过程中，被保险人遭受意外伤害，保险人（中国太平洋财产保险股份有限公司北京分公司）按下列约定给付保险金。<br />
            本保险所称意外伤害，指以外来的、突发的、非故意的和非疾病的客观事件为直接且单独的原因致使被保险人身体受到的伤害。<br />
            1.1 身故保险责任<br />
            被保险人自意外伤害发生之日起180日内以该次意外伤害为直接原因身故的，保险人按保险单所载该被保险人意外伤害保险金额给付身故保险金。<br />
            被保险人因遭受意外伤害事故且自该事故发生日起下落不明，后经中华人民共和国法院宣告死亡的，保险人按保险金额给付身故保险金。但若被保险人被宣告死亡后生还的，保险金申请人应于知道或应当知道被保险人生还后30日内退还保险人给付的身故保险金。<br />
            被保险人身故或被宣告死亡前保险人已给付本条款约定的残疾保险金的，身故保险金应扣除已给付的残疾保险金。<br />
            1.2 残疾保险责任<br />
            被保险人自意外伤害发生之日起180日内以该次意外伤害为直接原因致本保险所附《人身保险伤残评定标准》（中保协发〔2013〕88号）所列残疾之一的，保险人按本保险所载的该被保险人意外伤害保险金额及该项残疾所对应的给付比例给付残疾保险金。如自意外伤害发生之日起第180日时治疗仍未结束，按第180日的身体情况进行鉴定，并据此给付残疾保险金。如被保险人的残疾程度不在所附《人身保险伤残评定标准》之列，保险人不承担给付残疾保险金责任。<br />
            当同一保险事故造成两处或两处以上伤残时，应首先对各处伤残程度分别进行评定，如果几处伤残等级不同，以最重的伤残等级作为最终的评定结论；如果两处或两处以上伤残等级相同，伤残等级在原评定基础上最多晋升一级，最高晋升至第一级。同一部位和性质的伤残，不应采用该标准条文两条以上或者同一条文两次以上进行评定。<br />
            对于不同保险事故造成的伤残，本次保险事故导致的伤残合并前次伤残可领较严重等级伤残保险金者，按较严重等级标准给付，但前次已给付的伤残保险金（投保前已患或因责任免除事项所致附件所列的伤残视为已给付伤残保险金）应予以扣除。<br />
            1.3 保险人对被保险人所负身故、残疾保险金给付责任以保险单所载被保险人的意外伤害保险金额为限，一次或累计给付的保险金达到意外伤害保险金额时，保险人对被保险人的保险责任终止。
            </div>
        </div>
        <div id="s8-5" class="body-group content">
            <div class="ins-title">附加意外伤害医疗保险C款</div>
            <div class="con">
            保险责任：<br />
            在本保险合同的保险期间内，被保险人遭受主险合同责任范围内的意外伤害，在中华人民共和国境内（不含港、澳、台地区）二级以上（含二级）或保险人认可的医疗机构治疗所支出的合理且必要的医疗费用，保险人按下列约定承担保险金给付责任：<br />
            2.1 保险人对于每次事故的医疗费用，按保险单约定的给付范围、免赔额及给付比例，在保险单所载该被保险人意外伤害医疗保险金额内给付意外伤害医疗保险金。保险期间届满被保险人治疗仍未结束的，保险人继续承担保险金给付保险责任，除另有约定外，住院治疗者最长至意外伤害发生之日起第一百八十日止，门诊治疗者最长至意外伤害发生之日起第十五日止。<br />
            2.2 在保险期间内，保险人按照本条约定对被保险人所负的意外伤害医疗保险金给付责任以保险单所载该被保险人的意外伤害医疗保险金额为限，一次或累计给付的保险金达到意外伤害医疗保险金额时，保险人对该被保险人的本条保险责任终止。<br />
            2.3 本保险合同为费用补偿型保险合同，适用医疗费用补偿原则。若被保险人除本保险合同外还可从其它保险计划（包括农村合作医疗保险、社会基本医疗保险、工作单位、本公司在内的任何商业保险机构等）获得医疗费用补偿，保险人以意外伤害医疗保险金额为限，对被保险人获得补偿后的医疗费用的余额按照合同约定给付保险金。
            </div>
        </div>
        <div id="s8-6" class="body-group content">
            <div class="ins-title">旅行人身意外伤害保险详细介绍</div>
            <div class="con">
                在本保险合同的保险期间内，在特别约定中约定的场景下，被保险人遭受意外伤害，保险人按下列约定给付保险金。<br />
                本保险合同所称意外伤害，指以外来的、突发的、非故意的和非疾病的客观事件为直接且单独的原因致使被保险人身体受到的伤害。<br />
                1.1 身故保险责任<br />
                被保险人自意外伤害发生之日起180日内以该次意外伤害为直接原因身故的，保险人按保险单所载该被保险人意外伤害保险金额给付身故保险金。<br />
                被保险人因遭受意外伤害事故且自该事故发生日起下落不明，后经中华人民共和国法院宣告死亡的，保险人按保险金额给付身故保险金。但若被保险人被宣告死亡后生还的，保险金申请人应于知道或应当知道被保险人生还后30日内退还保险人给付的身故保险金。<br />
                被保险人身故或被宣告死亡前保险人已给付本条款约定的残疾保险金的，身故保险金应扣除已给付的残疾保险金。<br />
                1.2 残疾保险责任<br />
                被保险人自意外伤害发生之日起180日内以该次意外伤害为直接原因致本保险合同所附《人身保险伤残评定标准》（中保协发〔2013〕88号）所列残疾之一的，保险人按本保险合同所载的该被保险人意外伤害保险金额及该项残疾所对应的给付比例给付残疾保险金。如自意外伤害发生之日起第180日时治疗仍未结束，按第180日的身体情况进行鉴定，并据此给付残疾保险金。如被保险人的残疾程度不在所附《人身保险伤残评定标准》之列，保险人不承担给付残疾保险金责任。<br />
                当同一保险事故造成两处或两处以上伤残时，应首先对各处伤残程度分别进行评定，如果几处伤残等级不同，以最重的伤残等级作为最终的评定结论；如果两处或两处以上伤残等级相同，伤残等级在原评定基础上最多晋升一级，最高晋升至第一级。同一部位和性质的伤残，不应采用该标准条文两条以上或者同一条文两次以上进行评定。<br />
                对于不同保险事故造成的伤残，本次保险事故导致的伤残合并前次伤残可领较严重等级伤残保险金者，按较严重等级标准给付，但前次已给付的伤残保险金（投保前已患或因责任免除事项所致附件所列的伤残视为已给付伤残保险金）应予以扣除。<br />
                1.3 保险人对被保险人所负身故、残疾保险金给付责任以保险单所载被保险人的意外伤害保险金额为限，一次或累计给付的保险金达到意外伤害保险金额时，保险人对被保险人的保险责任终止。
            </div>
        </div>
        <div id="home" class="home">
            <div class="container">
                <div class="hint">猜您遇到了以下问题</div>
                <div class="menu-wrap">
                    <div class="menu-group">
                        <div class="menu-title more">注册与账户</div>
                        <div class="menu-list">
                            <a class="menu-item" >实名认证<link class="rippleJS" /></a>
                            <a class="menu-item" >怎样算完成认证？<link class="rippleJS" /></a>
                            <a class="menu-item" >实名认证无法通过怎么办？<link class="rippleJS" /></a>
                            <a class="menu-item" >无法获取短信验证码怎么办？<link class="rippleJS" /></a>
                            <a class="menu-item" >什么是优惠码？<link class="rippleJS" /></a>
                            <a class="menu-item" >如何更换手机号？<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group">
                        <div class="menu-title more">开锁与结束</div>
                        <div class="menu-list">
                            <a class="menu-item" >如何取车与停车<link class="rippleJS" /></a>
                            <a class="menu-item" >如何开锁？<link class="rippleJS" /></a>
                            <a class="menu-item" >如何关锁与复位密码<link class="rippleJS" /></a>
                            <a class="menu-item" >如何报修<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group">
                        <div class="menu-title more">押金与车费</div>
                        <div class="menu-list">
                            <a class="menu-item" >押金是什么，与余额有何不同？<link class="rippleJS" /></a>
                            <a class="menu-item" >押金规则<link class="rippleJS" /></a>
                            <a class="menu-item" >如何充值<link class="rippleJS" /></a>
                            <a class="menu-item" >押金提现需要多久到账？<link class="rippleJS" /></a>
                            <a class="menu-item" >使用 ofo 共享单车如何计费？<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group height48px">
                        <div class="menu-title height48px" style="padding:0;">用车规则</div>
                        <div class="menu-list height48px">
                            <a class="menu-item" >北京市、上海市规则<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group">
                        <div class="menu-title">红包问题</div>
                        <div class="menu-list">
                            <a class="menu-item" >红包使用规则<link class="rippleJS" /></a>
                            <a class="menu-item" >邀请好友后，为何没有获得奖励红包？<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group">
                        <div class="menu-title more">联系我们</div>
                        <div class="menu-list">
                            <a class="menu-item" >如何与客服人员联系？<link class="rippleJS" /></a>
                            <a class="menu-item" >公共事务相关<link class="rippleJS" /></a>
                            <a class="menu-item" >意见与反馈<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group height48px">
                        <div class="menu-title height48px" style="padding:0;">保险相关</div>
                        <div class="menu-list">
                            <a class="menu-item" >骑行过程中意外受伤如何出险？<link class="rippleJS" /></a>
                        </div>
                    </div>
                    <div class="menu-group height48px">
                        <div class="menu-title height48px" style="padding:0;">用户协议</div>
                        <div class="menu-list height48px">
                            <a class="menu-item" >用户协议<link class="rippleJS" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import csHeader from 'mycomponents/Header.vue'
export default {
  name: 'help',
  data () {
    return {

    };
  },
  components: {
      csHeader,
  },
  methods: {
    // 由于使用了rem解决方案，所有的像素大小都需要按照此公式转换为rem
    rem (v) {
        return v / this.$store.getters.fontSize * this.$store.getters.dataDpr + 'rem'
    }    
  },
  created () {
    let self = this;
    // 等待dom加载完成之后再执行代码段
    this.$nextTick( _ => {
         var menuTitle = document.getElementsByClassName('menu-title');
         var menuList = document.getElementsByClassName('menu-list');
         var aMenuTitle = Array.prototype.slice.apply(menuTitle);
         aMenuTitle.forEach(function(ele,ind) {
             ele.addEventListener('click', function() {
                 // 获取当前点击元素的类名
                 var classN = this.className;
                 // 动态获取子元素的高度。由于子元素的高度都是一样的。所以我随便获取了一个
                 var h =  menuList[ind].getElementsByClassName('menu-item')[0].offsetHeight / self.$store.getters.dataDpr
                 // 如果当前元素正处于展开状态
                 if (classN.includes('active')) {
                    // 那么还原高度(默认显示两个子元素，所以高度就是h * 2)
                    var height = self.rem(h * 2)
                    // 设置高度
                    this.parentNode.style.height = height;
                    // 移除旋转箭头动画效果
                    this.className = classN.replace(' active',''); 
                 } else {
                    // 获取子元素的数量
                    var len = menuList[ind].getElementsByClassName('menu-item').length; 
                    // 每一个子元素总行高
                    var height =  self.rem(len * h)
                    // 设置高度
                    this.parentNode.style.height = height;
                    // 加入旋转动画效果
                    this.className = classN.concat(' active');
                 }
             }, false);
         })
    })
  }
};
</script>

<style lang="scss" scoped>
  @import "./../../sass/variables";
  @import "./../../sass/func";
      #content {
        padding-top:pxToRem(86px);
      }
      * {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          font-family: sans-serif;
          -webkit-overflow-scrolling: touch;
        }
        html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #fff;
        }
         .clear {
            clear: both;
        }
        a{
            text-decoration: none;
            color: #40320D;
        }
        #body{
            width: 100%;
            height: 100%;
            position: relative;
            background: #fff;
        }
        .home{
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
        }
        .container{
            width: 100%;
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
            padding-bottom: 100px;
        }
        .home .tel-btn{
            background: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            box-sizing: border-box;
            height: 100px;
            padding-bottom: 0;
        }
        .hint{
            height: pxToRem(30px * 2);
            line-height: pxToRem(30px * 2);
            padding-left: pxToRem(12px * 2);
            font-size: pxToRem(14px * 2);
            color: rgba(64,50,13,0.60);
            background: #F6F6F6;
        }
        .menu-wrap{
            border-bottom: 1px solid #D8D8D8;
        }
        .menu-group{
            width:100%;
            height: pxToRem(96px * 2);
            overflow: hidden;
            display: flex;
            background: #fff;
            -webkit-transition: height 0.2s linear;
            transition: height 0.2s linear;
        }
        .menu-title{
            width: pxToRem(80px * 2);
            font-size: pxToRem(14px * 2);
            text-align: center;
            line-height: pxToRem(16px * 2);
            padding-top: pxToRem(35px * 2);
            border-top: 1px solid #D8D8D8;
            position: relative;
        }
        .more::after{
            content: '';
            display: block;
            width: pxToRem(7px * 2);
            height: pxToRem(7px * 2);
            border-left: 1px solid #40320D;
            border-bottom: 1px solid #40320D;
            position: absolute;
            top: pxToRem(68px * 2);
            left: pxToRem(37px * 2);
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            -webkit-transition: transform 0.2s linear;
            transition: transform 0.2s linear;
        }
        .menu-title.active::after{
            -webkit-transform: rotate(-225deg);
            transform: rotate(-225deg);
        }
        .menu-list{
            -webkit-box-flex: 1;   /* OLD - iOS 6-, Safari 3.1-6 */  
            -moz-box-flex: 1;     /* OLD - Firefox 19- */              
            -webkit-flex: 1;      /* Chrome */  
            -ms-flex: 1;         /* IE 10 */  
            flex: 1;
            font-size: pxToRem(14px * 2);
            color: #40320D;
        }
        .menu-item{
            display: block;
            position: relative;
            height: pxToRem(48px * 2);
            line-height: pxToRem(48px * 2);
            padding-left: pxToRem(15px * 2);
            border-top: 1px solid #D8D8D8;
            border-left: 1px solid #D8D8D8;
            -webkit-box-sizing: border-box;
        }
        .btn-wrap{
            width: 100%;            
            padding: pxToRem(20px * 2) pxToRem(16px * 2);
            box-sizing: border-box;
        }
        .btn-wrap a{
            display: block;
            width: 100%;
            height: pxToRem(40px * 2);
            background: #ffd430;
            text-align: center;
            line-height: pxToRem(40px * 2);
            font-size: pxToRem(16px * 2);
            border-radius: 2px;
            position: relative;
        }
        .btn-wrap span{
            display: block;
            font-size: pxToRem(12px * 2);
            padding: pxToRem(10px * 2) 0;
            text-align: center;
        }
        #call{
            display: block;
            width: 100%;
            height: pxToRem(48px * 2);
            background: #FFD900;
            text-align: center;
            line-height: pxToRem(48px * 2);
            font-size: pxToRem(16px * 2);
            position: relative;
        }
        #call::before{
            display: inline-block;
            content: '';
            width: pxToRem(24px * 2);
            height: pxToRem(24px * 2);
            background-image: url(./../../images/shape.png);
            background-repeat: no-repeat;
            background-size: contain;
            vertical-align: middle;
        }
        .content{
            display: none;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            font-size: pxToRem(14px * 2);
            line-height: pxToRem(22px * 2);
            padding: pxToRem(12px * 2);
            -webkit-box-sizing: border-box;
        }
        #home, .content:target {
            display: block;
        }
        .content:target ~ #home {
            display: none !important;
        }
        
        /* insurance section */
        .body-group {
            display: none;
            padding-top: pxToRem(8px * 2);
            position: relative;
        }
        .body-group.content{
            padding: 0;
        }
        .group-content {
            width: 100%;
        }
        .footer {
            background: #fff;
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
        }
        .space{
            height: pxToRem(16px * 2);
            background: #F6F6F6;
        }
        .con{
            padding: pxToRem(12px * 2) pxToRem(16px * 2);
        }
        .ins-title {
            color: #000;
            font-size: pxToRem(16px * 2);
            line-height: pxToRem(24px * 2);
            padding: pxToRem(8px * 2) pxToRem(16px * 2);
            background: #fff;
            border-bottom: 1px solid #ddd;
        }
        .ins-float {
            width: 50%;
            float: left;
            box-sizing: border-box;
        }
        .ins-float.left {
            padding-right: pxToRem(8px * 2);
        }
        .ins-float.right {
            padding-left: pxToRem(8px * 2);
        }
        .ins-icon {
            width: 50%;
            margin: auto;
            position: relative;
            padding-top: 50%;
            border-radius: 50%;
            background-color: #f2f2f2;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 40%;
        }
        .ins-float a {
            background: #ffd430;
            font-size: pxToRem(15px * 2);
            border-radius: 3px;
            display: block;
            height: pxToRem(36px);
            line-height: pxToRem(36px * 2);
            text-decoration: none;
            margin-top: pxToRem(8px * 2);
            text-align: center;
            position: relative;
        }
        .ins-subtitle {
            font-size: pxToRem(15px * 2);
            margin-bottom: pxToRem(4px * 2);
            margin-top: pxToRem(8px * 2);
        }
        .height48px {
          height:pxToRem(48px * 2);
          line-height:pxToRem(48px * 2);
        }
</style>