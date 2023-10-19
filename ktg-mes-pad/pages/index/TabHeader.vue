<template>
    <tab-bar class="bar">
        <tab-bar-item path="PRO" activeColor="black" class="tab-bar-item" style="border-top-left-radius: 5px; border-right: solid #A2A3A5">
            <template v-slot:item-text><div class="title-style">生产</div></template>
            <template v-slot:item-icon><img class="hengxian" :src="require('@/static/icons/png/pro.png')" alt=""></template>
            <template v-slot:item-icon-active><img class="hengxian" :src="require('@/static/icons/png/pro.png')" alt=""></template>
        </tab-bar-item>
        <tab-bar-item path="GX" activeColor="black" style="border-right: solid #A2A3A5">
            <template v-slot:item-text><div class="title-style">工序</div></template>
            <template v-slot:item-icon><img class="hengxian" :src="require('@/static/icons/png/gx.png')" alt=""></template>
            <template v-slot:item-icon-active><img class="hengxian" :src="require('@/static/icons/png/gx.png')" alt=""></template>
        </tab-bar-item>
        <tab-bar-item path="QC" activeColor="black" style="border-right: solid #A2A3A5">
            <template v-slot:item-text><div class="title-style">质量</div></template>
            <template v-slot:item-icon><img class="hengxian" :src="require('@/static/icons/png/qc.png')" alt=""></template>
            <template v-slot:item-icon-active><img class="hengxian" :src="require('@/static/icons/png/qc.png')" alt=""></template>
        </tab-bar-item>
        <tab-bar-item path="DV" activeColor="black">
            <template v-slot:item-text><div class="title-style">设备</div></template>
            <template v-slot:item-icon><img class="hengxian" :src="require('@/static/icons/png/dev.png')" alt=""></template>
            <template v-slot:item-icon-active><img class="hengxian" :src="require('@/static/icons/png/dev.png')" alt=""></template>
        </tab-bar-item>
    </tab-bar>
</template>
 
<script>
    import TabBar from "@/components/TabBar/TabBar.vue";
    import TabBarItem from "@/components/TabBar/TabBarItem.vue";
 
    export default {
        name: "TabHeader",
        components: {
            TabBar,
            TabBarItem
        },
		data(){
			return {
				proImg: require('@/static/icons/png/pro.png')
			}
		}
    }
</script>
 
<style scoped>
    .title-style {
        font-weight: bold;
		margin: auto;
		text-align: center;
        cursor: pointer;
    }
    .title-style:hover {
        color: black;
    }
	
	.bar{
		background: linear-gradient(to top,rgb(205 204 209),rgb(230 226 223));
	}
	.tab-bar-item{
		width: 90px;
		height: 70px;
		padding: 5px;
	}
 
    .hengxian {
		margin: auto;
        width: 35px;
        height: 35px;
		margin-top: 5px;
    }
	.divider{
		background-color: #b9bdbd;
		margin: 5px 0px;
		height: 70px;
	}
	
	.active{
		background-color: white;
	}
	
	.Hline{
	 	background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
		width: 1px;/*设置宽高*/
		vertical-align: middle;
		height:80%;
		position:relative;/*调整位置*/
		left:150px;
		float:left;/*让此div与前面的并排显示*/
	}
	.style-two {	
		align: center;
		width: 80%;
		margin: 0 auto;
		border: 0;
		height: 1px;
		background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
	}
</style>