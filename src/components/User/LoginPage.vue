<template>
    <div id="login_wrap">

        <div>
            <label for="loginEmail" class="lbl">E-mail</label>
            <el-input type="text" v-model="state.form.loginEmail" class="login_input" placeholder="이메일을 입력하세요." />
        </div>

        <br />
        <br />
        <div>
            <label for="loginPw" class="lbl">패스워드</label>
            <el-input type="password" @keyup.enter="handleLogin()" v-model="state.form.loginPw" class="login_input"
                placeholder="패스워드를 입력하세요." />
        </div>
        <br>
        <br>
        <el-alert
            title="success alert"
            type="success"
            description="more text description"
            show-icon
        />
        <div>
            <label for="button" class="lbl">&nbsp;</label>
            <el-button @click="handleLogin()" id="loginBtn">로그인</el-button>
        </div>
        {{ isLogin }}
        {{ userInfo }}
        <GoogleLogin :callback="callback" id="googlelogin"/>
        <!-- <el-button id="googleLoginBtn"><img src="@/assets/imgs/google.png" id="googleImg"/>Login Using Google</el-button>
            </GoogleLogin> -->
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { decodeCredential } from 'vue3-google-login'

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            form: {
                loginEmail: "",
                loginPw: "",
            },
            isLogin: "",
        });

        state.isLogin = computed(() => store.state.isLogin);
        const userInfo = computed(() => store.state.userInfo);


        //로그인
        const handleLogin = async () => {
            const url = `/api/user/login.json`;
            const headers = { "Content-Type": "application/json" };
            const body = {
                email: state.form.loginEmail,
                password: state.form.loginPw,
            }
            const {data}  = await axios.post(url, body, { headers });
            console.log('로그인', data);

            if (data.status === 200) {
                alert('로그인 성공');
                router.push({ path: '/' });
                store.dispatch("login", data); //로그인성공시 vuex의 login메서드를 실행한다.
            } else {
                state.form.loginPw = "";
            }
        }

        //구글 로그인 로그
        const callback = async(response) => {
            const userData = decodeCredential(response.credential);
            console.log("Handle the userData", userData);

            const url = `/api/user/googlelogin.json`;
            const headers = { "Content-Type": "application/json" };
            const body = {
                email: userData.email,
            }
            const {data} = await axios.post(url, body, { headers });
            console.log('구글로그인시회원db에저장되어있는지확인', data);

            if (data.status === 200) {
                alert('로그인 성공');
                router.push({ path: '/' });
                store.dispatch("login", data); //로그인성공시 vuex의 login메서드를 실행한다.
            } else {
                if(confirm('최초 한번 회원가입이 필요합니다. \'예\'를 누르면 아이디가 자동생성됩니다.')){
                    const url = `/api/user/insertuser.json`;
                    const headers = { "Content-Type": "application/json" };
                    const body = {
                        email: userData.email,
                        name: userData.name,
                        password: '123'
                    }

                    const { data } = await axios.post(url, body, { headers });
                    console.log('회원가입', data);

                    if (data.status === 200) {
                        alert('가입되었습니다. 다시 로그인해주세요.');
                        router.push({ path: '/login' });
                    }
                }
                router.push({ path: '/login' });
            }
            
            // userData.imageurl= userData.picture;
            // delete userData.picture;
            
            // userData.isGoogleLogin = "true";

            // store.commit("loginSuccess",userData);

        }

        return {
            state,
            handleLogin,
            userInfo,
            callback,
        }
    }
}
</script>

<style lang="css" scoped>
#login_wrap {
    width: 1440px;
    margin: 0 auto;
    overflow: hidden;
    padding-left: 450px;
    padding-top: 100px;
    padding-bottom: 200px;
}

.lbl {
    width: 100px;
    float: left;
    text-align: center;
}

.login_input {
    float: left;
    width: 500px;
}

#loginBtn {
    width: 500px;
    font-size: 20px;
    background-color: goldenrod;
    color: white;
}

#googleLoginBtn {
    margin-left: 100px;
    width: 500px;
    margin-top: 20px;
}

#googleImg {
    width: 20px;
    margin-right: 20px;
}

#googlelogin{
    margin-left:100px;
    margin-top:20px;
}
</style>