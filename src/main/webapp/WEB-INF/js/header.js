$(document).ready(function(){
	var path=$(location).attr('pathname').split('/');
	$('#'+path[2]+'-btn').css('color','white');
});