/**
 * @author king
 * @date 2017/6/8
 * @module 数据采集
 */
import api from '../api'

export default {

  getAllModules(cb) {
    return api.post(api.url.tmodule.getAllModules)
      .then(data => {
        cb(data);
      });
  },

  insertModule(params,cb) {
    return api.post(api.url.tmodule.insertModule, params)
      .then(data => {
        cb(data);
      });
  },

  deleteModuleById(params,cb) {
    return api.post(api.url.tmodule.deleteModuleById, params)
      .then(data => {
        cb(data);
      });
  },

  updateModule(params,cb) {
    return api.post(api.url.tmodule.updateModule, params)
      .then(data => {
        cb(data);
      });
  },

}
