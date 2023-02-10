<template>
    <div id="mypage_wrap">
        <!-- 바꿀수 있는정보(사진,비밀번호,)
        바꿀수 없는정보(메일, 성별, 이름, 주소)
        추가로 들어갈 정보(리뷰수에 따른 등급) -->

        <!-- 들어갈 정보(사진, 이메일,성별,이름,주소,리뷰수,즐겨찾기수,등급) -->
        <div id="menu_box">
            <ul id="menu">
                <li @click="state.mynum = 1">나의 정보</li>
                <li @click="state.mynum = 2">회원정보 수정</li>
                <li @click="state.mynum = 3">내 문의사항</li>
            </ul>
        </div>
        <div id="content_box">
            <!-- 나의 정보 -->
            <div v-if="state.mynum === 1" class="myinf">
                <div id="myinf_wrap">
                    <div id="myinf_left">
                        <div class="myinf_con">
                            <label for="email" class="myinf_lbl">이메일</label>
                            <p class="myinf_con_p">{{ userInfo.email }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="name" class="myinf_lbl">성명</label>
                            <p class="myinf_con_p">{{ userInfo.name }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="gender" class="myinf_lbl">성별</label>
                            <p class="myinf_con_p">{{ userInfo.gender }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="address" class="myinf_lbl">주소</label>
                            <p style="float:left;margin-left:20px;" class="myinf_con_p">{{ userInfo.address }}</p>
                            <p>{{ userInfo.detailaddress }}</p>
                        </div>
                        <div>
                            <label for="progress" class="myinf_lbl">등급</label>
                            <p class="myinf_con_p">빵린이</p>
                            <div class="progress" style="width:500px;">
                                <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                                    aria-label="Example with label" style="width: 50%;" aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100">25%</div>
                            </div>
                        </div>
                    </div>
                    <div id="myinf_right">
                        <div class="myinf_con">
                            <img :src="state.image" id="profileImg" alt="">
                            <input type="file" v-on:change="handleImage($event)" />
                        </div>
                    </div>
                </div>
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
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const state = reactive({
            mynum: 1, //메뉴별 번호
            files: null,
            image: require('@/assets/imgs/defaultprofile.jpg'),
        });

        const userInfo = computed(() => store.state.userInfo);

        const handleImage = (e) => {
            if (e.target.files.length > 0) {
                state.files = e.target.files[0];
                state.image = URL.createObjectURL(state.files);
            } else {
                state.files = null;
                state.image = require('@/assets/imgs/defaultprofile.jpg');
            }
        };

        return {
            state,
            handleImage,
            userInfo
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
    background: rgb(217, 210, 210);
    width: 400px;
    height: 500px;
    float: left;
}

#menu {
    padding: 40px;
    margin-left: 20px;
}

#menu li {
    margin-top: 15px;
    font-weight: bold;
}

#content_box {
    float: left;
    margin-left: 100px;
    margin-top: 50px;
}

#myinf_wrap {
    width: 1000px;
}
#myinf_left, #myinf_right{
    float:left;
}
.myinf_con {

}

.myinf_con_p {
    margin-left:120px;
}

.myinf_lbl{
    width:100px;
    float:left;
    background-color: bisque;
    text-align:center;
}
#profileImg {
    width: 100px;
}
</style>