import dateUtil from '@/resource/script//dateUtil';
export default{
  //localStorage 对象
  localStorage: window.sessionStorage,
  /**
   * 设置缓存
   * @param key
   * @param value
   */
  setItem:function (key, value) {
    if (this.localStorage) {
      if(this.isExpired()){
        this.localStorage.clear();
      }
      let val;
      if (typeof value == 'object') {
        val = 'obj-'+JSON.stringify(value);
      } else {
        val = value;
      }
      this.localStorage.setItem(key, val);
      this.localStorage.setItem("#date", dateUtil.DateToString(new Date,"yyyy-MM-dd"));
    }else{
      console.log("该浏览器不支持localStorage");
    }
  },
  /**
   * 获取缓存
   * @param key
   */
  getItem : function (key) {
    if (this.localStorage) {
      if(this.isExpired()){
        this.localStorage.clear();
        return;
      }
      var val = this.localStorage.getItem(key);
      if (!val) {
        return;
      }
      if (val.indexOf('obj-') === 0) {
        val = val.slice(4);
        return JSON.parse(val);
      } else {
        return val;
      }
    }
  },
  /**
   * 判断localStorage是否过期 ，如果没有设置过或没有过期则返回false ,如果没有localStorage对象则返回undefined
   * @returns {boolean}
   */
  isExpired : function(){
    if(this.localStorage){
      if (this.localStorage.getItem("#date")) {
        if(this.localStorage.getItem("#date")!=dateUtil.DateToString(new Date,"yyyy-MM-dd")){
          return true;
        }
      }
      return false;
    }else{
      return;
    }
  },
  removeTypeItem(type){
   if(this.localStorage&&this.localStorage.length){
     var key;
     for(key in this.localStorage){
       if(key.indexOf(type)>-1){
         this.localStorage.removeItem(key);
       }
     }
   }
  }
}

