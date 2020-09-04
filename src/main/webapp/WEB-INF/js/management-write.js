$(document).ready(function () {
    $('.header').load('/resources/header.html?' + new Date().getTime());
    /* date */
    $(document).on('click', '.year-btn', function (e) {
        $('.year-select').attr('class', 'year-btn');
        $(this).attr('class', 'year-select');

        var date = new Date();
        var year = e.target.id[4];
        var startDay = $('#man-startDay').val();
        if (!startDay) {
            if (year === '1') {
                $('#man-startDay').val(date.format('yyyy-MM-dd'));
                $('#man-endDay').val(new Date(date.setFullYear(date.getFullYear() + 1)).format('yyyy-MM-dd'));
            } else if (year === '2') {
                $('#man-startDay').val(date.format('yyyy-MM-dd'));
                $('#man-endDay').val(new Date(date.setFullYear(date.getFullYear() + 2)).format('yyyy-MM-dd'));
            } else {
                $('#man-endDay').val('');
            }
        } else {
            var currentDay = $('#man-startDay').val().split('-');
            date = new Date(currentDay[0], Number(currentDay[1]) - 1, currentDay[2]);
            if (year === '1') {
                $('#man-endDay').val(new Date(date.setFullYear(date.getFullYear() + 1)).format('yyyy-MM-dd'));
            } else if (year === '2') {
                $('#man-endDay').val(new Date(date.setFullYear(date.getFullYear() + 2)).format('yyyy-MM-dd'));
            } else {
                $('#man-endDay').val('');
            }
        }
    });

    /* modal toggle */
    $('#site-search-btn').click(function () {
        $('.modal').fadeIn('fast');
    });

    $('#modal-close-btn').click(function () {
        $('.modal').fadeOut('fast');
    });

    $('#back-btn').click(function () {
        history.go(-1);
    });
});
Date.prototype.format = function (f) {
    if (!this.valueOf()) return ' ';

    var weekKorName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    var weekKorShortName = ['일', '월', '화', '수', '목', '금', '토'];

    var weekEngName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var weekEngShortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case 'yyyy':
                return d.getFullYear(); // 년 (4자리)

            case 'yy':
                return (d.getFullYear() % 1000).zf(2); // 년 (2자리)

            case 'MM':
                return (d.getMonth() + 1).zf(2); // 월 (2자리)

            case 'dd':
                return d.getDate().zf(2); // 일 (2자리)

            case 'KS':
                return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

            case 'KL':
                return weekKorName[d.getDay()]; // 요일 (긴 한글)

            case 'ES':
                return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

            case 'EL':
                return weekEngName[d.getDay()]; // 요일 (긴 영어)

            case 'HH':
                return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)

            case 'hh':
                return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간
            // (12시간
            // 기준,
            // 2자리)

            case 'mm':
                return d.getMinutes().zf(2); // 분 (2자리)

            case 'ss':
                return d.getSeconds().zf(2); // 초 (2자리)

            case 'a/p':
                return d.getHours() < 12 ? '오전' : '오후'; // 오전/오후 구분

            default:
                return $1;
        }
    });
};

String.prototype.string = function (len) {
    var s = '',
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};

String.prototype.zf = function (len) {
    return '0'.string(len - this.length) + this;
};

Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};
