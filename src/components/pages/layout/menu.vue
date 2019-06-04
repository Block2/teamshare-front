<template>
  <div class="menu">
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="activeIndex"
          router
          active-text-color="#117af1"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
            <i class="el-icon-document"></i>
            <span slot="title">{{item.navItem}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="24">
        <el-menu
          default-active="4"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>前端</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">CSS</el-menu-item>
              <el-menu-item index="1-2">VUE</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">前端规范</template>
              <el-menu-item index="1-4-1">CSS规范</el-menu-item>
              <el-menu-item index="1-4-2">VUE规范</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">后端</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">JAVA</el-menu-item>
              <el-menu-item index="2-2">Spring</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">接口</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">文档</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>

  export default {
  data() {
    return {
      navList1:[
        {name:'navCss',navItem:'Css'},
        {name:'navVue',navItem:'Vue'},
        {name:'standCss',navItem:'Css规范'},
        {name:'standVue',navItem:'Vue规范'}
      ],
      navList2:[
        {name:'oralJava',navItem:'Java'},
        {name:'oralSpring',navItem:'Spring'}
      ],
      navList3:[
        {name:'jieKou',navItem:'接口'},
        {name:'wenDang',navItem:'文档'}
      ],
      navList:[
        {name:'navCss',navItem:'Css'},
        {name:'navVue',navItem:'Vue'},
        {name:'standCss',navItem:'Css规范'},
        {name:'standVue',navItem:'Vue规范'}
      ],
      activeIndex:'navCss'
    };
  },
  created() {
    this.$bus.$on('getRouterLine',(msg) => {
        if(msg == 1){//代码走读
          this.navList = this.navList1;
          this.$router.push({name: 'navCss'});
        }else if(msg == 2){//前台规范
          this.navList = this.navList2;
          this.$router.push({name: 'oralJava'});
        }else if(msg == 3){//接口规范
          this.navList = this.navList3;
          this.$router.push({name: 'jieKou'});
        }
    })
  },
  mounted() {

  },
  beforeDestroy() {
    this.$bus.$off('getRouterLine');
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
        this.activeIndex = key;
      }
  }
};
</script>


<style lang="less" scoped>
.menu {
  // .el-menu--horizontal>.el-menu-item.is-active {
  //   border-bottom: 0px solid #409EFF;
  //   color: #409EFF;
  // }
}

</style>
