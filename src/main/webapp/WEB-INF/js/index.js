function welcomeFadeOut(){
	
	$('#welcome-section').fadeOut('fast');
	video=$('#welcome-section video')[0].pause();
}
$(document).ready(function() {

	$('.header').load("/resources/header.html?" + new Date().getTime());
	var progress = document.getElementById('progressbar');
	var wrap = document.getElementById('wrap');
	var totalHeight = wrap.scrollHeight - window.innerHeight;
	var width=screen.width;
	var sectionTop=[];
	sectionTop.push($('#member-layer').offset().top);
	sectionTop.push($('#skew-layer').offset().top);
	sectionTop.push($('#util-layer').offset().top);
	$('#nav1').css('color','white');
	
	if(width<700){
		totalHeight = wrap.scrollHeight;
	}
	
	$(window).resize(function() {
		sectionTop[0]=$('#member-layer').offset().top;
		sectionTop[1]=$('#skew-layer').offset().top;
		sectionTop[3]=$('#util-layer').offset().top;
		console.log(sectionTop);
	});

	wrap.onscroll = function() {
		//scroll bar 
		var progressHeight = (wrap.scrollTop / totalHeight) * 100 + 6;
		progress.style.height = progressHeight + "%";
		console.log(wrap.scrollTop);
		console.log(sectionTop);
		// scroll spy css
		if(wrap.scrollTop>=sectionTop[0] && wrap.scrollTop<sectionTop[1]){
			$('#scrollSpy a').css('color','gray');
			$('#nav1').css('color','white');
		}else if(wrap.scrollTop>=sectionTop[1] && wrap.scrollTop<sectionTop[2]){
			$('#scrollSpy a').css('color','gray');
			$('#nav2').css('color','white');
		}else if(wrap.scrollTop>=sectionTop[2] && wrap.scrollTop<sectionTop[3]){
			$('#scrollSpy a').css('color','gray');
			$('#nav3').css('color','white');
		}else if(wrap.scrollTop>=sectionTop[3]-100){
			$('#scrollSpy a').css('color','gray');
			$('#nav4').css('color','white');
		}
	}

	/* scroll spy move */
	$(document).on('click', '#scrollSpy a', function(e) {
		var selectNum = e.target.id[3];

		if (selectNum == 1) {
			$('#wrap').animate({
				scrollTop : sectionTop[0]+10
			}, 400);
		} else if (selectNum == 2) {
			$('#wrap').animate({
				scrollTop :sectionTop[1]+10
			}, 400);
		} else if (selectNum == 3) {
			$('#wrap').animate({
				scrollTop : sectionTop[2]+10
			}, 400);
		} else if (selectNum == 4) {

			$('#wrap').animate({
				scrollTop : sectionTop[3]+10
			}, 400);
		}

	});
	
    setTimeout(welcomeFadeOut, 10000);
    $('#welcome-section').click(()=>{
    	welcomeFadeOut();
    });
});