<template>
    <nav id="menuWrap" class="navbar navbar-expand-lg bg-light" v-if="state.isModal==false">
        <div class="container-fluid">
            <a class="navbar-brand logo" href="/">부산 빵지순례</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation" @click="handleSmallNav()">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div id="navbarSupportedContent" v-if="state.small_navbar==true">
                <ul>
                    <li><a class="small_menu" href="/login" v-if="isLogin === false">로그인</a></li>
                    <li><a class="small_menu" @click="logout()" v-if="isLogin === true">로그아웃</a></li>
                    <li><a class="small_menu" href="/join" v-if="isLogin === false">회원가입</a></li>
                    <li><a class="small_menu" href="/mypage" v-if="isLogin === true">나의정보</a></li>
                    <li><a class="small_menu" href="/admin" v-if="isAdmin === true">관리자페이지</a></li>
                    <li>
                        <a class="small_menu" href="/introduce">소개</a>
                    </li>
                    <li>
                        <a class="small_menu" href="/cs">고객센터</a>
                    </li>
                </ul>
                <div id="search_form">
                    <input class="form-control me-2 searchInput" type="search" v-model="state.keyword"
                        @keyup.enter="search(state.keyword)" placeholder="지역명, 가게명을 검색해보세요."
                            aria-label="Search">
                    <button class="btn btn-outline-success searchBtn" @click="search(state.keyword)" type="submit">검색</button>
                </div>
                
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent1">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 middleMenuUl">
                    <li class="nav-item">
                        <a class="nav-link active menus" aria-current="page" href="/introduce">소개</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active menus" aria-current="page" href="/cs">고객센터</a>
                    </li>
                </ul>
                    <input class="form-control me-2 searchInput" type="search" v-model="state.keyword"
                    @keyup.enter="search(state.keyword)" placeholder="지역명, 가게명을 검색해보세요."
                        aria-label="Search">
                    <button class="btn btn-outline-success searchBtn" @click="search(state.keyword)" type="submit">검색</button>
                <li class="nav-item dropdown userProfile">
                    <img src="../assets/imgs/userprofile.png" v-if="isLogin === false" alt="" class="nav-link dropdown-toggle userImg" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <img :src="userInfo.imageurl" v-if="isLogin === true" alt="" class="nav-link dropdown-toggle userImg" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="/login" v-if="isLogin === false">로그인</a></li>
                        <li><a class="dropdown-item" @click="logout()" v-if="isLogin === true">로그아웃</a></li>
                        <li><a class="dropdown-item" href="/join" v-if="isLogin === false">회원가입</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="/mypage" v-if="isLogin === true">나의정보</a></li>
                        <li><a class="dropdown-item" href="/admin" v-if="isAdmin === true">관리자페이지</a></li>
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
            isModal: false,
            small_navbar: false,
        });

        // vuex로부터 isLogin값을 받아온다.
        const isLogin = computed(()=> store.state.isLogin); //로그인유무 vuex에서 가져온다.
        const userInfo = computed(() => store.state.userInfo); //유저 데이터 vuex에서 가져온다.
        const isAdmin = computed(() => store.state.isAdmin); //관리자유무 vuex에서 가져온다.
        state.isModal = computed(() => store.state.isModal); //모달상태를 받아온다.

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
            
            store.commit("logout");

            router.push({ path:'/'});
        }
    
        //검색로직
        const search = (keyword) => {
            router.push({ path:'/bakerycategorylist', query: {page:1, text : keyword}});
        }

        const handleSmallNav = () => {
            if(state.small_navbar==true){
                state.small_navbar = false;
            } else{
                state.small_navbar = true;
            }
        }

        return {
            state,
            handleModal,
            logout,
            isLogin,
            userInfo,
            isAdmin,
            search,
            handleSmallNav,
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
/* 768px보다 작은화면에 적용 */
@media (max-width: 768px) {
    #menuWrap {
        width: 100%;
        margin: 0 auto;
        position: fixed;
        z-index:2;
        left:0;
        right:0;
    }

    #search_form{
        margin-top: 90px;
        margin-left: 60px;
    }

    .searchInput {
        width: 200px;
        float: left;
    }

    #navbarSupportedContent1{
        display: none;
    }

    #navbarSupportedContent{
        height: 150px;
        width: 460px;
    }

    .small_menu{
        text-decoration-line: none;
        font-family: 'custom_font2';
        color: black;
        float: left;
        cursor: pointer;
        margin-left: 30px;
        margin-top: 40px;
    }
}

/* 768px보다 큰 화면에 적용 */
@media (min-width: 768px) {
    #menuWrap {
        width: 1565px;
        margin: 0 auto;
        position: fixed;
        z-index:2;
        left:0;
        right:0;
    }
    .searchInput {
        width: 500px;
        float: left;
    }
    .middleMenuUl {
        margin-left: 500px;
    }

    #navbarSupportedContent{
        display: none;
    }

    .menus {
        font-family: 'custom_font2';
        width: 100px;
    }
}

.logo {
    font-family: 'custom_font';
}

/* 검색영역*/
.searchBtn {
    width: 100px;
}

.userProfile {
    margin-right: 10px;
    margin-left: 20px;
}

.userImg {
    width: 30px;
}
</style>