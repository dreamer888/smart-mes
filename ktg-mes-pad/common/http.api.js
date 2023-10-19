/**
 * Copyright (c) 2013-Now http://aidex.vip All rights reserved.
 */
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作
const install = (Vue, vm) => {
	
	// 参数配置对象
	const config = vm.vuex_config;
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		
		// 基础服务：登录登出、身份信息、菜单授权、切换系统、字典数据等
		lang: (params = {}) => vm.$u.get('/lang/'+params.lang),
		index: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index', params),
		getUserInfo: (params = {}) => vm.$u.get(config.adminPath+'/mobile/user/getUserInfo', params),
		login: (params = {}) => vm.$u.post(config.adminPath+'/mobile/login/loginByPassword', params),
		sendCode: (params = {}) => vm.$u.post(config.adminPath+'/mobile/login/sendCode', params),
		registerUser: (params = {}) => vm.$u.post(config.adminPath+'/mobile/user/registerUser', params),
		
		/**
		 * 系统设置API
		 */
		//获取工序清单
		getProcessList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/pro/process/getProcessList',params),
		getWorkstationList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/md/workstation/getWorkstationList',params),
		/**
		 * 生产管理相关API		
		**/
		//获取当前工作站的生产任务
		getTaskList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/pro/protask/getTaskList',params),
		//根据任务ID获取任务详情
		getTaskInfo: (params = {}) => vm.$u.get(config.adminPath+'/mobile/pro/protask/'+params.taskId),
		//修改任务状态
		changeStatus: (params = {}) => vm.$u.post(config.adminPath+'/mobile/pro/protask/change',params),
		//生产报工
		feedback: (params = {}) => vm.$u.post(config.adminPath + '/mobile/pro/protask/feedback',params),
		
		
		/**
		 * 工艺工序相关API
		 */
		getProcessInfo: (params = {}) => vm.$u.get(config.adminPath+'/mobile/pro/process/'+params.processId),
		//获取当前产品的SOP
		getSopList: (params ={}) => vm.$u.get(config.adminPath+'/mobile/pro/taskissue/getSopList',params),
		//生产投料
		addIssue: (params = {}) => vm.$u.post(config.adminPath + '/mobile/pro/taskissue/add',params),
		//整个领料单投料
		addholeIssue: (params = {}) => vm.$u.post(config.adminPath + '/mobile/pro/taskissue/addIssue',params),
		//删除投料信息
		removeTaskIssue: (params = {}) => vm.$u.post(config.adminPath+'/mobile/pro/taskissue/'+ params.recordId),
		//获取当前工作站、当前生产任务对应的投料清单				
		getTaskIssueList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/pro/taskissue/getlist',params),
		//查询可用的领料单
		getReserveIssue: (params = {}) => vm.$u.get(config.adminPath+'/mobile/pro/taskissue/getReserveIssueList',params),
		//打印流转单
		
		
		//质量相关api
		//获取当前产品、当前质检类型的质检模板行信息
		getQcTemplateLine: (params = {}) => vm.$u.get(config.adminPath+'/mobile/qc/templateindex/getLines',params),
		
		
		//首页相关api
		getIndexCardInfo: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index/getIndexCardInfo', params),
		getM2mOrderFlowList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index/getM2mOrderFlowList', params),
		//获取卡可购买套餐包
		getM2mOrderPackageList: (params = {}) => vm.$u.get(config.adminPath+'/mobile/index/getM2mOrderPackageList', params),
		
		logout: (params = {}) => vm.$u.get(config.adminPath+'/mobile/login/logout', params),
		authInfo: (params = {}) => vm.$u.get(config.adminPath+'/authInfo', params),
		menuTree: (params = {}) => vm.$u.get(config.adminPath+'/menuTree', params),
		switchSys: (params = {}) => vm.$u.get(config.adminPath+'/switch/'+params.sysCode),
		dictData: (params = {}) => vm.$u.get(config.adminPath+'/system/dict/data/type/'+params.dictType),
		
		// 账号服务：验证码接口、忘记密码接口、注册账号接口等
		validCode: (params = {}) => vm.$u.getText('/validCode', params),
		getFpValidCode: (params = {}) => vm.$u.post('/account/getFpValidCode', params),
		savePwdByValidCode: (params = {}) => vm.$u.post('/account/savePwdByValidCode', params),
		getRegValidCode: (params = {}) => vm.$u.post('/account/getRegValidCode', params),
		saveRegByValidCode: (params = {}) => vm.$u.post('/account/saveRegByValidCode', params),
		
		// APP公共服务
		upgradeCheck: () => vm.$u.post('/app/upgrade/check', {appCode: config.appCode, appVersion: config.appVersion}),
		commentSave: (params = {}) => vm.$u.post('/app/comment/save', params),
		
		// 个人信息修改
		user: {
			saveUserInfo: (params = {}) => vm.$u.post(config.adminPath+'/mobile/user/saveUserInfo', params),
			infoSavePwd: (params = {}) => vm.$u.put(config.adminPath+'/system/user/profile/updatePwd', params),
			infoSavePqa: (params = {}) => vm.$u.post(config.adminPath+'/sys/user/infoSavePqa', params),
		},
		
		// 员工用户查询
		empUser: {
			listData: (params = {}) => vm.$u.get(config.adminPath+'/sys/empUser/listData', params),
		},
		
		// 组织机构查询
		office: {
			treeData: (params = {}) => vm.$u.get(config.adminPath+'/sys/office/treeData', params),
		},
		
		// 增删改查例子
		testData: {
			form: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/form', params),
			list: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/listData', params),
			save: (params = {}) => vm.$u.postJson(config.adminPath+'/test/testData/save', params),
			disable: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/disable', params),
			enable: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/enable', params),
			delete: (params = {}) => vm.$u.post(config.adminPath+'/test/testData/delete', params),
		},
		
	};
	
}

export default {
	install
}