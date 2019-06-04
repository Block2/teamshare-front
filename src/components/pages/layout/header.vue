<template>
  <div class="header">
    <div class="inline-block cursor-p header-logo ml20 mr20">团队协作共享平台</div>
    <div class="inline-block cursor-p ml20 mr20 header-nav" @click="selectRouter(1)">前台规范</div>
    <div class="inline-block cursor-p ml20 mr20 header-nav" @click="selectRouter(2)">后端</div>
    <div class="inline-block cursor-p ml20 mr20 header-nav" @click="selectRouter(3)">接口规范</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  mounted() {
    
  },
  methods: {
    selectRouter(val) {
      let params = val;
      this.$bus.$emit('getRouterLine',params);
    }
  }
};
</script>


<style lang="less" scoped>
.header {
  .inline-block {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #fff;
  }
  .header-logo {
    width: 190px;
  }
  .header-nav {
    width: 100px;
    text-align: center;
    &:hover {
      background-color: #0e5bcd;
    }
  }
}
</style>
