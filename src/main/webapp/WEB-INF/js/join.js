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
var namecheck = false;

$.ajax({
    url: '/sessioncheck',
    type: 'post',
    success: function (result) {
        if (result) {
            Swal.fire({
                icon: 'info',
                title: '접근 불가',
                text: '새로운 가입은 로그아웃 후 진행 해 주세요',
                onAfterClose: () => {
                    location.href = '/';
                }
            });
        }
    },
    error: function () {
        Swal.fire({
            icon: 'error',
            title: '세션체크 에러',
            text: '세션체크 중 문제가 발생했습니다',
        });
    },
});

function alertMsg(msg, stat) {
    /*
	 * alert alert_success
	 alert alert_danger
	 alert alert_warning 
	 alert alert_info
	*/
    $('#alert-stat').attr('class', stat);
    $('.alert--content').text(msg);
    $('.container-alert').fadeIn();
}

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
            Swal.fire({
                icon: 'error',
                title: '라이브러리 로드 에러',
                text: 'RSA 암호화 에러 발생!',
            });
            console.log(e);
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
                alertMsg('입력값으로 특수문자를 사용할 수 없습니다', 'alert alert_warning');
            }
        }
    });
    $('#join-name').keyup(function (e) {
        var id = $(this).val();
        if (id.length > 2 && id.length < 16) {
            if (e.keyCode == 13) {
                $('#join-email').focus();
            }
            alertMsg('좋은 이름 입니다!', 'alert alert_success');
            namecheck = true;
        } else {
            alertMsg('이름은 3글자 이상 15자리 이하로 입력해주세요', 'alert alert_warning');
            namecheck = false;
        }
    });

    $('#join-id').keyup(function (e) {
        var id = $(this).val();
        if (id.length > 3 && id.length < 16) {
            if (e.keyCode == 13) {
                $('#join-pw').focus();
            }
            $.ajax({
                url: '/idcheck',
                type: 'post',
                data: {
                    id: id,
                },
                success: function (result) {
                    if (result) {
                        alertMsg('사용해도 좋은 아이디 입니다', 'alert alert_success');
                        idcheck = true;
                    } else {
                        alertMsg('이미 존재하는 아이디 입니다', 'alert alert_warning');
                        idcheck = false;
                    }
                },
                error: function (e) {
                    console.log(e);
                },
            });
        } else {
            alertMsg('아이디는 4자리 이상 15자리 이하로 입력해주세요', 'alert alert_warning');
            idcheck = false;
        }
    });
    $('#join-email').keyup(function (e) {
        var email = $(this).val();
        if (exptext.test(email)) {
            if (e.keyCode == 13) {
                $('#join-id').focus();
            }
            $.ajax({
                url: '/emailcheck',
                type: 'POST',
                data: {
                    email: email,
                },
                success: function (result) {
                    console.log(result);
                    if (result) {
                        alertMsg('사용해도 좋은 이메일 입니다', 'alert alert_success');
                        emailcheck = true;
                    } else {
                        alertMsg('이미 존재하는 이메일 입니다! 다른 이메일을 입력해주세요', 'alert alert_warning');
                        emailcheck = false;
                    }
                },
                error: function (e) {
                    console.log(e);
                },
            });
        } else {
            alertMsg('이메일 형식에 맞춰주세요! 인증에 사용됩니다', 'alert alert_warning');
            emailcheck = false;
        }
    });

    $('#join-pw').keyup(function (e) {
        var pw = $(this).val();
        var pw2 = $('#join-pw2').val();
        if (pw.length > 3 && pw.length < 13) {
            alertMsg('사용해도 좋은 비밀번호 입니다', 'alert alert_success');
            pwcheck = true;
        } else {
            alertMsg('비밀번호는 4자리 이상 12자리 이하로 입력해주세요', 'alert alert_warning');
            pwcheck = false;
        }
        if (pw == pw2) {
            pw2check = true;
        } else {
            pw2check = false;
        }
    });
    $('#join-pw2').keyup(function (e) {
        var pw = $('#join-pw').val();
        var pw2 = $(this).val();
        if (pw.length > 3 && pw.length < 13 && pw == pw2) {
            alertMsg('비밀번호가 같습니다', 'alert alert_success');
            pw2check = true;
        } else {
            if (pw.length < 3 || pw.length > 13) {
                alertMsg('비밀번호는 4자리 이상 12자리 이하로 입력해주세요', 'alert alert_warning');
            } else {
                alertMsg('비밀번호가 서로 다릅니다', 'alert alert_warning');
            }
            pw2check = false;
        }
    });
    // 회원가입 버튼클릭
    $('#join-btn').click(function () {
        console.log(idcheck);
        console.log(pwcheck);
        console.log(pw2check);
        console.log(emailcheck);
        console.log(namecheck);
        if (idcheck && pwcheck && pw2check && emailcheck && namecheck) {
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
            let timerInterval
            Swal.fire({
              title: '회원가입을 진행 중 입니다.',
              html: '최대 <b></b> 밀리초가 남았습니다.',
              timer: 20000,
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  const content = Swal.getContent()
                  if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                      b.textContent = Swal.getTimerLeft()
                    }
                  }
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            })
            // 회원가입
            $.ajax({
                type: 'post',
                url: '/memberjoin',
                timeout: 20000,
                data: {
                    id: securedid,
                    pw: securedpw,
                    email: securedemail,
                    name: securedname,
                },
                success: function (result) {
                    if (result) {
                        Swal.fire({
                            icon: 'success',
                            title: '인증메일 전송',
                            text: '가입 인증메일이 발송되었습니다!',
                            onAfterClose: () => {
                                location.href = '/sendmail';
                            },
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: '가입 실패',
                            text: '입력값에 문제가 있습니다',
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: 'error',
                        title: '가입 실패',
                        text: '가입 도중 문제가 발생했습니다 관리자에게 문의해주세요',
                    });
                },
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '가입 실패',
                text: '입력값을 확인해주세요',
            });
        }
    });
});
