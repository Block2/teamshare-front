<template>
    <div class="header">
      <div class="inline-block cursor-p header-logo ml20 mr20">团队协作共享平台</div>
       <div class="inline-block cursor-p ml20 mr20 header-nav" v-for="module in modules" @click="moduleRouter(module)">{{module.TMNAME}}</div>
    </div>
</template>

<script>
  import tmodule from '@/store/module/api'
  export default {

    data() {
      return {
        currentModule:{},
        modules:[],
        TMID:'',
        TMNAME:'',
        msg: "",
      };
    },

    created(){
         tmodule.getAllModules(data=>{
           this.modules = data.MODULE_LIST;
           this.moduleRouter(this.modules[0]);
         });

    },
    mounted() {

    },
    methods: {
      moduleRouter(val) {
        this.currentModule = val;
        this.$menuVue.$emit('getRouterLine',this.currentModule.TMID);
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
