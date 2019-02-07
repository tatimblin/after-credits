import Vue from 'vue';
import Router from 'vue-router';
import AppHome from '@/components/AppHome';
import SingleMovie from '@/components/SingleMovie';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome,
    },
    {
      path: '/:movie_id',
      name: 'SingleMovie',
      component: SingleMovie,
    },
  ],
  mode: 'history',
});
