import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Particles from "vue3-particles";
const app = createApp(App)

app.use(router)
app.use(store)
app.use(Particles);

app.mount('#app')