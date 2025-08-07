import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PokemonDetail from '../pages/PokemonDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pokemon/:name', component: PokemonDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
