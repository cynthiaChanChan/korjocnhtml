korjo.slideShowTwo = function() {
	var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: 2500,
                autoplayDisableOnInteraction: false
    });
};
//旅游属性
korjo.getPros = function(callback) {
  $.ajax({
    url: "http://korjo.fans-me.com/KorjoApi/GetPropertyList?parentid=0",
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

korjo.gatherTheCity = function() {
     var queries = store.get('aLink');
     var propertyName = store.get('propertyName');
     console.log(queries);
     var keys = {};
     queries.replace(/([^=&]+)=([^&]*)/g, function(full, key, value) {
        keys[key] = value;
        return "";
     });
     console.log(keys);
     var period ="",
         statue = Number(keys['s']);
     switch(statue) {
     case 1:
         period = "旅行前";
         break;
     case 2:
         period = "出发中";
         break;
     case 3:
         period = "旅行中";
         break;
     case 4:
         period = "旅行后";
         break;
     default:
         period = "旅行前"; 
     }
     //如没有操作select页面,默认旅游属性是通用的
     if (!propertyName) {
        propertyName = "通用";
        korjo.getPros(function(response) {
            for (var i = 0, max = response.length; i < max; i += 1) {
                if (response[i].fullname.indexOf("通用") > -1 ) {
                    store.set('property', response[i].id);
                }
            }
        });  
     }
     var html = "";
     html += '<a href="info.html?' + queries + '"><div class="desCountry"><p id="desCity">' + keys['c'] + '-' + keys['z'] + '</p>';
     html += '<span id ="options">'+ (store.get('startGeo') || '国内') +'出发&nbsp;|&nbsp;'+propertyName+'&nbsp;|&nbsp;'+period+'-'+keys['w']+'</span>';
     html += '<img src="images/rec_arrow.png"></div></a>';
     $('#desCity_wrapper').html(html);
}


korjo.getRecommends = function(callback) {
    $.ajax({
    url: "http://korjo.fans-me.com/KorjoApi/GetCountryList?parentid=0",
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

korjo.gatherRecommends = function() {
   korjo.getRecommends(function(response) {
      var html = "";
      $.each(response, function(index, value) {
        if(value.status == 1) {
           html += '<a href="city.html?c='+value.geography+'&ci='+value.id+'"><li class="oneCountry" style="background-image: url('+imgUrl(value.image)+');"><div class="city_name">'+value.geography+'</div></li></a>';
        }
      });
      $('.countries').html(html);
   });
}

$(function() {
	korjo.slideShowTwo();
    korjo.gatherRecommends();
    var date = new Date();
    $('.month').text(date.getMonth() + 1 + '月');
    //如果有打开info.html页，才显示上次阅览信息
	if(localStorage.getItem('chosenOne')) {
      korjo.gatherTheCity();
	}
});
//http://korjo.fans-me.com/KorjoApi/GetCountryList?parentid=0