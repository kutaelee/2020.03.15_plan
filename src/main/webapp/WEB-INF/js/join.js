/* 공개키 변수 */
var RSAModulus = null;
var RSAExponent = null;
var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // 이메일 형식
var re = /[~!@\#$%^&*\()\-=+_.']/gi; //특수문자
/* 유효성 체크 변수 */
var idcheck = false;
var emailcheck = false;
var pwcheck = false;
var pw2check = false;



$(document).ready(() => {
    $('.header').load('/resources/header.html?' + new Date().getTime());
    
    // 공개키 요청
    $.ajax({
        url: '/rsacall',
        type: 'post',
        dataType: 'json',
        success: function (result) {
            RSAModulus = result.RSAModulus;
            RSAExponent = result.RSAExponent;
        },
        error: function (e) {
            swal('라이브러리 로드 에러', '암호화 에러 발생!', 'error');
            console.log(e)
        },
    });   
    /* 유효성 검사 */
    $('#join-form input').keyup(function () {
        var value = $(this).val();
        var name = $(this).prop('id');

        //공백제거
        value = value.replace(/ /gi, '');
        $(this).val(value);
        if (name == 'join-name' || name == 'join-id') {
            //특수문자 제거
            if (re.test(value)) {
                $(this).val(value.replace(re, ''));
                swal('특수문자 사용불가', '입력값으로 특수문자를 사용할 수 없습니다', 'warning');
            }
        }
    });

    $('#join-id').blur(function (e) {
        var id = $(this).val();
        if (id.length < 16) {
            if (e.keyCode == 13) {
                $('#join-pw').focus();
            }
            $.ajax({
                url: 'idcheck',
                type: 'post',
                data: {
                    id: id,
                },  
                success: function (result) {
                    if (result) {
                        swal('사용가능', '사용해도 좋은 아이디 입니다', 'success');
                        idcheck = true;
                    } else {
                        swal('사용불가', '이미 존재하는 아이디 입니다', 'warning');
                        idcheck = false;
                    }
                },error:function(e){
                	console.log(e)
                }
            });
        } else {
            swal('사용불가', '아이디는 15자리 이하로 입력해주세요', 'warning');
            $('#join-id').val($('#join-id').val().substring(0, 15));
            idcheck = false;
        }
    });
    $('#join-email').blur(function (e) {
        var email = $(this).val();
        if (exptext.test(email)) {
            $.ajax({
                url: '/emailcheck',
                type: 'POST',
                data: {
                    email: email,
                }, 
                success: function (result) {
                    if (result) {
                        swal('사용가능', '사용해도 좋은 이메일 입니다', 'success');
                        emailcheck = true;
                    } else {
                        swal('사용불가', '이미 존재하는 이메일 입니다', 'error');
                        emailcheck = false;
                    }
                },error:function(e){
                	console.log(e)
                }
            });
        } else {
            swal('사용불가', '이메일 형식에 맞춰주세요 인증에 사용됩니다', 'warning');
            emailcheck = false;
        }
    });

    $('#join-pw').blur(function (e) {
        var pw = $(this).val();
        var pw2 = $('#join-pw2').val();
        if (pw.length > 3 && pw.length < 13) {
            swal('사용가능', '사용해도 좋은 비밀번호 입니다', 'success');
            pwcheck = true;
        } else {
            swal('사용불가', '비밀번호는 4자리 이상 12자리 이하로 입력해주세요', 'warning');
            pwcheck = false;
        }
        if (pw == pw2) {
            pw2check = true;
        } else {
            pw2check = false;
        }
    });
    $('#join-pw2').blur(function (e) {
        var pw = $('#join-pw').val();
        var pw2 = $(this).val();
        if (pw == pw2) {
            swal('패스워드 일치', '비밀번호가 같습니다', 'success');
            pw2check = true;
            if (e.keyCode == 13) {
                $('.join_btn').trigger('click');
            }
        } else {
            swal('사용불가', '비밀번호가 서로 다릅니다', 'warning');
            pw2check = false;
        }
    });
    // 회원가입 버튼클릭
    $('#join-btn').click(function () {
        if (idcheck && pwcheck && pw2check && emailcheck) {
            var id = $('#join-id').val();
            var email = $('#join-email').val();
            var pw = $('#join-pw').val();
            var name = $('#join-name').val();
            // RSA 암호키 생성
            var rsa = new RSAKey();
            rsa.setPublic(RSAModulus, RSAExponent);

            // 계정 정보 암호화
            var securedid = rsa.encrypt(id);
            var securedemail = rsa.encrypt(email);
            var securedpw = rsa.encrypt(pw);
            var securedname = rsa.encrypt(name);
            // 회원가입
            $.ajax({
                type: 'post',
                url: '/memberjoin',
                data: {
                    id: securedid,
                    pw: securedpw,
                    email: securedemail,
                    name: securedname
                },
                success: function (result) {
                    $('.modal').fadeOut('fast');
                    if (result) {
                        swal('인증메일 전송', '가입 인증메일이 발송되었습니다!', 'success');
                        setTimeout(function(){
                        	location.href = '/sendmail';
                        }, 2000);
                    } else {
                        swal('가입 실패', '입력값에 문제가 있습니다', 'error');
                    }
                },
                error: function () {
                    swal('가입 실패', '가입 도중 문제가 발생했습니다 관리자에게 문의해주세요', 'error');
                },
            });
        } else {
            swal('가입 실패', '입력값에 문제가 있습니다', 'error');
        }
    });
});
