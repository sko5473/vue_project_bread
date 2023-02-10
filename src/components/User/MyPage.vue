<template>
    <div id="mypage_wrap">
        <!-- 바꿀수 있는정보(사진,비밀번호,)
        바꿀수 없는정보(메일, 성별, 이름, 주소)
        추가로 들어갈 정보(리뷰수에 따른 등급) -->

        <div id="menu_box">
            <li @click="state.mynum = 1">나의 정보</li>
            <li @click="state.mynum = 2">회원정보 수정</li>
            <li @click="state.mynum = 3">내 문의사항</li>
        </div>
        <div id="content_box">
            <!-- 나의 정보 -->
            <div v-if="state.mynum === 1" class="myinf">
                나의 정보
            </div>

            <!-- 회원정보 수정 -->
            <div v-if="state.mynum === 2" class="myinf">
                회원정보 수정
            </div>

            <!-- 내 문의사항 -->
            <div v-if="state.mynum === 3" class="myinf">
                내 문의사항
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';

export default {
    setup() {
        const state = reactive({
            mynum: 1, //메뉴별 번호
        })

        return {
            state,
        }
    }
}
</script>

<style lang="css" scoped>
#mypage_wrap {
    width: 1565px;
    overflow: hidden;
    margin: 0 auto;
}

#menu_box {
    background: gray;
    width: 400px;
    height: 500px;
    float:left;
}

#content_box{
    float:left;
    margin-left:100px;
    margin-top:50px;
}

</style>