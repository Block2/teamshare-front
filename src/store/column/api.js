/**
 * @author king
 * @date 2017/6/8
 * @module 数据采集
 */
import api from '../api'

export default {

  getColumnById(params,cb) {
    return api.post(api.url.column.getColumnById)
      .then(data => {
        cb(data);
      });
  },

  getColumnsByTmid(params,cb) {
    return api.post(api.url.column.getColumnsByTmid)
      .then(data => {
        cb(data);
      });
  },

  updateColumn(params,cb) {
    return api.post(api.url.column.updateColumn)
      .then(data => {
        cb(data);
      });
  },

  deleteColumnById(params,cb) {
    return api.post(api.url.column.deleteColumnById)
      .then(data => {
        cb(data);
      });
  },

  insertColumn(params,cb) {
    return api.post(api.url.column.insertColumn)
      .then(data => {
        cb(data);
      });
  },

}
