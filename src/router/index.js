import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from '../pages/Index/index'
import Movie from '../pages/Movie/index'
import Home from '../components/HelloFromVux'

const routes = [
  { path: '/', component: Index },
  { path: '/movie', component: Movie },
  { path: '/home', component: Home }
]

export default new Router({
  mode: 'history',
  base: __dirname,
  routes
})
