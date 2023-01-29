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
const app = createApp(App);
app.use(routes);
app.use(stores);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app');
