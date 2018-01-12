korjo.cityId = getParam('zi');
korjo.city = getParam('z');
korjo.type = getParam("t");
korjo.typeName = getParam("w");
korjo.answer = getParam("d");
korjo.period = getParam("s");
korjo.country = getParam('c');
korjo.currency = getParam('currency');
korjo.getTitle = function() {
  //只有旅途中需要传目的地geographyid
  var query = "";
  if (korjo.period === "3") {
     query = 'typeid=' + korjo.type +'&geographyid='+korjo.cityId+'&propertyid='+store.get('property');
  } else {
     query = 'typeid=' + korjo.type +'&propertyid='+store.get('property');
  }
  $.ajax({
    url: 'https://www.korjo.cn/KorjoApi/GetFQAListByTypeID?' + query,
    method: "GET",
    dataType: "jsonp",
    jsonp: "data",
    success: function(result) {
      $.each(result, function(index,value) {
        if(value.id == korjo.answer) {
          var fragment = document.createDocumentFragment();
          var title = $(fragment).append(value.title).text();
          $("#detailWrapper h1").text(title);
        }
      });
    },
    error: function(obj, text, error) {
        console.log("an error occured: " + text);
        console.log("error: ", error);
    }
  });
};

korjo.getPeriod = function() {
     var elem = $('#period');
         statue = Number(korjo.period);
     switch(statue) {
     case 1:
         elem.text('旅行前');
         break;
     case 2:
         elem.text('出发中');
         break;
     case 3:
         elem.text('旅行中');
         break;
     case 4:
         elem.text('旅行后');
         break;
     default:
         elem.text('旅行后');
     }
};

korjo.getAnswer = function(answerQuery) {
  $.ajax({
    url: "https://www.korjo.cn/KorjoApi/GetFQAAnswerListByDFQAID?" + answerQuery,
    method: "GET",
    dataType: "jsonp",
    jsonp: "data",
    success: function(result) {
      $("#detailWrapper").removeClass("loading");
      var html = "";
      var content ="";
      var url = "info.html?c="+encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+"&w="+encodeURIComponent(korjo.typeName)+"&z="+
      encodeURIComponent(korjo.city)+"&zi="+korjo.cityId+"&t="+korjo.type+"&s="+
      korjo.period+"&image="+encodeURIComponent(getParam("image")) + '&currency=' + korjo.currency;
      $.each(result, function(index,value) {
        var content = value.content;
        var fragment = document.createDocumentFragment();
        var text = $(fragment).append(imgTagUrl(content)).text();
        var textNoSpace = text.replace(/\s/g, "");
      	var date = value.addtime.split('T')[0];
        html += '<ul class="note"><li class="subGroup"><a id="period"',
        html += 'href="period.html?c='+encodeURIComponent(korjo.country)+"&ci="+getParam("ci")+'&p='+korjo.period+'&z='+encodeURIComponent(korjo.city)+
        '&zi='+encodeURIComponent(korjo.cityId)+ '&currency=' + korjo.currency+'">';
        html += '</a>&nbsp;&gt;&nbsp;<a id="info_title02" href="'+url+'"></a>&nbsp;</li>';
        html += '<li class="infoDate">'+date+'&nbsp;|&nbsp;</li>';
        html += '<li class="infoAuthor">'+value.username+'&nbsp;|&nbsp;</li>';
        html += '<li class="infoViewed"><img src="images/seen.png">'+value.browse_number+'</li></ul>';
        html += '<div class="articalLength">这个回答包含<span class="highLight">'+textNoSpace.length+'</span>个字'+'&nbsp;|&nbsp;预计需要<span class="highLight">'+Math.floor(textNoSpace.length / 200)+'</span>分钟浏览完</div>';
        html += '<div class="detailContainer">'+imgTagUrl(content)+'</div>';
      });
      $("#detailWrapper").append(html);
      $(".detailContainer img").wrap(function() {
        return '<a href="' + $(this).attr("src") + '" data-lightbox=' + $(this).attr("title") + '></a>';
      });
      $(".infoGroup").text(korjo.typeName);
      $('#info_title02').text(korjo.typeName);
      $("#info_title").attr("href", url);
      korjo.getPeriod();
    },
    error: function(obj, text, error) {
        console.log("an error occured: " + text);
        console.log("error: ", error);
    }
  });
};

function calcMarginFour() {
	var liWdith = $("#shareLists li").width();
	var shareW = $('ul.clear').width();
	margin = (shareW - 4*liWdith)/5;
	$('#shareLists').css('padding-left', margin);
	$('#shareLists li').css('margin-right', margin);
	$('#shareLists li:nth-child(4n+0)').css('margin-right', 0);
}

