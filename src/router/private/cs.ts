import {IconCS} from "@/components/icons"
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: 'CS 관리',
  image: IconCS,
  component: WrapRouteView,
  path: '/cs',
  id: 'cs',
  children: [
    {
      name: '상품Q&A 관리',
      path: 'product-qa',
      id: 'cs-product-qa',
      component: WrapRouteView,
      children: []
    },
    {
      name: '상품평 관리',
      path: 'product-preview',
      id: 'cs-product-preview',
      component: WrapRouteView,
      children: []
    },
    {
      name: 'CS 접수 관리',
      component: WrapRouteView,
      path: 'reception',
      id: 'cs-reception',
      children: [
        {
          name: 'CS 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: 'CS 등록',
          path: 'register',
          id: 'register',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '1:1문의 관리',
      path: 'inquiry',
      id: 'inquiry',
      component: WrapRouteView,
      children: []
    }
  ]
}

export default data
