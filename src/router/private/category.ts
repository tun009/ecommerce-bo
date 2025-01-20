import {IconCategory} from "@/components/icons"
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from "@/views"

const data: RouteRecordRawExtends = {
  name: '카테고리 관리',
  image: IconCategory,
  component: WrapRouteView,
  path: '/category',
  id: 'category',
  children: [
    {
      name: '표준카테고리 관리',
      path: 'standard-category',
      id: 'category-standard-category',
      component: WrapRouteView,
      children: []
    },
    {
      name: '전시카테고리 관리',
      path: 'exhibition-category',
      id: 'category-exhibition-category',
      component: WrapRouteView,
      children: []
    }
  ]
}

export default data
