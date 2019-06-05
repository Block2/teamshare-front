/**
 * @author king
 * @date 2017/6/8
 * @module 数据采集
 */
import api from '../api'

export default {

  insertArticle(params,cb) {
    return api.post(api.url.article.insertArticle, params)
      .then(data => {
        cb(data);
      });
  },

  updateArticle(params,cb) {
    return api.post(api.url.article.updateArticle, params)
      .then(data => {
        cb(data);
      });
  },

  deleteArticle(params,cb) {
    return api.post(api.url.article.deleteArticle, params)
      .then(data => {
        cb(data);
      });
  },


  getArticleByMcid(params,cb) {
    return api.post(api.url.article.getArticleByMcid, params)
      .then(data => {
        cb(data);
      });
  },

  getArticleById(params,cb) {
    return api.post(api.url.article.getArticleById, params)
      .then(data => {
        cb(data);
      });
  },
}
