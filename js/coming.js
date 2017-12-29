$(function() {
	$('.chosenCity').text(getParam('c')+'-'+getParam('z'));
	var backurl = store.get('backUrl').replace(/p=.*?&/,'p=' + getParam('p') + '&');
	window.setTimeout(function() {
      window.location.href = backurl;
  },2000)
	$('.coming').append('<p>太棒了，这个地区不用' + getParam('w') + '，可以省不少心哦~</p>')
});
