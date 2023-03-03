<template>
    <div id="introduce_wrap">
        <div id="content">
            <div id="content_title">부산 빵지순례 소개</div>
            <div id="content_content"> 
                빵을 사랑하고 전국의 빵 맛집 투어다니시는 분들을 위한 홈페이지입니다.
                부산에 대한 빵 맛집 정보를 유익하고 재미있게 제공하는 것이 부산 빵지순례의 목표입니다.<br />
            </div> <br/>

            <div id="content_writer">
            3조(신현정, 윤성필, 이광호)
            </div>

            <div id="content_profileImg">
                <img src="@/assets/imgs/simson.jpg" alt="" style="width:200px;">
            </div>

            <div id="history">연혁</div>

            <el-timeline>
                <el-timeline-item timestamp="2023/3/14" placement="top">
                <el-card>
                    <h4>프로젝트 발표 및 마무리</h4>
                    <p>Lee committed 2023/3/14 10:00</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/3/7" placement="top">
                <el-card>
                    <h4>프로젝트 테스트</h4>
                    <p>Lee committed 2023/3/7 15:20</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/2/28" placement="top">
                <el-card>
                    <h4>프로젝트 개발</h4>
                    <p>Lee committed 2023/2/28 13:20</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/2/7" placement="top">
                <el-card>
                    <h4>프로젝트 설계</h4>
                    <p>Lee committed 2023/2/7 17:05</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/1/24" placement="top">
                <el-card>
                    <h4>프로젝트 기획</h4>
                    <p>Lee committed 2023/1/24 16:00</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2023/1/10" placement="top">
                <el-card>
                    <h4>3조 프로젝트 시작</h4>
                    <p>Lee committed 2023/1/10 14:00</p>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="css" scoped>
#introduce_wrap{
    width:1440px;
    margin:0 auto;
    overflow: hidden;
    padding-top: 56px;
}

#content{
    position:relative;
    width:500px;
    left:50%;
    margin-left: -250px;
    margin-top:50px;
}

#content_title{
    position:absolute;
    top:10px;
    font-family: custom_font1;
    font-size:25px;
}

#content_content{
    position:absolute;
    top: 70px;
    font-family: custom_font2;
}

#content_writer{
    position: absolute;
    right:0;
    top:200px;
    font-family: custom_font2;
}

#content_profileImg{
    margin-top:200px;
    margin-left:320px;
    margin-bottom:50px;
}

#history{
    font-family: custom_font2;
    font-size:40px;
    margin-left: 50px;
    margin-bottom: 20px;
    color:rgb(61, 59, 59);
}
</style>