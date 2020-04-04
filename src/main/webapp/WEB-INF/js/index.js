$(document).ready(function() {

	 $('.header').load("/resources/header.html?"+new Date().getTime());
	 var progress=document.getElementById('progressbar');
	 var wrap=document.getElementById('wrap');
	 var totalHeight= wrap.scrollHeight-window.innerHeight;
	 wrap.onscroll=function(){
		 var progressHeight=(wrap.scrollTop/totalHeight)*100;
		 progress.style.height=progressHeight+"%";
	 }
 });