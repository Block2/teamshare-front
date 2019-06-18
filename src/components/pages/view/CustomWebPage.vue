<template>
  <div  class="frameOuter">
  <iframe id="framePage" class="frame"  frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes">
  </iframe>
  </div>
</template>

<script>

  import common from '@/store/common/api'
  export default {
    data() {
      return {
        webPageUrl:''
      };
    },

    created() {
      this.getAndValidateUser();
      this.webPageUrl=this.$route.params.url;
    },

    mounted(){
      console.log(this.webPageUrl);
      this.changePageUrl(this.webPageUrl);
    },

    watch: {
      $route(to, from) {
        this.getAndValidateUser();
        this.webPageUrl=to.params.url;
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
        }
      },

      changePageUrl(url){
        document.getElementById("framePage").src=url;
      },
    }
  }
</script>

<style scoped>

  .frameOuter{
    width:calc(100vw - 280px);
    height:calc(100vh - 80px);
  }

  .frame{
    width:100%;
    height:100%;
  }
</style>
