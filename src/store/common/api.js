import api from '../api'
import storage from '@/resource/script/localStorageUtil'

export default {

  getPathInfo(params,cb) {
    return api.post(api.url.common.getPathInfo, params)
      .then(data => {
        cb(data);
     });
  },

  getUserInfo(params,cb) {
    return api.post(api.url.common.getUserInfo, params)
      .then(data => {
        cb(data);
      });
  },

  getUserInfoByUserId(params,cb) {
    return api.post(api.url.common.getUserInfoByUsesrId, params)
      .then(data => {
        cb(data);
      });
  },

  getAndValidateUser(){
    var userInfo = storage.getItem("userInfo");
    if(typeof(userInfo) == 'undefined' || userInfo.loginName == ''){
      return null;
    }
    this.getUserInfoByUserId({
      USERID:userInfo.USERID
    }, data=>{
      if(!data.userInfo.hasOwnProperty('USERID')){
        return null;
      }else{
        userInfo =  data.userInfo;
      }
    });
    return userInfo;
  },
}
