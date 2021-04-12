import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Lifes from '../views/Lifes.vue'
import LifeDetail from '../views/LifeDetail.vue'
import SignDetail from '../views/SignDetail.vue'
import PersonalDetail from '../views/PersonalDetail.vue'
import LifeEdit from "../views/LifeEdit";
import Channel from "../views/Channel";

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
    path: '/lifes/:lifeId',
    name: 'LifeDetail',
    component: LifeDetail
  },
  {
    path: '/signDetail',
    name: 'SignDetail',
    component: SignDetail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/lifes/:id/edit',
    name: 'LifeEdit',
    component: LifeEdit
  },
  {
    path: '/personal',
    name: 'PersonalDetail',
    component: PersonalDetail,
    children:[
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
    component: Channel
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
