<template>
    <div id="bakeryone_wrap" :class="reviewmodal ? 'wrapon' : ''">
        <div id="review_img_zone">
            <div id="review_imgs_box">
                <div id="review_imgs" v-for="(data, index) of reviewrows" :key="index">
                    <img :src="data.imageurl"
                        @click="reviewmodal = true; modaldata(data._id); state.count = index; state.set = 0"
                        id="review_imgs_one" alt="" :index="index">
                </div>
            </div>

            <!-- 리뷰사진 더보기 -->
            <div id="more_img" @click="reviewmodal = true; modaldata(reviewfifth); state.count = 5; state.set = 0">
                더보기
            </div>
        </div>

        <!-- 모달영역 -->
        <div v-if="reviewmodal === true" id="modal_box">
            <div id="close_btn_box" @click="reviewmodal = false"><el-icon id="close_btn" color="#ffffff" :size="40">
                    <Close />
                </el-icon></div>
            <div id="modal_inner_box">
                <el-icon id="left_btn" @click="prevreview()" color="rgb(206, 203, 203)" :size="60">
                    <ArrowLeftBold />
                </el-icon>
                <el-icon id="right_btn" @click="nextreview()" color="rgb(206, 203, 203)" :size="60">
                    <ArrowRightBold />
                </el-icon>
                <el-icon id="bottom_left_btn" @click="modalsmallimgdataprev()" color="rgb(206, 203, 203)" :size="25">
                    <ArrowLeftBold />
                </el-icon>
                <el-icon id="bottom_right_btn" @click="modalsmallimgdatanext()" color="rgb(206, 203, 203)" :size="25">
                    <ArrowRightBold />
                </el-icon>

                <div id="modal_left">
                    <div id="big_img" v-if="modalonerows">
                        <img :src="modalonerows.imageurl" id="modal_big_img" alt="" />
                    </div>

                    <div id="small_img_box_wrap">
                        <div id="small_img_box">
                            <div v-for="(data, index) of smallimgrows" :key="index">
                                <img class="modal_small_img" @click="modaldata(data._id); highlight($event)"
                                    :src="data.imageurl" :index="index" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal_right" v-if="modalonerows">
                    <div id="modal_right_content_wrap">
                        <div id="modal_right_shopname">
                            <div class="modal_right_content">{{ rows.name }}</div>
                        </div>
                        <div id="modal_right_content_wrap_box">
                            <div class="modal_right_content" style="font-size:20px;float:left;">{{ modalonerows.writer }}
                            </div>
                            <div id="star_content" style="position:absolute; right:15px;">
                                <div class="modal_right_content" v-if="modalonerows.point == 1">
                                    <span id="fill_star">★</span>
                                    <span id="empty_star">★★★★</span>
                                </div>
                                <div class="modal_right_content" v-if="modalonerows.point == 2">
                                    <span id="fill_star">★★</span>
                                    <span id="empty_star">★★★</span>
                                </div>
                                <div class="modal_right_content" v-if="modalonerows.point == 3">
                                    <span id="fill_star">★★★</span>
                                    <span id="empty_star">★★</span>
                                </div>
                                <div class="modal_right_content" v-if="modalonerows.point == 4">
                                    <span id="fill_star">★★★★</span>
                                    <span id="empty_star">★</span>
                                </div>
                                <div class="modal_right_content" v-if="modalonerows.point == 5">
                                    <span id="fill_star">★★★★★</span>
                                    <span id="empty_star"></span>
                                </div>
                            </div>
                            <div style="position:absolute;left:0;margin-top:80px;">
                                <div class="modal_right_content">{{ modalonerows.content }}</div>
                                <div class="modal_right_content" style="margin-top:20px;">{{ modalonerows.regdate1 }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="left_wrap">
            <div id="left_top" v-if="rows">
                <div id="shop_name">{{ rows.name }}</div>
                <div id="shop_point">{{ rows.point }}</div>
                <div id="left_top_right">
                    <div><img src="@/assets/imgs/writing.png" @click="moveReviewWrite()" id="review_write_img"/></div>
                     <!-- 비로그인 일 때 빈 별 -->
                    <div style="opacity:0.7;line-height: 38px;" v-if="isLogin === false">
                        <div id="empty_star" style="font-size:40px;cursor: pointer;">★</div>
                    </div>

                    <!-- 로그인 되어 있고 즐찾 안되어 있을때 빈 별 -->
                    <div style="opacity:0.7;line-height: 38px;" v-if="isbookmark === false && isLogin === true">
                        <div id="empty_star" @click="updateStar()" style="font-size:40px;cursor: pointer;">★</div>
                    </div>

                    <!-- 로그인 되어 있고 즐찾 되어 있으면 노란 별 -->
                    <div style="opacity:0.7;line-height: 38px;" v-if="isbookmark === true && isLogin === true">
                        <div id="fill_star" @click="deleteStar()" style="font-size:40px;cursor: pointer;">★</div>
                    </div>
                </div>
                <div style="margin-left:565px;">
                    <div style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-size:12px;float:left;color:gray;margin-right:25px;">리뷰쓰기</div>
                    <div style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;font-size:12px;color:gray;">즐겨찾기</div>
                </div>
                <div id="left_top_1">
                    <div style="float:left;">
                        <img src="@/assets/imgs/writing.png" style="width:20px;opacity:0.7;margin-bottom:2px;" />
                        <label for="" style="color:gray;">{{ rows.reviewcount }}</label>
                    </div>
                    
                    <div style="margin-left:50px;opacity:0.7;">
                        <img src="@/assets/imgs/star.png" style="width:15px;opacity:0.7;margin-bottom:3px;" />
                        <label for="" style="margin-left: 5px;">{{rows.bookmarkcount}}</label>
                    </div>
                </div>
            </div>

            <!-- 본문 -->
            <div v-if="rows" id="content_wrap">
                <div>
                    <label for="" class="content_lbl">주소</label>
                    <div class="content_content">{{ rows.address }}</div>
                </div>
                <div>
                    <label for="" class="content_lbl">메뉴</label>
                    <div  class="content_content">{{ rows.menu }}</div>
                </div>
                <div>
                    <label for="" class="content_lbl">가격</label>
                    <div class="content_content">{{ rows.price }}</div>
                </div>
                <div>
                    <label for="" class="content_lbl">강점</label>
                    <div class="content_content">{{ rows.strength }}</div>
                </div>
                <div>
                    <label for="" class="content_lbl">휴일</label>
                    <div class="content_content">{{ rows.holiday }}</div>
                </div>
            </div>

            <!-- 리뷰영역 -->
            <div style="font-family: custom_font2;margin-bottom:30px;margin-top:20px;">리뷰({{ reviewtotal }})</div>
            <div id="reviewzone" v-for="data of reviewrows" :key="data">

                <div id="reviewzone_left">
                    <div>{{ data.writer }}</div>
                </div>
                <div id="reviewzone_content">
                    <div style="color:gray;font-family: custom_font2;font-size:13px;margin-bottom:10px;">{{ data.regdate1 }}</div>
                    <div style="font-family: custom_font2;">내용:{{ data.content }}</div>
                    <div id="reviewzone_bottom">
                        <img id="review_img" :src="data.imageurl"/>
                    </div>
                </div>
                <div id="reviewzone_right">
                    <div class="modal_right_content" v-if=" data.point == 1">
                        <span id="fill_star">★</span>
                        <span id="empty_star">★★★★</span>
                    </div>
                    <div class="modal_right_content" v-if=" data.point == 2">
                        <span id="fill_star">★★</span>
                        <span id="empty_star">★★★</span>
                    </div>
                    <div class="modal_right_content" v-if=" data.point == 3">
                        <span id="fill_star">★★★</span>
                        <span id="empty_star">★★</span>
                    </div>
                    <div class="modal_right_content" v-if=" data.point == 4">
                        <span id="fill_star">★★★★</span>
                        <span id="empty_star">★</span>
                    </div>
                    <div class="modal_right_content" v-if=" data.point == 5">
                        <span id="fill_star">★★★★★</span>
                        <span id="empty_star"></span>
                    </div>
                </div>
            </div>
            <el-pagination layout="prev, pager, next" :total="reviewtotal" @current-change="handlePage" 
            style="margin: 20px 0;margin-left: 320px;" page-size="5"/>
        </div>
        <div id="right_wrap">


        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { watch } from '@vue/runtime-core';

export default {
    setup() {

        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            no: route.query._id,
            rows: null,
            reviewrows: null,
            modalonerows: null,
            smallimgrows: null,
            page: 1,
            reviewmodal: false, //모달창 출력여부
            reviewfifth: 0, //5번째 리뷰번호(내림차순, 더보기시 실행 용)
            prev: 0, //모달 리뷰 이전번호
            next: 0, //모달 리뷰 이후번호
            count: 0,//모달 > 버튼클릭시 인덱스이동번호
            total: 0,
            set: 0,
            isbookmark: false, //북마크 여부
            userInfo: null,
            isLogin: false,
            isModal: false,
            reviewtotal: 0, //리뷰 총 개수(페이지네이션 용)
        });

        state.userInfo = computed(() => store.state.userInfo);
        state.isLogin = computed(() => store.state.isLogin);
        state.isModal = computed(() => store.state.isModal);

        // 모달상태 변경(true,false)을 감지해서 true면 store의 isModal값을 true하여 메뉴바와 푸터를 display:none한다.
        watch(
            () => state.reviewmodal,
            () => {
                if (state.reviewmodal == true) {
                    store.commit("modalTrueMode");
                } else {
                    store.commit("modalFalseMode");
                }
            },
            { deep: true }
        );

        // 빵집 한개 데이터 수신
        const handleData = async () => {
            const url = `/api/bakery/bakeryone.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log('값', data);

            if (data.status === 200) {
                state.rows = data.result;
            }
        };

        //새로고침시 나의 즐겨찾기에 해당 상점이 있는지 조회후 있으면 노란별, 없으면 빈별 표시
        const selectmybookmark = async () => {
            const url = `/api/mybookmark/selectmybookmark.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                if (data.result.length > 0) {
                    state.isbookmark = true //나의북마크에 해당상점 데이터 있으면 노란스타
                } else {
                    state.isbookmark = false //없으면 빈스타
                }
            }
        };

        //즐겨찾기버튼 클릭시 해당 상점 즐겨찾기 카운트 1증가
        const updateStar = async () => {
            const url = `/api/bakery/updatebookmarkcountup.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            const { data } = await axios.put(url, body, { headers });
            if (data.status === 200) {
                updateStarContent();
            }
        }

        //나의 즐겨찾기에 추가 /api/mybookmark/insertbookmark.json
        const updateStarContent = async () => {
            const url = `/api/mybookmark/insertbookmark.json`;
            const headers = { "Content-Type": "application/json" };
            const body = new FormData();
            body.append("bakerynum", state.no);
            body.append("name", state.rows.name);
            body.append("email", state.userInfo.email);
            body.append("address", state.rows.address);
            const { data } = await axios.post(url, body, { headers });

            if (data.status === 200) {
                state.isbookmark = true
            }
        }

        //노란즐겨찾기 클릭시 해당 상점 즐겨찾기 카운트 1감소
        const deleteStar = async () => {
            const url = `/api/bakery/updatebookmarkcountdown.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            const { data } = await axios.put(url, body, { headers });
            if (data.status === 200) {
                deleteStarContent();
            }
        };


        //나의 즐겨찾기에서 삭제
        const deleteStarContent = async () => {
            const url = `/api/mybookmark/deletemybookmark.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            const { data } = await axios.delete(url, body, { headers });
            if (data.status === 200) {
                state.isbookmark = false
            }
        }

        // 리뷰쓰기페이지 이동
        const moveReviewWrite = () => {
            router.push({ path: '/bakeryreviewwrite', query: { _id: state.no, shop: state.rows.name } });
        }

        // 리뷰 데이터 수신
        const reviewdata = async () => {
            const url = `/api/bakeryreview/selectreview.json?page=${state.page}&bakery_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.reviewrows = data.result;
                state.reviewtotal = data.total;
            }
        };

        //리뷰 페이지네이션 페이지 이동
        const handlePage = (page) => {
            state.page = page;
            reviewdata();
        };

        // 내림차순 5번째 리뷰번호 받기
        const reviewdata5th = async () => {
            const url = `/api/bakeryreview/selectreviewone5.json?`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.reviewfifth = data.prev5;
            }
        }

        // 모달창 안 1개 이미지 데이터 수신
        const modaldata = async (id) => {
            const url = `/api/bakeryreview/selectreviewone.json?_id=${id}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.modalonerows = data.result;
                state.prev = data.prev;
                state.next = data.next;
            }
        };

        // 모달창 내 스몰이미지 데이터 수신
        const modalsmallimgdata = async () => {
            const url = `/api/bakeryreview/selectreviewsmallimg.json?bakery_id=${state.no}&page=${state.page}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.smallimgrows = data.result;
                state.total = Math.floor((data.total - 1) / 10) + 1;
            }
        };

        //스몰이미지 prev
        const modalsmallimgdataprev = () => {
            if (state.page > 1) {
                state.page -= 1;
                modalsmallimgdata();
            } else {
                modalsmallimgdata();
            }
        };

        //스몰이미지 next
        const modalsmallimgdatanext = () => {
            if (state.page < state.total) {
                state.page += 1;
                modalsmallimgdata();
            } else {
                modalsmallimgdata();
            }
        };

        // 모달창 안 이전 리뷰 보기
        const prevreview = () => {

            if (state.count > 0) {
                modaldata(state.next);
                state.count -= 1;
                highlight(state.count);
            } else {
                if (state.set > 0) {
                    state.set--;
                    state.count = 10;
                    modalsmallimgdataprev();
                    prevreview();
                    highlight(9);
                } else {
                    return false;
                }

            }
        };

        // 모달창 안 다음 리뷰 보기
        const nextreview = () => {

            if (state.count < 9) {
                modaldata(state.prev);
                state.count += 1;
                highlight(state.count);
            } else {

                if (state.set < state.total) {
                    state.set++;
                    modalsmallimgdatanext();
                    state.count = -1;
                    nextreview();
                    if (state.set === state.total) {
                        state.set--;
                        return false;
                    }
                } else {
                    return false;
                }
            }
        };

        //클릭한 모달이미지 하이라이트 부여
        const highlight = (e) => {
            if (typeof e === 'number') {
                const modal_small_img = document.getElementsByClassName('modal_small_img');

                for (var j = 0; j < modal_small_img.length; j++) {
                    modal_small_img[j].classList.remove('on');
                }

                modal_small_img[e].classList.add('on');


            } else {
                e.target.getAttribute('index');

                const modal_small_img = document.getElementsByClassName('modal_small_img');

                for (var i = 0; i < modal_small_img.length; i++) {
                    modal_small_img[i].classList.remove('on');
                }

                e.target.classList.add('on');
            }
        };

        onMounted(() => {
            handleData();
            reviewdata();
            reviewdata5th();
            modalsmallimgdata();
            selectmybookmark();
        });

        return {
            ...toRefs(state),
            state,
            moveReviewWrite,
            modaldata,
            prevreview,
            nextreview,
            modalsmallimgdatanext,
            modalsmallimgdataprev,
            highlight,
            updateStar,
            deleteStar,
            handlePage,
        }
    }
}
</script>

