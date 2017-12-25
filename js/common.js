var korjo = {};

/// 根据屏幕宽度计算rem
function auto_rem(){
    var remScale;
    var desWidth = 320;

    mresize();
    setTimeout(mresize,300);
    window.addEventListener('resize',mresize,false);
    window.addEventListener('load',mresize,false);

    function mresize(){
        var innerWidth = window.innerWidth;
        if( !innerWidth ){ return false;}
        var fontsize = (innerWidth*20/desWidth)*(remScale?remScale:1);
        document.documentElement.style.fontSize = fontsize + 'px';
        // document.documentElement.style.fontSize = (fontsize>=40?40:fontsize) + 'px';

        //解决华为手机rem错乱的Bug
        if(document.body && !remScale){
            remScale = 1
            setTimeout(function(){
                remBox = document.createElement('div');
                document.body.appendChild(remBox);
                remBox.style.width = desWidth/20 + "rem";
                remBox.style.position = "absolute";
                remScale = innerWidth/remBox.offsetWidth;
                document.body.removeChild(remBox);
                mresize();
            },1)
        }
    }
}

// 相对地址转换为绝对地址
function imgUrl(url) {
    if (url.indexOf('http') != 0) {
        return 'http://korjo.fans-me.com' + url;
    }
    return url;
}

function imgTagUrl(str) {
    // console.log(str);
    return str.replace(/<img.*?src="\//gi, '<img src="http://korjo.fans-me.com/').replace(/<li><p>(.*?)<\/p><\/li>/gi, '<li>$1<\/li>');
}

// 判断是否微信
function isWx() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger' == true ? true : false;
}
// 获取链接参数
function getParam(paramName) {
    paramValue = "";
    isFound = false;
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
        arrSource = decodeURIComponent(this.location.search).substring(1, this.location.search.length).split("&");
        i = 0;
        while (i < arrSource.length && !isFound) {
            if (arrSource[i].indexOf("=") > 0) {
                if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                    paramValue = arrSource[i].split("=")[1];
                    isFound = true;
                }
            }
            i++;
        }
    }
    return paramValue;
}

var windowH = $(window).height();
var windowW = $(window).width();
function darkenDiv() {
    var bannerH = $('.header').height();
    var lightboxH = windowH - bannerH;
    $('#dark').height(lightboxH);
    $('#dark').css('top', bannerH);
}

$(function() {
    auto_rem();
});
 
