import {IconStatistics} from "@/components/icons"
import { RouteRecordRawExtends } from "@/models"
import { WrapRouteView } from '@/views'

const data:RouteRecordRawExtends =   {
  name: '통계 관리',
  image: IconStatistics,
  path: '/statistics',
  id: 'statistics',
  component: WrapRouteView,
  children: [
    {
      name: '회원 통계',
      path: 'member',
      id: 'member',
      component: WrapRouteView,
      children: [
        {
          name: '가입 통계',
          path: 'subscription',
          id: 'subscription',
          component: WrapRouteView
        },
        {
          name: '로그인 통계',
          path: 'login',
          id: 'login',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '매출 통계',
      path: 'sales',
      id: 'sales',
      component: WrapRouteView,
      children: [
        {
          name: '전체 매출 통계',
          path: 'full-sales',
          id: 'full-sales',
          component: WrapRouteView
        },
        {
          name: '상품유형별 매출 통계',
          path: 'sales-product-type',
          id: 'sales-product-type',
          component: WrapRouteView
        },
        {
          name: '카테고리별 매출 통계',
          path: 'sales-category',
          id: 'sales-category',
          component: WrapRouteView
        },
        {
          name: '상품별 매출 통계',
          path: 'sales-product',
          id: 'sales-product',
          component: WrapRouteView
        },
        {
          name: '판매사별 매출 통계',
          path: 'sales-seller',
          id: 'sales-seller',
          component: WrapRouteView
        },
        {
          name: '고객사별 매출 통계',
          path: 'sales-customer',
          id: 'sales-customer',
          component: WrapRouteView
        },
      ]
    },
    {
      name: '클레임 통계',
      path: 'claim',
      id: 'claim',
      component: WrapRouteView,
      children: [
        {
          name: '주문취소 통계',
          path: 'order-cancellation',
          id: 'order-cancellation',
          component: WrapRouteView
        },
        {
          name: '반품 통계',
          path: 'order-cancellation',
          id: 'order-cancellation',
          component: WrapRouteView
        },
        {
          name: '교환 통계',
          path: 'return',
          id: 'return',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '프로모션 통계',
      path: 'promotion',
      id: 'promotion',
      component: WrapRouteView,
      children: [
        {
          name: '쿠폰 사용 통계',
          path: 'coupon-usage',
          id: 'coupon-usage',
          component: WrapRouteView
        },
        {
          name: '복지포인트 사용 통계',
          path: 'welfare-point-usage',
          id: 'welfare-point-usage',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '콘텐츠 통계',
      path: 'content',
      id: 'content',
      component: WrapRouteView,
      children: [
        {
          name: '상품Q&A 통계',
          path: 'product-qa',
          id: 'product-qa',
          component: WrapRouteView
        },
        {
          name: '상품평 통계',
          path: 'product-review',
          id: 'product-review',
          component: WrapRouteView
        },
        {
          name: '1:1문의 통계',
          path: 'inquiry',
          id: 'inquiry',
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data