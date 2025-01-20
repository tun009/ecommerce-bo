import {IconSettled} from "@/components/icons"
import { RouteRecordRawExtends } from "@/models"
import { WrapRouteView } from '@/views'


const data:RouteRecordRawExtends=    {
  name: '정산 관리',
  image: IconSettled,
  component: WrapRouteView,
  path: '/settlement',
  id: 'settlement',
  children: [
    {
      name: '플랫폼 매출정산관리',
      path: 'platform-sales',
      id: 'platform-sales',
      component: WrapRouteView,
      children: []
      
    },
    {
      name: '업체별 정산 관리',
      component: WrapRouteView,
      path: 'company',
      id: 'company',
      children: [
        {
          name: '판매사정산조회',
          path: 'sales-inquiry',
          id: 'sales-inquiry',
          component: WrapRouteView
        },
        {
          name: '세금계산서조회',
          path: 'tax-invoice-inquiry',
          id: 'tax-invoice-inquiry',
          component: WrapRouteView
        } ,
        {
          name: '부가세신고내역',
          path: 'vat-reporting-details',
          id: 'vat-reporting-details',
          component: WrapRouteView
        },
      ]
    },
    {
      name: '고객사 정산관리',
      path: 'customer',
      id: 'customer',
      component: WrapRouteView,
      children: []
    },
    {
      name: 'PG정산조회',
      component: WrapRouteView,
      path: 'pg',
      id: 'pg',
      children: [
        {
          name: 'PG정산조회',
          path: 'inquiry',
          id: 'inquiry',
          component: WrapRouteView
        },
        {
          name: 'PG일대사',
          path: 'line',
          id: 'line',
          component: WrapRouteView
        },
      ]
    }
  ]
}

export default data