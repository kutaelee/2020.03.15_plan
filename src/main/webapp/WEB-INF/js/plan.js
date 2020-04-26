        
		let now=new Date();
		let contentCnt = 12;
        let currentMonth=now.getMonth()+1;
        let margin=20;
        $(document).ready(() => {
        	var width=screen.width;
        	$('.header').load("/resources/header.html?" + new Date().getTime());
        	console.log(width);
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
            
        	var mul=60; //마진 기준값 width에 따라 다름
        	
        	if(width<700){
        		mul=105;
        		margin=-5;
        	}
        		if(currentMonth!=1){       
        			margin-=mul*(currentMonth-1);
        			$('.content-wrap').css('margin-left', margin + 'vw');
        		}else{
        			$('.content-wrap').css('margin-left', margin+'vw');
        		}
        	
        	$(document).on('click','.slide-btn',(e)=>{
            	let targetId=e.target.id;
            	if(targetId==='slide-left-btn'){
                    if(currentMonth>1){
                        currentMonth--;
                        margin+=mul;
                    }else{
                        currentMonth=12; 
                        margin=-mul*(currentMonth-1)+20;
                    }
            	}else{
                    if(currentMonth<12){
                        currentMonth++;
                        margin-=mul;
                    }else{
                    	if(width<700){
                    		margin=-5;
                    	}else{
                    		margin=20;
                    	}
                        currentMonth=1;
                        
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
        		var planTop=100;
        		if(width<700){
        			planTop=-10;
        		}
        		
        		if($(window).scrollTop()>planTop){
        			$('.current-month').fadeIn();
        		}else{
        			$('.current-month').fadeOut();
        		}
        	
        	}
        	
        });