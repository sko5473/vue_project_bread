<template>
    <nav id="menuWrap" class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <a class="navbar-brand logo" href="/">부산 빵지순례</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 middleMenuUl">
                    <li class="nav-item">
                        <a class="nav-link active menus" aria-current="page" href="#">소개</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active menus" aria-current="page" href="#">고객센터</a>
                    </li>
                </ul>
                    <input class="form-control me-2 searchInput" type="search" v-model="state.keyword"
                    @keyup.enter="search(state.keyword)" placeholder="지역명, 가게명을 검색해보세요."
                        aria-label="Search">
                    <button class="btn btn-outline-success searchBtn" @click="search(state.keyword)" type="submit">검색</button>
                <li class="nav-item dropdown userProfile">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src="../assets/imgs/userprofile.png" alt="" id="userImg">
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/login" v-if="isLogin === false">로그인</a></li>
                        <li><a class="dropdown-item" @click="logout()" v-if="isLogin === true">로그아웃</a></li>
                        <li><a class="dropdown-item" href="/join" v-if="isLogin === false">회원가입</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="/mypage" v-if="isLogin === true">나의정보</a></li>
                        <li><a class="dropdown-item" href="#" v-if="isAdmin === true">관리자페이지</a></li>
                    </ul>
                </li>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {

        const router = useRouter();
        const store = useStore();

        //프로필 모달창
        const state = reactive({
            on: false,
            keyword: "",
        });

        state.text = computed(() => store.state.place);

        // vuex로부터 isLogin값을 받아온다.
        const isLogin = computed(()=> store.state.isLogin); //로그인유무 vuex에서 가져온다.
        const userInfo = computed(() => store.state.userInfo); //유저 데이터 vuex에서 가져온다.
        const isAdmin = computed(() => store.state.isAdmin); //관리자유무 vuex에서 가져온다.

        //프로필 클릭시 모달창 조작
        const handleModal = () => {
            if (state.on === false) {
                state.on = true;
            } else {
                state.on = false;
            }
        };

        //로그아웃
        const logout = () => {
            const url = `/api/user/logout.json`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            axios.delete(url, { headers: headers, data: body });
            
            store.commit("logout")
        }
        
        //검색로직
        const search = (keyword) => {
            router.push({ path:'/bakerycategorylist', query: {page:1, text : keyword}});
        }

        return {
            state,
            handleModal,
            logout,
            isLogin,
            userInfo,
            isAdmin,
            search,
        }
    }
}
</script>

<style lang="css" scoped>
@font-face {
    font-family: 'custom_font';
    src: url(../assets/fonts/EF_watermelonSalad\(윈도우용TTF\).ttf);
    font-weight: normal;
    font-style: normal;
}

/* 메뉴페이지 부모 nav */
#menuWrap {
    width: 1565px;
    margin: 0 auto;
}

.logo {
    font-family: 'custom_font';
}

.middleMenuUl {
    margin-left: 380px;
}

.menus {
    font-family: 'custom_font2';
    margin-left: 50px;
}

/* 검색영역*/
.searchForm {
    margin-right: 50px;
}

.searchInput {
    width: 500px;
}

.searchBtn {
    width: 100px;
}

.userProfile {
    margin-right: 10px;
    margin-left:20px;
}

#userImg {
    width: 30px;
}
</style>