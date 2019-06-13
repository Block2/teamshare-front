<template>
  <div>
    <div style="margin:0 auto; margin-top:230px; text-align: center;font-size:14px; font-weight:500;">当前栏目下没有文章,您可以新建一篇文章</div>
    <div style="margin:0 auto; margin-top:20px; text-align: center;font-size:14px; font-weight:500;"><el-button v-on:click="newArticle">创建文章</el-button></div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        TMID: '',
        MCID: '',
        msg: "",
      };
    },

    created() {
      this.TMID = this.$route.params.tmid;
      this.MCID = this.$route.params.mcid;
      this.validate(this.MCID);
    },

    watch: {

      $route(to, from) {
        this.MCID = to.params.mcid;
        this.TMID = to.params.tmid;
        this.validate(this.MCID);
      },
    },

    methods: {

      newArticle() {
        this.$router.push({name: 'articleEdit', params: {tmid: this.TMID, mcid: this.MCID}});
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
