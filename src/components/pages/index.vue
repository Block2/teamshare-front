<template>
  <div class="body">
    <!-- 头部 -->
    <header-nav></header-nav>
    <!-- 菜单 -->
		<left-menu></left-menu>
    <!-- 内容 -->
		<div class="content">
			<router-view v-if="isRouterAlive"></router-view>
		</div>
  </div>
</template>

<script>
import headerNav from './layout/header'
import leftMenu from './layout/menu'
export default {
  name:'app',
  provide(){
    return {
      reload:this.reload
    }
  },
  components: {
    headerNav,
    leftMenu
  },
  data() {
    return {
      isRouterAlive:true,
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

<style lang="less" scoped>
.body{
  .header{
    .header-logo{
      width: 200px;
      height: 50px;
      color: #fff;

    }
  }
}
</style>

