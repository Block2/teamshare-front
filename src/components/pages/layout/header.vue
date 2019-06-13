<template>
    <div class="header">
      <div class="inline-block cursor-p header-logo ml20 mr20">
        <img style="width:29px" src="/static/img/logo.png" alt="logo"/>
        <span style="margin-left:6px">团队协作共享平台</span>
      </div>
      <div class="inline-block cursor-p ml20 mr20 header-nav" v-for="(module,index) in modules" :class="{activeModule:activeModuleIndex == index}" @click="moduleRouter(index,module)">{{module.TMNAME}}</div>
    </div>
</template>

<script>
  import tmodule from '@/store/module/api'
  export default {
    data() {
      return {
        activeModuleIndex:'0',
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
           this.moduleRouter(0, this.modules[0]);
         });

    },
    mounted() {

    },
    methods: {
      moduleRouter(index , val) {
        this.activeModuleIndex = index;
        this.currentModule = val;
        this.$menuVue.$emit('getRouterLine',this.currentModule.TMID);
      }
    }
  };
</script>


<style lang="less" scoped>
.header {
  background: #7655C6;
  .inline-block {
    /*padding-top: 10px;*/
    height:50px;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
  }
  .header-logo {
    width: 190px;
  }
  .header-nav {
    width: 100px;
    line-height: 50px;
    text-align: center;
    &:hover {
      background-color: #6243B9;
    }
  }
  .activeModule{
    background-color: #6243B9;
  }
}

</style>
