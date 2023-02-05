<template>
    <div id="join_wrap">
        <h3>회원가입 페이지</h3>

        <div id="email_box" class="field">
            <label for="" class="lbl" style="float:left;">이메일</label>
            <el-input type="email" ref="email" v-model="state.usermail" style="width:20%;float:left;" />
            <p style="float:left;margin-left:10px;margin-right:10px;"> @ </p>
            <select class="form-select" v-model="state.usermail1" aria-label="Default select example"
                style="width:20%;height:32px;font-size:15px;padding-bottom:1px;padding-top:1px;">
                <option class="options" selected>이메일 선택</option>
                <option class="options" value="naver.com">naver.com</option>
                <option class="options" value="gmail.com">gmail.com</option>
                <option class="options" value="daum.net">daum.net</option>
            </select>
        </div>

        <div class="field">
            <label for="password" class="lbl">패스워드</label>
            <el-input type="password" ref="password" v-model="state.password" style="width:20%;" />
        </div>

        <div class="field">
            <label for="password1" class="lbl">패스워드 확인</label>
            <el-input type="password" ref="password1" v-model="state.password1" style="width:20%;" />
        </div>

        <div class="field">
            <label for="username" class="lbl">이름</label>
            <el-input type="text" v-model="state.username" ref="name" style="width:20%;" />
        </div>

        <div class="field">
            <label for="address" class="lbl">주소</label>
            <el-input type="text" id="sample6_postcode" v-model="state.postcode" style="width:200px;" placeholder="우편번호"></el-input>
            <el-input type="button" @click="sample6_execDaumPostcode()" value="우편번호 찾기" style="width:100px;"></el-input><br>

            <label for="address" class="lbl"></label>
            <el-input type="text" id="sample6_address" ref="address" v-model="state.address" style="width:400px;" placeholder="주소"></el-input><br>

            <label for="address" class="lbl"></label>
            <el-input type="text" id="sample6_detailAddress" ref="detailaddress" v-model="state.detailaddress" style="width:400px;" placeholder="상세주소"></el-input>
            <el-input type="text" id="sample6_extraAddress" style="width:400px;" placeholder="참고항목"></el-input>
        </div>

        <div class="field">
            <label for="" class="lbl">성별</label>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="state.gender" name="inlineRadioOptions"
                    id="inlineRadio1" value="male">
                <label class="form-check-label" for="inlineRadio1">남성</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="state.gender" name="inlineRadioOptions"
                    id="inlineRadio2" value="female">
                <label class="form-check-label" for="inlineRadio2">여성</label>
            </div>
        </div>

        <div class="field">
            <label for="" class="lbl"></label>
            <el-button @click="handleJoin()" type="success">회원가입</el-button>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup() {

        const router = useRouter();

        const state = reactive({
            password: '',
            password1: '',
            gender: '',
            usermail: '',
            usermail1: '',
            postcode: '',
            address: '',
            detailaddress: '',
            username: '',
        });

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

        const name = ref();
        const password = ref();
        const password1 = ref();
        const email = ref();
        const address = ref();
        const detailaddress = ref();

        //회원가입
        const handleJoin = async () => {

            if (state.email === '') {
                alert('email 입력하세요.');
                email.value.focus();
                return false;
            }
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
            if (state.username === '') {
                alert('이름을 입력하세요.');
                name.value.focus();
                return false;
            }
            if (state.address === '') {
                alert('주소를 입력하세요.');
                address.value.focus();
                return false;
            }
            if (state.detailaddress === '') {
                alert('상세주소를 입력하세요.');
                detailaddress.value.focus();
                return false;
            }
            if (state.password !== state.password1) {
                alert('패스워드가 일치하지 않습니다.');
                password1.value.focus();
                return false;
            }

            const url = `/api/user/insertuser.json`;
            const headers = { "Content-Type": "application/json" };
            const body = {
                email: `${state.usermail}@${state.usermail1}`,
                password: state.password,
                name: state.username,
                address: state.address,
                detailaddress: state.detailaddress,
                gender: state.gender,
            }

            const { data } = await axios.post(url, body, { headers });
            console.log('회원가입', data);

            if (data.status === 200) {
                alert('가입되었습니다.');
                router.push({ path: '/login' });
            }
        };

        //페이지 로딩 될 때
        onMounted(() => {
            let script = document.createElement('script');
            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            document.head.appendChild(script);
            console.log(window);
        });

        return {
            state,
            sample6_execDaumPostcode,
            handleJoin,
            password,
            password1,
            email,
            name,
            address,
            detailaddress,
            
            
        }
    }
}
</script>

<style lang="css" scoped>
#join_wrap {
    margin: 0 auto;
    width: 1440px;
}

.field {
    margin-top: 30px;
}

.lbl {
    width: 120px;
    font-weight: bold;
}

#email_box {
    width: 100%;
}
</style>