<template>
    <div id="wrap">
        <vueper-slides fixed-height="450px" id="banner_img1">
            <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image"
                :style="'color:white;font-size:70px;font-family:custom_font1;'">
            </vueper-slide>
        </vueper-slides>
        <div id="banner_img2_wrap">
            <div id="banner_img2_center">
                <img src="@/assets/imgs/bread1.jpg" id="banner_img2">
                <div id="banner2_title">부산 빵지순례</div>
            </div>
        </div>
        <div id="section_all">
            <section class="section_wrap">
                <!-- 섹션 제목 -->
                <div class="module_title_wrap">
                    <h2 class="section_title">지역별 빵 맛집 리스트</h2>
                </div>
                <!-- 모듈 내용박스 -->
                <div class="module_contentBox">
                    <!-- ul묶음 -->
                    <ul class="module_ul">
                        <li class="module_li">
                            <!-- 사진 -->
                            <img class="module_bread_img" @click="handleContent('부산진구')" src="@/assets/imgs/bread1.jpg"
                                alt="컨테이너1사진1">
                            <!-- 사진 내 정보 박스 -->
                            <figure class="module_info">
                                <!-- 사진 내 정보 -->
                                <div class="inner_info">
                                    <span class="li_inner_title">부산진구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('해운대구')" src="@/assets/imgs/bread2.jpg"
                                alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">해운대구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('동구')" src="@/assets/imgs/bread1.jpg"
                                alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('금정구')" src="@/assets/imgs/bread2.jpg"
                                alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">금정구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('동래구')" src="@/assets/imgs/bread1.jpg"
                                alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동래구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('중구')" src="@/assets/imgs/bread2.jpg"
                                alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">중구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- 섹션 소제목 -->
            <section class="section_wrap2">

                <div class="module_title_wrap" id="section2_title_wrap">
                    <h2 class="section_title">빵 맛집 스토리</h2>
                </div>

                <el-carousel :interval="1000000" type="card" height="320px" id="carousel_wrap">
                    <el-carousel-item>
                        <img src="@/assets/imgs/bread1.jpg" class="story_img" @click="moveStory('카페')" alt="">
                        <div class="editor_title">대형카페 추천 7곳</div>
                        <div class="editor_stitle">넓고 좋아요</div>
                        <div class="editor_pic">
                            <img src="@/assets/imgs/simson.jpg" style="width:100%;height:100%;" alt="">
                        </div>
                        <div class="editor_name">Editor 심슨</div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="@/assets/imgs/bread2.jpg" class="story_img" alt="">
                        <div class="editor_title">대형카페 추천 7곳</div>
                        <div class="editor_stitle">넓고 좋아요</div>
                        <div class="editor_pic">
                            <img src="@/assets/imgs/simson.jpg" style="width:100%;height:100%;" alt="">
                        </div>
                        <div class="editor_name">Editor 심슨</div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="@/assets/imgs/bread3.jpg" class="story_img" alt="">
                        <div class="editor_title">대형카페 추천 7곳</div>
                        <div class="editor_stitle">넓고 좋아요</div>
                        <div class="editor_pic">
                            <img src="@/assets/imgs/simson.jpg" style="width:100%;height:100%;" alt="">
                        </div>
                        <div class="editor_name">Editor 심슨</div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="@/assets/imgs/bread1.jpg" class="story_img" alt="">
                        <div class="editor_title">대형카페 추천 7곳</div>
                        <div class="editor_stitle">넓고 좋아요</div>
                        <div class="editor_pic">
                            <img src="@/assets/imgs/simson.jpg" style="width:100%;height:100%;" alt="">
                        </div>
                        <div class="editor_name">Editor 심슨</div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="@/assets/imgs/bread2.jpg" class="story_img" alt="">
                        <div class="editor_title">대형카페 추천 7곳</div>
                        <div class="editor_stitle">넓고 좋아요</div>
                        <div class="editor_pic">
                            <img src="@/assets/imgs/simson.jpg" style="width:100%;height:100%;" alt="">
                        </div>
                        <div class="editor_name">Editor 심슨</div>
                    </el-carousel-item>
                    <el-carousel-item>
                        <img src="@/assets/imgs/bread3.jpg" class="story_img" alt="">
                        <div class="editor_title">대형카페 추천 7곳</div>
                        <div class="editor_stitle">넓고 좋아요</div>
                        <div class="editor_pic">
                            <img src="@/assets/imgs/simson.jpg" style="width:100%;height:100%;" alt="">
                        </div>
                        <div class="editor_name">Editor 심슨</div>
                    </el-carousel-item>
                </el-carousel>

            </section>

            <!-- 섹션 소제목 -->
            <section class="section_wrap" style="border:none;">
                <div class="module_title_wrap">
                    <h2 class="section_title">키워드 별 빵 맛집 리스트</h2>
                </div>

                <!-- 모듈 내용박스 -->
                <div class="module_contentBox">
                    <!-- ul묶음 -->
                    <ul class="module_ul">
                        <li class="module_li">
                            <!-- 사진 -->
                            <img class="module_bread_img" @click="handleContent('view')" src="@/assets/imgs/bread1.jpg"
                                alt="컨테이너1사진1">
                            <!-- 사진 내 정보 박스 -->
                            <figure class="module_info">
                                <!-- 사진 내 정보 -->
                                <div class="inner_info">
                                    <span class="li_inner_title">전망 좋은 제과점 Best50</span>
                                    <p class="li_inner_subTitle">전망 좋은 제과점</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('parking')" src="@/assets/imgs/bread2.jpg"
                                alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">주차공간이 넓은 제과점 Best50</span>
                                    <p class="li_inner_subTitle">주차공간이 넓은 제과점</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('meeting')" src="@/assets/imgs/bread1.jpg"
                                alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">단체모임하기 좋은 제과점 Best50</span>
                                    <p class="li_inner_subTitle">단체모임하기 좋은 제과점</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('coffee')" src="@/assets/imgs/bread2.jpg"
                                alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">커피가 맛있는 제과점 Best50</span>
                                    <p class="li_inner_subTitle">커피가 맛있는 제과점</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('bread')" src="@/assets/imgs/bread1.jpg"
                                alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">빵 종류가 많은 제과점 Best50</span>
                                    <p class="li_inner_subTitle">빵 종류가 많은 제과점</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('approach')" src="@/assets/imgs/bread2.jpg"
                                alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">접근성이 좋은 제과점 Best50</span>
                                    <p class="li_inner_subTitle">접근성이 좋은 제과점</p>
                                </div>
                            </figure>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
        <!-- TOP버튼 -->
        <div id="top_btn" @click="handleTop">
            <div id="top_btn_arrow">┌</div>
            <div>TOP</div>
        </div>
    </div>
