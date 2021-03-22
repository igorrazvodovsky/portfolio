import { createApp } from 'vue';
import { createWebHashHistory, createRouter } from 'vue-router';
import App from './App.vue';
import './assets/styles/style.css';
import Home from './pages/Home.vue';
import Formbuilder from './pages/Formbuilder.vue';
import Convertiq from './pages/Convertiq.vue';

const routes = [
  {
    path: '/', component: Home, meta: {
      title: 'Igor Razvodovsky'
    }
  },
  {
    path: '/formbuilder', component: Formbuilder, meta: {
      title: 'Form builder - Igor',
    }
  },
  {
    path: '/convertiq', component: Convertiq, meta: {
      title: 'ConvertIQ - Igor'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
