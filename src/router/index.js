import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/mypage',
      component: () => import('../views/Mypage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/propertytable',
      component: () => import('../views/PropertyTable.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/changecompanyname',
      component: () => import('../components/Changecompanyname.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/changeofficername',
      component: () => import('../components/Changeofficername.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/changephonenumber',
      component: () => import('../components/Changephonenumber.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/changeemail',
      component: () => import('../components/Changeemail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/changepassword',
      component: () => import('../components/Changepassword.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/mypage/changenotification',
      component: () => import('../components/Changenotification.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/propertytable/changepart',
      component: () => import('../components/Changepart.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/propertytable/registerpart',
      component: () => import('../components/Registerpart.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/propertytable/registerproperty',
      component: () => import('../components/Registerproperty.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/propertytable/qrcode',
      component: () => import('../components/Qrcode.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/propertytable/authemail',
      component: () => import('../components/Authemail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/resident',
      component: () => import('../components/Resident.vue'),
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/logout',
      component: () => import('../views/Logout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/not_found',
      component: () => import('../views/Not_found.vue'),
    },
    {
      path: '*',
      redirect: '/not_found'
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
          message: true
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router