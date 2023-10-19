<template>
	<view class="commonBody" :style="{ 'height': (this.screenHeight -140) + 'px' }">
		<view class="content">
			<view class="button-bar">			
				<view class="button-frame" @click="addQC('FIRST')">
					<view class="shortcut-icon icon-color01">
						<img class="icon-button" :src="require('@/static/icons/png/pro.png')" alt="">
					</view>
					<view class="grid-text">首检</view>
				</view>
				<view class="button-frame" @click="addQC('LAST')">
					<view class="shortcut-icon icon-color01">
						<img class="icon-button" :src="require('@/static/icons/png/pro.png')" alt="">
					</view>
					<view class="grid-text">末检</view>
				</view>
				<view class="button-frame" @click="addQC('SELF')">
					<view class="shortcut-icon icon-color01">
						<img class="icon-button" :src="require('@/static/icons/png/pro.png')" alt="">
					</view>
					<view class="grid-text">自检</view>
				</view>
				<view class="button-frame" @click="addQC('PATROL')">
					<view class="shortcut-icon icon-color01">
						<img class="icon-button" :src="require('@/static/icons/png/pro.png')" alt="">
					</view>
					<view class="grid-text">巡检</view>
				</view>
				<view class="button-frame" @click="addQC('FQC')">
					<view class="shortcut-icon icon-color01">
						<img class="icon-button" :src="require('@/static/icons/png/pro.png')" alt="">
					</view>
					<view class="grid-text">终检</view>
				</view>		
			</view>
			<view class="list-bar">
				<scroll-view scroll-y="true" class="scroll-list" :style="{ 'height': (this.screenHeight -280) + 'px' }">
					<uni-table ref="qcTable" border  stripe  :loading="loading" emptyText="未查询到数据" >
						<uni-tr>
							<uni-th width="160px" align="center">检验单编号</uni-th>
							<uni-th width="100px" align="center">检验类型</uni-th>
							<uni-th width="150px" align="center">物料产品编码</uni-th>
							<uni-th width="150px" align="center">物料产品名称</uni-th>
							<uni-th width="100px" align="center">检测结果</uni-th>
							<uni-th width="100px" align="center">检测时间</uni-th>
							<uni-th width="150px" align="center">操作</uni-th>
						</uni-tr>
						<uni-tr v-for="(item,index) in qcList " :key="index">
							<uni-td class="ellipis_text">{{item.qcCode}}</uni-td>
							<uni-td align="center">{{item.qcType}}</uni-td>
							<uni-td>{{item.itemCode}}</uni-td>
							<uni-td class="ellipis_text">{{item.itemName}}</uni-td>
							<uni-td align="center">
								<u-tag v-if="item.checkResult == 'REJECT'" text="不合格" type="error"></u-tag>
								<u-tag v-else text="合格" type="success"></u-tag>
							</uni-td>
							<uni-td>{{item.inspectDate}}</uni-td>
							<uni-td>
								<view class="uni-group">
									<button class="uni-button" size="mini" type="primary">修改</button>
									<button class="uni-button" size="mini" type="warn">删除</button>
								</view>
							</uni-td>
						</uni-tr>
					</uni-table>					
				</scroll-view>
				<view class="uni-pagination-box"><uni-pagination show-icon :page-size="queryParams.pageSize" :current="queryParams.pageCurrent" :total="queryParams.total" @change="getList" /></view>
			</view>
			<u-modal width="760px" v-model="qcModalFlag" :showConfirmButton=true :showCancelButton="true" title="请填写检验单" content="操作内容" >
				<u-form ref="qcForm" label-width="100px" :model="qcForm" :rules="qcRules">						
					<u-row>
						<u-col span="6">
							<u-form-item label="批次号" prop="batchCode">
								<u-input v-model="qcForm.batchCode"></u-input>
							</u-form-item>
						</u-col>
						<u-col span="6">
							<u-form-item label="检测数量" prop="quantityChecked">
								<u-number-box v-model="qcForm.quantityChecked"></u-number-box>
							</u-form-item>
						</u-col>
					</u-row>
					<u-row>
						<u-col span="6">
							<u-form-item label="检测结果" prop="checkResult">
								<radio-group>
									<radio value="ACCEPT">合格</radio>
									<radio value="REJECT">不合格</radio>
								</radio-group>								
							</u-form-item>
						</u-col>
						<u-col span="6">
							<u-form-item label="检测人员" prop="inspector">
								<u-input v-model="qcForm.inspector"></u-input>
							</u-form-item>
						</u-col>
					</u-row>
				</u-form>				
				<scroll-view scroll-y="true" scroll-x="true" class="line-list">
					<view class="line-content">
						<uni-table ref="qcLineTable" class="line-table" border  stripe  :loading="loading" emptyText="未查询到数据" >
							<uni-tr>
								<uni-th width="160px" align="center">检测项名称</uni-th>
								<uni-th width="150px" align="center">检测工具</uni-th>
								<uni-th width="150px" align="center">检测要求</uni-th>
								<uni-th width="100px" align="center">标准值</uni-th>
								<uni-th width="100px" align="center">单位</uni-th>
								<uni-th width="100px" align="center">误差上限</uni-th>
								<uni-th width="100px" align="center">误差下限</uni-th>
								<uni-th width="100px" align="center">致命缺陷数量</uni-th>
								<uni-th width="100px" align="center">严重缺陷数量</uni-th>
								<uni-th width="100px" align="center">轻微缺陷数量</uni-th>
								<uni-th width="150px" align="center">操作</uni-th>
							</uni-tr>
							<uni-tr v-for="(line,index) in qcLines" :key="index">
								<uni-td align="center">{{line.indexName}}</uni-td>
								<uni-td align="center">{{line.qcTool}}</uni-td>
								<uni-td>{{line.checkMethod}}</uni-td>
								<uni-td align="center">{{line.standerVal}}</uni-td>
								<uni-td align="center">{{line.unitOfMeasure}}</uni-td>
								<uni-td align="center">{{line.thresholdMax}}</uni-td>
								<uni-td align="center">{{line.thresholdMin}}</uni-td>
								<uni-td align="center">{{'0'}}</uni-td>
								<uni-td align="center">{{'0'}}</uni-td>
								<uni-td align="center">{{'0'}}</uni-td>
								<uni-td>
									<view class="uni-group">
										<button class="uni-button" size="mini" type="primary">缺陷登记</button>
									</view>
								</uni-td>
							</uni-tr>
						</uni-table>
					</view>		
				</scroll-view>						
			</u-modal>

			<u-modal width="760px" v-model="qcEditModalFlag" :showConfirmButton=false :showCancelButton="true" title="请填写出货检验单" content="操作内容" >
				<u-form ref="qcEditForm" label-width="100px" :model="qcEditForm" :rules="qcEditRules">
					
				</u-form>
			</u-modal>
			
			<u-modal width="600px" v-model="deffectModalFlag" :showConfirmButton=true :showCancelButton=true title="缺陷登记">
				<u-form ref="deffectForm" label-width="100px" :model="deffectForm" :rules="deffectRules">
					<u-row>
						<u-col>
							<u-form-item label="缺陷产品数量" prop="quantityChecked">
								<u-number-box v-model="qcForm.quantityChecked"></u-number-box>
							</u-form-item>
						</u-col>
						<u-col>
							<u-form-item label="缺陷等级" prop="checkResult">
								<radio-group>
									<radio value="CR">致命缺陷</radio>
									<radio value="MAJ">严重缺陷</radio>
									<radio value="MIN">轻微缺陷</radio>
								</radio-group>								
							</u-form-item>
						</u-col>
						<u-col>
							
						</u-col>
					</u-row>
				</u-form>
			</u-modal>
			
			
		</view>		
	</view>
