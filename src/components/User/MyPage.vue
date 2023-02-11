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
                            <p class="myinf_con_p">빵린이</p>
                            <div class="progress" style="width:500px;">
                                <div class="progress-bar progress-bar-striped bg-info" role="progressbar"
                                    aria-label="Example with label" style="width: 50%;" aria-valuenow="25"
                                    aria-valuemin="0" aria-valuemax="100">25%</div>
                            </div>
                        </div>
                    </div>
                    <div class="myinf_right">
                        <div class="myinf_con">
                            <img :src="state.image" id="profileImg" alt="">
                            <input type="file" v-on:change="handleImage($event)" />
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
                            <label for="address" class="myinf_lbl">주소</label><br/>
                            <div style="margin-top:10px;">
                                <el-input type="text" id="sample6_postcode" v-model="state.postcode" style="width:200px;"
                                    placeholder="우편번호"></el-input>
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
                            <el-input type="password" v-model="state.password" 
                            placeholder="비밀번호를 입력하세요." style="width:300px;margin-left:5px;" />
                        </div>
                        <div>
                            <label for="password1" class="myinf_lbl" style="float:left;">비밀번호 확인</label>
                            <el-input type="password" v-model="state.password1" 
                            placeholder="비밀번호 확인을 입력하세요." style="width:300px;margin-left:5px;" />
                        </div>
                        <div>
                            <el-button @click="usermodify()"
                                style="width:100%;margin-top:20px;background: goldenrod;color:white;">저장</el-button>
                        </div>
                    </div>
                    <div class="myinf_right">
                        <div class="myinf_con">
                            <img :src="state.image" id="profileImg" alt="">
                            <input type="file" v-on:change="handleImage($event)" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 내 문의사항 -->
            <div v-if="state.mynum === 3" class="myinf">
                내 문의사항
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const state = reactive({
            mynum: 1, //메뉴별 번호
            files: null,
            image: require('@/assets/imgs/defaultprofile.jpg'),
            postcode: '',
            address: '',
            detailaddress: '',
            password: '',
            password1: '',
            userInfo: null,
        });
       
        state.userInfo = computed(() => store.state.userInfo);

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
        const usermodify = async() => {
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

            // if (data.status === 200) {
            //     alert('가입되었습니다.');
            //     router.push({ path: '/login' });
            // }
        }

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

        //페이지 로딩 될 때
        onMounted(() => {
            let script = document.createElement('script');
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            document.head.appendChild(script);
            console.log(window);
        });

        return {
            state,
            handleImage,
            sample6_execDaumPostcode,
            usermodify
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

#profileImg {
    width: 100px;
}
</style>