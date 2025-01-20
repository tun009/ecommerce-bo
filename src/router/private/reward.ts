import {IconReward} from "@/components/icons"
import { RouteRecordRawExtends } from "@/models"
import { WrapRouteView } from '@/views'

const data:RouteRecordRawExtends =   {
  name: '프로모션 관리',
  image: IconReward,
  path: '/promotion',
  id: 'promotion',
  component: WrapRouteView,
  children: [
    {
      name: '쿠폰 관리',
      path: 'coupon',
      id: 'coupon',
      component: WrapRouteView,
      children: [
        {
          name: '일반 쿠폰 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: '자동발급 쿠폰 목록',
          path: 'list-automatically-issued',
          id: 'list-automatically-issued',
          component: WrapRouteView
        },
        {
          name: '쿠폰 발행/사용내역',
          path: 'coupon-issuance-use history',
          id: 'coupon-issuance-use history',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '복지포인트 관리',
      path: 'welfare-point',
      id: 'welfare-point',
      component: WrapRouteView,
      children: [
        {
          name: '복지포인트 배정관리',
          path: 'allocation',
          id: 'allocation',
          component: WrapRouteView
        },
        {
          name: '복지포인트 조정관리',
          path: 'adjustment',
          id: 'adjustment',
          component: WrapRouteView
        },
        {
          name: '복지포인트 차감관리',
          path: 'deduction',
          id: 'deduction',
          component: WrapRouteView
        },
        {
          name: '복지포인트 이용현황',
          path: 'usage-status',
          id: 'usage-status',
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data