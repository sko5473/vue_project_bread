// import router from "@/router";
import { createStore } from "vuex";

export default createStore({
    state: {
        isLogin: false,
        userInfo: null,
    },
    getters: {},
    mutations: {
        //로그인 성공
        loginSuccess(state, payload){
            state.isLogin = true
            state.userInfo = payload
        },
        
        logout(state){ //로그아웃
            state.isLogin = false
            state.userInfo = null
        }
    },
    actions: {
        login({ commit}, data){
            commit("loginSuccess", data)
        }
    }
});

// @ 23년 2월 6일
// 1. 로그인
// 1) 해결해야 될일
// (1) 새로고침시 로그인상태가 풀림
// (2) 메뉴에서 관리자페이지를 userinfo.isadmin===Y로 구분하려는데 NULL로 읽힘.
// (3) 토큰값은 그대로 두는게 맞는건지
// (4) 토큰값 시간 설정