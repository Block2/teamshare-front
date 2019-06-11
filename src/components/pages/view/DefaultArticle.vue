<template>
  <el-container>
    <i>tmid:{{TMID}}</i>
    <i>mcid:{{MCID}}</i>
    <div> 当前栏目下没有文章,您可以新建一篇文章</div>

    <el-button @click="newArticle">
      新增文章
    </el-button>


  </el-container>

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
      console.log('create', this.$route)
      this.TMID = this.$route.params.tmid;
      this.MCID = this.$route.params.mcid;
    },

    watch: {

      $route(to, from) {
        this.MCID = to.params.mcid;
        this.TMID = to.params.tmid;
      },
    },

    methods: {

      newArticle() {
        this.$router.push({name: 'articleEdit', params: {tmid: this.TMID, mcid: this.MCID}});
      }
    }
  }

</script>


<style lang="less" scoped>

</style>
