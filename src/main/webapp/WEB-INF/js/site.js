var listInfo = {};
var listCount = 0;
var container = document.getElementById('container'), // 지도와 로드뷰를 감싸고 있는 div 입니다
    mapWrapper = document.getElementById('mapWrapper'), // 지도를 감싸고 있는 div 입니다
    btnRoadview = document.getElementById('btnRoadview'), // 지도 위의 로드뷰 버튼, 클릭하면 지도는 감춰지고 로드뷰가 보입니다
    btnMap = document.getElementById('btnMap'), // 로드뷰 위의 지도 버튼, 클릭하면 로드뷰는 감춰지고 지도가 보입니다
    rvContainer = document.getElementById('roadview'), // 로드뷰를 표시할 div 입니다
    mapContainer = document.getElementById('map'); // 지도를 표시할 div 입니다
var currentSiteSeq = 0;
var searchMode = false;

// 로드뷰 객체를 생성합니다
var roadview = new kakao.maps.Roadview(rvContainer);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

$.ajax({
    url: '/sessioncheck',
    type: 'post',
    success: function (result) {
        if (!result) {
            Swal.fire({
                icon: 'info',
                title: '접근 불가',
                text: '권한이 없습니다',
                onAfterClose: () => {
                    location.href = '/page/login';
                },
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

function getSiteList(listInfo) {
    $.ajax({
        url: '/getSiteList',
        type: 'post',
        data: JSON.stringify(listInfo),
        contentType: 'application/json; charset=utf-8;',
        dataType: 'json',
        success: function (result) {
            for (item of result) {
                $('.site-list').append('<span class="siteBx" id="site-name' + item.SITE_SEQ + '" seq="' + item.SITE_SEQ + '">' + item.SITE_NAME + '</span>');
            }
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function getSitecount() {
    $.ajax({
        url: '/getSiteCount',
        type: 'get',
        success: function (result) {
            listCount = result;
        },
        error: function (e) {
            console.log(e);
        },
    });
}

function mapBind(addr, name) {
    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(addr, function (result, status) {
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
                content: '<div style="width:150px;text-align:center;padding:6px 0;">' + name + '</div>',
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
}

function siteBind(result) {
    //site name bind
    $('#site-name').text(result.SITE_NAME);
    $('#site-name').attr('class', result.SITE_SEQ);
    //site manager table bind
    if (result.SITE_MANAGER) {
        var siteMan = result.SITE_MANAGER.split(',');
        $('#site-manager-tb').html('<tr><th>담당자</th><th>연락처</th></tr>');
        var j = 0;
        for (var i = 0; i < siteMan.length; i += 2) {
            $('#site-manager-tb').append('<tr id="site-man' + j + '"></tr>');
            $('#site-man' + j).append('<td>' + siteMan[i] + '</td><td>' + siteMan[i + 1] + '</td>');
            j++;
        }
    }

    //site address bind
    $('#site-addr').text(result.SITE_ADDRESS);
    mapBind(result.SITE_ADDRESS, result.SITE_NAME);

    //site memo bind
    $('#site-descript').html(result.SITE_DESCRIPT);
    $('#site-meta-user').text(result.SITE_META_USER_NAME);
    $(window).scrollTop(0);
}

function SiteListSearch() {
    var json = {};
    json.keyword = $('#search-keyword').val();
    if (json.keyword) {
        searchMode = true;
        $.ajax({
            url: '/getSiteListByName',
            type: 'post',
            data: JSON.stringify(json),
            contentType: 'application/json; charset=utf-8;',
            dataType: 'json',
            success: function (result) {
            	console.log(result)
            	if(result[0]){
            		   $('.site-list').text('');
                       for (item of result) {
                           $('.site-list').append('<span class="siteBx" id="site-name' + item.SITE_SEQ + '" seq="' + item.SITE_SEQ + '">' + item.SITE_NAME + '</span>');
                       }
            	}else{
            		   $('.site-list').html('<p id="site-empty">해당 사이트가 없습니다.</p>');
            	}
             
            },
            error: function (e) {
                console.log(e);
            },
        });
    } else {
        searchMode = false;
        $('.site-list').text('');
        listInfo.idx = 0;
        listInfo.count = 20;
        getSiteList(listInfo);
    }
}

$(document).ready(() => {
    $('.header').load('/resources/header.html?' + new Date().getTime());
    $(document).on('click', '.site-wrap span', function () {});

    //init data bind
    getSitecount();
    listInfo.idx = 0;
    listInfo.count = 20;
    getSiteList(listInfo);

    $.ajax({
        url: '/lastSiteInfo',
        type: 'get',
        success: function (result) {
            siteBind(result);
        },
        error: function (e) {
            console.log(e);
        },
    });

    $('.site-list').scroll(function () {
        if (!searchMode) {
            var height = $('.site-list').prop('scrollHeight');
            var scroll = $('.site-list').scrollTop() + 490;
            if (height <= scroll && listInfo.idx + 20 < listCount) {
                listInfo.idx += 20;
                listInfo.count += 20;
                getSiteList(listInfo);
            }
        }
    });

    $(document).on('click', '.siteBx', function () {
        var json = {};
        json.seq = $(this).attr('seq');
        currentSiteSeq=$(this).attr('seq');
        $.ajax({
            url: '/getSiteInfoBySeq',
            type: 'post',
            data: JSON.stringify(json),
            contentType: 'application/json; charset=utf-8;',
            dataType: 'json',
            success: function (result) {
                siteBind(result);
            },
            error: function (e) {
                console.log(e);
            },
        });
    });

    $('#insert-btn').click(function () {
        location.href = '/page/site/write';
    });

    $('#modify-btn').click(function () {
        location.href = '/page/site/modify';
    });

    $('#sitemap-btn').click('click', function () {
        siteMap();
    });

    $('#roadmap-btn').click('click', function () {
        roadMap();
    });

    $('#site-search-btn').click(function () {
        SiteListSearch();
    });
    $('#search-keyword').keyup(function (e) {
        if (e.keyCode == '13') {
            SiteListSearch();
        }
    });
});
