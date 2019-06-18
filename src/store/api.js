/*
 * @description
 *》服务的别名预先定义，为了避免发布的时候还要改配置文件：
 *》发布的时候运行npm run deploy;对应发布文件到deploy文件夹中。
 *》测试和debug分别可以修改SYS_DEBUGMOD，并且npm run build可以发布debug版本和测试版本;对应发布文件到dist文件夹中。
 *》本地开发调试时运行npm run dev
 *》服务模式分为三种模式：debug、测试、发布，分别对应下面解释
 * @Last Modified by: s_xd@winning.com.cn
 * @Author: s_xd@winning.com.cn
 * @Last Modified time: 2018-01-16 20:51:40
 * @Last Modified time: 2018-01-16 20:51:40
 * @Last Modified time: 2018-11-16 10:23:30
 */

const config = require('../../config');
const axios = require('axios');
import {Loading} from 'element-ui'
// 设置跨域带鉴权支持
axios.defaults.withCredentials = true;
//是否进行本地调试
const debugMod = false;
//是否启动单点登陆
const jwt = false;
//是否进行通信加密
const ENCRYPTION_FLAG = false;
/** 发布部署模式，动态读取构建命令 */
const SYS_DEPLOY = process.env.ENV_D;
//本地服务前缀
 const mockUrl = process.env.NODE_ENV === 'production' ?
  config.build.assetsPublicPath + config.build.assetsSubDirectory :
   config.dev.assetsPublicPath + config.dev.assetsSubDirectory;
/** 发布模式配置，前后端采用集中部署，前端走Ngix服务模式,名称和前缀预定义 */
 const DEPOLY_API = "api/";
/** debug模式的时候，可以任意改地址入口，允许统一改，也允许单独改 */
 const DEBUGAPI = "http://127.0.0.1:9000/teamshare/";
 /** 测试模式，前后端可以分开部署,允许统一改，也允许单独改*/
 const TESTAPI = "http://172.16.0.121:9000/teamshare/";//服务器
 /** 服务前缀*/
let baseUrl=debugMod ? DEBUGAPI : TESTAPI;//服务器
/** npm run deploy 的时候，表示真正发布的时候，和Nginx一并部署*/
baseUrl = SYS_DEPLOY ? DEPOLY_API : baseUrl;
// baseUrl = "http://127.0.0.1:9090/teamshare/"

const url = {

  //本地访问地址
  //注册机构模块接口
  common:{
    getPathInfo:baseUrl + "common/getPathInfo",
    getUserInfo:baseUrl + "common/getUserInfo",
    getUserInfoByUsesrId:baseUrl + "common/getUserInfoByUserId",
  },
  tmodule:{
    getAllModules:baseUrl + "module/getAllModules",
    insertModule:baseUrl + "module/insertModule",
    deleteModuleById:baseUrl + "module/deleteModuleById",
    updateModule:baseUrl + "module/updateModule"
  },
  mcolumn:{
    getColumnById:baseUrl + "column/getColumnById",
    getColumnsByTmid:baseUrl + "column/getColumnsByTmid",
    updateColumn:baseUrl + "column/updateColumn",
    deleteColumnById:baseUrl + "column/deleteColumnById",
    insertColumn:baseUrl + "column/insertColumn"
  },

  article:{
    insertArticle:baseUrl + "article/insertArticle",
    getArticleById:baseUrl + "article/getArticleById",
    updateArticle:baseUrl + "article/updateArticle",
    deleteArticle:baseUrl + "article/deleteArticle",
    getArticleByMcid:baseUrl + "article/getArticleByMcid"
  },

};
axios.interceptors.request.use((config) => {
  if(jwt){
    config.headers['Authorization']=jwt;//让每个请求都携带token
  }
  //这里可以加一些交互动作，比如来个进度条开始效果
  // loadingOpen();
  return config;
}, error => {
  return Promise.reject(error);
});
axios.interceptors.response.use((res, a, b, c, d) => {
  if (res.status >= 200 && res.status <= 300) {
    return res;
  }
  //由后端抛出的错误
  return Promise.reject(res);
}, (error) => {
  //由网络服务器抛出的错误
  return Promise.reject(error);
});

let catchErrorEvt = function (error) {
  switch (error.status) {
    case 404:
      console.log('接口不存在');
      break;
    case '500':
      console.log('接口报错');
      break;
    default:
      console.log('其他类型错误');
  }
};
let nullToString = function (data) {
  if (typeof data == "string") {
    return data;
  }
  for (let it in data) {
    if (typeof(data[it]) === "object") {
      nullToString(data[it]);
    }
    data[it] = data[it] == null ? '' : data[it];
  }
  return data;
};
let encrypt = function (data) {
  return encodeURIComponent(data);
};

let decrypt = function (data) {
  return data;
}
let checkData = function(data){
  //逻辑错误
  if(data.type=="FAILT"){
    window.$message({
      message: data.message,
      type: 'warning'
    });
    //系统异常
  }else if(data.type=="ERROR"){
    console.log(data.messageCode,data.message);
    window.$message({
      message: '操作失败！',
      type: 'warning'
    });
  }
}

//上传文件配置
let uploadInstance=axios.create({
  headers:{"Content-Type": "multipart/form-data"}
});
uploadInstance.withCredentials = true;

export default {
  url,
  post: function (target, params = {}) {
    return new Promise((resolve, reject) => {
      if (console.time) {
        console.time(target);
      }
      axios({
        url: target,
        method: 'post',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params,
        transformRequest: [function (data) {
          let ret = '';
          //这里提前处理发送的数据
          if (ENCRYPTION_FLAG) {
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encrypt(data[it]) + '&'
            }
            return ret;
          }

          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then(res => {
        checkData(res.data);
        if (ENCRYPTION_FLAG) {
          let result = res.data;
          //针对data进行处理加密
          result.data = decrypt(result.data);
          resolve(result);
        }
        resolve(nullToString(res.data));
        if (console.timeEnd) {
          console.timeEnd(target);
        }
      }).catch(error => {
        catchErrorEvt(error);
        reject(error);
      });
    });
  },
  get: function (target) {
    return new Promise((resolve, reject) => {
      if (console.time) {
        console.time(target);
      }
      axios({
        url: target,
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
        checkData(res.data);
        resolve(nullToString(res.data));
        if (console.timeEnd) {
          console.timeEnd(target);
        }
      }).catch(error => {
        catchErrorEvt(error);
        reject(error);
      });
    });
  },

  upload: function (target, params = {}) {
    return new Promise((resolve, reject) => {
      if (console.time) {
        console.time(target);
      }
      uploadInstance.post(target,params,{}).then(res => {//headers:{'Authorization':jwt}//jwt验证
        checkData(res.data);
        if (ENCRYPTION_FLAG) {
          let result = res.data;
          //针对data进行处理加密
          result.data = decrypt(result.data);
          resolve(result);
        }
        resolve(nullToString(res.data));
        if (console.timeEnd) {
          console.timeEnd(target);
        }
      }).catch(error => {
        catchErrorEvt(error);
        reject(error);
      });
    });
  }

}
