        
		let now=new Date();
		let contentCnt = 12;
        let currentMonth=now.getMonth()+1;
        let margin=20;
    	
        $(document).ready(() => {
        	$('.header').load("/resources/header.html?" + new Date().getTime());
            if(currentMonth!=1){       
            	margin-=60*(currentMonth-1);
                $('.content-wrap').css('margin-left', margin + 'vw');
            }else{
            	 $('.content-wrap').css('margin-left', margin+'vw');
            }
            
            for (let i = 1; i <= contentCnt; i++) {
                $('.content-wrap').append('<section class="content-section" id="section' + i + '">'
                    + '<div class="content">'
                    + '<div class="content-header"><p>' + i + '월</p></div>'
                    + '<div class="content-body"> <div class="yet"><h2> 점검 예정</h2> </div> <div class="complete"><h2> 점검 완료 </h2> </div> </div> </sesction>');
            }
            $('#section'+currentMonth+' .content-header').css('background','black');
            $('#section'+currentMonth+' .content-header').css('text-align','center');
        	$('#section'+(currentMonth-1)+' .content-header').css('text-align','right');
        	$('#section'+(currentMonth+1)+' .content-header').css('text-align','left');
            $(document).on('click','.slide-btn',(e)=>{
            	let targetId=e.target.id;
            	if(targetId==='slide-left-btn'){
                    if(currentMonth>1){
                        currentMonth--;
                        margin+=60;
                    }else{
                        currentMonth=12; 
                        margin=-60*(currentMonth-1)+20;
                    }
            	}else{
                    if(currentMonth<12){
                        currentMonth++;
                        margin-=60;
                    }else{
                        currentMonth=1;
                        margin=20;
                    }
                    $('.current-month h1').text(currentMonth+'월');
            	}
            	
            	 $('.content-wrap').css('margin-left', margin + 'vw');    
            	$('.content-header').css('background','grey');
            	$('#section'+currentMonth+' .content-header').css('background','black');
                $('#section'+currentMonth+' .content-header').css('text-align','center');
            	$('#section'+(currentMonth-1)+' .content-header').css('text-align','right');
            	$('#section'+(currentMonth+1)+' .content-header').css('text-align','left');
            });
            $('.current-month h1').text(currentMonth+'월');
            $('.current-month').hide();
        	window.onscroll = function() {
        		if($(window).scrollTop()>100){
        			$('.current-month').fadeIn();
        		}else{
        			$('.current-month').fadeOut();
        		}
        	}
        });