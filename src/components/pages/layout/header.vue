<template>

    <div class="header">
      <div class="inline-block cursor-p header-logo ml20 mr20">团队协作共享平台</div>
      <div class="inline-block cursor-p ml20 mr20 header-nav" v-for="module in modules" @click="selectRouter(module)">{{module.tmname}}</div>
    </div>

</template>

<script>
  import tmoudle from 'app/module/api'
  export default {
    data() {
      return {
        modules:[],
        msg: "",
      };
    },

    created(){
      console.log(tmodule);
        tmodule.getAllModules(data=>{
          console.log('data',data);
          this.modules = data.data.MODULE_LIST;
        });


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