</template>

<script>
import router from '@/routes';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';

export default {

    components: { VueperSlides, VueperSlide },

    setup() {

        //빵집 리스트 페이지 이동
        const handleContent = async (place) => {
            router.push({ path: '/bakerycategorylist', query: { page: 1, text: place } });
        };

        //스토리 페이지 이동
        const moveStory = async (keyword) => {
            router.push({ path: '/bakerystory', query: { page: 1, text: keyword } });
        };

        //타이틀 슬라이드
        const slides = [
            {
                title: '부산 빵지순례',
                image: require('@/assets/imgs/bread1.jpg'),
            },
            {
                title: '부산 빵지순례',
                image: require('@/assets/imgs/bread2.jpg'),
            },
            {
                title: '부산 빵지순례',
                image: require('@/assets/imgs/bread3.jpg'),
            },
        ];

        //TOP 이동 기능
        const handleTop = () => {
            window.scrollTo(0, 0);
        };


        return {
            slides,
            handleContent,
            handleTop, //TOP 이동 기능
            moveStory, //스토리페이지 이동
        }
    }
}
</script>

<style lang="css" scoped>
@font-face {
    font-family: 'custom_font1';
    src: url(../assets/fonts/GmarketSansTTFBold.ttf);
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'custom_font';
    src: url(../assets/fonts/EF_watermelonSalad\(윈도우용TTF\).ttf);
    font-weight: normal;
    font-style: normal;
}

