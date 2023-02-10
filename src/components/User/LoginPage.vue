<template>
    <div>
        <div v-if="isLogin===true">
            <h1>헬로우</h1>
        </div>
        <div>
            <label for="loginEmail">E-mail</label>
            <input type="text" v-model="state.form.loginEmail">
        </div>

        <div>
            <label for="loginPw">PW</label>
            <input type="password" v-model="state.form.loginPw">
        </div>
        <div>
            <button @click="handleLogin()">로그인</button>
        </div>
        {{ isLogin }}
        {{ userInfo }}
    </div>

</template>

<script>
import axios from 'axios';
import {useStore} from 'vuex';
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
            isLogin:"",
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

</style>