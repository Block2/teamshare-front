<template>
  <div>
    <div>
      <div class="title">{{TITLE}}</div>
      <p >{{ACOMMENT}}</p>
        <a @click="readMore">阅读全文</a>
        <a @click="editArticle">编辑</a>
        <i aria-hidden="true"></i>
        <span>{{AUTHOR}}</span>
        <i  aria-hidden="true"></i>
        <span>{{CREATETIME}}</span>
        <i aria-hidden="true"></i>
        <span>#{{TAG}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "articlePreview",
    props:{
      article:Object,
    },
    watch: {
      article () {
        this.AID = this.article.AID;
        this.TITLE = this.article.TITLE;
        this.AUTHOR = this.article.AUTHOR == "" ? '匿名' : this.article.AUTHOR;
        this.TAG = this.article.TAG;
        this.CREATETIME = this.article.CREATETIME;
        this.ACOMMENT = this.article.ACOMMENT;
      }
    },

    data(){
      return{
        AID:'',
        TITLE:'',
        AUTHOR:'',
        TAG:'',
        CREATETIME:'',
        ACOMMENT:''
      }
    },

    mounted(){
      this.AID = this.article.AID;
      this.TITLE = this.article.TITLE;
      this.AUTHOR = this.article.AUTHOR == "" ? '匿名' : this.article.AUTHOR;
      this.TAG = this.article.TAG;
      this.CREATETIME = this.article.CREATETIME;
      this.ACOMMENT = this.article.ACOMMENT;
    },
    computed:{
    },
    methods:{
      readMore(){
        this.$router.push({ name: 'article', params: {aid: this.article.AID}})
      },
      editArticle(){
        this.$router.push({ name: 'articleEdit', params: {aid: this.article.AID}})
      }
    },
  }
</script>

<style scoped>
  /*.article-barrier {*/
    /*width: 90%;*/
    /*margin: 20px auto;*/
    /*background-color: rgba(42, 42, 42, 0.85);*/
  /*}*/
  /*.article-barrier:first-child{*/
    /*margin-top: 0;*/
  /*}*/
  /*.article-barrier .header {*/
    /*box-sizing: border-box;*/
    /*border-bottom: 1px solid rgba(104, 104, 104, 0.91);*/

  /*}*/
  /*.article-barrier .header .img {*/
    /*width: 100%;*/
    /*height: 150px;*/
    /*box-sizing: border-box;*/
    /*border-bottom: 1px solid rgba(67, 67, 67, 0.8);*/

  /*}*/
  /*.article-barrier .header img {*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/

  /*.article-barrier .header .title {*/
    /*text-align: left;*/
    /*padding-left: 15px;*/
    /*font-size: 27px;*/
    /*color: #4f98af;*/
    /*height: 50px;*/
    /*line-height: 50px;*/
  /*}*/
  /*.article-barrier .content .article{*/
    /*font-size: 20px;*/
    /*max-height: 6em;*/
    /*color: #dadada;*/
    /*line-height: 1.5em;*/
    /*font-family:STKaiti,LiSu,STXinwei;*/
    /*font-style: normal;*/
    /*text-align: left;*/
    /*text-indent: 2em;*/
    /*padding: 0 10px;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    /*-webkit-box-orient: vertical;*/
    /*display: -webkit-box;*/
    /*-webkit-line-clamp: 4;*/
  /*}*/
  /*.article-barrier .content .more{*/
    /*height: 25px;*/
    /*background-color: #2e2e2e;*/
    /*width: 80px;*/
    /*margin: 10px;*/

    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*border-radius: 5px;*/
    /*color: rgba(157, 157, 157, 0.67);*/
  /*}*/
  /*.article-barrier .content .more:hover{*/
    /*cursor: pointer;*/
    /*background-color: #df9f19;*/
    /*color: white;*/
  /*}*/

  /*.article-barrier .footer {*/
    /*border-top: 1px solid rgba(104, 104, 104, 0.91);*/
    /*height: 50px;*/
    /*box-sizing: border-box;*/
    /*display: flex;*/
    /*justify-content: flex-start;*/
    /*align-items: center;*/
    /*text-align: left;*/
    /*color: rgba(117, 117, 117, 0.77);*/
    /*font-size: 14px;*/
  /*}*/
  /*.article-barrier .footer .author,*/
  /*.article-barrier .footer .date,*/
  /*.article-barrier .footer .tags{*/
    /*margin-left: 10px;*/
  /*}*/
  /*.article-barrier .footer i{*/
    /*margin-right: 5px;*/
  /*}*/
  /*.article-barrier .footer .date{*/
    /*max-width: 140px;*/
    /*font-family: sans-serif;*/
  /*}*/
  /*.article-barrier .footer .tags span{*/
    /*margin-right:10px;*/
  /*}*/
</style>
