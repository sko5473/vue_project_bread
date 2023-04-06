<template>
    <div id="admin_wrap">
        <div id="menu_box">
            <ul id="menu">
                <li @click="state.adminNum = 1">1:1문의사항 답변</li>
                <RouterLink to="/adminchart" style="color:black;text-decoration-line:none;"><li>통계</li></RouterLink>
            </ul>
        </div>
        <div id="content_box">
            <div v-if="state.adminNum === 1">
                <div id="myquestion_wrap">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">글번호</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">등록일</th>
                                <th scope="col">글 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, i) of state.questionRows" :key="i">
                                <th scope="row">{{ data._id }}</th>
                                <!-- 제목 클릭시 글번호를 넘기고 1개 문의사항 조회 로직을 실행한다. -->
                                <td @click="state.adminNum = 2; state.questionNum = data._id; handleOneQuestion(data._id);
                                selectonequestionrelply(data._id);">{{ data.title }}</td>
                                <td>{{ data.writer }}</td>
                                <td>{{ data.regdate1 }}</td>
                                <td v-if="data.state === 0" style="color:red;">답글대기</td>
                                <td v-if="data.state === 1" style="color:green;">답글완료</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="example-pagination-block">
                        <el-pagination layout="prev, pager, next" :total="state.questionTotal" @current-change="handlePage"/>
                    </div>
                </div>
            </div>

            <div v-if="state.adminNum === 2">
                <div>
                    <label for="title" class="lbl">제목</label>
                    <p>{{ state.onequestionRows.title }}</p>
                </div>

                <div>
                    <label for="content" class="lbl">내용</label>
                    <p>{{ state.onequestionRows.content }}</p>
                </div>

                <hr />

                <label for="content" class="lbl" style="background-color: skyblue;">답글내용</label>
                <div>
                    <span v-if="state.onequestionreplyRows !== null">{{ state.onequestionreplyRows }}</span>
                    <span v-if="state.onequestionreplyRows === null">답글 내용이 없습니다.</span>
                </div>

                <hr />

                <div>
                    <br />
                    <textarea cols="50" rows="10" placeholder="답글을 입력하세요." v-model="state.replyContent"></textarea>
                </div>
                <div>
                    <el-button @click="reply()">저장</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const state = reactive({
            adminNum: 1,
            questionRows: null,
            questionTotal: 0,
            text: "",
            questionNum: 0,
            onequestionRows: null,
            onequestionnext: 0,
            onequestionprev: 0,
            userInfo: null,
            replyContent: "",
            onequestionreplyRows: null,
            page: 1,
        });

        state.userInfo = computed(() => store.state.userInfo);

        //문의글 목록 조회
        const handleQuestion = async () => {
            const url = `/api/question/selectquestion.json?page=${state.page}&text=${state.text}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("문의글 데이터 확인", data);
            if (data.status === 200) {
                state.questionRows = data.result;
                state.questionTotal = data.total;
            }
        };

        //1개 문의글 조회
        const handleOneQuestion = async (num) => {
            const url = `/api/question/selectonequestion.json?_id=${num}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("1개 문의글 데이터 확인", data);
            if (data.status === 200) {
                state.onequestionRows = data.result;
                state.onequestionnext = data.next;
                state.onequestionprev = data.prev;
            }
        };

        //1:1문의 답변글 등록
        const reply = async () => {
            const url = `/api/question/replyquestion.json`;
            const headers = { "Content-Type": "application/json" };
            const body = new FormData();
            body.append("content", state.replyContent);
            body.append("writer", state.userInfo.email);
            body.append("type", 1);
            body.append("origin_id", state.questionNum);
            const { data } = await axios.post(url, body, { headers });
            console.log("문의사항 답글", data);
            if (data.status === 200) {
                updatequestionstatus();
                alert("등록되었습니다.");
                handleQuestion();
            }
        };

        //글의 상태 변경 함수(답글대기, 답글완료)
        const updatequestionstatus = async () => {
            const url = `/api/question/updatequestionstate.json?_id=${state.questionNum}`;
            const headers = { "Content-Type": "application/json" };
            const body = {};
            await axios.put(url, body, { headers });
        };

        //답글상세보기
        const selectonequestionrelply = async (num) => {
            const url = `/api/question/selectonequestionrelply.json?origin_id=${num}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("1개 문의답글 데이터 확인", data);
            if (data.status === 200) {
                state.onequestionreplyRows = data.result.content;
            }
            else if (data.status === 0) {
                state.onequestionreplyRows = null;
            }
        };

        //페이지네이션
        const handlePage = (page) => {
            state.page = page;
            handleQuestion();
        };

        onMounted(() => {
            handleQuestion();
        });

        return {
            state,
            handleOneQuestion,
            reply,
            updatequestionstatus,
            selectonequestionrelply,
            handlePage
        };
    },
    
    components: { RouterLink }
}
</script>

<style lang="css" scoped>
#admin_wrap {
    width: 1440px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 56px;
}

#menu_box {
    background: antiquewhite;
    width: 350px;
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
    cursor: pointer;
    font-size: 17px;
    font-family: custom_font2;
}

#content_box {
    float: left;
    margin-left: 100px;
    margin-top: 50px;
}

.lbl {
    width: 120px;
    height: 30px;
    float: left;
    background-color: bisque;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
}
</style>