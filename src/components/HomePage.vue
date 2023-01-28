<template>
    <div id="wrap">
        <vueper-slides fixed-height="450px">
            <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :image="slide.image"
                :style="'color:white;font-size:70px;font-family:custom_font1;'">
            </vueper-slide>
        </vueper-slides>
        <div id="section_all">
            <section class="section_wrap">
                <!-- 섹션 제목 -->
                <div class="module_title_wrap">
                    <h2 class="section_title">지역별 빵 맛집 리스트</h2>
                </div>
                <div class="left_btn"><img src="../assets/imgs/leftBtn.png" alt="왼쪽화살표" /></div>
                <!-- 모듈 내용박스 -->
                <div class="module_contentBox">
                    <!-- ul묶음 -->
                    <ul class="module_ul">
                        <li class="module_li">
                            <!-- 사진 -->
                            <img class="module_bread_img" @click="handleContent('부산진구')" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <!-- 사진 내 정보 박스 -->
                            <figure class="module_info">
                                <!-- 사진 내 정보 -->
                                <div class="inner_info">
                                    <span class="li_inner_title" >부산진구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img"  @click="handleContent('해운대구')" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">해운대구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img"  @click="handleContent('동구')" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('금정구')" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">금정구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('동래구')" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동래구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" @click="handleContent('중구')" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">중구 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                    </ul>
                </div>
                <div class="right_btn"><img src="../assets/imgs/rightBtn.png" alt="오른쪽화살표" /></div>
            </section>

            <!-- 섹션 소제목 -->
            <section class="section_wrap">
                
                <div class="module_title_wrap">
                    <h2 class="section_title">지역별 빵 맛집 리스트</h2>
                </div>
                <div class="left_btn"><img src="../assets/imgs/leftBtn.png" alt="왼쪽화살표" /></div>
                <!-- 모듈 내용박스 -->
                <div class="module_contentBox">
                    <!-- ul묶음 -->
                    <ul class="module_ul">
                        <li class="module_li">
                            <!-- 사진 -->
                            <img class="module_bread_img" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <!-- 사진 내 정보 박스 -->
                            <figure class="module_info">
                                <!-- 사진 내 정보 -->
                                <div class="inner_info">
                                    <span class="li_inner_title">부산진구2 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">해운대구2 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동구2 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">남구2 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동래구2 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">중구2 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                    </ul>
                </div>
                <div class="right_btn"><img src="../assets/imgs/rightBtn.png" alt="오른쪽화살표" /></div>
            </section>

            <!-- 섹션 소제목 -->
            <section class="section_wrap">
                
                <div class="module_title_wrap">
                    <h2 class="section_title">지역별 빵 맛집 리스트</h2>
                </div>
                <div class="left_btn"><img src="../assets/imgs/leftBtn.png" alt="왼쪽화살표" /></div>
                <!-- 모듈 내용박스 -->
                <div class="module_contentBox">
                    <!-- ul묶음 -->
                    <ul class="module_ul">
                        <li class="module_li">
                            <!-- 사진 -->
                            <img class="module_bread_img" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <!-- 사진 내 정보 박스 -->
                            <figure class="module_info">
                                <!-- 사진 내 정보 -->
                                <div class="inner_info">
                                    <span class="li_inner_title">부산진구3 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">해운대구3 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동구3 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">남구3 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread1.jpg" alt="컨테이너1사진1">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">동래구3 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>

                        <li class="module_li">
                            <img class="module_bread_img" src="@/assets/imgs/bread2.jpg" alt="컨테이너1사진2">
                            <figure class="module_info">
                                <div class="inner_info">
                                    <span class="li_inner_title">중구3 제과점 Best50</span>
                                    <p class="li_inner_subTitle">우리 동네에 이런 빵집이?</p>
                                </div>
                            </figure>
                        </li>
                    </ul>
                </div>
                <div class="right_btn"><img src="../assets/imgs/rightBtn.png" alt="오른쪽화살표" /></div>
            </section>
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

        const handleContent = async(place) => {
            console.log('장소',place);
            router.push({ path:'/bakerycategorylist', query: {page:1, text : place}});
        };

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
        ]

        return {
            slides,
            handleContent,
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

#wrap{
    width:1565px;
    overflow:hidden;
    margin:0 auto;
}

/* 섹션 전체 */
#section_all {
}

/* 섹션 개별 */
.section_wrap {
    border-bottom: 2px solid #cccccc;
    width: 1565px;
    height: 740px;
    margin-left:65px;
    margin-top:50px;
    position:relative;
}

/* 왼쪽 화살표 */
.left_btn{
    position:absolute;
    bottom:360px;
    left:-50px;
}

/* 오른쪽 화살표 */
.right_btn{
    position:absolute;
    bottom:360px;
    right:70px;
}

/* 왼쪽 오른쪽 화살표 이미지 */
.left_btn img, .right_btn img{
    width:60px;
    opacity:0.3;
}

/* 섹션 타이틀 */
.module_title_wrap{
    margin-bottom: 25px;
    margin-left:30px;
    font-family: custom_font;
}

/* 섹션 내 내용박스 */
.module_contentBox {
    width: 1565px;
}

/* 섹션 내 ul박스 */
.module_ul {
    width: 1565px;
    text-align: center;/* li 제목 중앙정렬 */
}

/* 섹션 내 li */
.module_li {
    width: 440px;
    height: 283px;
    float: left;
    margin-left:30px;
    margin-bottom:30px;
    position:relative;
}

/* 섹션 내 빵 이미지 */
.module_bread_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
/* 섹션 내 빵 이미지 정보 */
.inner_info{
    position:absolute;
    bottom:85px;
    margin:0 auto;
    width:440px;
}

/* 섹션 내 빵 이미지 제목 */
.li_inner_title{
    color:white;
    font-size:35px;
}

/* 섹션 내 빵 이미지 제목 */
.li_inner_subTitle{
    color:white;
    font-size:20px;
}
</style>