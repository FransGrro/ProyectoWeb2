import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categorias',
    name: 'VerCategorias',
    component: () => import('../views/VerCategorias.vue')
  },
  {
    path: '/agregarCategoria',
    name: 'AgregarCategoria',
    component: () => import('../views/AgregarCategoria.vue')
  },
  {
    path: '/personal',
    name: 'VerPersonal',
    component: () => import('../views/VerPersonal.vue')
  },
  {
    path: '/agregarPersona',
    name: 'AgregarPersona',
    component: () => import('../views/AgregarPersona.vue')
  },
  {
    path: '/editarPersona',
    name: 'EditarPersona',
    component: () => import('../views/EditarPersona.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
