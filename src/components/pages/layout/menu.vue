<template>
  <div class="menu">
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
                <el-menu-item v-for="(article, j) in item.ARTICLE_LIST" :key="j" :index="article.AID">{{article.TITLE}}</el-menu-item>
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
  import ElMenu from "../../../../node_modules/element-ui/packages/menu/src/menu.vue";
  export default {
    components: {ElMenu},
    data() {
    return {

      columnList:[],
      currentColumn:{},
      columnMapList:[],
      columnMap:{},
      COLUMN:{},
      ARTICLE_LIST:[],
      TITLE:'',
      AID:'',
      MCNAME:'',
      MCID:'',
      activeIndex:''
    };
  },
  created() {
    this.$router.push({name: 'navCss'});
  },
  mounted() {
    this.$menuVue.$on('getRouterLine',(msg) => {

      column.getColumnsByTmid({
        TMID: msg
      }, data => {
        console.log(data.COLUMN_LIST);
        this.columnMapList = data.COLUMN_LIST;
      });
//      this.$router.push({path: 'column/' + msg});

    })
  },
  beforeDestroy() {
    this.$menuVue.$off('getRouterLine');
  },
  watch:{
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
      }
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
