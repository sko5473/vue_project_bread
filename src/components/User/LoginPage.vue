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
            <el-input type="password" @keyup.enter="handleLogin()" v-model="state.form.loginPw" class="login_input" placeholder="패스워드를 입력하세요." />
        </div>
        <br>
        <br>
        <div>
            <label for="button" class="lbl">&nbsp;</label>
            <el-button @click="handleLogin()" style="width:500px;font-size:20px;background-color: goldenrod;color:white;">로그인</el-button>
        </div>
        {{ isLogin }}
        {{ userInfo }}
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

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
            const { data } = await axios.post(url, body, { headers });
            console.log('로그인', data);

            if (data.status === 200) {
                alert('로그인 성공');
                router.push({ path: '/' });
                store.dispatch("login", data); //로그인성공시 vuex의 login메서드를 실행한다.
            } else {
                state.form.loginPw = "";
            }
        }

        return {
            state,
            handleLogin,
            userInfo
        }
    }
}
</script>

<style lang="css" scoped>
#login_wrap {
    width: 1440px;
    margin: 0 auto;
    overflow: hidden;
    padding-left:450px;
    padding-top:100px;
    padding-bottom:200px;
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
</style>