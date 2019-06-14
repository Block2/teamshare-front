export default {
  /**
   * 判断传入对象的类型
   * @param obj
   * @returns {string}
   */
  getObjType: function (obj) {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
  },
  /**
   * 深复制传入对象的属性到一个新对象，并返回
   * @param obj
   */
  objPropsDeepCopy: function (obj) {
    let newObj = {};
    if (this.getObjType(obj) == 'Object') {
      for (let key in obj) {
        if (typeof obj[key] == 'object') {
          newObj[key] = this.objPropsDeepCopy(obj[key]);
        } else if (typeof obj[key] == 'function') {

        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  },

  objToString(obj) {
    var s = "{";
    for (var key in obj) {
      if (obj[key]) {
        if ('Object' == this.getObjType(obj[key])) {
          s = s + key + ":" + this.objToString(obj[key]) + ",";
        } else if ('Array' == this.getObjType(obj[key])) {
          s = s + key + ":" +this.arrayToString(obj[key])+ ",";
        }else{
          s = s + key + ":" + obj[key] + ",";
        }
      } else {
        s = s + key + ":" + "''" + ",";
      }
    }
    if(s.length>1){
      s = s.slice(0,-1);
    }
    s = s + "}";
    return s;
  },
  arrayToString(arr) {

    var s = "[";
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if(arr[i]){
          if ("Array" == this.getObjType(arr[i])) {
            s = s + this.arrayToString(obj[i])+",";
          } else if("Object" == this.getObjType(arr[i])){
            s = s + this.objToString(arr[i])+",";
          }else{
            s = s + arr[i]+",";
          }
        }else{
          s = s +"''"+",";
        }
      }
    }
    if(s.length>1){
      s = s.slice(0,-1);
    }
    s = s + "]";
    return s;
  }
}

