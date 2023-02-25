<template>
    <div>
        <h3>리뷰 작성</h3>

        <div>
            <label for="point">평점</label>
            <input type="number" v-model="state.point"/>
        </div>
        <div>
            <label for="point">내용</label>
            <input type="text" v-model="state.content"/>
        </div>
        <div>
            <label for="picture"></label>
            <input type="file" v-on:change="handleFile($event)" />
        </div>

        <div>
            <button @click="reviewsave()">저장</button>
        </div>
        <div id="thumnail_box">
            <img id="review_img" :src="state.img" alt="이미지"/>
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
#thumnail_box{
    width:200px;
}

#review_img{
    width:100%;
    height:100%;
}
</style>