<template>
    <div id="wrap">
        <h1>띄우기</h1>
        <h1>띄우기</h1>
        
        <div id="review_img_zone">
            <div id="review_imgs_box" >
                <div id="review_imgs" v-for="data of reviewrows" :key="data">
                    <img :src="data.imageurl" id="review_imgs_one" alt="">
                </div>
            </div>

            <!-- 리뷰사진 더보기 -->
            <div id="more_img" @click="reviewmodal=true">
                더보기
            </div>
        </div>

        <!-- 모달영역 -->
        <div v-if="reviewmodal===true" id="modal_box">
            <div id="modal_inner_box" >
                <div id="modal_left">
                    <div id="big_img" v-if="modalonerows">
                        <img :src="modalonerows.imageurl" id="modal_big_img" alt=""/>
                    </div>

                    <div id="small_img_box">
                        <div v-for="data of reviewrows" :key="data">
                            <img id="modal_small_img" @click="modaldata(data._id, data.bakery_id)" :src="data.imageurl" alt="">
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

        // 모달창 안 1개 이미지 데이터 수신
        const modaldata = async(id,bakery_id) => {
            const url = `/api/bakeryreview/selectreviewone.json?_id=${id}&bakery_id=${bakery_id}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("모달 창 내 1개 이미지 데이터 확인", data);

            if (data.status === 200) {
                state.modalonerows = data.result;
            }
        };

        onMounted(()=>{
            handleData();
            reviewdata();
            
        });

        return {
            ...toRefs(state),
            state,
            moveReviewWrite,
            modaldata,
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
    position:absolute;
}

#reviewzone{
    background:#cccccc;
    width:500px;
    height:500px;
}

#review_img{
    width:300px;
    height:300px;
}

#review_img_zone{
    position:relative;
}

#more_img{
    position:absolute;
    left:1000px;
    top:0px;
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

#more_img{
    width:250px;
    height:280px;
    background:yellow;
}

/* 모달전체 박스 */
#modal_box{
    width:100%;
    height:100%;
    position:absolute;
    top:45px;
    left:130px;
}

#modal_left{
    
    width:700px;
    height:650px;    
}

#modal_inner_box{
    background-color: yellowgreen;
    width: 1300px;
    height: 650px;
    position:relative;
}

#small_img_box{
    width:1000px;
    height:100px;
    background:red;
    position:absolute;
    bottom:10px;
    z-index:1;
}

#modal_small_img{
    width:100px;
    height:100px;
    object-fit: cover;
    float:left;
}

#modal_big_img{
    width:400px;
    height:400px;
}

#modal_right{
    background:white;
    border:2px solid #cccccc;
    position:absolute;
    right:0;
    width:300px;
    height:650px;
    
    bottom:0
}
</style>