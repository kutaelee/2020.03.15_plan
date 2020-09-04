// 지도와 로드뷰를 감싸고 있는 div의 class를 변경하여 지도를 숨기거나 보이게 하는 함수입니다
function toggleMap(active) {
    if (active) {
        // 지도가 보이도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
        container.className = 'view_map';
    } else {
        // 지도가 숨겨지도록 지도와 로드뷰를 감싸고 있는 div의 class를 변경합니다
        container.className = 'view_roadview';
    }
}
let now = new Date();
let contentCnt = 12;
let currentYear = now.getFullYear();
let currentMonth = now.getMonth() + 1;
let margin = 20;
$(document).ready(() => {
    var width = screen.width;
    $('.header').load('/resources/header.html?' + new Date().getTime());
    console.log(width);
    for (let i = 1; i <= contentCnt; i++) {
        $('.content-wrap').append(
            '<section class="content-section" id="section' +
                i +
                '">' +
                '<div class="content">' +
                '<div class="content-header"><p>' +
                i +
                '월</p></div>' +
                '<div class="content-body"> <div class="yet"><h2> 점검 예정</h2> </div> <div class="complete"><h2> 점검 완료 </h2> </div> </div> </sesction>'
        );
    }
    $('#section' + currentMonth + ' .content-header').css('background', 'black');
    $('#section' + currentMonth + ' .content-header').css('text-align', 'center');
    $('#section' + (currentMonth - 1) + ' .content-header').css('text-align', 'right');
    $('#section' + (currentMonth + 1) + ' .content-header').css('text-align', 'left');

    var mul = 60; //마진 기준값 width에 따라 다름

    if (width < 700) {
        mul = 105;
        margin = -5;
    }
    if (currentMonth != 1) {
        margin -= mul * (currentMonth - 1);
        $('.content-wrap').css('margin-left', margin + 'vw');
    } else {
        $('.content-wrap').css('margin-left', margin + 'vw');
    }

    $(document).on('click', '.slide-btn', (e) => {
        let targetId = e.target.id;
        if (targetId === 'slide-left-btn') {
            if (currentMonth > 1) {
                currentMonth--;
                margin += mul;
            } else {
                currentMonth = 12;
                margin = -mul * (currentMonth - 1) + 20;
            }
        } else {
            if (currentMonth < 12) {
                currentMonth++;
                margin -= mul;
            } else {
                if (width < 700) {
                    margin = -5;
                } else {
                    margin = 20;
                }
                currentMonth = 1;
            }
            $('.current-month h1').text(currentMonth + '월');
        }

        $('.content-wrap').css('margin-left', margin + 'vw');
        $('.content-header').css('background', 'grey');
        $('#section' + currentMonth + ' .content-header').css('background', 'black');
        $('#section' + currentMonth + ' .content-header').css('text-align', 'center');
        $('#section' + (currentMonth - 1) + ' .content-header').css('text-align', 'right');
        $('#section' + (currentMonth + 1) + ' .content-header').css('text-align', 'left');
    });
    $('.current-month h1').text(currentMonth + '월');
    $('.current-year h1').text(currentYear + '년');
    $('.current-month').hide();
    window.onscroll = function () {
        var planTop = 100;
        if (width < 700) {
            planTop = -10;
        }

        if ($(window).scrollTop() > planTop) {
            $('.current-month').fadeIn();
        } else {
            $('.current-month').fadeOut();
        }
    };

    $('.yet').append('<span class="yet-site"><a href="#">근로복지공단</a></span>');
    $('.yet').append('<span class="yet-site"><a href="#">근로복지공단</a></span>');
    $('.yet').append('<span class="yet-site"><a href="#">근로복지공단</a></span>');
    $('.yet').append('<span class="yet-site"><a href="#">근로복지공단</a></span>');

    $('#siteinfo-close-btn').click(function () {
        $('#siteinfo-modal').fadeOut();
    });
    $(document).on('click', '.content-body a', function () {
        $('#siteinfo-modal').fadeIn();
        /* kakao maps*/
        var container = document.getElementById('container'), // 지도와 로드뷰를 감싸고 있는 div 입니다
            mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
            btnRoadview = document.getElementById('btnRoadview'), // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다
            btnMap = document.getElementById('btnMap'), // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다
            rvContainer = document.getElementById('roadview'), // 로드뷰를 표시할 div 입니다
            mapContainer = document.getElementById('map'); // 지도를 표시할 div 입니다

        // 로드뷰 객체를 생성합니다
        var roadview = new kakao.maps.Roadview(rvContainer);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('서울시 서초구 효령로 208', function (result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
                var placePosition = new kakao.maps.LatLng(result[0].y, result[0].x);
                // 지도 옵션입니다
                var mapOption = {
                    center: placePosition, // 지도의 중심좌표
                    level: 3, // 지도의 확대 레벨
                };

                // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 지도 중심을 표시할 마커를 생성하고 특정 장소 위에 표시합니다
                var mapMarker = new kakao.maps.Marker({
                    position: placePosition,
                    map: map,
                });

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: placePosition,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">메타빌드</div>',
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(placePosition);
            }

            // 로드뷰의 위치를 특정 장소를 포함하는 파노라마 ID로 설정합니다
            // 로드뷰의 파노라마 ID는 Wizard를 사용하면 쉽게 얻을수 있습니다
            var roadviewClient = new kakao.maps.RoadviewClient();
            roadviewClient.getNearestPanoId(placePosition, 50, function (panoId) {
                roadview.setPanoId(panoId, placePosition);
            });
            // 특정 장소가 잘보이도록 로드뷰의 적절한 시점(ViewPoint)을 설정합니다
            // Wizard를 사용하면 적절한 로드뷰 시점(ViewPoint)값을 쉽게 확인할 수 있습니다
            roadview.setViewpoint({
                pan: 321,
                tilt: 0,
                zoom: 0,
            });

            // 로드뷰 초기화가 완료되면
            kakao.maps.event.addListener(roadview, 'init', function () {
                // 로드뷰에 특정 장소를 표시할 마커를 생성하고 로드뷰 위에 표시합니다
                var rvMarker = new kakao.maps.Marker({
                    position: placePosition,
                    map: roadview,
                });
            });

            //로드뷰 세팅
            rvMarker = new kakao.maps.Marker({
                position: placePosition,
                map: roadview,
            });
        });
    });

    $('#stat-check').click(function(){
    	if($("input:checkbox[name=statCheck]").is(":checked") == true) {
    		  $('#plan-stat').text('점검완료');
    		  $('#plan-stat').attr('class','stat-complate');
    	}else{
    		  $('#plan-stat').text('점검예정');
    		  $('#plan-stat').attr('class','stat-yet');
    	}
    });

});
