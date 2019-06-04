import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/reset.css'
import '../assets/css/common.css'

import navCss from '@/components/pages/nav/navCss'
import navVue from '@/components/pages/nav/navVue'
import standCss from '@/components/pages/nav/standCss'
import standVue from '@/components/pages/nav/standVue'
import oralJava from '@/components/pages/nav/oralJava'
import oralSpring from '@/components/pages/nav/oralSpring'
import jieKou from '@/components/pages/nav/jieKou'
import wenDang from '@/components/pages/nav/wenDang'

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
          redirect: 'navCss'
        },
        {
          path: 'navVue',
          name: 'navVue',
          component: navVue
        },
        {
          path: 'navCss',
          name: 'navCss',
          component: navCss
        },
        {
          path: 'standCss',
          name: 'standCss',
          component: standCss
        },
        {
          path: 'standVue',
          name: 'standVue',
          component: standVue
        },
        {
          path: 'oralJava',
          name: 'oralJava',
          component: oralJava
        },
        {
          path: 'oralSpring',
          name: 'oralSpring',
          component: oralSpring
        },
        {
          path: 'jieKou',
          name: 'jieKou',
          component: jieKou
        },
        {
          path: 'wenDang',
          name: 'wenDang',
          component: wenDang
        }
      ]
    }
  ]
})
