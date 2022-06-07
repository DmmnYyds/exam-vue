import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import '../src/common.scss'
import '../src/components/mian'
import VueSocketIO from 'vue-socket.io'
import navigator from '@/assets/utils/navigator'
import Cache from '@/assets/utils/cache'


Vue.use(navigator)

Vue.use(ElementUI)

Vue.prototype.$bus = new Cache()

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://192.168.0.120:7001',    //这个地址是服务端地址
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