</template>

<script>
	export default{
		name: "QcContent",
		data(){
			return {
				screenHeight: 768,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					total: 0,
					pageCurrent: 1
				},
				loading: false,
				//新增弹窗
				qcModalFlag: false,
				qcForm:{},
				qcRules:[],				
				qcLines: [],
				//编辑弹窗
				qcEditModalFlag: false,
				qcEditForm:{},
				qcEditRules:[],
				qcEditLines:[],
				//所有检测单的列表
				qcList: [
					{
						qcId: 1,
						qcCode: 'IQC202209041001',
						qcType: '来料检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 2,
						qcCode: 'PQC202209041001',
						qcType: '首检',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'REJECT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 3,
						qcCode: 'PQC202209041001',
						qcType: '末检',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'REJECT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 4,
						qcCode: 'IQC202209041001',
						qcType: '自检',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 5,
						qcCode: 'IQC202209041001',
						qcType: '巡检',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 6,
						qcCode: 'IQC202209041001',
						qcType: '出货检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 7,
						qcCode: 'IQC202209041001',
						qcType: '出货检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 8,
						qcCode: 'IQC202209041001',
						qcType: '出货检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 9,
						qcCode: 'IQC202209041001',
						qcType: '出货检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 10,
						qcCode: 'IQC202209041001',
						qcType: '出货检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					},
					{
						qcId: 11,
						qcCode: 'IQC202209041001',
						qcType: '出货检验',
						itemCode: 'IT2022101001101',
						itemName: '博世螺丝刀',
						quantityCheck: 100,
						checkResult: 'ACCEPT',
						inspectDate: '2022-09-04'
					}
				],
				
			}
		},
		created() {
			//获取屏幕高度
			uni.getSystemInfo({
				success(res) {
					console.log('windowHeight:'+res.windowHeight);
					this.screenHeight = res.windowHeight;
				}
			})
		},
		methods: {
			getTemplateLineList(type){			
				this.$u.api.getQcTemplateLine({
					itemId: this.vuex_task.itemId,
					qcType: type
				}).then( res =>{
						if(res.code == '200'){
							this.qcLines = res.data;
						}else{
							this.$u.toast(res.msg);
						}
					}				
				);
			},
			addQC(type){
				this.qcModalFlag = true;
				this.getTemplateLineList(type);
			}
		}
	}
