<template>
  <iframe id="framePage" class="frame">
  </iframe>
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
.frame{
  width:100%;
  height:100vh;
  overflow:auto;
}
</style>
