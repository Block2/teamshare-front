import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/reset.css'
import '../assets/css/common.css'

import article from '@/components/pages/view/ArticleComp'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/',
          redirect: 'article'
        },
        {
          path: 'article/:aid',
          name: 'article',
          component: article
        },

      ]
    }
  ]
})
