<template>
    <div class="tab-bar-item" :class="isActive? 'active':'inActive'"  @click="itemClick">
		<div v-if="!isActive" style='text-align: center;'><slot name="item-icon"></slot></div>
		<div v-else style='text-align: center;'><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>
 
<script>
    export default {
        name: "TarBarItem",
        props: {
            path: String,
            activeColor: {
                type: String,
                /*如果没有参数 则这个为默认的颜色*/
                default: '#ffffff'
            }
        },
        data() {
           return {
               // isActive: true
           }
        },
        computed: {
          isActive() {
              /*动态决定颜色是否改变*/
              return this.$route.path.indexOf(this.path) !== -1
          },
            activeStyle() {
              return this.isActive ? {color: this.activeColor} : {}
            }
        },
        methods: {
            itemClick() {
                //this.$router.push(this.path)
				console.log("switching Tab :"+this.path);
				uni.$emit('switchTab',this.path);
            }
        }
    }
</script>
 
<style scoped>
    .tab-bar-item {
        text-align: center;
		vertical-align: middle;
		padding: 0 15px;
		width: 100px;
		height: 100px;
    }
	
	.active{
		background-color: #FEFEFF;
	}
 
    .tab-bar-item img {
		width: 60px;
		height: 40px;
    }