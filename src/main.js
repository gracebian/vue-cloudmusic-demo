// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' //引入vue.js文件，第三方模块，不要加.js后缀
import App from './App'
import router from './router' //引入router目录下的index.js文件

import MuseUI from 'muse-ui' //引入muse-ui
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)

import '@/assets/css/font-awesome.css'  //引入src下assets目录下css下的文件
import store from './store/' //引入store目录下的index.js
import '@/assets/css/index.css'  //引入全局的css

import VueScroller from 'vue-scroller' //引入scroller组件
Vue.use(VueScroller)

Vue.config.productionTip = false

/* eslint-disable no-new */
//实例化vue对象
new Vue({
  	el: '#app',//挂载到#app元素上
  	router,//注入路由
  	store,//注入store对象，注入到所有子组件
  	template: '<App/>',//指定模板，改变了书写模板代码的位置
  	components: { App }//注册了一个App组件
})
