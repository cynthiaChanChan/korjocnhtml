/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */

wx.ready(function() {
    var shareData = {
        title: $("#wx-title").val(),
        desc: $("#wx-desc").val(),
        link: $("#wx-link").val(),
        imgUrl: $("#wx-img").val()
    };
    // 2. 分享接口
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {},
        cancel: function() {}
    });

    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
        title: shareData.title, // 分享标题
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        success: function() {},
        cancel: function() {}
    });

    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        success: function() {},
        cancel: function() {}
    });

    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        success: function() {},
        cancel: function() {}
    });
});

wx.error(function(res) {
    alert(res.errMsg);
});

$(document).ready(function() {
    var wxparam = '<input type="hidden" name="title" id="wx-title" value="Korjo，带我去旅行"/>';
    wxparam += '<input type="hidden" name="desc" id="wx-desc" value="KORJO，来自澳大利亚的旅行用品品牌。结合互联网基因，打造一个充满旅行情怀的生态圈，旨在为出行者提供舒适愉悦、安全便捷的旅行服务。" />';
    wxparam += '<input type="hidden" name="img" id="wx-img" value="https://www.korjo.cn/images/logo_social.jpg" />';
    wxparam += '<input type="hidden" name="link" id="wx-link" value="'+location.href+'" />';
    $("body").append(wxparam);
    /*
     * 注意：
     * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
     * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
     * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
     *
     * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
     * 邮箱地址：weixin-open@qq.com
     * 邮件主题：【微信JS-SDK反馈】具体问题
     * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
     */

    //异步获取token数据

    //Http接口不能调用，重新定义封装调用
    $.ajax({
        url: "http://letao.fans-me.com/CommonOauth/GetWeiXinCfgInfo?oauthid=1",
        data: {
            url: escape(location.href.split('#')[0])
        },
        type: "post",
        async: false,
        success: function(data) {
            if (data.success) {
                var str = "jsapi_ticket=" + data.ticket + "&noncestr=" + data.nonceStr + "&timestamp=" + data.timestamp + "&url=" + location.href.split('#')[0];
                var shaObj = new jsSHA("SHA-1", "TEXT");
                shaObj.update(str);
                data.hash = shaObj.getHash("HEX");
                wxConfig(data);
            }
        }
    });
});

function wxConfig(data) {
    // alert(JSON.stringify(data));
    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.hash,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice'
        ]
    });
}
