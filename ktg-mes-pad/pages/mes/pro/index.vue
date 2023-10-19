<template>
	<view class="commonBody" :style="{ 'height': (this.screenHeight -140) + 'px' }">
		<view class="content">
			<view class="content_left">
				<u-row justify="center" style="margin-top: 10px;">
					<u-col span="6">
						<u-button type="primary"  @click="getTaskList()" >刷新</u-button>
					</u-col>
				</u-row>									
				<scroll-view scroll-y="true" class="scroll-Y">
					<u-card class="task_card" box-shadow="0 4px 8px rgba(0, 0, 0, 0.2)" :show-foot="false"  :key="item.taskCode" v-for="item in tableData">
						<view class="" slot="head">
							<u-row>
								<u-col span="8">
									{{'任务编号：'+item.taskCode}}
								</u-col>
								<u-col span="4">
									<u-tag type="success" v-if="item.status=='START'" text="生产中"/>
									<u-tag type="warning" v-else-if="item.status=='PAUSE'" text="暂停"/>
									<u-tag type="primary" v-else text="未开始"/>		
								</u-col>
							</u-row>
						</view>
						<view class="" slot="body">	
							<u-row gutter="10" class="uRow">
								<u-col span="12">
									{{'产品编码：'+item.itemCode}}
								</u-col>
							</u-row>
							<u-row gutter="10" class="uRow">
								<u-col span="6">
									{{'产品名称：'+item.itemName}}
								</u-col>
								<u-col span="6">
									{{'规格型号：'+item.specification}}
								</u-col>
							</u-row>
							<u-row gutter="16" class="uRow">
								<u-col span="6">
									{{'排产数量：'+item.quantity}}
								</u-col>
								<u-col span="6">
									{{'生产数量：'+item.quantityProduced}}
								</u-col>
							</u-row>
							<u-row gutter="16" class="uRow" justify="center">
								<u-col span="6">
									<u-button type="primary" @click="shiftTask(item.taskId)">切换</u-button>
								</u-col>
							</u-row>							
						</view>
					</u-card>																				
				</scroll-view>				
			</view>
			<view class="content_right">
				<u-row gutter="16">
					<u-col span="4">
						<u-button type="primary" v-if="form.status =='NORMAL'" @click="changeStatus('START')" >开始</u-button>
						<u-button type="primary" v-else-if="form.status =='START'" @click="changeStatus('PAUSE')" >暂停</u-button>
						<u-button type="primary" v-if="form.status =='PAUSE'" @click="changeStatus('START')" >继续</u-button>
					</u-col>
					<u-col span="4">						
						<u-button type="primary" v-if="form.taskId !=null " @click="changeStatus('FINISHED')" >完成</u-button>
					</u-col>
					<u-col span="4">
						<u-button type="primary" @click="doFeedback" v-if="form.taskId !=null && form.status !='NORMAL'" >生产报工</u-button>
					</u-col>
				</u-row>
				<u-modal :title="title" @confirm="feedback()"  show-cancel-button :title-style="{'background-color':'#1E3770','color': '#FFFFFF'}" v-model="open" width="800px">
					<u-form ref="feedbackForm" label-width="100px" :model="feedbackForm" :rules="rules">
						<u-row>
							<u-col span="6">
								<u-form-item label="报工总数量" prop="quantity">
									<u-number-box disabled v-model="feedbackForm.quantity"></u-number-box>
								</u-form-item>
							</u-col>
							<u-col span="6">
								<u-form-item label="报工人" prop="nickName">
									<u-input v-model="feedbackForm.nickName"></u-input>
								</u-form-item>
							</u-col>
						</u-row>
						<u-row>
							<u-col span="6">
								<u-form-item label="合格品数量" prop="quantityQualify">
									<u-number-box :min="0" @change="quantityChanged" v-model="feedbackForm.quantityQualify"></u-number-box>
								</u-form-item>
							</u-col>
							<u-col span="6">
								<u-form-item label="不良品数量" prop="quantityUnqualify">
									<u-number-box :min="0" @change="quantityChanged" v-model="feedbackForm.quantityUnqualify"></u-number-box>
								</u-form-item>	
							</u-col>
						</u-row>
					</u-form>
				</u-modal>
				
				<u-form :inline="true" label-width="80px" size="small" :model="form" label-position="left">
					<u-row gutter="16">
						<u-col span="12">
							<u-form-item label="生产进度">
								<u-line-progress :showText="true" :height="60" :percentage="form.progress" ></u-line-progress>
							</u-form-item>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="6">
							<u-form-item label="产品编码" prop="itemCode">
								<u-input disabled placeholder="" v-model="form.itemCode" />
							</u-form-item>
						</u-col>
						<u-col span="6">
							<u-form-item label="产品名称" prop="itemName">
								<u-input disabled placeholder="" v-model="form.itemName" />
							</u-form-item>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="6">
							<u-form-item label="单位" prop="unitOfMeasure">
								<u-input disabled placeholder="" v-model="form.unitOfMeasure" />
							</u-form-item>
						</u-col>
						<u-col span="6">
							<u-form-item label="任务编号" prop="workTaskCode">
								<u-input disabled placeholder="" v-model="form.taskCode" />
							</u-form-item>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="6">
							<u-form-item label="任务数量" prop="quantity">
								<u-input disabled placeholder="" v-model="form.quantity" />
							</u-form-item>
						</u-col>
						<u-col span="6">
							<u-form-item label="生产数量" prop="quantityProduced">
								<u-input disabled placeholder="" v-model="form.quantityProduced" />
							</u-form-item>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="6">
							<u-form-item label="良品数量" prop="quantityQuanlify">
								<u-input disabled placeholder="" v-model="form.quantityQuanlify" />
							</u-form-item>
						</u-col>
						<u-col span="6">
							<u-form-item label="不良数量" prop="quantityUnquanlify">
								<u-input disabled placeholder="" v-model="form.quantityUnquanlify" />
							</u-form-item>	
						</u-col>
					</u-row>
					<u-row>
						<u-col span="6">
							<u-form-item label="排产时间" prop="startTime">
								<u-input disabled placeholder=""  v-model="form.startTime" />
							</u-form-item>	
						</u-col>
						<u-col span="6">
							<u-form-item label="需求日期" prop="requestDate">
								<u-input disabled placeholder="" v-model="form.requestDate" />
							</u-form-item>	
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="6">
							<u-button type="primary" >生产停机</u-button>
						</u-col>
						<u-col span="6">
							<u-button type="primary" >安灯呼叫</u-button>
						</u-col>
					</u-row>
				</u-form>
						
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "pro_content",
		data(){
			return {
				screenHeight: 768,			
				title: '生产报工',
				open: false,
				form: {},
				feedbackForm:{},
				tableData: [],
				rules: {
					quantity: [
						{ required: true, message: "请输入合格品数量或者不良品数量！", trigger: "blur" }
					]
				}
			}
		},
		created(){
			//获取屏幕高度
			uni.getSystemInfo({
				success(res) {
					console.log('windowHeight:'+res.windowHeight);
					this.screenHeight = res.windowHeight;
				}
			})
			
			//监听工作站切换事件
			uni.$on('switchWorkstation',(station)=>{					
				this.reset();
				this.getTaskList();
			})
			
			uni.$on('taskStatusChanged',()=>{
				this.getTaskList(); //刷新任务状态
			})
			
			if(this.vuex_workstation !=null){
				this.getTaskList();
			}			
			if(this.vuex_task !=null){
				this.shiftTask(this.vuex_task.taskId);
			}
		},
		destroyed() {
			uni.$off('switchWorkstation');
			uni.$off('taskStatusChanged');
		},
		methods:{
			getTaskList(){				
				this.$u.api.getTaskList({
					workstationId: this.vuex_workstation.workstationId,					
				}).then( res =>{
						if(res.code == '200'){
							this.tableData = res.data;
							console.log(this.tableData);
						}
					}				
				);
			},
			shiftTask(tid){
				this.$u.api.getTaskInfo({
					taskId: tid,					
				}).then( res =>{
						if(res.code == '200'){							
							this.form = res.data;
							this.$u.vuex('vuex_task', res.data);
							this.form.progress = Math.round(res.data.quantityProduced/res.data.quantity,0);
							
						}
					}				
				);
			},
			changeStatus(status){
				this.form.status = status;
				this.$u.api.changeStatus({
					taskId: this.form.taskId,
					status: status
				}).then( res =>{
						if(res.code == '200'){							
							this.$u.toast('变更成功');
							uni.$emit('taskStatusChanged'); //任务状态变更
						}
					}				
				);
			},
			reset(){
				this.feedbackForm ={
					workstationId: 0,
					userName:'admin',
					taskId: this.form.taskId,
					feedbackChannel:'PAD',
					quantity: 0,
					quantityQualify: 0,
					quantityUnqualify: 0
				}
			},
			quantityChanged(){
				this.feedbackForm.quantity = this.feedbackForm.quantityQualify + this.feedbackForm.quantityUnqualify;
			},
			doFeedback(){
				this.reset();
				this.feedbackForm.nickName = this.vuex_user.userName
				this.open = true;
			},
			cancel(){
				this.open = false;
			},
			feedback(){
				this.$refs.feedbackForm.validate(valid => {
								if (valid) {
									console.log('验证通过');
								} else {
									console.log('验证失败');
								}
				});
				
				this.$u.api.feedback({
					taskId: this.form.taskId,
					quantityFeedback: this.feedbackForm.quantity,
					quantityQualified: this.feedbackForm.quantityQualify,
					quantityUnquanlified: this.feedbackForm.quantityUnqualify,
					userName: this.vuex_user.userName
				}).then( res =>{
						if(res.code == '200'){							
							this.$u.toast('上报成功');
							this.shiftTask(this.form.taskId)
						}						
					}				
				);
				this.open = false;
			}
		}
	}
</script>

<style>
	.commonBody{
		background-color: #FEFEFF;		
		margin: 0 0;
		padding: 0 0;
	}
	
	.content {
		margin: 10px;
		display: flex;
	}
	
	.content_left {
		width: 40%;		
	}
	
	.task_card {
		width: 90%;
		margin: 5px;
	}
	
	.uRow {
		margin-top: 5px;
		margin-bottom: 5px;
	}
	
	.content_right {
		width: 60%;
		padding: 10px;
	}
	
</style>