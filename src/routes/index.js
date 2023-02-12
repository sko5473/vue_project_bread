//1. 라이브러리 가져오기
import { createWebHistory, createRouter } from "vue-router";
import store from '../stores/index.js';
import { computed } from "vue";

// 2. 라우트 설정
import Home from '@/components/HomePage.vue';
import BakeryCategoryList from '@/components/BakeryCategoryListPage.vue';
import BakeryOne from '@/components/BakeryOnePage.vue';
import BakeryReviewWrite from '@/components/BakeryReviewWritePage.vue';
import Join from '@/components/User/JoinPage.vue';
import Login from '@/components/User/LoginPage.vue';
import MyPage from '@/components/User/MyPage.vue';
import Cs from '@/components/CsPage.vue';
import Admin from '@/components/User/AdminPage.vue';
import Introduce from '@/components/IntroducePage.vue';

const isLogin = computed(()=> store.state.isLogin); //vuex에서 로그인유무상태를 가져온다.

//로그인 유무 체크
const loginCheck = (to,from,next) => {
    if(isLogin.value === false){
        alert('로그인이 필요한 기능입니다.');
        next("/login");
    } else{
        next();
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/bakerycategorylist', component: BakeryCategoryList },
        { path: '/bakeryone', component: BakeryOne },
        {
            path: '/bakeryreviewwrite',
            component: BakeryReviewWrite,
            beforeEnter: loginCheck //라우터 실행 전 이 함수를 먼저 실행하여 리뷰작성시 로그인 유무 확인
        },
        { path: '/join', component: Join },
        { path: '/login', component: Login },
        { path: '/mypage', component: MyPage },
        { path: '/cs', component: Cs },
        { path: '/admin', component: Admin },
        { path: '/introduce', component: Introduce },
    ]
});

// 이전페이지 이동페이지 정보 확인용
router.beforeEach((to, from, next) => {
    console.log('이전, 이후 페이지 정보', to, from);
    next(); //next가 없으면 기존에 이동하고자 하는 페이지로 이동
});

// 3. 모듈 export
export default router;
