import Vue from 'vue'
import WrapComponent from '@/components/WrapComponent.vue';
import TaskComponent from '@/components/TaskComponent.vue'
import TitleComponent from '@/components/TitleComponent.vue'
import MessageBox from '@/components/MessageBox-2.vue'

Vue.component('el-wrap', WrapComponent)
Vue.component('el-task', TaskComponent)
Vue.component('el-title', TitleComponent)
Vue.component('el-message', MessageBox)