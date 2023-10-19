// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
	// routes:[
	// 	{
	// 		path: "/",
	// 		component: ()=> import("@/pages/sys/login/login.vue")
	// 	},
	// 	{
	// 		path: "/pages/sys/login/login",
	// 		aliasPath:'/',
	// 		name: "login",
	// 		component: ()=> import("@/pages/sys/login/login.vue")
	// 	},
	// 	{
	// 		path: "/pages/index/index",
	// 		name: "index",
	// 		component: ()=> import("@/pages/index/index.vue"),
	// 		children:[
	// 			{
	// 				path: "/pages/mes/pro/index",
	// 				name: "proIndex",
	// 				component: ()=> import("@/pages/mes/pro/index.vue")
	// 			},
	// 			{
	// 				path: "/pages/mes/gx/index",
	// 				name: "gxIndex",
	// 				component: ()=> import("@/pages/mes/gx/index.vue")
	// 			},
	// 			{
	// 				path: "/pages/mes/qc/index",
	// 				name: "qcIndex",
	// 				component: ()=> import("@/pages/mes/qc/index.vue")
	// 			},
	// 			{
	// 				path: "/pages/mes/dev/index",
	// 				name: "devIndex",
	// 				component: ()=> import("@/pages/mes/dev/index.vue")
	// 			}
	// 		]
	// 	}
	// ]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	console.log(to);
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}