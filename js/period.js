korjo.city = getParam('z');
korjo.cityId = getParam('zi');
korjo.country = getParam('c');
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
    url: "http://korjo.fans-me.com/KorjoApi/GetTypeListByTravelStatus?parentid=0&travel_status=" + status,
    method: "GET",
    dataType: "jsonp",
    jsonp: "data",
    success: function(result) {
      callback(result);
    },
    error: function(error) {
        console.log("an error occured: " + error);
    }
  });
};

korjo.gatherType = function() {
  korjo.getType(1, function(result) {
     var html ="";
     $.each(result, function(key,value) {
        var id = value.id;
        var type = value.typename;
        var image = value.image;
        //港澳通行证，台湾通行证，入台证只在目的地为港澳台时显示
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
        if (type.length > 7) {type = type.substring(0,6);} 
        var endUrl = encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+'&w='+encodeURIComponent(type) + 
        '&z=' + korjo.city + '&zi=' + korjo.cityId +'&s=1&t=' + id+'&parentid=0';       
        var url = '';
         if (value.topimage) {
            url = 'type.html?c=' + endUrl;
         } else {
            url = 'info.html?c=' + endUrl + '&image=' + encodeURIComponent(image);
         }
        if (type.indexOf("重要提醒") > -1) {
            html += '<a href="'+url+'"><li class="subClass important"><img class="notice" src="">\
            <img class="typeImage" src="'+imgUrl(value.image)+'"><span>'+type+'</span></li></a>';
        }else {
            html += '<a href="'+url+'"><li class="subClass"><img class="typeImage" src="'+imgUrl(image)+'"><span>'+type+'</span></li></a>';
        }
     });     
      $("#trip_status01").html(html);
      var pos = $('.notice','#trip_status01').closest('a').position();
      //如果'提醒'位于中间偏左，提示图片：
      if (pos && pos.left < windowW/2) {
          $('.notice','#trip_status01').addClass('rightNotice').attr('src', 'images/beforeNotice.png');
      } else {
          $('.notice','#trip_status01').attr('src', 'images/duringNotice.png');
      }
  });
   korjo.getType(2, function(result) {
     var html ="";
     $.each(result, function(key,value) {
        var id = value.id;
        var type = value.typename;
        var image = value.image;        
        if (type.length > 7) {type = type.substring(0,6);}
        var endUrl = encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+'&w='+encodeURIComponent(type) +
         '&z=' + korjo.city + '&zi=' + korjo.cityId +'&s=2&t=' + id+'&parentid=0';
        var url = '';
        if (value.topimage) {
          url = 'type.html?c=' + endUrl;
        } else {
          url = 'info.html?c=' + endUrl + '&image=' + encodeURIComponent(image);
        }

       if (type.indexOf("紧急情况") > -1) {
            html += '<a href="'+url+'"><li class="subClass important"><img class="notice" src="">\
            <img class="typeImage" src="'+imgUrl(value.image)+'"><span>'+type+'</span></li></a>';
        }else {
            html += '<a href="'+url+'"><li class="subClass"><img class="typeImage" src="'+imgUrl(image)+'"><span>'+type+'</span></li></a>';
        }
     });
      $("#trip_status02").html(html);
      var pos = $('.notice','#trip_status02').closest('a').position();
      //如果'提醒'位于中间偏左，提示图片：
      if (pos && pos.left < windowW/2) {
          $('.notice','#trip_status02').addClass('rightNotice').attr('src', 'images/beforeNotice.png');
      } else {
          $('.notice','#trip_status02').attr('src', 'images/duringNotice.png');
      }
  });
  korjo.getType(3, function(result) {
     var html ="";
     $.each(result, function(key,value) {
        var id = value.id;
        var type = value.typename;
        var image = value.image;
        if (type.length > 7) {type = type.substring(0,6);}
        var endUrl = encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+'&w='+encodeURIComponent(type) + 
        '&z=' + korjo.city + '&zi=' + korjo.cityId +'&s=3&t=' + id+'&parentid=0';
        var url = '';
        if (value.topimage) {
           url = 'type.html?c=' + endUrl;
        } else {
           url = 'info.html?c=' + endUrl + '&image=' + encodeURIComponent(image);
        }
        html +=  '<a href="'+url+'"><li class="subClass"><img class="typeImage" src="'+imgUrl(image)+'"><span>'+type+'</span></li></a>';
     });
    $("#trip_status03").html(html);
  });
};

korjo.getType(4, function(result) {
     var html ="";
     $.each(result, function(key,value) {
        var id = value.id;
        var type = value.typename;
        var image = value.image;
        if (type.length > 7) {type = type.substring(0,6);}
        var endUrl = encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+'&w='+encodeURIComponent(type) + 
        '&z=' + korjo.city + '&zi=' + korjo.cityId +'&s=4&t=' + id+'&parentid=0';
       var url = '';
       if (value.topimage) {
          url = 'type.html?c=' + endUrl;
       } else {
          url = 'info.html?c=' + endUrl + '&image=' + encodeURIComponent(image);
       }
       if (type.indexOf("旅行后提醒") > -1) {
            html += '<a href="'+url+'"><li class="subClass important"><img class="notice" src="">\
            <img class="typeImage" src="'+imgUrl(value.image)+'"><span>'+type+'</span></li></a>';
        }else {
            html += '<a href="'+url+'"><li class="subClass"><img class="typeImage" src="'+imgUrl(image)+'"><span>'+type+'</span></li></a>';
        }
     });
     
      $("#trip_status04").html(html);
      var pos = $('.notice','#trip_status04').closest('a').position();
      //如果'提醒'位于中间偏左，提示图片：
      if (pos && pos.left < windowW/2) {
          $('.notice','#trip_status04').addClass('rightNotice').attr('src', 'images/beforeNotice.png');
      } else {
          $('.notice','#trip_status04').attr('src', 'images/duringNotice.png');
      }
});

$(function() {
    //pc iframe无法监控slider mousemove, 因此自动轮播
    if (!!navigator.userAgent.match(/AppleWebKit.*Mobile.*/)) {
      autoplay = false;
    }
    $('.chosenCity').text(korjo.country+'-'+korjo.city);
    korjo.gatherType();
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
// http://korjo.fans-me.com/KorjoApi/GetTypeListByTravelStatus?travel_status=2&parentid=0
//http://korjo.fans-me.com/KorjoApi/GetTypeListByParentID?parentid=28

