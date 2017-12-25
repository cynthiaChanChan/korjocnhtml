korjo.country = getParam('c');
korjo.title = getParam('w');
korjo.type = getParam('t');
korjo.parentid = getParam('parentid');
korjo.city = getParam('z');
korjo.cityId = getParam('zi');
korjo.period = getParam('s');
korjo.clickMenu = function() {
  $('.navigation').css('top', $('.header').height());
	darkenDiv();
	$('.infoMenu').on('click', 'img', function() {
		$('.navigation, #dark').fadeToggle(300);
		$('body').toggleClass('overflow');
	});

	$('#dark').click(function() {
		$('.navigation, #dark').fadeToggle(300);
		$('body').toggleClass('overflow');
	});	  
};

korjo.getFirstClass = function() {
  if (korjo.period === '1') {
    $('.infoGroup').text('旅行前-'+ korjo.city);
    $('.navigation li:nth-of-type(1)>a').addClass('active');        
  }

  if (korjo.period === '2') {
    $('.infoGroup').text('出发中-'+ korjo.city);
    $('.navigation li:nth-of-type(2)>a').addClass('active');        
  }

  if (korjo.period === '3') {
    $('.infoGroup').text('旅行中-'+ korjo.city);
    $('.navigation li:nth-of-type(3)>a').addClass('active');        
  }

  if (korjo.period === '4') {
    $('.infoGroup').text('旅行后-'+ korjo.city);
    $('.navigation li:nth-of-type(4)>a').addClass('active');        
  }
}

korjo.getParent = function(parentid, callback) {
  $.ajax({
    url: "http://korjo.fans-me.com/KorjoApi/GetTypeListByParentID?&parentid=" + parentid,
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

korjo.gatherParent = function() {
  korjo.getParent(korjo.parentid, function(response) {
    $.each(response, function(index, value) {
       if (value.id == korjo.type) {
          $('img', '.hotel_hd').attr('src',imgUrl(value.topimage));
          if (value.topname) {
            $('h2', '.hotel_hd').text(value.topname);
          } else {
            $('h2', '.hotel_hd').text(korjo.title);
          }
       }
    });
  });
}

korjo.getClasses = function(callback) {
  $.ajax({
    url: "http://korjo.fans-me.com/KorjoApi/GetTypeListByParentID?parentid=" + korjo.type,
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

 korjo.gatherClasses = function() {
    korjo.getClasses(function(response) {      
      var html = "";
      $.each(response, function(index, value) {
         var id = value.id;
         var type = value.typename;
         var image = value.image;
         var endUrl = encodeURIComponent(korjo.country)+'&ci='+getParam("ci")+'&w='+encodeURIComponent(type) + 
         '&z=' + korjo.city + '&zi=' + korjo.cityId +'&s=' + korjo.period +'&t=' + id+'&parentid=' + korjo.type;
         var url = "";
         if (value.topimage) {
            url = 'type.html?c=' + endUrl;
         } else {
            if (value.isone && value.isone != 0) {
              //如果只一个QA，直接去答案页
              url = 'detail.html?c='+encodeURIComponent(korjo.country)+'&ci='+getParam("ci")+
           '&z='+encodeURIComponent(korjo.city)+'&zi='+korjo.cityId+'&w='+encodeURIComponent(value.typename)+'&s='+getParam("s")+'&t='+id+'&d='+value.isone+'&image='+encodeURIComponent(image);
            } else {
              url = 'info.html?c=' + endUrl + '&image=' + encodeURIComponent(image);
            }
         }
         html += '<li><img src="'+imgUrl(image)+'" alt=""><div class="box">';
         html += '<div class="info"><a href="'+url+'">';
         html += '<span>'+type+'</span></div></a></div></li>';
      });

      $('ul','.hotel_bd').html(html);
    });
 };
$(function() {
  korjo.getFirstClass();
  var theUrl = 'period.html?c='+encodeURIComponent(korjo.country)+'&ci='+getParam("ci")+'&z='+encodeURIComponent(korjo.city)+'&zi='+korjo.cityId;
  $('#statue01').attr('href', theUrl);
  $('#statue02').attr('href', theUrl + '&p=2');
  $('#statue03').attr('href', theUrl + '&p=3');
  $('#statue04').attr('href', theUrl + '&p=4');
  korjo.clickMenu();
  korjo.gatherParent();
  korjo.gatherClasses();
  //如果返回到period.html，定位到某个阶段（p）,而不是出发前
  $(".back a img").click(function(e) {
      if (Number(getParam('parentid')) === 0) {
         e.preventDefault();
         window.location = theUrl + "&p=" + korjo.period;
      }
  });
});

//接口
//http://korjo.fans-me.com/KorjoApi/GetTypeListByParentID?parentid=
//http://korjo.fans-me.com/KorjoApi/GetTypeListByTravelStatus?travel_status=2&parentid=0