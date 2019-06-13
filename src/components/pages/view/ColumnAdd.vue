<template>
  <div class="column_add">
    <div style="margin:0 auto; margin-top:230px; text-align: center;font-size:14px; font-weight:500;">当前模块下栏目为空，您可以新建一个栏目</div>
    <div style="margin:0 auto; margin-top:20px; text-align: center;font-size:14px; font-weight:500;"><el-button v-on:click="MCDialog=true">新建栏目</el-button></div>
    <el-dialog
      title="添加栏目"
      :visible.sync="MCDialog"
      center width="400px"
      :modal="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :inline="true"
               label-position="right"
               label-width="95px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="栏目名称：" class="is-required">
              <el-input v-model="MCNAME" style="width:200px">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="栏目描述：">
              <el-input v-model="MCCOMMENT" style="width:200px;" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addColumn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import column from "@/store/column/api"
  export default {

    data() {
      return {
        MCDialog:false,
        TMID:'',
        MCNAME:'',
        MCCOMMENT:''
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

      cancel() {
        this.MCDialog = false;
        this.MCNAME = '';
        this.MCCOMMENT = '';
      },
      addColumn(){
        column.insertColumn({
          TMID:this.TMID,
          MCNAME:this.MCNAME,
          MCCOMMENT:this.MCCOMMENT
        }, data=>{
          var type = 'warning';
          if (data.IS_EXIST.endsWith("成功")) {
            type = 'success';
          }
          this.$message({
            message: data.IS_EXIST,
            type: type
          });
          this.$menuVue.$emit('getRouterLine',this.TMID);
        });
      },

    },
  }
</script>

<style lang="less">

  .el-dialog__header {
    padding: 5px 25px !important;
    text-align: left;
    background: #6243B9 !important;
  }
  .el-dialog__headerbtn .el-dialog__close {
    display: none!important;
  }

  .el-dialog__body {
    padding-top: 20px !important;
    padding-bottom: 0px !important;
    font-size: 14px;
    word-break: break-all;
  }

  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    font-family:AlibabaSans-Regular;
    font-weight:500;
    color: #ffffff;
  }

  .el-dialog__body {
    padding: 30px 20px;
    color: #7655C6;
    font-size: 14px;
    word-break: break-all;
  }

  .el-textarea__inner {
    line-height:1 !important;
  }

  .column_add{
    margin:0 auto;
  }

</style>
