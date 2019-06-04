/**
 * @author king
 * @date 2017/6/8
 * @module 数据采集
 */
import api from '../api'

export default {

  getAllModules(params,cb) {
    return api.post(api.url.tmodule.getAllModules)
      .then(data => {
        cb(data);
      });
  },

  insertModule(params,cb) {
    return api.post(api.url.tmodule.insertModule)
      .then(data => {
        cb(data);
      });
  },

  deleteModuleById(params,cb) {
    return api.post(api.url.tmodule.deleteModuleById)
      .then(data => {
        cb(data);
      });
  },

  updateModule(params,cb) {
    return api.post(api.url.tmodule.updateModule)
      .then(data => {
        cb(data);
      });
  },

}
