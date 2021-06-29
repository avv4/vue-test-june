import Vue from 'vue'
import LangRouter from 'vue-lang-router';
import translations from '../lang/translations';

Vue.use(LangRouter, {
  defaultLanguage: 'ru',
  translations
});

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
]

const router = new LangRouter({
  routes,
  mode: 'history',
});

export default router
