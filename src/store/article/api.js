/**
 * @author king
 * @date 2017/6/8
 * @module 数据采集
 */
import api from '../api'

export default {

  insertArticle(params,cb) {
    return api.post(api.url.article.insertArticle)
      .then(data => {
        cb(data);
      });
  },

  updateArticle(params,cb) {
    return api.post(api.url.article.updateArticle)
      .then(data => {
        cb(data);
      });
  },

  deleteArticle(params,cb) {
    return api.post(api.url.article.deleteArticle)
      .then(data => {
        cb(data);
      });
  },


  getArticleByMcid(params,cb) {
    return api.post(api.url.article.getArticleByMcid)
      .then(data => {
        cb(data);
      });
  },

  getArticleById(params,cb) {
    return api.post(api.url.article.getArticleById)
      .then(data => {
        cb(data);
      });
  },
}
