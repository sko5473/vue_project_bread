<template>
    <div id="wrap">
        <ul id="leftMenu">
            <router-link :to="{ path: '/' }">
                <li id="menuLogo">부산 빵지순례</li>
            </router-link>
            
        </ul>
        <ul id="rightMenu">
            <router-link :to="{ path: '/introduce' }">
                <li class="menuLi">소개</li>
            </router-link>
            <router-link :to="{ path: '/cs' }">
                <li class="menuLi">고객센터</li>
            </router-link>
            <li>
                <el-input type="text" placeholder="지역, 식당을 검색하세요." style="width:250px;" />
                <el-button id="searchBtn" type="success" round>검색</el-button>
            </li>
            <li id="userProfile">
                <img id="userProfile_img" @click="handleModal()" src="../assets/imgs/userprofile.png" alt="유저프로필" >
                <ul id="userProfileBox" v-if="state.on === true">
                    <li>로그인</li>
                    <li>로그아웃</li>
                    <li>회원가입</li>
                    <li>나의정보</li>
                    <li>관리자페이지</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup() {

        //프로필 모달창
        const state = reactive({
            on : false,
        });

        //프로필 클릭시 모달창 조작
        const handleModal = () => {
            if(state.on===false){
                state.on=true;
            } else{
                state.on=false;
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

#wrap {
    height: 50px;
    line-height: 50px;
    width:1565px;
    border-bottom:2px solid #cccccc;
    background-color: whitesmoke;
}

ul, li {
    float: left;
}

a {
    color: black;
}

@font-face {
    font-family: 'custom_font';
    src: url(../assets/fonts/EF_watermelonSalad\(윈도우용TTF\).ttf);
    font-weight: normal;
    font-style: normal;
}

#menuLogo {
    font-size: 30px;
    font-family: custom_font;
}

.menuLi {
    font-family: custom_font;
}

#leftMenu {
    position: absolute;
    left: 10px;
}

#rightMenu {
    position: absolute;
    right: 10px;
}

#rightMenu li {
    margin-left: 70px;
}

#userProfile {
    position: relative;
}

#userProfile_img {
    width: 30px;
    position: absolute;
    bottom: -40px;
    right: 5px;
    cursor: pointer;
}

#userProfileBox{
    width:85px;
    height:auto;
    background:rgb(144, 179, 209);
    z-index:2;
    position: absolute;
    bottom:-195px;
    left:-90px;
}

#userProfileBox li{
    color:white;
    font-size:12px;
    margin-left: 5px;
    line-height:30px;
    cursor: pointer;
}
</style>