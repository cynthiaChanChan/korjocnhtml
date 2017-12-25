$(function() {
	$('.chosenCity').text(getParam('c')+'-'+getParam('z'));
	window.setTimeout(function() {
      window.location.href = store.get('backUrl');
      },2000)
});