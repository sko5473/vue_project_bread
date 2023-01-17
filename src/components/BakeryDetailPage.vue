<template>
    <div>
        
        <h1>빵집 상세보기</h1>
        <h1>빵집 상세보기</h1>
        <h1>빵집 상세보기</h1>
        <h1>빵집 상세보기</h1>
        <h1>빵집 상세보기</h1>
        <h1>빵집 상세보기</h1>

        <div v-for="data of state.rows" :key="data">
            <img :src="data.imageurl" alt="" style="width:300px;">
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            rows : null,
            place: route.query.text,
        });

        const handleData = async() => {
            const url = `/api/bakery/selectshop.json?page=1&text=${state.place}`;
            const headers = {"Content-Type":"application/json"};
            const { data } = await axios.get(url, { headers});
            console.log("지역별 상점 데이터 확인", data);

            if(data.status === 200){
                state.rows = data.result;
            }
        };

        onMounted(()=> {
            handleData();
        })
        return {
            state,
        }
    }
}
</script>

<style lang="css" scoped>

</style>