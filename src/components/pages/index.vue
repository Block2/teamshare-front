<template>
  <div class="body">
    <!-- 头部 -->
    <header-nav></header-nav>
    <!-- 菜单 -->
		<left-menu></left-menu>
    <!-- 内容 -->
		<div class="content">
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
import headerNav from './layout/header'
import leftMenu from './layout/menu'
export default {
  components: {
    headerNav,
    leftMenu
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
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