/* 768px보다 작은화면에 적용 */
@media (max-width: 768px) {

    /* 홈 wrap */
    #wrap {
        width: 768px;
        overflow: hidden;
        margin: 0 auto;
        padding-top: 56px;
    }

    #banner_img1 {
        display: none;
    }

    #banner_img2_wrap {
        position: relative;
        height: 400px;
        width: 768px;
    }

    #banner_img2_center {
        position: absolute;
        left: -10%;
        right: -10%;
        top: 0;
        bottom: 0;
        overflow: hidden;
    }

    #banner_img2 {
        max-width: 100%;
        height: auto;
        object-fit: cover;
    }

    #banner2_title {
        position: absolute;
        font-size: 55px;
        color: white;
        top: 160px;
        left: 170px;
        font-family: custom_font1;
    }

    /* 섹션 개별 */
    .section_wrap {
        border-bottom: 2px solid #cccccc;
        width: 768px;
        overflow: hidden;
        margin-top: 50px;
        position: relative;
    }

    /* 빵 맛집 스토리 스타일 */
    .section_wrap2 {
        border-bottom: 2px solid #cccccc;
        width: 768px;
        height: 420px;
        margin-top: 50px;
        position: relative;
        left: -190px;
    }

    /* 섹션 내 내용박스 */
    .module_contentBox {
        width: 768px;
    }

    /* 섹션 내 ul박스 */
    .module_ul {
        width: 768px;
        text-align: center;
        /* li 제목 중앙정렬 */
    }

    /* 섹션 전체 */
    #section_all {}

    /* 빵 맛집 스토리 아이템 */
    .el-carousel__item {
        width: 600px;
    }

    /* 빵 맛집 스토리 아이템 사진 */
    .story_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 빵 맛집 스토리 타이틀 */
    .editor_title {
        position: absolute;
        bottom: 200px;
        left: 130px;
        font-size: 40px;
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    /* 빵 맛집 스토리 소제목 */
    .editor_stitle {
        position: absolute;
        bottom: 160px;
        left: 240px;
        font-size: 20px;
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    /* 빵 맛집 스토리 에디터 사진 */
    .editor_pic {
        position: absolute;
        width: 55px;
        height: 55px;
        border-radius: 30px;
        left: 265px;
        bottom: 80px;
        overflow: hidden;
    }

    /* 빵 맛집 스토리 에디터 아이디 */
    .editor_name {
        position: absolute;
        bottom: 55px;
        left: 255px;
        color: white;
    }

    /* 왼쪽 화살표 */
    .left_btn {
        position: absolute;
        bottom: 360px;
        left: -50px;
    }

    /* 오른쪽 화살표 */
    .right_btn {
        position: absolute;
        bottom: 360px;
        right: 70px;
    }

    /* 왼쪽 오른쪽 화살표 이미지 */
    .left_btn img,
    .right_btn img {
        width: 60px;
        opacity: 0.3;
    }

    /* 섹션 타이틀 */
    .module_title_wrap {
        margin-bottom: 25px;
        margin-left: 30px;
        font-family: custom_font;
    }

    #section2_title_wrap{
        margin-left: 220px;
    }
    /* 섹션 내 li */
    .module_li {
        width: 440px;
        height: 283px;
        float: left;
        margin-left: 30px;
        margin-bottom: 30px;
        position: relative;
    }

    /* 섹션 내 빵 이미지 */
    .module_bread_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 섹션 내 빵 이미지 정보 */
    .inner_info {
        position: absolute;
        bottom: 85px;
        margin: 0 auto;
        width: 440px;
    }

    /* 섹션 내 빵 이미지 제목 */
    .li_inner_title {
        color: white;
        font-size: 35px;
    }

    /* 섹션 내 빵 이미지 제목 */
    .li_inner_subTitle {
        color: white;
        font-size: 20px;
    }

    /* 탑 버튼 */
    #top_btn {
        width: 60px;
        height: 60px;
        background-color: rgb(74, 72, 72);
        color: rgb(217, 214, 214);
        font-size: 20px;
        text-align: center;
        position: fixed;
        bottom: 10px;
        right: 5px;
        z-index: 1;
        border-radius: 10px;
        border-color: rgb(74, 72, 72);
        cursor: pointer;
    }

    /* 탑 버튼 화살표 */
    #top_btn_arrow {
        transform: rotate(45deg);
        line-height: 10px;
        margin-bottom: 5px;
        margin-top: 5px;
    }
}

