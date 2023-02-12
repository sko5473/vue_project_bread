<template>
    <div id="question_wrap">
        <div id="left_menu">
            <ul id="menu_list">
                <li @click="state.menuNum = 1">자주하는 질문</li>
                <li @click="state.menuNum = 2">1:1문의하기</li>
            </ul>
        </div>
        <div id="content">
            <div v-if="state.menuNum === 1" class="content_box">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne" aria-expanded="false"
                                aria-controls="flush-collapseOne">
                                인증은 어떻게 하나요?
                            </button>
                        </h2>
                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">빵 맛집 상세페이지에서 <code>사진리뷰</code>를 작성해주시면 인증이 됩니다.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                aria-controls="flush-collapseTwo">
                                리뷰 작성 수 만큼 인증수도 올라가나요?
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">한 가게당 <code>한번씩만</code> 인증 가능합니다.</div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                회원탈퇴는 어떻게 하나요?
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">우측 상단 프로필>나의정보>회원탈퇴 메뉴를 이용하시면 됩니다.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="state.menuNum === 2" class="content_box">
                <div id="onebyone_box">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">제목</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="제목을 입력해주세요." v-model="state.title">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">내용</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                            placeholder="내용을 입력해주세요." v-model="state.content"></textarea>
                    </div>
                    <div>
                        <el-button id="onebyone_button" @click="doQuestion()">문의하기</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {

    setup() {
        const store = useStore();

        const state = reactive({
            menuNum: 1,
            userInfo : null,
            title : '',
            content: '',
        });

        state.userInfo = computed(() => store.state.userInfo); //유저 데이터 vuex에서 가져온다.

        //문의하기
        const doQuestion = async() => {
            const url = `/api/question/insertquestion.json`;
            const headers = { "Content-Type": "application/json" };
            const body = new FormData();
            body.append("title",state.title);
            body.append("content",state.content);
            body.append("writer",state.userInfo.email);
            body.append("state",0);
            body.append("type",0);

            const { data } = await axios.post(url, body, { headers });
            console.log("문의사항 글쓰기", data);

            if (data.status === 200) {
                alert('전송되었습니다.');
                state.title='';
                state.content='';
            }
        };

        return {
            state,
            doQuestion
        }
    }
}
</script>

<style lang="css" scoped>
#question_wrap {
    width: 1440px;
    margin: 0 auto;
    overflow: hidden;
}

#left_menu {
    width: 170px;
    height: 500px;
    background-color: antiquewhite;
    float: left;
}

.content_box {
    float: left;
    width: 1240px;
}

#menu_list li {
    cursor: pointer;
    font-size: 17px;
    font-weight: bold;
    font-family: custom_font2;
    padding-top: 20px;
}

#onebyone_box{
    width:1000px;
    margin:0 auto;
    margin-top:50px;
}

#onebyone_button{
    width:100%;
    height:40px;
    background-color: green;
    color:white;
    font-size:17px;
}
</style>