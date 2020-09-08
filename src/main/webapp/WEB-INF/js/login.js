	var re = /[~!@\#$%^&*\()\-=+_.']/gi; // 특수문자
	$.ajax({
		url:'/sessioncheck',
		type:'post',
		success:function(result){
			if(result){
			   	Swal.fire({
			  		  icon: 'info',
			  		  title: '접근 불가',
			  		  text: '로그아웃 후 이용해주세요',
			  		});
				location.href="/";
			}
		},error:function(){
		   	Swal.fire({
	  		  icon: 'error',
	  		  title: '세션체크 에러',
	  		  text: '세션체크 중 문제가 발생했습니다',
	  		});
		}
	});
$(document).ready(() => {
    $('.header').load('/resources/header.html?' + new Date().getTime());
    
    /* 공개키 변수 */
    var RSAModulus = null;
    var RSAExponent = null;
    var googlesw=false;



	// 공개키 요청
	$.ajax({
		url : '/rsacall',
		type : 'post',
		dataType : 'json',
		success : function(result) {
			RSAModulus = result.RSAModulus;
			RSAExponent = result.RSAExponent;
		},
		error : function() {
		   	Swal.fire({
		  		  icon: 'error',
		  		  title: '라이브러리 에러',
		  		  text: '암호화 에러 발생',
		  		});
			location.href = '/';
		}
	});

	// 유효성 검사
	$('.login-form input').keyup(function() {
		var value = $(this).val();
		value = value.replace(/ /gi, "");
		if (re.test(value)) {
			$(this).val(value.replace(re, ""));
			alert("특수문자는 사용하지말아주세요!");
		}
	});
	
	//엔터 키 입력 
	$('#loginID').keyup(function(e){
		if(e.keyCode==13){
				$('#loginPassword').focus();
			}
	})
	$('#loginPassword').keyup(function(e){
		if(e.keyCode==13){
				$('.login_btn').trigger('click');
			}
	})
	$('#login').click(function() {
		var id = $('#loginID').val();
		var pw = $('#loginPassword').val();
		// RSA 암호키 생성
		var rsa = new RSAKey();
		rsa.setPublic(RSAModulus, RSAExponent);

		// 계정 정보 암호화
		var securedid = rsa.encrypt(id);
		var securedpw = rsa.encrypt(pw);

		$.ajax({
			url : '/memberlogin',
			type : 'post',
			data : {
				'id' : securedid,
				'pw' : securedpw
			},
			success : function(result) {	
				
				if (result.msg == "로그인 성공!") {
					Swal.fire({
				  		  icon: 'success',
				  		  title: '로그인 성공',
				  		  text: result.msg,
				  		});
					login = true;
					setTimeout(function(){
                    	location.href = '/';
                    }, 2000);
				}else{
					Swal.fire({
				  		  icon: 'error',
				  		  title: '로그인 실패',
				  		  text: result.msg,
				  		});
				}
			},
			error : function(e) {
				Swal.fire({
			  		  icon: 'error',
			  		  title: '로그인 실패',
			  		  text: '로그인 중 에러 발생',
			  		});
			}
		});
	});
});