<style lang="css" scoped>
#bakeryone_wrap {
    margin: 0 auto;
    width: 1440px;
    overflow: hidden;
    padding-top: 56px;
}

/* 좌측 wrap */
#left_wrap {
    width: 1000px;
    overflow: hidden;
    float: left;
    padding-left:140px;
    padding-top:60px;
}

/* 우측 wrap */
#right_wrap {
    width: 400px;
    background-color: #cccccc;
    height: 1000px;
    float: left;
    margin-top: 5px;
    margin-left: 40px;
}

#left_top{
    position: relative; 
    border-bottom: 1px solid #cccccc;  
    height: 100px; 
}

#left_top_1{
    position: absolute;
    top: 60px;
}

/* 가게명 */
#shop_name {
    font-family: custom_font2;
    font-size: 28px;
    float: left;
}

/* 가게 평점 */
#shop_point {
    font-family: custom_font2;
    font-size: 26px;
    color: rgb(255, 115, 0);
    float: left;
    margin-left: 30px;
}

#left_top_right{
    margin-left: 570px;
    z-index:-2;
}

#left_top_right::after{
    content: ""; /*빈내용 */
    clear: both;
    display: block;
}

/* 내용 */
#content_wrap{
    border-bottom: 1px solid #cccccc;  
    padding: 30px 0;
}

