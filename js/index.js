function mySwiper() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        centeredSlides: true,
        onSlideChangeStart: function(swiper) {
        	if(swiper.activeIndex == 1) {
        		$('.swiper-pagination').hide();
        	}else{
        		$('.swiper-pagination').show();
        	}
        }
    });
}

/*function mySwiperTwo() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 0,
        initialSlide: 1,
        centeredSlides: true,
        onSlideChangeStart: function(swiper) {
            if(swiper.activeIndex == 1) {
                $('.swiper-pagination').hide();
            }else{
                $('.swiper-pagination').show();
            }
        }
    });
}*/

$(function() {
    if(!localStorage.getItem('firstShow')) {
        $('#indexPage').load('first_show.html', function() {
            mySwiper();
            $('#indexBg').height(windowH);
            $('#bgImg').height(windowH);
        });
    }else{
        window.location.href = 'destination.html';
    }
});