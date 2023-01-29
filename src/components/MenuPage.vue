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
                <form class="d-flex searchForm" role="search">
                    <input class="form-control me-2 searchInput" type="search" placeholder="지역명, 가게명을 검색해보세요."
                        aria-label="Search">
                    <button class="btn btn-outline-success searchBtn" type="submit">검색</button>
                </form>
                <li class="nav-item dropdown userProfile">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <img src="../assets/imgs/userprofile.png" alt="" id="userImg">
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">로그인</a></li>
                        <li><a class="dropdown-item" href="#">로그아웃</a></li>
                        <li><a class="dropdown-item" href="/join">회원가입</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">나의정보</a></li>
                        <li><a class="dropdown-item" href="#">관리자페이지</a></li>
                    </ul>
                </li>
            </div>
        </div>
    </nav>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup() {

        //프로필 모달창
        const state = reactive({
            on: false,
        });

        //프로필 클릭시 모달창 조작
        const handleModal = () => {
            if (state.on === false) {
                state.on = true;
            } else {
                state.on = false;
            }
        };

        return {
            state,
            handleModal,
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
#menuWrap{
    width:1565px;
    margin:0 auto;
}

.logo {
    font-family: 'custom_font';
}

.middleMenuUl {
    margin-left:380px;
}

.menus {
    font-family: 'custom_font2';
    margin-left:50px;
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

.userProfile{
    margin-right:10px;
}

#userImg{
    width:30px;
}
</style>