.content_lbl{
    width: 100px;
    float: left;
    color: gray;
    font-family: custom_font2;
}

.content_content{
    font-family: custom_font2;
    margin-bottom: 10px;
}
.wrapon {
    position: fixed;
}

#review_img {
    width: 120px;
    height: 120px;
    object-fit: cover;
}

#review_img_zone {
    position: relative;
}

#more_img {
    position: absolute;
    left: 92%;
    top: 80%;
    width: 90px;
    height: 40px;
    background: rgb(54, 52, 52);
    color: white;
    opacity: 0.8;
    border-radius: 20px;
    text-align: center;
    font-size: 19px;
    line-height: 40px;
    cursor: pointer;
}

#more_img:hover {
    background: #0f0f0f;
}

#review_imgs_box {
    overflow: hidden;
    width: 100%;
    height: 280px;
}

#review_imgs {
    width: 19.6%;
    height: 280px;
    float: left;
    margin-left: 5px;
}

#review_imgs_one {
    width: 100%;
    height: 280px;
    object-fit: cover;
    margin-left: 5px;
    float: left;
}

#review_write_img{
    width: 50px;
    opacity: 0.6;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    z-index: 2;
}

/* 모달전체 박스 */
#modal_box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
}

/* 모달가상 전체박스 */
#modal_box::after {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.7;
    background: black;
    content: "";
    top: 0px;
    left: 0px;
    z-index: -2;
}

