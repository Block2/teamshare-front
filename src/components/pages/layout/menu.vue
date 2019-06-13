<template>
  <el-container>

    <el-dialog
      title="添加栏目"
      :visible.sync="MCDialog"
      center width="400px"
      :modal="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-form :inline="true"
               label-position="right"
               label-width="95px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="栏目名称：" class="is-required">
              <el-input v-model="MCNAME" style="width:200px">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="栏目描述：">
              <el-input v-model="MCCOMMENT" style="width:200px;" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addColumn">确 定</el-button>
      </span>
    </el-dialog>

    <div class="menu">
      <el-row>
        <el-col :span="24">

          <el-tree
            :data="columnMapList"
            :props="defaultProps"
            node-key="id"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="tree-expand" @click="routeArticle(data)" slot-scope="{ node, data }">
              <span class="tree-label">{{ node.label.substring(0,14) }}</span>
              <span class="tree-btn">
                <i class="el-icon-plus" v-if="!isArticleLeaf(data)" @click.stop="addArticle(data.id)"></i>
                <i class="el-icon-edit" v-else @click.stop="editArticle(data.id)"></i>
                <i class="el-icon-delete" v-if="isDeleteAble(data)" @click.stop="delNode(data)"></i>
              </span>
            </span>
          </el-tree>
        </el-col>
      </el-row>
      <el-button size="mini" style="float:right; margin-right:20px" v-on:click="newColumn">添加栏目</el-button>
    </div>
  </el-container>
</template>

<script>

  import column from "@/store/column/api";
  import article from "@/store/article/api";

  export default {
    data() {
      return {
        columnMapList: [],
        defaultProps: {// 默认设置
          children: 'children',
          label: 'label'
        },
        MCNAME: '',
        MCCOMMENT: '',
        MCID: '',
        TMID: '',
        MCDialog: false,
      };
    },
    created() {
    },

    mounted() {
      this.$menuVue.$on('getRouterLine', (msg) => {
        this.TMID = msg;
        column.getColumnsByTmid({
          TMID: this.TMID
        }, data => {
          this.columnMapList = data.COLUMN_LIST;
          if (Array.prototype.isPrototypeOf(this.columnMapList) && this.columnMapList.length !== 0) {
            if (this.columnMapList[0].hasOwnProperty('children')) {
              let articles = this.columnMapList[0].children;
              if (Array.prototype.isPrototypeOf(articles) && articles.length !== 0) {
                this.$router.push({
                  name: 'article',
                  params: {tmid: this.TMID, mcid: this.columnMapList[0].ID, aid: articles[0].id}
                });
              }
            } else {
              this.$router.push({
                name: 'defaultArticle',
                params: {tmid: this.TMID, mcid: this.columnMapList[0].id}
              });
            }
          } else {
            this.$router.push({name:'columnAdd',params:{tmid:this.TMID}});
          }
        });
      })
    },
    beforeDestroy() {
      this.$menuVue.$off('getRouterLine');
    },
    watch: {},
    methods: {

      cancel() {
        this.MCDialog = false;
        this.MCNAME = '';
        this.MCCOMMENT = '';
      },

      addColumn() {
        if (typeof(this.MCNAME) == "undefined" || this.MCNAME == "") {
          this.$message({
            message: '栏目名称不能为空',
            type: 'warning'
          });
          return;
        }
        column.insertColumn({
          TMID: this.TMID,
          MCNAME: this.MCNAME,
          MCCOMMENT: this.MCCOMMENT
        }, data => {
          var type = 'warning';
          if (data.IS_EXIST.endsWith("成功")) {
            type = 'success';
          }
          this.$message({
            message: data.IS_EXIST,
            type: type
          });
          this.MCDialog = false;
          this.$menuVue.$emit('getRouterLine', this.TMID);
        });
      },

      isArticleLeaf(data) {
        return data.hasOwnProperty('AID');
      },

      isDeleteAble(data){
        return this.isArticleLeaf(data) || (!this.isArticleLeaf(data) && !data.hasOwnProperty('children'));
      },

      routeArticle(data) {
        if (this.isArticleLeaf(data)) {
          this.$router.push({name: 'article', params: {aid: data.id}});
        } else if (!data.hasOwnProperty('children')) {
          this.$router.push({name: 'defaultArticle', params: {tmid: this.TMID, mcid: data.id}});
        }
      },

      editArticle(aid) {
        this.$router.push({name: 'articleEdit', params: {aid: aid}});
      },

      delNode(nodeinfo) {
        if (this.isArticleLeaf(nodeinfo)) {
          article.deleteArticle({
            AID: nodeinfo.id
          }, data => {
            var type = 'warning';
            if (data.IS_EXIST.endsWith("成功")) {
              type = 'success';
            }
            this.$message({
              message: data.IS_EXIST,
              type: type
            });
            this.$menuVue.$emit('getRouterLine', this.TMID);
          });
        } else {
          column.deleteColumnById({
            MCID: nodeinfo.id
          }, data => {
            var type = 'warning';
            if (data.IS_EXIST.endsWith("成功")) {
              type = 'success';
            }
            this.$message({
              message: data.IS_EXIST,
              type: type
            });
            this.$menuVue.$emit('getRouterLine', this.TMID);
          });
        }
      },

      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleSelect(key, keyPath) {
      },

      clickArticle(tmid, mcid, aid) {
        this.TMID = tmid;
        this.MCID = mcid;
        this.$router.push({name: 'article', params: {tmid: this.TMID, mcid: this.MCID, aid: aid}});
      },

      newColumn() {
        this.MCDialog = true;
      },

      addArticle(mcid) {
        this.$router.push({name: 'articleEdit', params: {tmid: this.TMID, mcid: mcid}});
      },

    }
  };
</script>

<style lang="less">

  .el-dialog__header {
    padding: 5px 25px !important;
    text-align: left;
    background: #6243B9 !important;
  }
  .el-dialog__headerbtn .el-dialog__close {
    display: none!important;
  }

  .el-dialog__body {
    padding-top: 20px !important;
    padding-bottom: 0px !important;
    font-size: 14px;
    word-break: break-all;
  }

  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    font-family:AlibabaSans-Regular;
    font-weight:500;
    color: #ffffff;
  }

  .el-dialog__body {
    padding: 30px 20px;
    color: #7655C6;
    font-size: 14px;
    word-break: break-all;
  }

  .el-textarea__inner {
    line-height:1 !important;
  }

  .tree-expand {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .tree-btn {
    opacity: 0;
  }

  .tree-btn i {
    padding-right: 8px;
  }

  .tree-expand:hover {
    .tree-btn {
      opacity: 1;
    }
  }

  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #cccccc;
  }

  .el-tree-node__content:hover {
    background: #eeeeee !important;
  }

  .el-tree-node__content {
    height: 38px !important;
  }

  .tree-label {
    font-size: 14px;
    font-family: AlibabaSans-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }

</style>
