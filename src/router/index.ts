import { MainTemplateRouteView, NotFound, WrapRouteView } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'
import { PrivateRoutes } from './private'
import { HTMLListRoutes, UIKitRoutes } from './uikit'
import { authRoutes, systemRoutes } from './general'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '',
      path: '/',
      component: MainTemplateRouteView,
      children: PrivateRoutes
    },
    {
      name: 'system',
      path: '/system',
      component: WrapRouteView,
      children: systemRoutes
    },
    {
      name: 'auth',
      path: '/auth',
      component: WrapRouteView,
      children: authRoutes
    },
    {
      name: 'Preview UI_KIT & pages',
      path: '/html-list',
      component: WrapRouteView,
      children: HTMLListRoutes
    },
    {
      name: 'Preview UI_KIT',
      path: '/ui-kit',
      component: WrapRouteView,
      children: UIKitRoutes
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