#close_btn {
    position: fixed;
    right: 2%;
    top: 3%;
    cursor: pointer;
}

#modal_inner_box {
    width: 90%;
    height: 90%;
    position: fixed;
    left: 5%;
    top: 5%;
}

#modal_inner_box::after {
    background-color: black;
    width: 90%;
    height: 90%;
    content: "";
    position: fixed;
    left: 5%;
    top: 5%;
    z-index: -1;
    opacity: 0.8;
    border-radius: 10px;
}

#modal_left {
    width: 80%;
    height: 90%;
}

/* 모달 우측 전체 박스 */
#modal_right {
    background: white;
    position: fixed;
    right: 5%;
    width: 20%;
    height: 90%;
    bottom: 5%;
    border-radius: 5px;
}

/* 모달우측 박스묶음 */
#modal_right_content_wrap {
    position: relative;
}


#modal_right_shopname {
    border-bottom: 1px solid #cccccc;
}

#modal_right_content_wrap_box {
    position: relative;
}

/* 모달우측 내용 */
.modal_right_content {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-left: 10px;
}

#fill_star {
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #2b2a29;
    -webkit-text-fill-color: gold;
    font-size: 20px;
}

#empty_star {
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #2b2a29;
    font-size: 20px;
}

/* 모달 창 내 왼쪽이동버튼 */
#left_btn {
    position: absolute;
    top: 43%;
    left: 2%;
    cursor: pointer;
}

