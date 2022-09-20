import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { ElementPlus } from '@element-plus/icons-vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

for (const name in Icons) {
  app.component(name, Icons[name])
}

app.mount('#app')
