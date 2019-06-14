<template>
  <el-container>
    <el-col class="editArea">
      <el-row type="flex" style="margin-top:10px">
        <i style="font-style: normal;text-align:right; width:84px; margin:0 20px ">文章标题：</i>
        <el-input style="margin-right: 20px " placeholder="请输入文章标题" v-model="TITLE"></el-input>
      </el-row>
      <el-row type="flex" style="margin-top:10px" >
        <i style="font-style: normal;text-align:right; width:84px; margin:0 20px">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签：</i>
        <el-input style="margin-right: 20px " placeholder="多个标签用逗号隔开" v-model="TAG"></el-input>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          <editor :catchData = "getEditorContent"  :content ="editorContent"></editor>
        </el-col>
      </el-row>
      <div align="center">
        <el-button style="margin:10px 20px" v-on:click="clearContent">清空</el-button>
        <el-button type="primary" style="margin:10px 20px" v-on:click="saveArticle">保存</el-button>
      </div>
    </el-col>

  </el-container>
</template>

<script>
  import E from 'wangeditor'
  import article from "@/store/article/api"
  import common from "@/store/common/api"
  import editor from "./WangEditor"

  export default {

    components: {
      editor:editor
    },
    data() {
      return {
        AID: '',
        MCID: '',
        TMID:'',
        isActive: false,
        TITLE: '',
        AUTHOR: '',
        ACOMMENT: '',
        CREATETIME: '',
        TAG: '',
        editor: null,
        editorContent: '',
        BODYPART: '',
        USERNAME:'',
      };
    },

    created() {

      this.getAndValidateUser();
      this.AID = this.$route.params.hasOwnProperty("aid") ? this.$route.params.aid : '';
      this.MCID = this.$route.params.mcid;
      this.TMID = this.$route.params.tmid;

      this.validate(this.AID,this.MCID);
      this.reDrawByAid(this.AID);
    },
    mounted() {
    },

    watch: {

      $route(to, from) {
        this.getAndValidateUser();
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
        }
        this.USERNAME = userInfo.USERNAME;
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
            this.editorContent = this.BODYPART;
          });
        }else{
          this.TITLE = '';
          this.BODYPART = '';
          this.editorContent = '';
          this.CREATETIME = '';
          this.TAG = '';
          this.ACOMMENT = '';
          this.AUTHOR = this.USERNAME;
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

      saveArticle() {
        this.BODYPART = this.editorContent;
        article.insertArticle({
          AID:this.AID,
          TITLE: this.TITLE,
          AUTHOR: this.AUTHOR,
          TAG: this.TAG,
          ACOMMENT: this.ACOMMENT,
          BODYPART: this.BODYPART,
          MCID: this.MCID,
          CREATETIME: new Date().toLocaleString()
        }, data => {
          var type = 'warning';
          if (data.IS_EXIST.endsWith("成功")) {
            type = 'success';
          }
          this.$message({
            message: data.IS_EXIST,
            type: type
          });
        });
        if(typeof(this.AID) != "undefined" && this.AID != ""){
          this.$router.push({name:'article', params:{tmid:this.TMID, mcid:this.MCID, aid:this.AID}});
        }else{
          this.$menuVue.$emit('getRouterLine',this.TMID);
        }
      },

      getEditorContent(val){
        this.editorContent = val;
      },

      clearContent(){
        this.editorContent = '';
      },

    },
  }
</script>

<style scoped>

  .editArea{
    margin:20px 40px;
  }
</style>
