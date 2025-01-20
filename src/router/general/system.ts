import { GeneralLoadingPage, GeneralLoadingSmallPage, GeneralSystemMaintenancePage, GeneralSystemErrorPage, GeneralNotFoundPage } from '@/views'

export const systemRoutes = [
  {
    name: 'system-error',
    path: 'system-error',
    component: GeneralSystemErrorPage,
    meta: { title: 'System error' }
  },
  {
    name: 'loading',
    path: 'loading',
    component: GeneralLoadingPage,
    meta: { title: 'Loading' }
  },
  {
    name: 'loading-small',
    path: 'loading-small',
    component: GeneralLoadingSmallPage,
    meta: { title: 'Loading Small' }
  },
  {
    name: 'system-maintenance',
    path: 'system-maintenance',
    component: GeneralSystemMaintenancePage,
    meta: {
      title: 'System Maintenance'
    }
  },
  {
    name: 'not-found',
    path: 'not-found',
    component: GeneralNotFoundPage,
    meta: { title: '404 Not Found' }
  }
]
