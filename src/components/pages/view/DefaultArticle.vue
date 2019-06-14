<template>
  <div>
    <div v-if="isEditable()" style="margin:0 auto; margin-top:230px; text-align: center;font-size:14px; font-weight:500;">当前栏目下没有文章,您可以新建一篇文章</div>
    <div v-else style="margin:0 auto; margin-top:230px; text-align: center;font-size:14px; font-weight:500;">当前栏目下没有文章</div>
    <div  v-if="isEditable()" style="margin:0 auto; margin-top:20px; text-align: center;font-size:14px; font-weight:500;"><el-button v-on:click="newArticle">创建文章</el-button></div>
  </div>

</template>

<script>

  import storage from '@/resource/script/localStorageUtil'
  import common from "@/store/common/api"

  export default {
    data() {
      return {
        USERID:'',
        readAndWriteAble:'',
        TMID: '',
        MCID: '',
        msg: "",
      };
    },

    created() {
      this.getAndValidateUser();
      this.TMID = this.$route.params.tmid;
      this.MCID = this.$route.params.mcid;
      this.validate(this.MCID);
    },

    watch: {
      $route(to, from) {
        this.getAndValidateUser();
        this.MCID = to.params.mcid;
        this.TMID = to.params.tmid;
        this.validate(this.MCID);
      },
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
          this.readAndWriteRight = userInfo.readAndWriteRight;
        }
      },

      isEditable(){
        return this.readAndWriteRight == '3';
      },

      newArticle() {
        this.$router.push({name: 'articleEdit', params: { tmid: this.TMID, mcid: this.MCID}});
      },

      validate(mcid){
        if(typeof(this.TMID) == "undefined"){
          common.getPathInfo({
            MCID: mcid,
          }, data=>{
            if(!data.pathInfo.hasOwnProperty("MCID")){
              this.$message({
                message: data.pathInfo,
                type: 'warning'
              });

            }else {
              if(data.pathInfo.hasOwnProperty("AID")){
                this.AID = data.pathInfo.AID;
              }
              this.MCID = data.pathInfo.MCID;
              this.TMID = data.pathInfo.TMID;
            }
          });
        }
      },
    }
  }

</script>


<style lang="less" scoped>

</style>
