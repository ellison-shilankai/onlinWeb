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
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    // redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '谷粒学院后台首页', icon: 'dashboard' }
    }]
  },

  // 讲师管理
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'users' },
    children: [
      {
        path: 'list',
        name: '讲师列表',
        component: () => import('@/views/teacher/list'),
        meta: { title: '讲师列表', icon: 'list' }
      },
      {
        path: 'add',
        name: '讲师新增',
        component: () => import('@/views/teacher/form'),
        meta: { title: '讲师新增', icon: 'addUser' }
      },
      {
        path: 'edit/:id', // :用来传递参数
        name: '讲师修改',
        component: () => import('@/views/teacher/form'),
        meta: { title: '讲师修改', icon: 'tree' },
        hidden: true
      }
    ]
  },

  // 课程分类管理
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'classify_select' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/subject/list'),
        meta: { title: '课程分类列表', icon: 'list' }
      },
      {
        path: 'import',
        name: '课程分类导入',
        component: () => import('@/views/subject/import'),
        meta: { title: '课程分类导入', icon: 'import' }
      }
    ]
  },

  // 课程管理
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'manage' },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'list' }
      },
      {
        path: 'info',
        name: '发布课程',
        component: () => import('@/views/course/info'),
        meta: { title: '发布课程', icon: 'publish' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }

    ]
  },
  // 统计分析
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/chart',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'chart' },
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: () => import('@/views/statistics/create'),
        meta: { title: '生成数据', icon: 'data' }
      },
      {
        path: 'chart',
        name: '图表显示',
        component: () => import('@/views/statistics/chart'),
        meta: { title: '图表显示', icon: 'report' }
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
