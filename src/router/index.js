import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  {
    path: '',
    component: Layout,
    redirect: false,
    name: 'home',
    // hidden: true,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title: '首页', icon: 'table'}
      }]
  }, {
    path: '/knowlage',
    component: Layout,
    children: [
      {
        path: 'graph',
        name: 'graph',
        component: () => import('@/views/graph/index'),
        meta: {title: '图谱', icon: 'example'}
      }
    ]
  }, {
    path: '/edit',
    component: Layout,
    redirect: '/edit/entity',
    name: 'edit',
    meta: {title: '编辑', icon: 'form'},
    children: [
      {
        path: 'entity',
        name: 'entity',
        component: () => import('@/views/edit/entity/index'),
        meta: {title: '实体', icon: 'form'},
        normal: true,
        children: [
          {
            path: '',
            name: 'entity.home',
            hidden: true,
            component: () => import('@/views/edit/entity/home')
          },
          {
            path: ':id',
            name: 'entity.item',
            hidden: true,
            component: () => import('@/views/edit/entity/item')
          }
        ]
      }, {
        path: 'model',
        name: 'model',
        component: () => import('@/views/edit/model/index'),
        meta: {title: '模型', icon: 'form'}
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

