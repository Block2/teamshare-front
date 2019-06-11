<template>
  <div class="menu">
    <el-button v-on:click="addColumn">添加栏目</el-button>
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          :router="true"
          class="el-menu-vertical-demo"
          active-text-color="#117af1"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu v-for="(item, i) in columnMapList" route :key="i" :index="item.COLUMN.MCID">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.COLUMN.MCNAME}}</span>
            </template>
            <template v-if="item.ARTICLE_LIST">
              <el-menu-item-group>
                <el-menu-item v-for="(article, j) in item.ARTICLE_LIST"
                              :key="j"
                              :index="article.AID"
                              @click="clickArticle(item.COLUMN.TMID, item.COLUMN.MCID, article.AID)">
                  {{article.TITLE}}
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
        </el-menu>

      </el-col>
    </el-row>
  </div>
</template>

<script>

  import column from "@/store/column/api";
  import ElButton from "../../../../../../shenkang/skmbzs/skmbzs前端/node_modules/element-ui/packages/button/src/button.vue";

  export default {

    components: {ElButton},
    data() {
      return {

        columnList: [],
        currentColumn: {},
        columnMapList: [],
        columnMap: {},
        COLUMN: {},
        ARTICLE_LIST: [],
        TITLE: '',
        MCNAME: '',
        MCID: '',
        TMID: '',
        activeIndex: ''
      };
    },
    created() {

    },
    mounted() {
      this.$menuVue.$on('getRouterLine', (msg) => {

        this.TMID = msg;
        column.getColumnsByTmid({
          TMID: this.TMID
        }, data => {
          this.columnMapList = data.COLUMN_LIST;
          if (Array.prototype.isPrototypeOf(this.columnMapList) && this.columnMapList.length !== 0) {
            if (this.columnMapList[0].hasOwnProperty('ARTICLE_LIST')) {
              let article = this.columnMapList[0].ARTICLE_LIST;
              if (Array.prototype.isPrototypeOf(article) && article.length !== 0) {
                console.log('menu aid getRouterLine route', this.$route);
                this.$router.push({
                  name: 'article',
                  params: {tmid: this.TMID, mcid: this.columnMapList[0].COLUMN.MCID, aid: article[0].AID}
                });
              }
            } else {
              this.$router.push({
                name: 'defaultArticle',
                params: {tmid: this.TMID, mcid: this.columnMapList[0].COLUMN.MCID}
              });
            }
          }
        });
      })
    },
    beforeDestroy() {
      this.$menuVue.$off('getRouterLine');
    },
    watch: {
      $route(to, from) {
        this.activeIndex = to.name;
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        // this.activeIndex = key;
        // this.$router.push({path: key});
        // console.log(key, keyPath);
      },

      clickArticle(tmid, mcid, aid) {
        this.TMID = tmid;
        this.MCID = mcid;
        this.$router.push({name: 'article', params: {tmid: this.TMID, mcid: this.MCID, aid: aid}});
      },

      addColumn(){
        this.$router.push({name: 'columnAdd', params: {tmid: this.TMID}});
      },
    }
  };
</script>


<style lang="less" scoped>
  .menu {
    .el-menu-item.is-active {
      color: #409EFF;
      // background-color: #409EFF;
    }

  }

</style>
