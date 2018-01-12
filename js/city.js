korjo.country = getParam('c');
korjo.countryId = getParam('ci');
korjo.statue = getParam('p');
korjo.currency = getParam('currency');

korjo.getCities = function(callback) {
  $.ajax({
    url: "https://www.korjo.cn/KorjoApi/GetCountryList?parentid=" + korjo.countryId ,
    method: "GET",
    dataType: "jsonp",
    jsonp: "data",
    success: function(result) {
      var remainItems = callback(result);
      var loading = false;
      //加载更多城市
      $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() >= $(document).height()) {
          if (!loading) {
            $('.cities').append(remainItems);
          }
          loading = true;
          $('#loadMore').hide();
        }
      });
    },
    error: function(error) {
        console.log("an error occured: " + error);
    }
  });
};

korjo.gatherCities = function() {
    $(".cityContainer").addClass("loading");
    korjo.getCities(function(response) {
       $(".cityContainer").removeClass("loading");
     	 var html = "";
       var remains = "";
     	 $.each(response, function(index,value) {
         var url = 'period.html?c='+encodeURIComponent(korjo.country)+"&ci="+korjo.countryId+'&p='+korjo.statue+'&z='+
         encodeURIComponent(value.geography)+'&zi='+value.id + '&currency=' + korjo.currency;
         var list = '<li class="oneCity" style="background-image: url('+imgUrl(value.image)+');"><div>'+ value.geography + '</div></li></a>';
     	 	 if (index < 10) {
     	 		  html += '<a href="' + url +'">';
            html += list;
     	 	 } else {
            remains += '<a href="' + url +'">';
            remains += list;

     	   }
       });
       $('.cities').html(html);
       if(remains) {
          korjo.addLoadMore();
       }
       return remains;
   });
};

korjo.addLoadMore = function(){
	$('.cityContainer').append('<div id="loadMore">向上滑动加载更多</div>')
}

$(function() {
	$('.chosenCity').text(korjo.country);
	korjo.gatherCities();
});

//接口
//https://www.korjo.cn/KorjoApi/GetCountryList?parentid=5
