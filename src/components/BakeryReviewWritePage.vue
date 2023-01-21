<template>
    <div>
        <h3>리뷰쓰기</h3>
        <h3>리뷰쓰기</h3>

        <div>
            <label for="writer">작성자</label>
            <input type="text" v-model="state.writer"/>
        </div>

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
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {

        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            point: 0,
            content: null,
            file: null,
            img: require('../assets/imgs/noimage.gif'),
            no : route.query._id,
            writer : '',
        });

        //리뷰 이미지 파일관리
        const handleFile = (e) => {
            console.log('파일', e);
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
            const url = `/api/bakeryreview/insertshopreview.json?_id=${state.no}`;
            const headers = { "Content-Type": "multipart/form-data" };
            const body = new FormData();
            body.append("writer",state.writer);
            body.append("point",state.point);
            body.append("content",state.content);
            body.append("file",state.file);
            const { data } = await axios.post(url, body, { headers });
            console.log("리뷰저장 데이터 확인", data);

            if (data.status === 200) {
                alert('저장되었습니다.');
                router.push({path:'/bakeryone',query:{_id:state.no}});
            }
        }

        return {
            state,
            handleFile,
            reviewsave,
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