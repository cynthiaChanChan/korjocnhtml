korjo.city = getParam('z');
korjo.cityId = getParam('zi');
korjo.country = getParam('c');
korjo.currency = getParam('currency');
//要销签国家
korjo.visa = [
  '日本',
  '英国',
  '埃及',
  '意大利',
  '奥地利',
  '丹麦',
  '芬兰',
  '德国',
  '希腊',
  '荷兰',
  '挪威',
  '葡萄牙',
  '西班牙',
  '瑞典',
  '波兰',
  '捷克',
  '匈牙利',
  '法国',
  '比利时',
  '立陶宛'
];
//没有退税的国家，还有香港，澳门
korjo.tax = [
  '厄尔瓜多',
  '秘鲁',
  '玻利维亚',
  '卡塔尔',
  '突尼斯',
  '柬埔寨',
  '巴拿马',
  '老挝',
  '肯尼亚',
  '朝鲜',
  '关岛',
  '菲律宾',
  '开曼群岛',
  '印度',
  '哥斯达黎加',
  '巴西',
  '帕劳',
  '古巴',
  '伊朗',
  '缅甸',
  '马尔代夫'
]

var autoplay = 2500;
korjo.subslideShow = function(page) {
    var swiper = new Swiper('.swiper-container', {
        initialSlide: page,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        autoplay: autoplay,
        centeredSlides: true
    });
};

korjo.slideShow = function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        autoplay: autoplay,
        centeredSlides: true
    });
};

korjo.findSlide = function() {
    //period.html?p=3
    var p = getParam('p');

    if(p == '4') {
        korjo.subslideShow(3);

    }else if(p == '3') {
        korjo.subslideShow(2);

    }else if(p == '2') {
        korjo.subslideShow(1);

    }else {
        korjo.slideShow();
    }

};

korjo.lightbox = function() {
    var bannerH = $('.header').height();
    var lightboxH = windowH - bannerH;
    $('.lightbox').height(lightboxH);
    $('.lightbox').css('top', bannerH);
    $('.lightbox, #hint').fadeIn(1000);
};

korjo.hideNotice = function() {
    $('.notice').click(function(event) {
        console.log(event);
        event.stopPropagation();
        event.preventDefault();
        event.stop
        var $this = $(this);
        $this.fadeOut(300);
        $this.closest('.container').siblings('.lightboxForNotice').fadeOut(300);
    });
};
//重要提醒提示
korjo.popHint = function() {
    if(!store.get('watched')) {

        var height = $('.header').height();
        if (windowH > $('body').height()) {
           $('.lightboxForNotice').height(windowH - height);
           $('.swiper-slide').height(windowH - height);
        } else {
           $('.lightboxForNotice').height($('body').height() - height);
           $('.swiper-slide').height($('body').height() - height);
        }
        $('.lightboxForNotice').css('top', 0);
        korjo.lightbox();
        $('#hint').click(function() {
            $('.lightbox, #hint').fadeOut(300);
            if ($(".container li").hasClass("important")) {
               $('.lightboxForNotice, .notice').fadeIn(300);
            }
        });
       store.set('watched', 'one');
       korjo.hideNotice();
    }
};

korjo.getType = function(status, callback) {
  $.ajax({
    url: "https://www.korjo.cn/KorjoApi/GetTypeListByTravelStatus?parentid=0&travel_status=" + status,
    method: "GET",
    dataType: "jsonp",
    jsonp: "data",
    success: function(result) {
      callback(result);
    },
    error: function(obj, text, error) {
        console.log("an error occured: " + text);
        console.log("error: ", error);
    }
  });
};

korjo.showTypes = function(statueId, containerName) {
  korjo.getType(statueId, function(result) {
      var html ="";
      $.each(result, function(key,value) {
           var id = value.id;
           var type = value.typename;
           var image = value.image;
           //港澳通行证，台湾通行证，入台证只在目的地为港澳台时显示//旅行前
           if (statueId == 1) {
             if (value.typename == "港澳通行证" && korjo.city != "香港" && korjo.city != "澳门") {
                return;
             }
             if (value.typename == "台湾通行证" && (korjo.country.indexOf("台湾") == -1)) {
                return;
             }
             if (value.typename == "入台证" && (korjo.country.indexOf("台湾") == -1)) {
                return;
             }
             if (value.typename == "签证" || value.typename == "护照") {
               if (korjo.country.indexOf("台湾") > -1 || korjo.city == "香港" || korjo.city == "澳门") {
                 return;
               }
             }
           }
           //隐藏没有销签跟退税的国家
           if (statueId == 4 && value.typename == "退税") {
             if (korjo.city == "香港" || korjo.city == "澳门") {
                return;
             }
             if (korjo.tax.indexOf(korjo.country) > -1) {
                return;
             }

           }
           if (statueId == 4 && value.typename == "销签") {
             if (korjo.visa.indexOf(korjo.country) === -1) {
                return;
             }
           }
           if (type.length > 7) {
             type = type.substring(0,6);
           }
           var endUrl = encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+'&w='+encodeURIComponent(type) +
           '&z=' + korjo.city + '&zi=' + korjo.cityId +'&s=' + statueId + '&t=' + id+'&parentid=0' + '&currency=' + korjo.currency;
           var url = '';
           if (value.topimage) {
             url = 'type.html?c=' + endUrl;
           } else {
             url = 'info.html?c=' + endUrl + '&image=' + encodeURIComponent(image);
           }
           html += '<a href="'+url+'"><li class="subClass"><img class="typeImage" src="'+imgUrl(image)+'"><span>'+type+'</span></li></a>';
      });
      $(containerName).html(html);
  });
}

$(function() {
    $("#wx-desc").val("移动的随身攻略，带上我，带上钱包，你将轻松走遍世界的每一角落！");
    //pc iframe无法监控slider mousemove, 因此自动轮播
    if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
      autoplay = false;
    }
    $('.chosenCity').text(korjo.country+'-'+korjo.city);
    var allStatues = [{
      statueId: 1,
      containerName: '#trip_status01'
    }, {
      statueId: 2,
      containerName: '#trip_status02'
    }, {
      statueId: 3,
      containerName: '#trip_status03'
    }, {
      statueId: 4,
      containerName: '#trip_status04'
    }];
    //获取每个阶段的数据
    $.each(allStatues, function(idx, value) {
        korjo.showTypes(value.statueId, value.containerName);
    });
    //展示哪部分slide
    korjo.findSlide();
    $(document).ajaxStop(function() {
       //第一次进该页提示
       korjo.popHint();
    });
     //for coming.js
     store.set('backUrl', window.location.href);
     //返回按钮限制为返回到城市列表页，除了目的国家为中国时
     $(".back a img").click(function(e) {
       if (korjo.country != "中国") {
         e.preventDefault();
         window.location = "city.html?c=" + korjo.country + "&ci=" + getParam("ci");
       }
    });
});

// 接口
// https://www.korjo.cn/KorjoApi/GetTypeListByTravelStatus?travel_status=2&parentid=0
//https://www.korjo.cn/KorjoApi/GetTypeListByParentID?parentid=28
