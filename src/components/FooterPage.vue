<template>
    <div id="footer_wrap1">
        <div id="footer_inner_box1">
            <div id="footer_top1">
                부산 빵지순례
            </div>
            <div id="footer_bottom1">
                <p>(주)부산 빵지순례</p>
                <p>부산 부산진구 중앙대로 668 에이원플라자 6층</p>
                <p>대표이사: 신현정</p>
                <p>사업자 등록번호: 000-00-00000[사업자정보확인]</p>
                <p>통신판매업 신고번호: 2023-부산부산진구-00000</p>
                <p>고객센터: 051-000-0000</p>
                <p>2023 BusanBreadTour Co. All rights reserved.</p>
            </div>
        </div>
    </div>
    <div id="footer_wrap" v-if="state.isModal == false">
        <div id="footer_inner_box">
            <div id="footer_top">
                <div id="footer_top_left1">
                    <p id="logo">부산 빵지순례</p>
                </div>
                <div id="footer_top_left2">
                    <p>회사소개</p>
                    <p>부산 빵지순례 채용</p>
                    <p>투자 정보</p>
                    <p>브랜드 가이드라인</p>
                    <p>부산빵지순례 비즈니스</p>
                    <p>광고 문의</p>
                </div>
                <div id="footer_top_left3">
                    <p>공지사항</p>
                    <p>이용약관</p>
                    <p>비회원 이용자 이용정책</p>
                    <p>개인정보처리방침</p>
                    <p>위치기반서비스 이용약관</p>
                    <p>커뮤니티 가이드라인</p>
                    <p>청소년보호정책</p>
                    <p>등급 소개</p>
                    <p>문의하기</p>
                </div>
                <div id="footer_top_right">
                    <div class="link_img_div"><img src="@/assets/imgs/facebook1.png" class="link_img"
                            style="width:37px;padding-top:5px;" alt=""></div>
                    <div class="link_img_div"><img src="@/assets/imgs/instagram.png" class="link_img" alt=""></div>
                </div>
            </div>

            <div id="footer_middle">
                인기지역 : 부산진구 | 해운대구 | 동구 | 중구 | 남구
            </div>

            <div id="footer_bottom">
                <div id="footer_bottom_left">
                    <p>(주)부산 빵지순례</p>
                    <p>부산 부산진구 중앙대로 668 에이원플라자 6층</p>
                    <p>대표이사: 신현정</p>
                    <p>사업자 등록번호: 000-00-00000[사업자정보확인]</p>
                    <p>통신판매업 신고번호:2023-부산부산진구-00000</p>
                    <p>고객센터: 051-000-0000</p>
                    <p>2023 BusanBreadTour Co. All rights reserved.</p>
                </div>
                <div id="footer_bottom_right">
                    <p style="float:left;font-weight: bold;color:white;">한국어&nbsp;</p><span> | English | 简体中文</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const state = reactive({
            isModal: false,
        });

        state.isModal = computed(() => store.state.isModal);

        return {
            state
        }
    }
}
</script>

<style lang="css" scoped>
/* 768px보다 큰 화면에 적용 */
@media (min-width: 768px) {
    #footer_wrap {
        margin: 0 auto;
        width: 1565px;
        height: 700px;
        overflow: hidden;
        background: rgb(119, 116, 116);
    }

    #footer_inner_box {
        width: 1170px;
        position: relative;
        margin-left: 200px;
        margin-top: 20px;
    }

    #footer_top {
        border-bottom: 1px solid rgb(206, 203, 203);
    }

    /* 부모를 한줄 가득차게하여 float:left시 밑에 내용이 위로 올라오지 않도록 해준다. */
    #footer_top::after {
        content: "";
        /*빈내용 */
        clear: both;
        display: block;
    }

    #footer_top p {
        padding: 0;
    }

    #footer_top_left1 {
        float: left;

    }

    #logo {
        color: white;
        font-size: 22px;
        font-family: custom_font1;
    }

    #footer_top_left2 {
        float: left;
        margin-left: 180px;
    }

    #footer_top_left3 {
        float: left;
        margin-left: 180px;
    }

    #footer_top_left2 p,
    #footer_top_left3 p {
        margin-bottom: 10px;
        color: rgb(206, 203, 203);
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    #footer_top_right {
        float: left;
        margin-left: 200px;
    }

    .link_img {
        width: 50px;
        filter: opacity(0.4) drop-shadow(0 0 0 rgb(128, 128, 121));
        margin-left: 20px;
    }

    .link_img_div {
        float: left;
    }

    #footer_middle {
        color: rgb(206, 203, 203);
        margin-top: 20px;
        margin-bottom: 15px;
        height: 45px;
        border-bottom: 1px solid rgb(206, 203, 203);
    }

    #footer_bottom {}

    #footer_bottom_left {
        color: rgb(206, 203, 203);
        float: left;
        margin-top: 15px;
    }

    #footer_bottom_left p {
        margin: 0;
        margin-bottom: 5px;
    }

    #footer_bottom_right {
        color: rgb(206, 203, 203);
        float: left;
        margin-left: 600px;
        margin-top: 30px;
        font-size: 18px;
    }

    #footer_wrap1{
        display: none;
    }
}

@media (max-width: 768px) {
    #footer_wrap{
        display: none;
    }

    #footer_wrap1{
        width: 768px;
        height: 500px;
        margin: 0 auto;
        background: rgb(119, 116, 116);
        overflow: hidden;
    }

    #footer_inner_box1{
        margin-left: 100px;
        margin-top: 60px;
    }
    
    #footer_top1{
        color: white;
        font-size: 22px;
        font-family: custom_font1;
        margin-bottom: 30px;
    }
    
    #footer_bottom1{
        color: rgb(206, 203, 203);
        float: left;
    }
}
</style>