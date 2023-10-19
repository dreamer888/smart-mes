<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>
 
<script>
    export default {
        name: "TabBar",
    }
</script>
 
<style scoped>
    #tab-bar {
        display: flex;
		background-color: #E4E2E5;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		width: 400px;
		margin-left: 0px;
        box-shadow: 2px 0 1px rgba(100,100,100,.6);
    }

</style>