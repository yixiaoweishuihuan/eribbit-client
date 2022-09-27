import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ui from '@/components/lib'

// 初始化样式
import 'normalize.css'
// 重置样式
import './assets/styles/common.less'

createApp(App).use(ui).use(store).use(router).mount('#app')
