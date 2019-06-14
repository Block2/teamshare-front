import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/reset.css'
import '../assets/css/common.css'

import article from '@/components/pages/view/ArticleComp'
import defaultArticle from '@/components/pages/view/DefaultArticle'
import articleEdit from '@/components/pages/view/ArticleEdit'
import columnAdd from '@/components/pages/view/ColumnAdd'
import login from '@/components/pages/view/Login'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/teamshare',
      name: 'index',
      component: index,
      children: [
        {
          path: 'default/:tmid/:mcid',
          name: 'defaultArticle',
          component: defaultArticle
        },
        {
          path: 'article/:aid',
          name: 'article',
          component: article
        },
        {
          path:'article/edit/:mcid',
          name: 'articleEdit',
          component: articleEdit
        },
        {
          path:'column/add/:tmid',
          name:'columnAdd',
          component:columnAdd
        },
        {
          path:'login',
          name:'login',
          component:login
        }
      ]
    }
  ]
})
