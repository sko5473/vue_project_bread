<template>
    <div id="mypage_wrap">
        <div id="menu_box">
            <ul id="menu">
                <li @click="state.mynum = 1">나의 정보</li>
                <li @click="state.mynum = 2">회원정보 수정</li>
                <li @click="state.mynum = 3">내 문의사항</li>
                <li @click="state.mynum = 5">내 즐겨찾기 목록</li>
            </ul>
        </div>
        <div id="content_box">
            <!-- 나의 정보 -->
            <div v-if="state.mynum === 1" class="myinf">
                <div class="myinf_wrap">
                    <div class="myinf_left">
                        <div class="myinf_con">
                            <label for="email" class="myinf_lbl">이메일</label>
                            <p class="myinf_con_p">{{ state.userInfo.email }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="name" class="myinf_lbl">성명</label>
                            <p class="myinf_con_p">{{ state.userInfo.name }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="gender" class="myinf_lbl">성별</label>
                            <p class="myinf_con_p">{{ state.userInfo.gender }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="address" class="myinf_lbl">주소</label>
                            <p style="float:left;margin-left:20px;" class="myinf_con_p">{{ state.userInfo.address }}</p>
                            <p>{{ state.userInfo.detailaddress }}</p>
                        </div>
                        <div>
                            <label for="progress" class="myinf_lbl">등급</label>
                            <p class="myinf_con_p">{{ state.grade }}</p>
                        </div>
                        <div>
                            <label for="progress" class="myinf_lbl">전체리뷰수</label>
                            <p class="myinf_con_p">{{ state.mytotalreviewcount }}개</p>
                        </div>
                        <div>
                            <label for="" class="myinf_lbl" style="width:190px;float:left;">인증리뷰 수/인증상점 수</label>
                            <p style="float:left;margin-left:20px;">{{ state.userInfo.certreveiwcount }}상점/
                            {{state.totalshopcount}}상점</p>
                            <div class="progress" style="width:400px;float:left;">
                                <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                                    aria-label="Example with label" style="width: 50%;" aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100">{{ state.certpercent }}%</div>
                            </div>
                            <el-popover :visible="visible" placement="bottom" :width="100"
                                content=">빵입문 : 0 ~ 9% 빵린이 : 10 ~ 29% 빵중수 : 30 ~ 49% 빵고수 : 50 ~ 69%  빵지존 : 70 ~ 89%">
                                <template #reference>
                                    <el-button class="m-2" @click="visible = !visible">등급안내</el-button>
                                </template>
                            </el-popover>
                        </div>


                    </div>
                    <div class="myinf_right">
                        <div class="myinf_con">
                            <img :src="state.image" class="profileImg" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 회원정보 수정 -->
            <div v-if="state.mynum === 2" class="myinf">
                <div class="myinf_wrap">
                    <div class="myinf_left">
                        <div class="myinf_con">
                            <label for="email" class="myinf_lbl">이메일</label>
                            <p class="myinf_con_p">{{ state.userInfo.email }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="name" class="myinf_lbl">성명</label>
                            <p class="myinf_con_p">{{ state.userInfo.name }}</p>
                        </div>
                        <div class="myinf_con">
                            <label for="gender" class="myinf_lbl">성별</label>
                            <p class="myinf_con_p">{{ state.userInfo.gender }}</p>
                        </div>
                        <div class="field">
                            <label for="address" class="myinf_lbl">주소</label>
                            <p style="float:left;margin-left:20px;" class="myinf_con_p">{{ state.userInfo.address }}</p>
                            <p>{{ state.userInfo.detailaddress }}</p>
                            <div style="margin-top:10px;">
                                <el-input type="text" id="sample6_postcode" v-model="state.postcode"
                                    style="width:200px;" placeholder="우편번호"></el-input>
                                <el-input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기"
                                    style="width:100px;"></el-input>
                            </div>
                            <el-input type="text" id="sample6_address" ref="address" v-model="state.address"
                                style="width:400px;" placeholder="주소"></el-input><br>
                            <el-input type="text" id="sample6_detailAddress" ref="detailaddress"
                                v-model="state.detailaddress" style="width:400px;" placeholder="상세주소"></el-input>
                            <el-input type="text" id="sample6_extraAddress" style="width:400px;"
                                placeholder="참고항목"></el-input>
                        </div>
                        <div>
                            <label for="password" class="myinf_lbl" style="float:left;">비밀번호</label>
                            <el-input type="password" v-model="state.password" placeholder="비밀번호를 입력하세요." ref="password"
                                style="width:300px;margin-left:5px;" />
                        </div>
                        <div>
                            <label for="password1" class="myinf_lbl" style="float:left;">비밀번호 확인</label>
                            <el-input type="password" v-model="state.password1" placeholder="비밀번호 확인을 입력하세요."
                                ref="password1" style="width:300px;margin-left:5px;" />
                        </div>
                        <div>
                            <el-button @click="usermodify()"
                                style="width:100%;margin-top:20px;background: goldenrod; color:white;">저장</el-button>
                        </div>
                    </div>
                    <div class="myinf_right">
                        <div class="myinf_con">
                            <img :src="state.image" class="profileImg" alt="">
                            <input type="file" v-on:change="handleImage($event)" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 내 문의사항 -->
            <div v-if="state.mynum === 3" class="myinf">
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
                                <td
                                    @click="state.mynum = 4; handleOneQuestion(data._id); selectonequestionrelply(data._id);">
                                    {{ data.title }}</td>
                                <td>{{ data.writer }}</td>
                                <td>{{ data.regdate1 }}</td>
                                <td v-if="data.state === 0" style="color:red;">답글대기</td>
                                <td v-if="data.state === 1" style="color:green;">답글완료</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 내 문의사항 상세 -->
            <div v-if="state.mynum === 4" class="myinf">
                <div>
                    <label for="title" class="lbl">제목</label>
                    <p class="question_detail_p">{{ state.onequestionRows.title }}</p>
                </div><br /><br />

                <div>
                    <label for="content" class="lbl">내용</label>
                    <p class="question_detail_p">{{ state.onequestionRows.content }}</p>
                </div><br />

                <hr />

                <label for="content" class="lbl" style="background-color: skyblue;">답글내용</label>
                <div style="width:400px;">
                    <span v-if="state.onequestionreplyRows !== null">
                        {{ state.onequestionreplyRows }}</span>
                    <span v-if="state.onequestionreplyRows === null">답글 내용이 없습니다.</span>
                </div>
            </div>

            <!-- 내 즐겨찾기 목록 -->
            <div v-if="state.mynum === 5" class="myinf">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">제과점명</th>
                            <th scope="col">위치</th>
                            <th scope="col">링크</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, i) of state.allmybookmarkrow" :key="i">
                            <th scope="row">{{ data._id }}</th>
                            <td>{{ data.name }}</td>
                            <td>{{ data.address }}</td>
                            <td><el-button @click="movePage(data.bakerynum)">이동</el-button></td>
                        </tr>
                    </tbody>
                </table>
                <div class="example-pagination-block">
                    <el-pagination layout="prev, pager, next" :total="state.mystartotal" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();

        const router = useRouter();

        const state = reactive({
            mynum: 1, //메뉴별 번호
            files: null,
            image: null,
            postcode: '',
            address: '',
            detailaddress: '',
            password: '',
            password1: '',
            userInfo: null,
            text: '',
            page: 1,
            questionRows: null,
            questionTotal: '',
            onequestionreplyRows: null,
            onequestionRows: null,
            onequestionprev: 0,
            onequestionnext: 0,
            totalshopcount: 0,
            certpercent: 0,
            mytotalreviewcount: 0,
            grade: '',
            allmybookmarkrow: null,
            mystartotal: 0,
        });

        //vuex로부터 jwt쿠키 재인증으로부터 받은 user정보를 받아온다.
        state.userInfo = computed(() => store.state.userInfo);

        //유효성검사용
        const password = ref();
        const password1 = ref();

        //vuex userInfo에 저장된 이미지 url값을 state.image에 넣고 onMounted한다.
        const imagestate = () => {
            if (state.userInfo.imageurl !== null) {
                state.image = state.userInfo.imageurl;
            } else {
                state.image = require('@/assets/imgs/defaultprofile.jpg');
            }

            //회원가입 수정시 기존에 입력된 주소 값이 보인다.
            state.address = state.userInfo.address;
            state.detailaddress = state.userInfo.detailaddress;
        };

        //프로필 이미지 컨트롤
        const handleImage = (e) => {
            if (e.target.files.length > 0) {
                state.files = e.target.files[0];
                state.image = URL.createObjectURL(state.files);
            } else {
                state.files = null;
                state.image = require('@/assets/imgs/defaultprofile.jpg');
            }
        };

        //유저정보 수정
        const usermodify = async () => {

            //유효성 검사
            if (state.password === '') {
                alert('패스워드를 입력하세요.');
                password.value.focus();
                return false;
            }
            if (state.password1 === '') {
                alert('패스워드 확인을 입력하세요.');
                password1.value.focus();
                return false;
            }
            if (state.password !== state.password1) {
                alert('패스워드가 일치하지 않습니다.');
                password1.value.focus();
                return false;
            }
            if (state.files === null) {
                alert('프로필 이미지를 입력하세요.');
                return false;
            }

            const url = `/api/user/updateuser.json`;
            const headers = { "Content-Type": "multipart-formdata" };
            const body = new FormData();
            body.append("email", state.userInfo.email);
            body.append("password", state.password);
            body.append("address", state.address);
            body.append("detailaddress", state.detailaddress);
            body.append("file", state.files);

            const { data } = await axios.put(url, body, { headers });
            console.log('유저정보 수정', data);

            if (data.status === 200) {
                alert('수정되었습니다.');
                router.go(0); //새로고침
            }
        }

        //카카오 주소
        const sample6_execDaumPostcode = () => {
            console.log('sample6_execDaumPostcode');
            new window.daum.Postcode({
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = ''; // 참고항목 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                        // 조합된 참고항목을 해당 필드에 넣는다.
                        document.getElementById("sample6_extraAddress").value = extraAddr;

                    } else {
                        document.getElementById("sample6_extraAddress").value = '';
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    state.postcode = data.zonecode;
                    document.getElementById("sample6_address").value = addr;
                    state.address = addr;
                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                }

            }).open();
        }

        //내 문의게시글 조회
        const handleQuestion = async () => {
            const url = `/api/question/selectmyquestion.json?page=${state.page}&text=${state.text}&writer=${state.userInfo.email}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("게시문의 데이터 확인", data);

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

        //답글상세보기
        const selectonequestionrelply = async (num) => {
            const url = `/api/question/selectonequestionrelply.json?origin_id=${num}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.onequestionreplyRows = data.result.content;
            } else if (data.status === 0) {
                state.onequestionreplyRows = null;
            }
        };

        //빵집 전체 수 조회 /api/bakery/selectshopcount.json
        const selectshopcount = async () => {
            const url = `/api/bakery/selectshopcount.json`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });

            if (data.status === 200) {
                state.totalshopcount = data.total;
                state.certpercent = Math.floor((state.userInfo.certreveiwcount / state.totalshopcount) * 100);
                if (state.certpercent < 10) {
                    state.grade = '빵입문자';
                } else if (state.certpercent >= 10 && state.certpercent < 30) {
                    state.grade = '빵린이';
                } else if (state.certpercent >= 30 && state.certpercent < 50) {
                    state.grade = '빵중수';
                } else if (state.certpercent >= 50 && state.certpercent < 70) {
                    state.grade = '빵고수';
                } else if (state.certpercent >= 70 && state.certpercent < 90) {
                    state.grade = '빵지존';
                }
            }
        };

        //빵집 전체리뷰 수 조회 /api/bakery/selectshopcount.json
        const selectmyshopreviewcount = async () => {
            const url = `/api/bakeryreview/selectmyshopreviewcount.json?writer=${state.userInfo.email}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("빵집리뷰수 확인", data);

            if (data.status === 200) {
                state.mytotalreviewcount = data.total;
            }
        };

        //내 즐겨찾기 목록 전체 조회
        const selectallmybookmark = async () => {
            const url = `/api/mybookmark/selectallmybookmark.json?email=${state.userInfo.email}&page=${state.page}`;
            const headers = { "Content-Type": "application/json" };
            const { data } = await axios.get(url, { headers });
            console.log("즐겨찾기 목록", data);

            if (data.status === 200) {
                state.allmybookmarkrow = data.result;
                state.mystartotal = data.total;
            }
        };

        const movePage = (_id) => {
            router.push({path:'/bakeryone', query:{_id : _id}});
        }

        //페이지 로딩 될 때
        onMounted(() => {
            let script = document.createElement('script');
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            document.head.appendChild(script);
            imagestate();
            handleQuestion();
            selectshopcount();
            selectmyshopreviewcount();
            selectallmybookmark();
        });

        return {
            state,
            handleImage,
            sample6_execDaumPostcode,
            usermodify,
            selectonequestionrelply,
            handleOneQuestion,
            password,
            password1,
            movePage,
        }
    }
}
</script>

<style lang="css" scoped>
#mypage_wrap {
    width: 1565px;
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

.myinf_wrap {
    width: 1000px;
}

.myinf_left {
    float: left;
    width: 500px;
}

.myinf_con {}

.myinf_con_p {
    margin-left: 140px;
}

.myinf_lbl {
    width: 120px;
    height: 30px;
    float: left;
    background-color: bisque;
    text-align: center;
    line-height: 30px;
}

.profileImg {
    width: 200px;
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

.question_detail_p {
    float: left;
}
</style>