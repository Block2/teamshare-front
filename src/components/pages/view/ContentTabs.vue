<template>

  <el-container>
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <!--{{item.content}}-->
        <component :is="tabWho" :tmidProp="item.MCID"></component>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script>

  import articleList from "@/components/pages/view/ArticleList"
  import articleEdit from "@/components/pages/view/ArticleEdit"
  import articleComp from "@/components/pages/view/ArticleComp"

  export default {
    components: {
      articleList:articleList,
      articleEdit:articleEdit,
      articleComp:articleComp
    },

    data() {
      return {
        tabWho:'articleList',
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
//        editableTabs:[],
        tabIndex: 2,
      }
    },

    created(){
      this.TMID = this.$route.tmid;
      this.MCID = this.$route.mcid;
//      if(this.editableTabs.length == 0){
//
//      }
    },

    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>
<style lang="less" scoped>

</style>

