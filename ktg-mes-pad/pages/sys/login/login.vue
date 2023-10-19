<template>
	<view class="login">
		<u-form ref="loginForm" :modelValue="loginForm" :rules="loginRules" class="login-form">
		  <h3 class="title">HM-MES</h3>
		  <u-form-item prop="username">
		    <input
		      v-model="loginForm.username"
		      type="text"
		      auto-complete="off"
		      placeholder="账号"
		    >
		      <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
		    </input>
		  </u-form-item>
		  <u-form-item prop="password">
		    <input
		      v-model="loginForm.password"
		      type="password"
		      auto-complete="off"
		      placeholder="密码"
		      @keyup.enter="submit"
		    >
		      <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
		    </input>
		  </u-form-item>
		  <u-form-item style="width:100%;">
		    <button
		      :loading="loading"
		      size="medium"
		      type="primary"
		      style="width:100%;"
		      @click="submit()"
		    >
		      <span v-if="!loading">登 录</span>
		      <span v-else>登 录 中...</span>
		    </button>
		  </u-form-item>
		</u-form>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: false,
				loginForm: {
							username: "admin",
							password: "123456",
							rememberMe: false,
							validCode:'',
							uuid: ""
				},
				loginRules: {
							username: {
								rules: [
								  { required: true, trigger: "blur", errorMessage: "请输入您的账号" }
								],
							},
							
							password: {
								rules: [
									  { required: true, trigger: "blur", errorMessage: "请输入您的密码" }
									]
							}
				},
			}
		},
		methods: {
			submit(){
				this.$refs.loginForm.validate().then(valid => {
					if (valid) {
					  this.loading = true;
					  this.$u.api.login({
					  	username: this.loginForm.username,
					  	password: this.loginForm.password,
					  	validCode: this.loginForm.validCode,
					  	loginType: '1'
					  })
					  .then(res => {
						this.loading = false;
					  	if(res.msg){
					  		this.$u.toast(res.msg);
					  	}
					  	if (res.code == '200') {
					  		setTimeout(() => {
					  			uni.reLaunch({
					  				url: '/pages/index/index'
					  			});
					  		}, 500);
					  	}
					  });
					}
				});    
			}			
		}
	}
</script>

<style>
page {
    background-image: url("@/static/images/login-background.jpg");
    background-size: 100% 100%;
    width: 100%;  height: 100%;  
}

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
</style>
