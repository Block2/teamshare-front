import api from '../api'

export default {

  getPathInfo(params,cb) {
    return api.post(api.url.common.getPathInfo, params)
      .then(data => {
        cb(data);

     });
  },

}
