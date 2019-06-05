<template>
  <!--<el-container>-->
    <!--<el-col v-if="!isEditable"  id="45DC4AEE-7252-4276-A70A-D23D055E2723" v-model="content">-->
    <!--</el-col>-->
    <!--<el-col :span="24" v-if="isEditable"-->
            <!--ref="editor" style="text-align:left">-->
      <!--<el-button v-if="!isEditable" @click="editContent">修改</el-button>-->
      <!--<el-button v-if="isEditable">预览</el-button>-->
      <!--<el-button v-if="isEditable">保存</el-button>-->
    <!--</el-col>-->
  <!--</el-container>-->
  <div>
    hahhah
  </div>

</template>

<script>

export default {
  data() {
    return {
      isEditable:false,
      content:'dhadagdga',
      msg: "",
    };
  },
  mounted() {

  },
  methods: {
//    editContent(){
//      var E = window.wangEditor;
//      var editor = new E('#45DC4AEE-7252-4276-A70A-D23D055E2723');
//      editor.create();
//      isEditable = true;
//    },

  }
};
</script>


<style lang="less" scoped>

</style>
