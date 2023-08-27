import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'

// chunk for dynamic route
const Home = () => import('@/views/HomeView.vue')
const About = () => import('@/views/AboutView.vue')
const Manage = () => import('@/views/ManageView.vue')
const Music = () => import('@/components/Music.vue')

// import Home from '@/views/HomeView.vue'
// import About from '@/views/AboutView.vue'
// import Manage from '@/views/ManageView.vue'
// import Music from '@/components/Music.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    // alias: 'manage-music',
    path: '/manage',
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage route guard')
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    // old route
    path: '/manage-music',
    redirect: { name: 'manage' }
  },
  {
    name: 'music',
    path: '/music/:id',
    component: Music
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // console.log(to.meta)
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()

  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
