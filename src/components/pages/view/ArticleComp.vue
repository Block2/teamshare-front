<template>
  <el-container>

    <i>tmid: {{TMID}}</i>
    <i>mcid: {{MCID}}</i>
    <i>aid: {{AID}}</i>
    <el-button :span="8" align="right" @click="newArticle">新增</el-button>
    <el-button :span="8" align="right" @click="modifyArticle">修改</el-button>
    <el-button :span="8" align="right" @click="deleteArticle">删除</el-button>
    <i>文章标题 : {{TITLE}}</i>
    <i>作者 : {{AUTHOR}}</i>
    <i>标签 : {{TAG}}</i>
    <i>{{CREATETIME}}</i>
    <div v-html="BODYPART">
      {{BODYPART}}
    </div>
  </el-container>
</template>

<script>
  import E from 'wangeditor'
  import article from "@/store/article/api"
  import common from "@/store/common/api"

  export default {

    data() {
      return {
        AID:'',
        MCID:'',
        TMID:'',
        isActive: false,
        TITLE: '文章标题',
        AUTHOR: 'admin',
        ACOMMENT: '',
        CREATETIME: '',
        TAG: '',
        BODYPART: '',
      };
    },

    created() {
      this.AID = this.$route.params.hasOwnProperty("aid") ? this.$route.params.aid : '';
      this.MCID = this.$route.params.mcid;
      this.TMID = this.$route.params.tmid;
      this.validate(this.AID,this.MCID);
      this.reDrawByAid(this.AID);
    },

    watch: {
      $route(to, from) {
        this.AID = to.params.aid;
        this.MCID = to.params.mcid;
        this.TMID = to.params.tmid;
//        this.reload();
      },

      AID(newAid, oldAid) {
        this.validate(newAid, this.MCID);
        this.reDrawByAid(this.newAid);
      }
    },

    methods: {

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
            this.TAG = data.TAG,
              this.AUTHOR = data.AUTHOR;
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

  .active {
    display: none;
  }
</style>
