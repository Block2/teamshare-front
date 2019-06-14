import objUtil from '@/resource/script/objUtil';
export default {
  /**
   * 如果传入的n为数字则返回当前日期+n所在日期,当n不是数字时则返回当前日期
   * @param n
   * @returns {Date}
   */
  getDate:function (n){
    if(objUtil.getObjType(n)=='Number'){
      return new Date((new Date).getTime()+n*(1000*60*60*24));
    }
    return new Date();
  },
  /**
   * 格式化日期
   * @param date
   * @param formatStr
   * @returns {*}
   * @constructor
   */
  DateToString(date,formatStr){
    if(objUtil.getObjType(date)=='Date'&&formatStr){
      var o = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      for (var k in o){
        if (new RegExp("(" + k + ")").test(formatStr)) formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("0000" + o[k]).substr(-RegExp.$1.length)));
      }
      return formatStr;
    }else{
      return "";
    }
  },
  /**
   * 字符串生成日期
   * @param str
   * @returns {Date}
   */
  stringToDate(str){
    if(str){
      return new Date(str.replace(/-/g,"/"));
    }
  },
  /**
   * date为需要计算的日期
   * @param date 格式为日期
   * @param type y 年 M 月 d 日 h 时 m 分 s 秒
   * @param num 正整数为增加，负整数为减少
   */
  dateAdd(date,type,num){
    switch (type){
      case 'y' :
        date.setFullYear(date.getFullYear()+num);break;
      case 'M' :
        date.setMonth(date.getMonth()+num);break;
      case 'd' :
        date.setDate(date.getDate()+num);break;
      case 'h' :
        date.setHours(date.getHours()+num);break;
      case 'm' :
        date.setMinutes(date.getMinutes()+num);break;
      case 's' :
        date.setSeconds(date.getSeconds()+num);break;
      default  : throw new Error("类型错误");
    }
    return date;
  },

  /**
   * 两日期相减 date1 - date2,date1应大于date2
   * @param date1
   * @param date2
   * @param [type] 可选 为true时返回天数 n
   * @returns {year:n ,month:n, day:n}
   */
  dateDiff(date1,date2,type){
    if(date1<date2){
      throw new Error("参数错误");
    }
    if(type){
      return (date1.getTime() - date2.getTime())/(24 * 60 * 60 * 1000);
    }else{
      var year,month,day;
      year = date1.getFullYear() - date2.getFullYear();
      month = date1.getMonth() - date2.getMonth();
      day = date1.getDate() - date2.getDate();
      if(month<0){
        year = year -1;
        month = month + 12;
      }
      if(day<0){
        month = month - 1;
        date2.setFullYear(date2.getFullYear()+year);
        date2.setMonth(date2.getMonth()+month);
        day = parseInt((date1.getTime() - date2.getTime())/(24 * 60 * 60 * 1000));
      }
    }
    return {year:year,month:month,day:day};

  }
}