/* 768px보다 큰화면에 적용 */
@media (min-width: 768px) {

    /* 홈 wrap */
    #wrap {
        width: 1565px;
        overflow: hidden;
        margin: 0 auto;
        padding-top: 56px;
    }

    #banner_img2_wrap {
        display: none;
    }

    /* 섹션 개별 */
    .section_wrap {
        border-bottom: 2px solid #cccccc;
        width: 1565px;
        height: 740px;
        margin-left: 45px;
        margin-top: 50px;
        position: relative;
    }

    /* 빵 맛집 스토리 스타일 */
    .section_wrap2 {
        border-bottom: 2px solid #cccccc;
        width: 1565px;
        height: 420px;
        margin-left: 65px;
        margin-top: 50px;
        position: relative;
    }

    /* 섹션 내 내용박스 */
    .module_contentBox {
        width: 1565px;
    }

    /* 섹션 내 ul박스 */
    .module_ul {
        width: 1565px;
        text-align: center;
        /* li 제목 중앙정렬 */
    }

    /* 섹션 전체 */
    #section_all {}



    /* 빵 맛집 스토리 아이템 */
    .el-carousel__item {
        width: 600px;
    }

    /* 빵 맛집 스토리 아이템 사진 */
    .story_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 빵 맛집 스토리 타이틀 */
    .editor_title {
        position: absolute;
        bottom: 200px;
        left: 130px;
        font-size: 40px;
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    /* 빵 맛집 스토리 소제목 */
    .editor_stitle {
        position: absolute;
        bottom: 160px;
        left: 240px;
        font-size: 20px;
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    /* 빵 맛집 스토리 에디터 사진 */
    .editor_pic {
        position: absolute;
        width: 55px;
        height: 55px;
        border-radius: 30px;
        left: 265px;
        bottom: 80px;
        overflow: hidden;
    }

    /* 빵 맛집 스토리 에디터 아이디 */
    .editor_name {
        position: absolute;
        bottom: 55px;
        left: 255px;
        color: white;
    }

    /* 왼쪽 화살표 */
    .left_btn {
        position: absolute;
        bottom: 360px;
        left: -50px;
    }

    /* 오른쪽 화살표 */
    .right_btn {
        position: absolute;
        bottom: 360px;
        right: 70px;
    }

    /* 왼쪽 오른쪽 화살표 이미지 */
    .left_btn img,
    .right_btn img {
        width: 60px;
        opacity: 0.3;
    }

    /* 섹션 타이틀 */
    .module_title_wrap {
        margin-bottom: 25px;
        margin-left: 30px;
        font-family: custom_font;
    }

    /* 섹션 내 li */
    .module_li {
        width: 440px;
        height: 283px;
        float: left;
        margin-left: 30px;
        margin-bottom: 30px;
        position: relative;
    }

    /* 섹션 내 빵 이미지 */
    .module_bread_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 섹션 내 빵 이미지 정보 */
    .inner_info {
        position: absolute;
        bottom: 85px;
        margin: 0 auto;
        width: 440px;
    }

    /* 섹션 내 빵 이미지 제목 */
    .li_inner_title {
        color: white;
        font-size: 35px;
    }

    /* 섹션 내 빵 이미지 제목 */
    .li_inner_subTitle {
        color: white;
        font-size: 20px;
    }

    /* 탑 버튼 */
    #top_btn {
        width: 60px;
        height: 60px;
        background-color: rgb(74, 72, 72);
        color: rgb(217, 214, 214);
        font-size: 20px;
        text-align: center;
        position: fixed;
        bottom: 10px;
        right: 5px;
        z-index: 1;
        border-radius: 10px;
        border-color: rgb(74, 72, 72);
        cursor: pointer;
    }

    /* 탑 버튼 화살표 */
    #top_btn_arrow {
        transform: rotate(45deg);
        line-height: 10px;
        margin-bottom: 5px;
        margin-top: 5px;
    }
}
</style>