        let contentCnt = 12;
        let currentMonth=6;
        let margin=20;
    	
        $(document).ready(() => {
        	$('.header').load("/resources/header.html?ver=3");
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
                    + '<div class="content-body"> 내용 </div> </sesction>');
            }
            $('#section'+currentMonth+' .content-header').css('background','#3e3939');
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
                              
            	}
            	
            	 $('.content-wrap').css('margin-left', margin + 'vw');    
            	$('.content-header').css('background','grey');
            	$('#section'+currentMonth+' .content-header').css('background','#3e3939');
                $('#section'+currentMonth+' .content-header').css('text-align','center');
            	$('#section'+(currentMonth-1)+' .content-header').css('text-align','right');
            	$('#section'+(currentMonth+1)+' .content-header').css('text-align','left');
            });
            $('#minus-btn').click(()=>{
                $('.content-section').css('width','35vw');
            });
        });