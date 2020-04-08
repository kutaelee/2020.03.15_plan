$(document).ready(function() {

	$('.header').load("/resources/header.html?" + new Date().getTime());
	var progress = document.getElementById('progressbar');
	var wrap = document.getElementById('wrap');
	var totalHeight = wrap.scrollHeight - window.innerHeight;

	$('#nav1').css('color','white');
	wrap.onscroll = function() {
		//scroll bar 
		var progressHeight = (wrap.scrollTop / totalHeight) * 100 + 3;
		progress.style.height = progressHeight + "%";
		console.log(progressHeight);
		// scroll spy css
		if(progressHeight<18){
			$('#scrollSpy a').css('color','gray');
			$('#nav1').css('color','white');
		}else if(progressHeight>18 && progressHeight<75){
			$('#scrollSpy a').css('color','gray');
			$('#nav2').css('color','white');
		}else if(progressHeight>75 && progressHeight<95){
			$('#scrollSpy a').css('color','gray');
			$('#nav3').css('color','white');
		}else if(progressHeight>95){
			$('#scrollSpy a').css('color','gray');
			$('#nav4').css('color','white');
		}
	}

	/* scroll spy move */
	var offset1 = $('#member-layer').offset().top;
	var offset2 = $('#skew-layer').offset().top;
	var offset3 = $('#cube-layer').offset().top;
	var offset4 = $('#util-layer').offset().top;
	$(document).on('click', '#scrollSpy a', function(e) {
		var selectNum = e.target.id[3];

		if (selectNum == 1) {
			$('#wrap').animate({
				scrollTop : offset1
			}, 400);
		} else if (selectNum == 2) {
			$('#wrap').animate({
				scrollTop : offset2
			}, 400);
		} else if (selectNum == 3) {
			$('#wrap').animate({
				scrollTop : offset3
			}, 400);
		} else if (selectNum == 4) {

			$('#wrap').animate({
				scrollTop : offset4
			}, 400);
		}

	});
	
	/* cube */
	var swiper = new Swiper('.swiper-container', {
		effect : 'cube',
		grabCursor : true,
		cubeEffect : {
			shadow : true,
			slideShadows : true,
			shadowOffset : 20,
			shadowScale : 0.94,
		},
		pagination : {
			el : '.swiper-pagination',
		},
	});
});