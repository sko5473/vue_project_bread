<template>
    <div>
        {{ rows }}
        <div v-if="rows">
            <div>{{ rows.name }}</div>
            <div>{{ rows.address }}</div>
            <div>{{ rows.menu }}</div>
            <div>{{ rows.price }}</div>
            <div>{{ rows.strength }}</div>
            <div>{{ rows.holiday }}</div>
        </div>
        <div><button @click="moveReviewWrite()">리뷰쓰기</button></div>
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
            const url = `/api/bakeryreview/selectreview.json?bakery_id=${state.no}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("리뷰 1개 데이터 확인", data);

            // if (data.status === 200) {
            //     state.rows = data.result;
            // }
        };

        onMounted(()=>{
            handleData();
            reviewdata();
            
        });

        return {
            ...toRefs(state),
            state,
            moveReviewWrite,
        }
    }
}
</script>

<style lang="css" scoped>

</style>