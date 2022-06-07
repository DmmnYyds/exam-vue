import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfoApi } from '@/assets/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    //mutations在企业中，定义的方法都是大写
    USERINFO: (state, payload) => {
      state.userInfo = payload;
    }
  },
  actions: {
    getUserInfoApi(ctx, payload) {
      console.log('------actions-------');
      console.log(ctx);
      console.log(payload);
      // 调用这个接口
      // 如果当前可以获取到这个userInfo，那么我就直接来用
      // 如果没有获取到这个userInfo，那么我再去调用这个接口
      if (Object.keys(ctx.state.userInfo).length) {
        return ctx.state.userInfo;
      } else {
        return getUserInfoApi().then(res => {
          ctx.commit('USERINFO', res.data.data[0])
          return res
        })
      }
    }
  },
  modules: {
  }
})
