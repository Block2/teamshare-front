/**
 * @author king
 * @date 2017/6/8
 * @module 数据采集
 */
import api from '../api'

export default {

  getColumnById(params,cb) {
    return api.post(api.url.mcolumn.getColumnById, params)
      .then(data => {
        cb(data);
      });
  },

  getColumnsByTmid(params,cb) {
    return api.post(api.url.mcolumn.getColumnsByTmid, params)
      .then(data => {
        cb(data);
      });
  },

  updateColumn(params,cb) {
    return api.post(api.url.mcolumn.updateColumn, params)
      .then(data => {
        cb(data);
      });
  },

  deleteColumnById(params,cb) {
    return api.post(api.url.mcolumn.deleteColumnById, params)
      .then(data => {
        cb(data);
      });
  },

  insertColumn(params,cb) {
    return api.post(api.url.mcolumn.insertColumn, params)
      .then(data => {
        cb(data);
      });
  },

}
