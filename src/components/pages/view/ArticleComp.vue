<template>
  <el-container>
    <el-col class="article">
      <el-row type="flex" justify="center">
        <el-col :span="24" class="title">
          {{TITLE}}
        </el-col>
      </el-row>
      <el-row type="flex" style="margin-top:20px; font-size:12px;" justify="center">
          <i  style="line-height: 19px;margin-right: 8px;" class="el-icon-user-solid">{{AUTHOR}}</i>
          <i style="line-height: 19px;margin-right: 8px;">{{CREATETIME}}</i>
          <el-tag size="mini" style="margin-right:8px;" v-for="tag in TAGS">{{tag}}</el-tag>
      </el-row>
      <el-row class="bodypart">

        <div v-html="BODYPART">
          {{BODYPART}}
        </div>
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
  import E from 'wangeditor'
  import article from "@/store/article/api"
  import common from "@/store/common/api"

  export default {

    props:{
      tmidProp:String,
      mcidProp:String,
      aid:String
    },

    data() {
      return {
        USERID:'',
        AID:'',
        MCID:'',
        TMID:'',
        isActive: false,
        TITLE: '文章标题',
        AUTHOR: '',
        ACOMMENT: '',
        CREATETIME: '',
        TAG: '',
        TAGS:[],
        BODYPART: '',
      };
    },

    created() {
      common.getAndValidateUser();
      this.AID = this.$route.params.hasOwnProperty("aid") ? this.$route.params.aid : '';
      this.MCID = this.$route.params.mcid;
      this.TMID = this.$route.params.tmid;
      this.validate(this.AID,this.MCID);
      this.reDrawByAid(this.AID);
    },

    watch: {
      $route(to, from) {

        this.getAndValidateUserId(to.params.userId);
        this.AID = to.params.aid;
        this.MCID = to.params.mcid;
        this.TMID = to.params.tmid;
        this.validate(this.AID, this.MCID);
        this.reDrawByAid(this.AID);
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

      validate(aid, mcid){
        if(typeof(this.MCID) == "undefined" || typeof(this.TMID) == "undefined"){
          common.getPathInfo({
            AID:aid,
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

      reDrawByAid(aid){
        if (typeof(aid) != "undefined") {
          article.getArticleById({
            AID: aid
          }, data => {
            this.AID = data.AID;
            this.TITLE = data.TITLE;
            this.TAG = data.TAG;
            if(typeof(this.TAG) != "undefined" && this.TAG !=""){
              this.TAGS = this.TAG.split(",|，");
            }
            this.AUTHOR = data.AUTHOR =="" || typeof(data.AUTHOR)=="undefined" ? '匿名' : data.AUTHOR;
            this.ACOMMENT = data.ACOMMENT;
            this.CREATETIME = data.CREATETIME;
            this.BODYPART = data.BODYPART;
          });
        }
      },

      newArticle() {
        this.$router.push({name: 'articleEdit', params: {tmid: this.TMID, mcid: this.MCID}});
      },

      modifyArticle() {
        this.$router.push({name: 'articleEdit', params: {tmid: this.TMID, mcid: this.MCID, aid: this.AID}});
      },

      deleteArticle() {
        article.deleteArticle({
          AID:this.AID
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
        this.$menuVue.$emit('getRouterLine',this.TMID);
      },
    }
  }
</script>

<style scoped>

  .article{
    margin-left:100px;
    margin-right:100px;
    margin-bottom: 100px;
  }

  .title {
    margin: 0 auto;
    margin-top: 35px;
    text-align:center;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
  }

  .bodypart{
    margin-top: 50px;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
