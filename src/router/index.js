import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Lifes from '../views/Lifes.vue'
import Admin from '../views/admin/Admin.vue'
import Notice from '../views/Notice.vue'
import SignEdit from '../views/SignEdit.vue'
import PersonalDetail from '../views/PersonalDetail.vue'
import MomentEdit from "../views/MomentEdit";
import Channel from "../views/Channel";
import CreateAdmin from "../views/admin/CreateAdmin";
import User from "../views/admin/User";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: {name: "Lifes"}
  },
  {
    path: '/lifes',
    name: 'Lifes',
    component: Lifes
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/notice',
    name: 'Notice',
    component: Notice
  },
  {
    path: '/signEdit',
    name: 'SignEdit',
    component: SignEdit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/lifes/:id/edit',
    name: 'MomentEdit',
    component: MomentEdit
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/createAdmin',
    name: 'CreateAdmin',
    component: CreateAdmin
  },
  {
    path: '/personal',
    name: 'PersonalDetail',
    component: PersonalDetail,
    children:[
      {//默认我的签到记录
        path:'/',
        name:'Sign',
        component: ()=> import('@/components/Sign')
      },
      {//我的签到记录
        path:'/sign',
        name:'Sign',
        component: ()=> import('@/components/Sign')
      },
      {//我的瞬间
        path:'/moment',
        name:'Moment',
        component: ()=> import('@/components/Moment')

      },
      {//用户个人资料
        path:'/userData',
        name:'UserData',
        component: ()=> import('@/components/UserData')
      }
    ]
  },
  {
    path: '/channel',
    name: 'Channel',
    component: Channel,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
