import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:JSON.parse(sessionStorage.getItem("user"))
  },
  mutations: {
    //setter
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      //JSON.stringify将对象转换为字符串
      sessionStorage.setItem("user",JSON.stringify(userInfo))
    },
    REMOVE_USERINFO: (state) => {
      state.userInfo = {}
      sessionStorage.setItem("user",'')
    }
  },
  getters:{

    getUser: state => {
      return state.userInfo

    }
  },
  actions: {
  },
  modules: {
  }
})
