<template>
  <div class="teamshare">
      <!--<div class="form login">-->
          <!--<h3>团队协作共享平台</h3>-->
          <!--<div>-->
              <!--<input type="text" v-model="formLogin.loginName" placeholder="请输入用户名" id="loginName" >-->
          <!--</div>-->
          <!--<div>-->
              <!--<input type="password" v-model="formLogin.password" placeholder="请输入密码" id="password" >-->
          <!--</div>-->
          <!--<div @click="login" style="cursor:pointer">-->
              <!--<span>登&nbsp;&nbsp;&nbsp;&nbsp;录</span>-->
          <!--</div>-->
      <!--</div>-->
      <!--<div class="copy"><span>卫宁健康&nbsp;&nbsp;&nbsp;&nbsp;沪ICP备17048553号</span></div>-->
      <!--&lt;!&ndash; login 上面的替换过来就好 &ndash;&gt;-->
      <div class="login">
        <div class="login-body">
          <div class="login-title">团队协作共享平台</div>
            <div class="login-form">
              <!--<el-row type="flex" style="margin-top:10px">-->
              <div style="margin-top:20px;">
                <i style="font-style: normal;text-align:right;width:60px;">用户名：</i>
                <el-input style="width:160px;" placeholder="请输入用户名" v-model="formLogin.loginName"></el-input>
              </div>
              <div style="margin-top:20px;">
                <i style="font-style: normal;text-align:right; width:60px;">密&nbsp;&nbsp;&nbsp;码：</i>
                <el-input style="width:160px; " placeholder="请输入密码" type="password"  v-model="formLogin.password"></el-input>
              </div>
            </div>
          <div style="margin-top: 20px;"><el-button type="primary"  @click="login">登录</el-button></div>
        </div>
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

<style lang="less" scoped>

  .teamshare{
    width:100%;
    height:100vh;
    background-image: url('/static/img/background-img.jpg');
    background-size: cover;
  }

  .login {
    width: 450px;
    height: 300px;
    margin: 0 auto;
    padding-top:150px;

    .login-body{
      padding: 20px 0px;
      background-color: rgba(255,255,255, 0.5);
      margin: 0 auto;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      .login-title {
        font-size: 20px;
      }
      .login-form {
        margin-top:30px;
        text-align: center;
      }
    }
  }
</style>




