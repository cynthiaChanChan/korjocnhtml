korjo.type = getParam("t");
korjo.statue = getParam("s");
korjo.typeName = getParam("w");
korjo.cityId = getParam("zi");
korjo.city = getParam("z");
korjo.country = getParam("c");
korjo.image = getParam("image");
korjo.currency = getParam("currency");
korjo.getquery = function(parameters, callback) {
  $.ajax({
    url: 'http://korjo.fans-me.com/KorjoApi/GetFQAListByTypeID' + parameters,
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

//确定是否需要在列表页区分城市目的地，1区分 0不区分
korjo.checkIsMultipleAnswers = function(id, callback) {
  $.ajax({
    url: "http://korjo.fans-me.com/korjoApi/GetIsGeography?typeid=" + id + "&geographyid=" + korjo.cityId,
    method: "GET",
    dataType: "json",
    jsonp: "data",
    success: function(result) {
      callback(result);
    },
    error: function(error) {
        console.log("an error occured: " + error);
    }
  });
}

korjo.getAnswer = function(answerQueryPrameters, callback) {
  $.ajax({
    url: 'http://korjo.fans-me.com/KorjoApi/GetFQAAnswerListByDFQAID' + answerQueryPrameters,
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

korjo.gatherquery = function(geo) {
  var comingUrl = 'coming.html?c='+korjo.country+'&z='+korjo.city+'&zi='+korjo.cityId;
  var getQueryPrameters = '?typeid=' +  korjo.type +'&propertyid=' + store.get('property');
  if (korjo.statue === '3' || geo == 1) {
    //只有旅途中直接需要目的地geographyid
     //确定是否需要在列表页区分城市目的地，1区分 0不区分
      getQueryPrameters += "&geographyid=" + korjo.cityId;
  }
  korjo.getquery(getQueryPrameters, function(response) {
      $(".infoContainer").removeClass("loading");
      if (response.length > 0) {
        var html = "";
        $.each(response,function(index, value) {
           var answerQueryPrameters = '?fqaid=' + value.id;
           var title = value.title.replace(/<\/?p>/g,"");
           var digest = value.digest.replace(/<\/?p>/g,"");
           var date = value.addtime.split('T')[0];
           var smallImg = value.shareimage || korjo.image;
           var detailUrl = 'detail.html?c='+encodeURIComponent(korjo.country)+'&ci='+getParam("ci")+
           '&z='+encodeURIComponent(korjo.city)+'&zi='+korjo.cityId+'&w='+encodeURIComponent(korjo.typeName)+'&s='+getParam("s")+'&t='+korjo.type+'&d='+value.id+'&image='+encodeURIComponent(smallImg) + '&currency=' + korjo.currency;
           if (korjo.statue === '3' || value.isgeography) {
              //只有旅途中直接需要目的地geographyid
              //确定是否需要在答案页区分城市目的地，true区分 false不区分
              answerQueryPrameters += "&geographyid=" + korjo.cityId;
              detailUrl += "&geography=true";
           }
           if (!digest) {
              korjo.getAnswer(answerQueryPrameters, function(res) {
                 if (res.length) {
                    var fragment = document.createDocumentFragment();
                    digest = $(fragment).append(imgTagUrl(res[0].content)).text();
                 }
              });
           }
           $(document).ajaxStop(function() {
              //如没答案则不显示
              if (digest) {
                  html += '<div class="oneInfo"><div class="infoContent clear">'
                  html += '<a href=' + detailUrl + '><h5>' + title + '</h5>';
                  html += '<div><img class="infoImg" src="'+imgUrl(smallImg)+'"><span class="answer ellipsis">'+digest+'</span></div></a></div>';
                  html += '<ul class="note"><li class="infoDate">'+date+'&nbsp;|&nbsp;&nbsp;</li><li class="infoAuthor">'+value.username+'</li></ul></div>';
              }
           });

        });
        $(document).ajaxStop(function() {
          $('.infoContainer').html(html);
          if (response.length == 2) {
            $('.infoContainer').append('<img id="noImg" src="images/no.png">');
          }
        });
      } else {
        window.location.href = comingUrl;
      }
    });
}
korjo.getStatue = function(statue) {
  $('.navigation li:nth-of-type(' + statue + ')>a').addClass('active');
};

korjo.clickNav = function() {
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
korjo.activateButton = function(target) {
  if (target.val()) {
      $(".calculate").addClass("active");
  } else {
      $(".calculate").removeClass("active")
  }
}

$(function() {
  $('.infoGroup').text(korjo.typeName);
  var theUrl = 'period.html?c='+encodeURIComponent(korjo.country)+'&ci='+getParam("ci")+'&z='+encodeURIComponent(korjo.city)+'&zi='+korjo.cityId + '&currency=' + korjo.currency;
  $('#statue01').attr('href', theUrl);
  $('#statue02').attr('href', theUrl + '&p=2');
  $('#statue03').attr('href', theUrl + '&p=3');
  $('#statue04').attr('href', theUrl + '&p=4');
  $(".infoContainer").addClass("loading");
  korjo.checkIsMultipleAnswers(korjo.type, function(res) {
    korjo.gatherquery(res);
  })
  korjo.getStatue(korjo.statue);
  korjo.clickNav();
  //for destination.js
  var aLink = decodeURIComponent(window.location.href).split('?')[1];
  store.set('aLink', aLink);
  localStorage.setItem('chosenOne', 'one');
  //如果返回到period.html，定位到某个阶段（p）,而不是出发前
  $(".back a img").click(function(e) {
      if (Number(getParam('parentid')) === 0) {
         e.preventDefault();
         window.location = theUrl + "&p=" + korjo.statue;
      }
  });
  //货币转换
    $(".currencyConverter .label").click(function(e) {
        $(this).addClass("active").siblings().removeClass("active");
    })
    $("#inputMoney").blur(function(e){
        korjo.activateButton($(this));
    });
    $("#inputMoney").keyup(function(e){
        korjo.activateButton($(this));
    });
    $(".calculate").click(function(e) {
        if($(this).hasClass("active")) {
            $(".result").removeClass("hide");
        } else {
            return;
        }
    });
});

//接口
//http://korjo.fans-me.com/KorjoApi/GetFQAListByTypeID?typeid=1&geographyid=目的地ID（可传可不传值） &propertyid=属性ID
//http://korjo.fans-me.com/KorjoApi/GetFQAListByTypeID?typeid=42&geographyid=17&propertyid=8
//http://korjo.fans-me.com/KorjoApi/GetTypeListByParentID?parentid=28
//http://korjo.fans-me.com/KorjoApi/GetFQAAnswerListByDFQAID?fqaid=15
