$(function() {
	init();
	initEvent();
});

korjo.getChinaCities = function(callback) {
  $.ajax({
    url: "http://korjo.fans-me.com/KorjoApi/GetChinaCityList",
    method: "GET",
    dataType: "json",
    success: function(result) {
      callback(result);
    },
    error: function(error) {
        console.log("an error occured: " + error);
    }
  });
};

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


korjo.getCountries = function(callback) {
  $.ajax({
    url: "https://korjo.fans-me.com/KorjoApi/GetContinentTree",
    method: "GET",
    dataType: "json",
    success: function(result) {
      callback(result);
    },
    error: function(error) {
        console.log("an error occured: " + error);
    }
  });
};

korjo.setPicker = function() {
   korjo.getChinaCities(function(response) {
      var data = [];
      var id = 0;
      var chosenIndex = 0
      $.each(response, function(index,value) {
      	//默认显示广东省
        if (value.geography == "广东省") {
            chosenIndex = index;
        }
      	id += 1;
        data[index] = {
        	id: id,
            geography: value.geography,
            TreeList: value.TreeList
        };
      });
      var mobileSelect1 = new MobileSelect({
	    trigger: '.startPlace', 
	    title: '',  
	    wheels: [{data: data}],
	    position: [chosenIndex,1], //初始化定位 打开时默认选中的哪个 如果不填默认为0
	    transitionEnd:function(indexArr, data){
	        
	    },
	    callback:function(indexArr, data){
	        store.set('startGeo', data[1].geography);
		    store.set('startGeoId', data[1].id);
		    if ($('.endPlace h3').html() != '海外') {
				$('.btn_next').addClass('active');
			}
	    }
	 });    
   });
}

korjo.setPicker1 = function() {
   korjo.getCountries(function(response) {
      var data = [];
      var id = 0;
      var chosenIndex = 0
      $.each(response, function(index,value) {
      	//默认显示亚洲
      	if (value.geography == "亚洲") {
            chosenIndex = index;
        }
        id += 1;
      	data[index] = {
        	id: id,
            geography: value.geography,
            TreeList: value.TreeList
        };  
      });
      var mobileSelect1 = new MobileSelect({
	    trigger: '.endPlace', 
	    title: '',  
	    wheels: [{data: data}],
	    position:[chosenIndex,1], //初始化定位 打开时默认选中的哪个 如果不填默认为0
	    transitionEnd:function(indexArr, data){
	        
	    },
	    callback:function(indexArr, data){
	    	console.log(data);
	        store.set('country', data[1].geography);
			store.set('countryId', data[1].id);
			if ($('.startPlace h3').html() != '国内') {
				$('.btn_next').addClass('active');
		    }
	    }
	 });    
   });
}

korjo.setPicker2 = function() {
    korjo.getPros(function(response) {
      var data = [];
      $.each(response, function(index,value) {
      	var id = value.id;
      	var property = value.property;
        data[index] = {
        	id: id,
            geography: property
        };
        if(property.indexOf('通用') > -1) {
        	store.set('property', id);
        	store.set('propertyName', '通用');
        }
      });
  //     var mobileSelect1 = new MobileSelect({
	 //    trigger: '#property', 
	 //    title: '',  
	 //    wheels: [{data: data}],
	 //    position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
	 //    transitionEnd:function(indexArr, data){
	        
	 //    },
	 //    callback:function(indexArr, data){
	 //        store.set('property', data[0].id);
		//     store.set('propertyName', data[0].geography);
	 //    }
	 // });    
   });
}

korjo.setPicker3 = function() {
   korjo.getCountries(function(response) {
   	 if($('.touristStep .select').text() == '出发前') {
        store.set('statue', 1);
      }
      var data = [{id: 1, geography: '旅行前'}, {id: 2, geography: '出发中'}, {id: 3, geography: '旅行中'}, {id: 4, geography: '旅行后'}];
      var mobileSelect1 = new MobileSelect({
	    trigger: '#travelStep', 
	    title: '',  
	    wheels: [{data: data}],
	    position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
	    transitionEnd:function(indexArr, data){
	        
	    },
	    callback:function(indexArr, data){
	    	console.log(data);
	        store.set('statue', data[0].id);
	    }
	 });    
   });
}

function init(){
	if(!localStorage.getItem('onetime')) {
		$('.popup').show();
	    $('.popup .arrow-down').slideDown(500,function(){
			$(this).next().fadeIn(1000,function(){
		    $(this).next().fadeIn(1000);
			});
		});
		localStorage.setItem('onetime', 'one');
	}
}
function initEvent() {
	localStorage.setItem('firstShow', 'yes');
	$('.btn_sure').click(function(){
		$('.popup').hide();
	});
	$('.reverseDest').click(function() {
		$('.select_hd ul').append($('.select_hd li').eq(0)).prepend($('.select_hd li').eq(1));
		$('.select_hd li').eq(0).find('h2').html('出发地');
		$('.select_hd li').eq(2).find('h2').html('目的地');
	});

	korjo.setPicker();
	korjo.setPicker1();
	korjo.setPicker2();
	korjo.setPicker3();
	$('.btn_next').click(function(event) {
		if($(this).hasClass('active')) {
			if($('.startPlace h2').text() == '目的地') {
				//如果目的地是国内城市，直接去类型患,不到城市页
				var chinaCity = store.get('startGeo');
				store.set('countryId', store.get('startGeoId'));
				store.set('startGeo', store.get('country'));
				store.set('country', '中国');
				window.location.href = 'period.html?c='+encodeURIComponent('中国')+'&z='+encodeURIComponent(chinaCity)+'&zi='+store.get('countryId')+'&p='+store.get('statue');
			}else {
                window.location.href = 'city.html?c='+encodeURIComponent(store.get('country'))+'&ci='+store.get('countryId');
			}
		} else {
			$(".lightbox").fadeIn();
			$(".lightbox").click(function(e) {
				$(".lightbox").fadeOut();
			})
		}
	});
	
}

//接口
//http://korjo.fans-me.com/KorjoApi/GetPropertyList?parentid=0
//http://korjo.fans-me.com/KorjoApi/GetCountryList?parentid=0
//http://korjo.fans-me.com/KorjoApi/GetChinaCityList