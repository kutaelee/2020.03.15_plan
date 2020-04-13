$(document).ready(function(){
	var path=$(location).attr('pathname').split('/');
	if(!path[2]){
		$('#index-btn').css('color','white');
	}else{
		$('#'+path[2]+'-btn').css('color','white');
	}
	
});