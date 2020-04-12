 $(document).ready(() => {
	 $('.header').load("/resources/header.html?ver=1");

	 var width=$(document).width()-$(document).width()/10;
	 if(width>1000){
		 $('.board').width(width+'px');
		 $('.board').css('margin-left',width/20+'px');
		 $('.btn-wrap').width(width+'px');
		 $('.btn-wrap').css('margin-left',width/20+'px');
		 $('.sort-wrap').width(width+'px');
		 $('.sort-wrap').css('margin-left',width/20+'px');
		 $('.page-btn-wrap').width(width+'px');
	 }else{
		 $('.board').width('600px');
		 $('.board').css('margin-left','30px');
	 }
	 
	 $('#insert-btn').click(function(){
		 document.location.href="/page/management-write";
	 });
 });