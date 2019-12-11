import Vue from 'vue'
import VueRouter from 'vue-router'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    meta: {
      title: '首页 - 鹤年堂'
    }
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/Company.vue'),
    meta: {
      title: '关于我们 - 鹤年堂'
    }
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/Product.vue'),
    meta: {
      title: '产品中心 - 鹤年堂'
    }
  },
  {
    path: '/plan',
    name: 'plan',
    component: () => import('../views/Plan.vue'),
    meta: {
      title: '招商加盟 - 鹤年堂'
    }
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('../views/Project.vue'),
    meta: {
      title: '专业贴牌 - 鹤年堂'
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News.vue'),
    meta: {
      title: '新闻中心 - 鹤年堂'
    }
  },
  {
    path: '/details/:type/:id',
    name: 'details',
    component: () => import('../views/Details.vue'),
    meta: {
      title: '详情 - 鹤年堂'
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    meta: {
      title: '联系我们 - 鹤年堂'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
