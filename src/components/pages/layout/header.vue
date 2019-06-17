<template>
    <div class="header">
      <div class="inline-block cursor-p header-logo ml20 mr20">
        <img style="width:29px" src="../../../assets/img/logo.png" alt="logo"/>
        <span style="margin-left:6px">团队协作共享平台</span>
      </div>
      <div class="inline-block cursor-p ml20 mr20 header-nav" v-for="(module,index) in modules" :class="{activeModule:activeModuleIndex == index}" @click="moduleRouter(index,module)">{{module.TMNAME}}</div>
      <div class="inline-block header-right">
        <img style="width: 29px;" src="../../../assets/img/user.png" alt="loginOut"/>
        <span>{{USERNAME}}</span>
          <div class="inline-block loginOutIcon">
          <img src="../../../assets/img/loginOut.png" v-on:click="loginOut" alt="loginOut"/>
          </div>
        </div>
    </div>
</template>

<script>

  import tmodule from '@/store/module/api'
  import common from '@/store/common/api'

  export default {
    data() {
      return {
        USERID:'',
        USERNAME:'',
        readAndWriteRight:'',
        activeModuleIndex:'0',
        currentModule:{},
        modules:[],
        TMID:'',
        TMNAME:'',
        msg: "",
      };
    },

    created(){
      this.getAndValidateUser();
       tmodule.getAllModules(data=>{
         this.modules = data.MODULE_LIST;
         this.moduleRouter(0, this.modules[0]);
       });
    },
    mounted() {

    },
    methods: {

      getAndValidateUser(){
        let userInfo = common.getAndValidateUser();
        if(userInfo == null){
          this.$message({
            message: '请重新登陆',
            type: 'warning'
          });
          this.$router.push({name:'login'});
        }else{
          this.USERNAME = userInfo.USERNAME;
          this.readAndWriteRight = userInfo.readAndWriteRight;
        }
      },

      loginOut(){
        this.$router.push({name:'login'});
      },

      moduleRouter(index , val) {
        this.activeModuleIndex = index;
        this.currentModule = val;
        this.$menuVue.$emit('getRouterLine',this.currentModule.TMID);
      }
    }
  };
</script>


<style lang="less" scoped>
.header {
  background: #7655C6;
  .inline-block {
    /*padding-top: 10px;*/
    height:50px;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
  }
  .header-logo {
    width: 190px;
  }
  .header-nav {
    width: 100px;
    line-height: 50px;
    text-align: center;
    &:hover {
      background-color: #6243B9;
    }
  }
  .header-right {
    height:50px;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
    float:right;
  }
  .activeModule{
    background-color: #6243B9;
  }

  .loginOutIcon {
    margin: 12px 0;
    padding-left: 15px;
    border-left: 1px solid rgb(57, 141, 181);
    height: 26px;
    line-height: 26px;
    width: 36px;
  }
}

</style>
