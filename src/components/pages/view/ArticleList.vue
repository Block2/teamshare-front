<template>
  <el-container>
    <!--<el-button @click="newArticle">新建文章</el-button>-->
    <div class="article-preview-list">
      <!--列表-->
      <article_preview v-for="article in ARTICLES" :article="article"></article_preview>
    </div>

  </el-container>
</template>

<script>
  import article from "@/store/article/api"
  import common from "@/store/common/api"
  import article_preview from "@/components/pages/view/ArticleItem"

  export default {
    props:{
      tmidProp:String,
      mcidProp:String,
    },

    components:{
      article_preview: article_preview
    },

    data() {
      return {
        AID:'',
        MCID: '',
        TMID:'',
        ARTICLES:[],
      };
    },

    created() {
      this.MCID = this.$route.params.mcid;
      this.TMID = this.$route.params.tmid;
      this.getArticles(this.MCID);
//      this.validate(this.AID,this.MCID);
    },

    mounted() {
    },

    watch: {
      $route(to, from) {
        this.MCID = to.params.mcid;
        this.TMID = to.params.tmid;
        this.getArticles(this.MCID);
//        this.validate(this.AID, this.MCID);
//        this.reDrawByAid(this.AID);
      },

    },

    methods: {

      getArticles(mcid){
        article.getArticleByMcid({
          MCID:mcid
        }, data=>{
          this.ARTICLES = data.ARTICLE_LIST
          console.log('articles',this.ARTICLES);
        });
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

      newArticle(){
        this.$router.push({name:'content', params:{tmid:this.TMID, mcid:this.MCID, type:2}});
      },

    },
  }
</script>

<style lang="less" scoped>

  .article-barrier {
    width: 90%;
    margin: 20px auto;
    background-color: rgba(42, 42, 42, 0.85);
  }
  .article-barrier:first-child{
    margin-top: 0;
  }
  .article-barrier .header {
    box-sizing: border-box;
    border-bottom: 1px solid rgba(104, 104, 104, 0.91);

  }
  .article-barrier .header .img {
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(67, 67, 67, 0.8);

  }
  .article-barrier .header img {
    width: 100%;
    height: 100%;
  }

  .article-barrier .header .title {
    text-align: left;
    padding-left: 15px;
    font-size: 27px;
    color: #4f98af;
    height: 50px;
    line-height: 50px;
  }
  .article-barrier .content .article{
    font-size: 20px;
    max-height: 6em;
    color: #dadada;
    line-height: 1.5em;
    font-family:STKaiti,LiSu,STXinwei;
    font-style: normal;
    text-align: left;
    text-indent: 2em;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 4;
  }
  .article-barrier .content .more{
    height: 25px;
    background-color: #2e2e2e;
    width: 80px;
    margin: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: rgba(157, 157, 157, 0.67);
  }
  .article-barrier .content .more:hover{
    cursor: pointer;
    background-color: #df9f19;
    color: white;
  }

  .article-barrier .footer {
    border-top: 1px solid rgba(104, 104, 104, 0.91);
    height: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
    color: rgba(117, 117, 117, 0.77);
    font-size: 14px;
  }
  .article-barrier .footer .author,
  .article-barrier .footer .date,
  .article-barrier .footer .tags{
    margin-left: 10px;
  }
  .article-barrier .footer i{
    margin-right: 5px;
  }
  .article-barrier .footer .date{
    max-width: 140px;
    font-family: sans-serif;
  }
  .article-barrier .footer .tags span{
    margin-right:10px;
  }
</style>