</script>

<style>
	.commonBody{
		background-color: #FEFEFF;		
	}
	
	.content {
		margin: 10px;
	}
	
	.button-bar {
		display: flex;
		justify-content: space-around;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.button-frame {
		width: 80px;
		height: 80px;
		background-color: aliceblue;
		border-radius: 10px;
		box-shadow: 2px 2px 3px #888888;
		display: grid;
		place-items: center;
	}
	.icon-button {
		width: 48px;
		height: 48px;
	}
	.shortcut-icon {
	 	width: 48px;
	 	height: 48px;
		align-items: center;
	 	border-radius: 10px;
	 	box-sizing: border-box;
		display: flex;
		justify-content: center;
		color:#ffffff;
		font-size: 26px;
	 }
	 .shortcut-icon i{
		font-size: 26px;
	 }
	 
	 .scroll-list {
		height: ;
	 }
	 
	 .line-list{
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		height: 300px;
	 }
	 
	 .line-content {
	 		width: 200%;
	 		height: 300px;
	 		display: flex;
	 		flex-wrap: nowrap;
	 }
	 
	 .line-table{
		 display:inline-block;
	 }
	 
	 .uni-group {
		 display: flex;
		 justify-content: center;
	 }
	 
	 .ellipis_text {
	     overflow: hidden;
	 	word-break: break-all;  /* break-all(允许在单词内换行。) */
	 	text-overflow: ellipsis;  /* 超出部分省略号 */
	 	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	 	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	 	-webkit-line-clamp: 4; /** 显示的行数 **/
	 }
</style>