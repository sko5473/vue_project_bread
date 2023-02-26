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
                <el-icon id="left_btn" @click="prevreview()" color="#ffffff" :size="60">
                    <ArrowLeftBold />
                </el-icon>
                <el-icon id="right_btn" @click="nextreview()" color="#ffffff" :size="60">
                    <ArrowRightBold />
                </el-icon>
                <el-icon id="bottom_left_btn" @click="modalsmallimgdataprev()" color="#ffffff" :size="25">
                    <ArrowLeftBold />
                </el-icon>
                <el-icon id="bottom_right_btn" @click="modalsmallimgdatanext()" color="#ffffff" :size="25">
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
                    <div>작성자:{{ modalonerows.writer }}</div>
                    <div>평점:{{ modalonerows.point }}</div>
                    <div>내용:{{ modalonerows.content }}</div>
                    <div>작성일:{{ modalonerows.regdate1 }}</div>
                </div>
            </div>
        </div>
        <div style="float:left;margin-left:20px;"><el-button @click="moveReviewWrite()">리뷰쓰기</el-button></div>
        <div style="margin-left:50px;opacity:0.7;" v-if="isbookmark === false">
            <img src="@/assets/imgs/star.png" style="width:25px;" @click="updateStar()" /> 즐겨찾기
        </div>
        <div style="margin-left:50px;opacity:0.7;" v-if="isbookmark === true">
            <img src="@/assets/imgs/yellowstar.png" style="width:25px;" @click="deleteStar()" /> 즐겨찾기
        </div>

        <br />
        <!-- 본문 -->
        <div v-if="rows">
            <div style="float:left;"><img src="@/assets/imgs/writing.png" style="width:30px;" />{{ rows.reviewcount }}
            </div>
            <div style="margin-left:50px;opacity:0.7;"><img src="@/assets/imgs/star.png" style="width:25px;" />{{
                rows.bookmarkcount
            }}</div>
            <br />
            <div>평점 : {{ rows.point }}</div>
            <div>가게명 : {{ rows.name }}</div>
            <div>주소 : {{ rows.address }}</div>
            <div>메뉴 : {{ rows.menu }}</div>
            <div>가격 : {{ rows.price }}</div>
            <div>강점 : {{ rows.strength }}</div>
            <div>휴일 : {{ rows.holiday }}</div>
        </div>

        <!-- 리뷰영역 -->
        <div id="reviewzone" v-for="data of reviewrows" :key="data">
            <h3>리뷰영역</h3>
            <div>작성일:{{ data.regdate1 }}</div>
            <div>작성자:{{ data.writer }}</div>
            <div>평점:{{ data.point }}</div>
            <div>내용:{{ data.content }}</div>
            <div><img id="review_img" :src="data.imageurl" alt="" /></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, reactive, toRefs, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

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
        });

        state.userInfo = computed(() => store.state.userInfo);

        // 빵집 한개 데이터 수신
        const handleData = async () => {
            const url = `/api/bakery/bakeryone.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log('값',data);

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
        const deleteStar = async() => {
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
            }
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
        }
    }
}
</script>

<style lang="css" scoped>

#bakeryone_wrap {
    margin: 0 auto;
    width: 1440px;
    overflow: hidden;
}

.wrapon {
    position: fixed;
}

#reviewzone {
    background: #cccccc;
    width: 500px;
    height: 500px;
}

#review_img {
    width: 300px;
    height: 300px;
    object-fit: cover;
}

#review_img_zone {
    position: relative;
}

#more_img {
    position: absolute;
    left: 1000px;
    top: 0px;
    width: 250px;
    height: 280px;
    background: yellow;
}

#review_imgs_box {
    overflow: hidden;
    width: 1000px;
    height: 280px;
}

#review_imgs_one {
    width: 250px;
    height: 280px;
    object-fit: cover;
    float: left;
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
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
}

#modal_inner_box {
    width: 1300px;
    height: 650px;
    position: absolute;
    left: 50%;
    margin-left: -650px;
    top: 50px;
}

#modal_inner_box::after {
    background-color: black;
    width: 1300px;
    height: 650px;
    content: "";
    position: absolute;
    left: 0;
    top: 0px;
    z-index: -1;
    opacity: 0.8;
}

/* 모달 창 내 왼쪽이동버튼 */
#left_btn {
    position: absolute;
    top: 270px;
    left: 180px;
    cursor: pointer;
}

/* 모달 창 내 오른쪽이동버튼 */
#right_btn {
    position: absolute;
    top: 270px;
    right: 480px;
    cursor: pointer;
}

#bottom_left_btn {
    position: absolute;
    bottom: 42px;
    left: 15px;
    cursor: pointer;
}

#bottom_right_btn {
    position: absolute;
    bottom: 42px;
    right: 310px;
    cursor: pointer;
}

#modal_left {
    width: 700px;
    height: 650px;
}

#small_img_box_wrap {
    width: 910px;
    height: 90px;
    position: absolute;
    bottom: 10px;
    left: 45px;
}

#small_img_box {
    width: 100%;
    height: 90px;
    overflow: hidden;
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

.on {
    opacity: 1;
}

.off {
    opacity: 0.5;
}

#modal_big_img {
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -250px 0 0 -350px;
    object-fit: cover;

    /* 블록선택 막기 */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

#modal_right {
    background: white;
    position: absolute;
    right: 0;
    width: 300px;
    height: 650px;
    bottom: 0;
}
</style>