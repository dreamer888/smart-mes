import App from './App'
import 'static/icons'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from '@/uview-ui';
Vue.use(uView);

//import {router,RouterMount} from '@/router/router.js'  //路径换成自己的
//Vue.use(router)

import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi";

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree

import store from '@/store';
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

const app = new Vue({
	store,
    ...App
})

import { replaceAll } from '@/common/common.js'
Vue.prototype.replaceAll = replaceAll

import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);


//RouterMount(app,router,'#app');

app.$mount()

// #endif



// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif