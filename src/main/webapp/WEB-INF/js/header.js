
$(document).ready(function () {
	 $.ajax({
	    	url:'/sessioncheck',
	    	type:'post',
	    	success:function(result){
	    		if(result){
	    			$('#nav-join').hide();
	    			$('#nav-login').hide();
	    			$('#nav-logout').show();
	    		}
	    	},error:function(){
	    		alert("세션체크 중 문제가 발생했습니다.");
	    	}
	    });
    var path = $(location).attr('pathname').split('/');
    var width = screen.width;
    if (!path[2]) {
        $('#index-btn').css('color', 'white');
    } else {
        $('#' + path[2] + '-btn').css('color', 'white');
    }

    if (width < 700) {
        $('#join').insertAfter('#login');
    }
    $(document).on('click', '.nav-toggle', function () {
        $('#nav-toggle').attr('class', 'nav-active');
        $('.nav').fadeIn();
    });

    $(document).on('click', '.nav-active', function () {
        $('#nav-toggle').attr('class', 'nav-toggle');
        $('.nav').fadeOut();
    });
   
    $(document).on('click','#logout-btn',function(){
    	$.ajax({
			url : '/logout',
			type : 'post',
			success : function(result) {
				if (result) {
					   Swal.fire({
                           icon: 'success',
                           title: '로그아웃',
                           text: '로그아웃 완료',
                           onAfterClose: () => {
                               location.href = '/';
                           }
                       });
				}
			},
			error : function() {
				alert("로그아웃 중 문제발생!");
			}
		});
    });
});
