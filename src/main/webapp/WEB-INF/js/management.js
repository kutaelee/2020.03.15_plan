$(document).ready(() => {
    $('.header').load('/resources/header.html?' + new Date().getTime());
    var modifyMode = false;
    var width = $(document).width() - $(document).width() / 10;
    console.log(width);
    if (width > 900) {
        $('.board').width(width + 'px');
        $('.board').css('margin-left', width / 20 + 'px');
    } else {
        $('.board').width('1000px');
        $('.board').css('margin-left', '30px');
    }

    $('#insert-btn').click(function () {
        document.location.href = '/page/management/write';
    });

    $('#modify-btn').click(function () {
        $('#default-btn-wrap').hide();
        $('#modify-btn-wrap').show();
        $('#all-check').show();
        $('#th-check').show();
        $('.td-check').show();
        $('.board .t-content').css('cursor', 'unset');
        $('.board .t-content').attr('stat', 'disabled');
        modifyMode = true;
    });

    $('#cansel-btn').click(function () {
        $('#modify-btn-wrap').hide();
        $('#all-check').hide();
        $('#th-check').hide();
        $('.td-check').hide();
        $('.board .t-content').css('cursor', 'pointer');
        $('#default-btn-wrap').show();
        modifyMode = false;
    });

    $(document).on('click', '#all-check', function () {
        if ($(this).is(':checked')) {
            $('.board .t-content .checkBx').prop('checked', 'true');
        } else {
            $('.board .t-content .checkBx').removeAttr('checked');
        }
    });
    $(document).on('click', '.t-content', function () {
        if (modifyMode) {
            var chk = document.getElementById($(this).children('.td-check').children().attr('id'));
            if (chk.checked) {
                chk.checked = false;
            } else {
                chk.checked = true;
            }
        } else {
            document.location.href = '/page/management/document';
        }
    });

    $(document).on('click', '.checkBx', function () {
        console.log($(this).attr('class'));
        var chk = document.getElementById($(this).attr('id'));
        if (chk.checked) {
            chk.checked = false;
        } else {
            chk.checked = true;
        }
    });

    $('.board').html(
        '<tr class="t-head">' +
            '<th id="th-check">선택 <input type="checkbox" id="all-check"></th>' +
            '<th>계약상태</th>' +
            '<th>사업명</th>' +
            '<th>사이트명</th>' +
            '<th>영업부서</th>' +
            '<th>유지보수 시작일</th>' +
            '</tr>'
    );

    for (var i = 0; i < 10; i++) {
        $('.board').append(
            '<tr class="t-content"><td class="td-check"><input type="checkbox" class="checkBx" id="chBx' +
                i +
                '"></td><td><div>hi</div></td>' +
                '<td><div>hi</div></td>' +
                '<td><div>hi</div></td>' +
                '<td><div>hi</div></td>' +
                '<td><div>hi</div></td>' +
                '</tr>'
        );
    }
});