function wechatShare() {
	var wxmoment = $('.wxmoment');
  	$('#shareLists').on('click', '#moment', function(event) {
  		event.preventDefault();
		if (isWx()) {
			$('.shareGuide').fadeIn(300);
		}else{
			wxmoment.fadeIn(300);
		}
	});
	wxmoment.click(function() {
		wxmoment.fadeOut(300);
	});
    var weixin = $('.weixin');
    $('#shareLists').on('click', '#wechat', function(event) {
  		event.preventDefault();
		if (isWx()) {
			$('.shareGuide').fadeIn(300);
		}else{
			weixin.fadeIn(300);
		}
	});
	weixin.click(function() {
		weixin.fadeOut(300);
	});
	$('.shareGuide').click(function(){
		$(this).fadeOut(300);
	});
	//whatsapp在微信里打不开，提示
	$('#shareLists').on('click', '#whatsapp', function(event) {
		if(isWx()) {
			$('.wtsapp').fadeIn(300);
			$('.wtsapp').click(function() {
				$(this).fadeOut(300);
			});
		}
	});
}

$(function() {
  //lightbox.js
  lightbox.option({
      showImageNumberLabel: false,
      disableScrolling: true
  })
  $("#detailWrapper").addClass("loading");
  korjo.getTitle();
  var answerQuery = "fqaid=" + korjo.answer;
  //只有旅途中直接需要传目的地，因为一个问题根据不同的国家有不同的答案
  //其他的geography=true, 需要传
  if (korjo.period == 3 || getParam('geography')) {
      answerQuery += "&geographyid=" + korjo.cityId;
  }
  korjo.getAnswer(answerQuery);
	darkenDiv();
	$('.shareMenu').on('click', 'img', function() {
		if($('#sharing').css('display') == "none") {
			$('#sharing, #dark').fadeIn(300);
			calcMarginFour();
			$('body').addClass('overflow');
		}else{
			$('#sharing, #dark').fadeOut(300);
			$('body').removeClass('overflow');
		}
	});

	$('.cancelSharing').click(function() {
		$('#sharing, #dark').fadeOut(300);
		$('body').removeClass('overflow');
	});

	$(document).ajaxStop(function() {
	    var description = $("#info_title").text()+': '+$("#detailWrapper>h1").text();
	    var detailTitle = encodeURIComponent($('#detailWrapper>h1').text());
      var link = encodeURIComponent(window.location);
      var imgLink = encodeURIComponent('https://www.korjo.cn/images/logo_social.jpg');
	    console.log(description);
       // 社交网络按钮
	    //whatsapp
	  	$("#whatsapp").attr("href","whatsapp://send?text="+detailTitle+'-Korjo，带我去旅行 '+ link);
	  	//微信分享
		$("#wx-title").val('Korjo，带我去旅行');
		$("#wx-desc").val(description);
		$("#wx-link").val(location.href);
		$("#wx-img").val('https://www.korjo.cn/images/logo_social.jpg');
	  	wechatShare();
	  	//QQ
	  	var qqlink = 'http://connect.qq.com/widget/shareqq/index.html?url='+link+'&desc='+detailTitle+'&title=Korjo，带我去旅行&summary='+detailTitle+'&pics='+imgLink+'&style=101&width=62&height=46';
	  	$('#qq').attr('href', qqlink);
	  	//twitter
	  	var twilink = 'https://twitter.com/intent/tweet?text='+detailTitle+'&url='+link+'&hashtags=旅游';
	  	$('#twitter').attr('href', twilink);
	  	//facebook
	  	var fblink = 'https://www.facebook.com/sharer/sharer.php?sdk=joey&u=' + link +'&display=popup&ref=plugin&src=share_button';
	  	$('#facebook').attr('href', fblink);
	  	//linkedin
	  	var inlink = 'http://www.linkedin.com/shareArticle?url='+ link + '&title=' + detailTitle +'&summary=Korjo，带我去旅行';
	  	$('#linkedin').attr('href', inlink);
	  	//weibo
	  	var weilink = 'http://service.weibo.com/share/share.php?title=Korjo，带我去旅行:'+ detailTitle + '&url=' + link +'&source=bookmark&appkey=2992571369&pic='+imgLink+'&ralateUid=#_loginLayer_1490243723258';
	  	$('#weibo').attr('href', weilink);
	});

});

//接口
//https://www.korjo.cn/KorjoApi/GetFQAAnswerListByDFQAID?fqaid=3
//https://www.korjo.cn/KorjoApi/GetTypeListByParentID?parentid=28
//https://www.korjo.cn/KorjoApi/GetFQAListByTypeID?typeid=1&geographyid=目的地ID（可传可不传值）
