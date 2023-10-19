<template>
	<view class="common-container">
		<view class="common-head">
			<view class="header">
					<view class="title">
						HM-MES-触控屏端
					</view>
					<view class="workstation">
						{{this.vuex_workstation==null?'请选择工作站':this.vuex_workstation.workstationName}}
					</view>
					<view class="user" @tap="handleUserTaped">
						<view class="user-icon">
							<img :src="userInfo.avatar"></img>
						</view>
						<view class="user-text">
							{{this.vuex_user.nickName}}
						</view>						
					</view>				
				<u-modal width="600px" v-model="showWorkstationFlag" :showConfirmButton=false :showCancelButton="true" title="请选择工作站" content="操作内容" >
					<u-tabs :list="processList" :is-scroll="true" :current="currentFlag" name="processName" @change="getWorkstationList"> 						
					</u-tabs>
					<view class="station_list">
						<u-card  class="station_card" :show-foot="false" :title="'工作站'+card.workstationCode" :key="index"  v-for="(card,index) in workstationList">
							<view class="" slot="body">
								{{'工作站名称：'+card.workstationName}}
								<u-button type="primary" @click="setWorkstation(card)">选择</u-button>
							</view>
						</u-card>
					</view>					
				</u-modal>
				
				<u-modal v-model="showLogoutMenu" :showConfirmButton=false :showCancelButton="true" width="400px" title="请选择操作" >
					<view class="logoutmenu">
						<u-button shape="circle" class="menu_button" @click="" type="primary">更改密码</u-button>
						<u-button shape="circle" class="menu_button" @click="handleCommand('workstation')" type="warning">切换工作站</u-button>
						<u-button shape="circle" class="menu_button" @click="handleCommand('exit')" type="error">退出登录</u-button>
					</view>
				</u-modal>
				
			</view>
		</view>
		<view class="common-main">
			<TabHeader></TabHeader>			
			<ProContent v-if="tabIndex == 'PRO'"></ProContent>
			<GxContent v-else-if="tabIndex =='GX'"></GxContent>
			<QcContent v-else-if="tabIndex =='QC'"></QcContent>
		</view>		
	</view>
</template>

<script>
	import TabHeader from "./TabHeader.vue"
	import ProContent from "../mes/pro/index.vue"
	import GxContent from "../mes/gx/index.vue"
	import QcContent from "../mes/qc/index.vue"
	export default {
		name: 'HomePage',
		components: {
			TabHeader,
			ProContent,
			GxContent,
			QcContent
		},
		data(){
			return {
				tabIndex: "PRO",
				showWorkstationFlag: false,
				showLogoutMenu: false,
				activeProcess: null,
				userInfo: {
					nickName: '张三',
					avatar: require("@/static/images/head.png"),
				},
				processList: [], //工序清单
				workstationList: [], //工作站清单
				currentFlag: 0
			}
		},
		created() {
			uni.$on('switchTab',(indexCode)=>{
				console.log("switching detected:"+indexCode);
				this.tabIndex = indexCode;
			})
			this.checkWorkstation();
			this.getProcessList();
		},
		destroyed() {
			uni.$off('switchTab');
		},
		methods: {
			//用户部分点击
			handleUserTaped(){
				console.log("TAPED")
				// this.$refs.menu_dialog.open();
				this.showLogoutMenu = true;
			},
			
			//检查工作站设置情况
			checkWorkstation() {
				if (this.vuex_workstation == null) {
					this.showWorkstationFlag = true;
					this.$u.toast("请设置当前触控屏的工作站！");
				}
			},
			//获取工序清单
			getProcessList() {
				this.$u.api.getProcessList({}).then(res => {
					if (res.code == '200') {
						this.processList = res.data;
						this.activeProcess = res.data[0].processCode;
						this.getWorkstationList(0);
					} else {
						this.$u.toast("获取工序清单异常" + res.msg);
					}
		
				});
			},
			//获取工作站清单
			getWorkstationList(index) {			
				this.currentFlag = index;
				this.activeProcess= this.processList[index].processCode;
				this.$u.api.getWorkstationList({
					processCode: this.activeProcess
				}).then(res => {
					if (res.code == '200') {
						this.workstationList = res.data;
					} else {
						this.$u.toast("获取工作站清单异常" + res.msg);
					}
				});
			},
			//设置当前触控屏的工作站
			setWorkstation(station) {
				this.$u.vuex('vuex_workstation', station);
				this.showWorkstationFlag = false;
				uni.$emit('switchWorkstation',station);
			},
			handleCommand(command) {
				if (command == 'exit') {
					this.loading = true;
					this.$u.api.logout().then(res => {
						this.loading = false;
						if (res.msg) {
							this.$u.toast(res.msg);
						}
		
						if (res.code == '200') {
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/sys/login/login'
								});
							}, 500);
						}
					})
				} else if (command == 'workstation') {
					this.showLogoutMenu = false;
					this.showWorkstationFlag = true;
				}
			}
		}
	}
</script>

<style>
	.common-head {
		height: 40px;
		background-color: rgb(3, 26, 60);
		display: flex;
		align-items: center;		
		padding: 0 15px;
		box-sizing: border-box;
	}
	
	.header {
		width: 100%;
		height: 100%;
		color: aliceblue;
		font-size: 25px;
		font-family: 华文楷体;
		display: flex;
	}
	
	.header .divItem {
		height: 100%;
		align-items: center;
	}
	
	.header .title{
		width: 30%;
	}
	
	.header .workstation{
		text-align: center;
		flex-grow: 1;
	}
	
	.header .user{		
		width: 30%;
	}
	
	.header .user .user-icon{
		float: right;
	}	

	img {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		margin-left: 10px;
	}

	.header .user .user-text{
		float: right;
	}
	
	.logoutmenu {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	
	.menu_button {
		width: 100px;		
		margin: 10px;
	}
	
	.station_modal {
		width: 600px;
	}
	
	.station_list {
		display: flex;
		flex-wrap: wrap;
		width: 600px;
	}
	
	.station_card {
		width: 250px;
		height: 150px;
	}
	
	.common-main {
		padding: 10px 10px 0px 10px;
		margin: 0;
		height: 100%;
		background-image: linear-gradient(to top right, rgb(19 26 56), rgb(33 64 128));
	}
	
</style>