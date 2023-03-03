<template>
    <div id="review_write_wrap">
        <h3 id="review_title">
            <span style="color:orange;">{{state.shopname}}</span>
            <span style="font-size:18px;">에 대한 솔직한 리뷰를 작성해주세요.</span>
        </h3>

        <div style="margin-left:150px;">
            <div class="star-rating space-x-4 mx-auto" style="float:left;">
                <input type="radio" id="5-stars" name="rating" value="5" v-model="state.point"/>
                <label for="5-stars" class="star pr-4">★</label>
                <input type="radio" id="4-stars" name="rating" value="4" v-model="state.point"/>
                <label for="4-stars" class="star">★</label>
                <input type="radio" id="3-stars" name="rating" value="3" v-model="state.point"/>
                <label for="3-stars" class="star">★</label>
                <input type="radio" id="2-stars" name="rating" value="2" v-model="state.point"/>
                <label for="2-stars" class="star">★</label>
                <input type="radio" id="1-star" name="rating" value="1" v-model="state.point" />
                <label for="1-star" class="star">★</label>
            </div>
            <div style="float:left;line-height: 50px;margin-left:20px;margin-bottom:20px;">({{ state.point }}점)</div>

        </div>
        
        <div style="margin-bottom:30px;">
            <el-input cols="30" :rows="7" type="textarea" v-model="state.content" placeholder="내용을 입력하세요."/>
        </div>

        <div class="filebox">
            <label for="file">파일찾기</label>
            <input type="file" id="file" v-on:change="handleFile($event)" />
        </div>

        <div id="thumnail_box">
            <img id="review_img" :src="state.img" alt="이미지"/>
        </div>

        <div id="save_btn">
            <el-button @click="reviewsave()" style="width:100%;">저장</el-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {

        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            point: 0,
            content: null,
            file: null,
            img: require('../assets/imgs/noimage.gif'),
            no: route.query._id,
            userInfo: null,
            shopname:route.query.shop,
        });

        state.userInfo = computed(() => store.state.userInfo);

        //리뷰 이미지 파일관리
        const handleFile = (e) => {
            if (e.target.files.length > 0) {
                state.file = e.target.files[0];
                state.img = URL.createObjectURL(state.file);
            } else {
                state.file = null;
                state.img = require('../assets/imgs/noimage.gif');
            }
        };


        //리뷰 저장
        const reviewsave = async() => {
            //저장 로직 실행 되기 전 유저 인증리뷰 체크
            const url = `/api/user/userupdatereviewcount.json`;
            const headers = { "Content-Type": "application/json" };
            const body = new FormData();
            body.append("email", state.userInfo.email);
            body.append("bakery_id", Number(state.no));
            const {data} = await axios.put(url, body, { headers });
            console.log('유저 리뷰카운트 업데이트', data);

            if (data.status === 200) {
                // 인증로직 검증 후 리뷰 저장 로직 실행
                const url = `/api/bakeryreview/insertshopreview.json?_id=${state.no}`;
                const headers = { "Content-Type": "multipart/form-data" };
                const body = new FormData();
                body.append("writer",state.userInfo.email);
                body.append("point",state.point);
                body.append("content",state.content);
                body.append("file",state.file);
                const { data } = await axios.post(url, body, { headers });
                console.log("리뷰저장 데이터 확인", data);
                if (data.status === 200) {
                    alert('저장되었습니다.');
                    pointupdate(state.no); //리뷰작성 완료되면 평점을 갱신한다.
                    updatereviewcount(); //상점 리뷰 수+1
                    router.push({path:'/bakeryone',query:{_id:state.no}});
                }

            }

        };

        //리뷰작성 완료시 평점 갱신 로직
        const pointupdate = async(id) => {
            const url = `/api/bakery/updateshoppoint.json?_id=${id}`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            const { data } = await axios.put(url, body, { headers });
            console.log('평점갱신 확인', data);

            // if (data.status === 200) {
            //     alert('수정되었습니다.');
            //     router.go(0); //새로고침
            // }
        };

        //상점별 리뷰수 업데이트(리뷰 저장시 실행)
        const updatereviewcount = async() => {
            const url = `/api/bakery/updatereviewcount.json?_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            await axios.put(url, body, { headers });
        };

        return {
            state,
            handleFile,
            reviewsave,
            updatereviewcount,
            pointupdate,
        }
    }
}
</script>

<style lang="css" scoped>
#review_write_wrap{
    width:500px;
    margin:0 auto;
    overflow: hidden;
    padding-top: 56px;
}

#review_title{
    margin-top:30px;
    margin-bottom:30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-align: center;
}

#thumnail_box{
    width:200px;
}

#review_img{
    width:100%;
    height:100%;
}

#save_btn{
    margin-top:10px;
    margin-bottom:50px;
}

.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; 
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: gold;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #fff58c;
}

.filebox label {
    display: inline-block;
    padding: 10px 20px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
    height: 37px;
    margin-left: 10px;
    font-size: 14px;
}

.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
</style>