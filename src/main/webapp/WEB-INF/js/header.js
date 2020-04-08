$(document).ready(function(){
	var path=$(location).attr('pathname').split('/');
	if(!path){
		$('#index-btn').css('color','white');
	}else{
		$('#'+path[2]+'-btn').css('color','white');
	}
	
});