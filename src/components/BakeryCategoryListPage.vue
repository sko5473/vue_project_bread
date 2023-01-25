<template>
    <div id="wrap">
        <div id="left_bar">
            <!-- 카카오맵 -->
            <div id="map" style="width:100%;height:600px;"></div>

            <div id="inner_box">
                <div id="move_area_title">지역별 빵 맛집 리스트 바로가기</div>
                <div id="move_area_btns">
                    <el-button class="area_btn" @click="movearea('해운대구')">해운대구</el-button>
                    <el-button class="area_btn" @click="movearea('부산진구')">부산진구</el-button>
                    <el-button class="area_btn" @click="movearea('동구')">동구</el-button>
                    <el-button class="area_btn" @click="movearea('동래구')">동래구</el-button>
                    <el-button class="area_btn" @click="movearea('금정구')">금정구</el-button>
                </div>
            </div>
        </div>
        <!-- 내용 -->
        
        <div id="content">
            <!-- 헤더박스 -->
            <div id="header_box">
                <div id="main_title">{{ state.place }} 제과점 Best50</div>
            </div>
           
            <div class="one_shop_box" v-for="data of state.rows" :key="data">
                <div class="img_div">
                    <img class="shop_img" :src="data.imageurl" @click="bakeryonemove(data._id)" alt="" />
                </div>
                <div class="shop_information_box">
                    <div class="shop_name">{{ data.name }}</div>
                    <div class="reputation">{{ data.point }}</div>
                </div>
            </div>
        </div>

        <div id="pagination_box">
            <el-pagination background layout="prev, pager, next" :total="state.total" @current-change="handlePage" />
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {

        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            rows: [],
            place: route.query.text,
            map: null,
            total: 0,
            page: 1,
            marker: null,
            position: null,
            overlay: null,
        });

        //상점정보 수신
        const handleData = async () => {
            const url = `/api/bakery/selectshop.json?page=${state.page}&text=${state.place}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("지역별 상점 데이터 확인", data);

            if (data.status === 200) {
                state.rows = data.result;
                state.total = data.total;
            }
        };

        //빵집 상세페이지 이동
        const bakeryonemove = (no) => {
            router.push({ path: '/bakeryone', query: { _id: no } })
        }

        //지역별 빵 맛집 리스트 바로가기 버튼 클릭시 이동
        const movearea = (place) => {
            state.place = place;
            handleData();
            router.push({ path: '/bakerycategorylist', query: { page: 1, text: place } });
            handleMap();
        };

        const handlePage = (page) => {
            state.page = page;
            handleData();
            handleMap();
        }

        // 맵구성정보
        const initMap = () => {
            const mapContainer = document.getElementById('map'); // 지도를 표시할 div 
            const mapOption = {
                center: new window.kakao.maps.LatLng(35.1516207, 129.0607662),
                level: 4,
            }
            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
             
            // const closeOverlay = () => {
            //     overlay.setMap(null);
            // }

            
            const content = 
            '<div class="wrap" style="position:relative;background:white;width:250px;height:140px;border:1px solid black; ">' + 
            '    <div class="left_box" style="position:absolute;left:0;top:0;">' + 
            '        <div class="img_box" style="width:100px;height:100px;" >' + 
            '            <img src="" style="width:100%;height:100%;object-fit:cover;z-index:10;"/>' + 
            '        </div>' + 
            '    </div>' + 
            '    <div class="right_box" >' + 
            '        <div class="title"></div><div class="point"></div>' +
            '        <div class="s_title"></div>' +
            '        <div class="right_box_bottom">' + 
            '            <div class="reviewCount"></div>' + 
            '            <div class="starCount"></div' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';

            const overlay = new window.kakao.maps.CustomOverlay({
                    content : content,
                    map:map,
                    position:state.position
            });


            const addMarker = (latitude,longitude) => {
                var position = new window.kakao.maps.LatLng(latitude,longitude);
                var marker = new window.kakao.maps.Marker({
                    map,
                    position
                });

                window.kakao.maps.event.addListener(marker, 'click', function () {
                    console.log(this);
                    overlay.setPosition(marker.getPosition());
                    overlay.setMap(map);
                });
            }

            for (let data of state.rows) {
                addMarker(data.lat,data.lng)
            }
        };


        //맵 설정
        const handleMap = () => {
            let script = document.createElement("script");
            script.setAttribute("src", "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=550fd443d4e078c255532b8398c15133");
            document.head.appendChild(script);
            console.log(window);
            script.onload = () => {
                window.kakao.maps.load(initMap); //맵 생성
            }
        };

        onMounted(() => {
            handleMap();
            handleData();
        });

        return {
            state,
            initMap,
            movearea,
            handlePage,
            bakeryonemove,
        };
    }
}
</script>

<style lang="css" scoped>
@font-face {
    font-family: 'custom_font';
    src: url(../assets/fonts/EF_watermelonSalad\(윈도우용TTF\).ttf);
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'custom_font2';
    src: url(../assets/fonts/NanumSquareNeoTTF-cBd.woff);
    font-weight: normal;
    font-style: normal;
}

#wrap {
    width: 1565px;
    position: relative;
}

/* 왼쪽 바 네비게이터 */
#left_bar {
    width: 500px;
    background: rgb(236, 184, 142);
    position: absolute;
    left: 0;
}

#map {}

/* 지역별 빵 맛집 리스트 바로가기 박스 */
#inner_box {
    position: relative;
    height: 200px;
}

/* 지역별 빵 맛집 리스트 바로가기 타이틀 */
#move_area_title {
    font-family: 'custom_font';
    font-size: 25px;
    margin-left: 27px;
    position: absolute;
    top: 20px;
}

/* 지역별 이동버튼묶음 */
#move_area_btns {
    position: absolute;
    top: 70px;
    margin-left: 27px;
}

/* 지역별 이동버튼 */
.area_btn {
    width: 80px;
}


/* 카테고리 리스트 제목 */
#content {
    position: relative;
    width: 1000px;
    margin-left: 520px;
}

/* 카테고리리스트 헤더박스 */
#header_box {
    padding-top: 20px;
    padding-bottom: 50px;
}

#main_title {
    font-size: 30px;
    color: rgb(194, 177, 154);
    font-family: 'custom_font';
    margin-left: 70px;
}

.one_shop_box {
    width: 380px;
    height: 350px;
    display: inline-block;
    margin-left: 70px;
}

/* 가게섬네일 감싼 div */
.img_div {
    width: 380px;
    height: 270px;
}

/* 가게섬네일 img태그 */
.shop_img {
    width: 100%;
    height: 100%;
}

/* 가게정보박스 */
.shop_information_box {
    margin-top: 10px;
}

/* 가게정보 박스 안 가게명 */
.shop_name {
    font-family: custom_font2;
    font-size: 25px;
    float: left;
    margin-left: 150px;
}

/* 가게정보 박스 안 평점 */
.reputation {
    margin-left: 15px;
    font-family: custom_font2;
    font-size: 25px;
    color: rgb(255, 115, 0);
    float: left;
}

#pagination_box {
    position: absolute;
    left: 50%;
    margin-bottom: 50px;
}

/* 오버레이 css */
.overlay_wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
    .overlay_wrap * {padding: 0;margin: 0;}
    .overlay_wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
    .overlay_wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
    .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
    .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;
        background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
    }
    .info .close:hover {cursor: pointer;}
    .info .body {position: relative;overflow: hidden;}
    .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
    .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
    .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
    .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
    }
    .info .link {color: #5085BB;}
</style>