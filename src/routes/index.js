//1. 라이브러리 가져오기
import { createWebHistory, createRouter } from "vue-router";
// import store from '../stores/index.js';

// 2. 라우트 설정
import Home from '@/components/HomePage.vue';
import BakeryCategoryList from '@/components/BakeryCategoryListPage.vue';


const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path:'/', component:Home},
        {path:'/bakerycategorylist', component:BakeryCategoryList},
    ]
});

// 이전페이지 이동페이지 정보 확인용
router.beforeEach((to,from,next)=>{
    console.log('이전, 이후 페이지 정보',to,from);
    next(); //next가 없으면 기존에 이동하고자 하는 페이지로 이동
});

// 3. 모듈 export
export default router;
