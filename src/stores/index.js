// import router from "@/router";
import { createStore } from "vuex";
// import VueCookies from 'vue-cookies';
import axios from "axios";

export default createStore({
    state: {
        isLogin: false,
        userInfo: null,
        isAdmin: false,
        isModal: false,
    },
    getters: {},
    mutations: {
        //로그인 성공
        loginSuccess(state, payload) {
            state.isLogin = true
            state.userInfo = payload
            state.isAdmin = payload.isadmin
        },

        logout(state) { //로그아웃
            state.isLogin = false
            state.userInfo = null
            state.isAdmin = false
        },

        //상점 모달창 켜졌을 때 메뉴바, 푸터를 display:none 한다.
        modalTrueMode(state){
            state.isModal = true
        },

        modalFalseMode(state){
            state.isModal = false
        }

    },

    actions: {
        login({ commit, dispatch }, data) {
            commit("loginSuccess", data)
            dispatch("getMemberInfo")
        },
        async getMemberInfo({ commit }) {

            //페이지 새로고침시 토큰 유효성 확인
            const headers = { "Content-Type": "application/json" }
            await axios.get(`/api/user/auth`, { headers })
                .then(response =>{
                    if(response.data.isAuth !== false){
                        commit("loginSuccess", response.data)
                    }
                })
        }
    }
});