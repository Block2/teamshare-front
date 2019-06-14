<template>
        <div class="login-position" >
            <div class="login-con">
                <div class="login-top">
                    <!--<div class="left l" :style="{backgroundImage:'url('+img+')'}"></div>-->
                    <div class="right l">
                        <div class="r-wrap">
                            <h3>团队协作共享平台</h3>
                            <div class="user">
                                <i class="icon-login icon-u"></i>
                                <input type="text" class="user-input" v-model="formLogin.loginName" placeholder="请输入用户名" id="loginName" >
                            </div>
                            <div class="password">
                                <i class="icon-login icon-p"></i>
                                <input type="password" class="psd-input" v-model="formLogin.password" placeholder="请输入密码" id="password" >
                            </div>
                            <div class="code clear" v-show="false">
                                <div class="c-left l">
                                    <i class="icon-login icon-c"></i>
                                    <input id="code" type="text" class="code-input" placeholder="请输入验证码">
                                </div>
                                <div id="code-produce" class="c-right r"></div>
                            </div>
                            <p id="input-error" class="error" style="visibility:hidden  ">
                                <i class="icon-e"></i>
                                <span></span>
                            </p>
                            <div id="submit" @click="login" style="cursor:pointer">
                                <span class="submit-btn btn1">登&nbsp;&nbsp;&nbsp;&nbsp;录</span>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="copy"><span>卫宁健康&nbsp;&nbsp;&nbsp;&nbsp;沪ICP备17048553号</span></div>
            </div>
        </div>
</template>
<script>
  import storage from '@/resource/script/localStorageUtil'
  import common from '@/store/common/api'
  export default {
    data() {
      return {
        formLogin: {
          loginName: null,
          password: null,
        },
        ruleLogin: {
          loginName: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
          ]
        }
      }
    },

    created(){
      var userInfo = storage.getItem("userInfo");
      if(userInfo&&userInfo.loginName){
        this.$router.push({
          name:'index'
        });
      }
    },

    methods: {
      login() {
          if(this.formLogin.loginName=="" || this.formLogin.loginName==undefined|| this.formLogin.loginName==null){
              this.$message({
                    type: 'warning',
                    message: "请填写登陆用户"
                  });
                  return;
          }

          if(this.formLogin.password==""||this.formLogin.password==null||this.formLogin.password==undefined){
              this.$message({
                    type: 'warning',
                    message: "请填写用户密码"
                  });
                  return;
          }

          common.getUserInfo({
            LOGINNAME:this.formLogin.loginName,
            PASSWORD:this.formLogin.password
          },data=>{
            if(!data.userInfo.hasOwnProperty("USERID")){
              this.$message({
                type: 'warning',
                message: "用户名或密码错误"
              });
              return;
            }
            storage.setItem("userInfo",data.userInfo);
            this.$router.push({name:"index"});
          });
      }
    },
  };
</script>
<style>
</style>



