// 파일명 : main.js
import { createApp } from 'vue'
import App from './App.vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"

// router
import routes from './routes/index'
import stores from './stores/index'

//createApp(App).설정라이브러리.mount('#app');
const app = createApp({
  extends: App,
  beforeCreate() {
    this.$store.dispatch('getMemberInfo') //페이지 새로고침시 vuex의 getMemberInfo Action을 불러서 로그인 상태 및 유저정보를 유지, 리턴한다.
  }
});

app.use(routes);
app.use(stores);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app');