/* 모달 창 내 오른쪽이동버튼 */
#right_btn {
    position: absolute;
    top: 43%;
    right: 24%;
    cursor: pointer;
}

#modal_big_img {
    width: 64%;
    height: 75%;
    position: absolute;
    top: 6%;
    left: 7%;
    object-fit: cover;

    /* 블록선택 막기 */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#small_img_box_wrap {
    width: 64%;
    height: 20%;
}

#small_img_box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 85%;
    left: 7%;
}

.modal_small_img {
    width: 90px;
    height: 90px;
    object-fit: cover;
    float: left;
    margin-left: 1px;
    position: relative;
    opacity: 0.5;

    /* 블록선택 막기 */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#bottom_left_btn {
    position: absolute;
    top: 90%;
    left: 4%;
    cursor: pointer;
}

#bottom_right_btn {
    position: absolute;
    top: 90%;
    right: 26%;
    cursor: pointer;
}

.on {
    opacity: 1;
}

.off {
    opacity: 0.5;
}

#reviewzone {
    width: 860px;
    overflow: hidden;
    margin-top: 20px;
    border-bottom: 1px solid #cccccc;

}

#reviewzone_left{
    float: left;
}

#reviewzone_content{
    float: left;
    width: 550px;
    margin-left: 30px;
}

#reviewzone_bottom{
    margin: 20px 0;
    
}
</style>