<template>
  <el-container>
    <i>tmid: {{TMID}}</i>
    <el-input v-model="MCNAME"></el-input>
    <el-button v-on:click="addColumn">保存</el-button>
  </el-container>
</template>

<script>

  import column from "@/store/column/api"
  export default {

//    inject:['reload'],
    data() {
      return {
        TMID:'',
        MCNAME:'',
      };
    },

    created() {
      this.TMID = this.$route.params.tmid;
    },

    watch: {
      $route(to, from) {
        this.TMID = to.params.tmid;
      },
    },

    methods: {

      addColumn(){
        insertColumn({
          TMID:this.TMID,
          MCNAME:this.MCNAME
        }, data=>{
          var type = 'warning';
          if (data.IS_EXIST.endsWith("成功")) {
            type = 'success';
          }
          this.$message({
            message: data.IS_EXIST,
            type: type
          });
        });
      },

    },
  }
</script>

<style scoped>

  .active {
    display: none;
  }
</style>
