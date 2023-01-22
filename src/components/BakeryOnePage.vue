<template>
    <div id="wrap" :class="reviewmodal ? 'wrapon' :''" >
        <h1>띄우기</h1>
        <h1>띄우기</h1>
        
        <div id="review_img_zone">
            <div id="review_imgs_box" >
                <div id="review_imgs" v-for="data of reviewrows" :key="data">
                    <img :src="data.imageurl" @click="reviewmodal=true;modaldata(data._id)" id="review_imgs_one" alt="">
                </div>
            </div>

            <!-- 리뷰사진 더보기 -->
            <div id="more_img" @click="reviewmodal=true;modaldata(reviewfifth)">
                더보기
            </div>
        </div>

        <!-- 모달영역 -->
        <div v-if="reviewmodal===true" id="modal_box">
            <div id="close_btn_box" @click="reviewmodal=false"><el-icon id="close_btn" color="#ffffff" :size="40"><Close /></el-icon></div>
            <div id="modal_inner_box">
                <el-icon id="left_btn" @click="prevreview()" color="#ffffff" :size="60"><ArrowLeftBold /></el-icon>
                <el-icon id="right_btn" @click="nextreview()" color="#ffffff" :size="60"><ArrowRightBold /></el-icon>
                <div id="modal_left">
                    <div id="big_img" v-if="modalonerows">
                        <img :src="modalonerows.imageurl" id="modal_big_img" alt=""/>
                    </div>

                    <div id="small_img_box">
                        <div v-for="data of reviewrows" :key="data">
                            <img id="modal_small_img" @click="modaldata(data._id)" :src="data.imageurl" alt="">
                        </div>
                    </div>
                </div>
                <div id="modal_right" v-if="modalonerows">
                    <div>작성자:{{modalonerows.writer  }}</div>
                    <div>평점:{{modalonerows.point  }}</div>
                    <div>내용:{{modalonerows.content  }}</div>
                    <div>작성일:{{modalonerows.regdate1  }}</div>
                </div>
            </div>
        </div>

        
        <!-- 리뷰영역 -->
        <div v-if="rows">
            <div>{{ rows.name }}</div>
            <div>{{ rows.address }}</div>
            <div>{{ rows.menu }}</div>
            <div>{{ rows.price }}</div>
            <div>{{ rows.strength }}</div>
            <div>{{ rows.holiday }}</div>
        </div>

        <div><button @click="moveReviewWrite()">리뷰쓰기</button></div>

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
import { onMounted, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup () {
        
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            no : route.query._id,
            rows : null,
            reviewrows : null,
            modalonerows: null,
            page : 1,
            reviewmodal: true, //모달창 출력여부
            reviewfifth:0, //5번째 리뷰번호(내림차순, 더보기시 실행 용)
            prev:0, //모달 리뷰 이전번호
            next:0, //모달 리뷰 이후번호
        });

        // 빵집 한개 데이터 수신
        const handleData = async() => {
            const url = `/api/bakery/bakeryone.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("빵집 1개 데이터 확인", data);

            if (data.status === 200) {
                state.rows = data.result;
            }
        };

        // 리뷰쓰기페이지 이동
        const moveReviewWrite = () => {
            router.push({path:'/bakeryreviewwrite',query:{_id:state.no}});
        }

        // 리뷰 데이터 수신
        const reviewdata = async() => {
            const url = `/api/bakeryreview/selectreview.json?page=${state.page}&bakery_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("리뷰 1개 데이터 확인", data);

            if (data.status === 200) {
                state.reviewrows = data.result;
            }
        };

        // 내림차순 5번째 리뷰번호 받기
        const reviewdata5th = async() => {
            const url = `/api/bakeryreview/selectreviewone5.json?`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("리뷰 5번째 번호", data);

            if (data.status === 200) {
                state.reviewfifth = data.prev5;
            }
        }

        // 모달창 안 1개 이미지 데이터 수신
        const modaldata = async(id) => {
            const url = `/api/bakeryreview/selectreviewone.json?_id=${id}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("모달 창 내 1개 이미지 데이터 확인", data);

            if (data.status === 200) {
                state.modalonerows = data.result;
                state.prev = data.prev;
                state.next = data.next;
            }
        };

        // 모달창 안 이전 리뷰 보기
        const prevreview = () => {
            modaldata(state.next);
        };

        // 모달창 안 다음 리뷰 보기
        const nextreview = () => {
            modaldata(state.prev);
        };
        
        onMounted(()=>{
            handleData();
            reviewdata();
            reviewdata5th();
        });

        return {
            ...toRefs(state),
            state,
            moveReviewWrite,
            modaldata,
            prevreview,
            nextreview,
        }
    }
}
</script>

<style lang="css" scoped>
*{
    margin:0;
    padding:0;
}

#wrap{
    width:1920px;
    height:100%;
}

.wrapon{
    position:fixed;
}

#reviewzone{
    background:#cccccc;
    width:500px;
    height:500px;
}

#review_img{
    width:300px;
    height:300px;
    object-fit: cover;
}

#review_img_zone{
    position:relative;
}

#more_img{
    position:absolute;
    left:1000px;
    top:0px;
    width:250px;
    height:280px;
    background:yellow;
}

#review_imgs_box{
    overflow:hidden;
    width:1000px;
    height:280px;
}

#review_imgs_one{
    width:250px;
    height:280px;
    object-fit: cover;
    float:left;
}

/* 모달전체 박스 */
#modal_box{
    width:100%;
    height:100%;
    position:fixed;
    top:0px;
    left:0px;
}

/* 모달가상 전체박스 */
#modal_box::after{
    width:100%;
    height:100%;
    position:absolute;
    opacity:0.7;
    background: black;
    content:"";
    top:0px;
    left:0px;
    z-index:-2;
}

#close_btn{
    position:absolute;
    right:30px;
    top:30px;
    cursor:pointer;
}

#modal_inner_box{
    width: 1300px;
    height: 650px;
    position:absolute;
    left:50%;
    margin-left:-650px;
    top:50px;
}

#modal_inner_box::after{
    background-color: black;
    width: 1300px;
    height: 650px;
    content:"";
    position:absolute;
    left:0;
    top:0px;
    z-index:-1;
    opacity:0.8;
}

/* 모달 창 내 왼쪽이동버튼 */
#left_btn{
    position:absolute;
    top:270px;
    left:180px;
    cursor: pointer;
}

/* 모달 창 내 오른쪽이동버튼 */
#right_btn{
    position:absolute;
    top:270px;
    right:480px;
    cursor: pointer;
}

#modal_left{
    width:700px;
    height:650px;    
}

#small_img_box{
    width:910px;
    height:90px;
    background:black;
    position:absolute;
    bottom:10px;
    left:40px;
}

#modal_small_img{
    width:90px;
    height:90px;
    object-fit: cover;
    float:left;
    margin-left:1px;
}

#modal_big_img{
    width:400px;
    height:400px;
    position:absolute;
    top: 50%;
    left: 50%;
    margin: -250px 0 0 -350px;
    object-fit:cover;
}

#modal_right{
    background:white;
    position:absolute;
    right:0;
    width:300px;
    height:650px;
    bottom:0;
}
</style>