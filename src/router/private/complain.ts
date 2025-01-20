import { IconComplain } from '@/components/icons'
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views'
import { ComplaintOrderCancelList, ComplaintTicketList } from '@/views/complaint'

import { ComplaintTicketProductListPage } from '@/views/complaint'
const data: RouteRecordRawExtends = {
  name: '클레임관리',
  image: IconComplain,
  component: WrapRouteView,
  path: '/claim',
  id: 'claim',
  children: [
    {
      name: '배송상품 클레임관리',
      component: WrapRouteView,
      path: 'delivery-product',
      id: 'claim-delivery-product',
      children: [
        {
          name: '배송상품 클레임 목록',
          path: 'delivery-product-list',
          id: 'delivery-product-list',
          component: WrapRouteView
        },
        {
          name: '주문 취소 관리',
          path: 'order-cancellation',
          id: 'order-cancellation',
          component: WrapRouteView
        },
        {
          name: '반품 관리',
          path: 'returns',
          id: 'returns',
          component: WrapRouteView
        },
        {
          name: '교환 관리',
          path: 'exchange',
          id: 'exchange',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '티켓상품 주문관리',
      component: WrapRouteView,
      path: 'ticket-product-order',
      id: 'ticket-product-order',
      children: [
        {
          name: '티켓상품 클레임 목록',
          path: 'ticket-product-list',
          id: 'ticket-product-list',
          component: WrapRouteView
        },
        {
          name: '주문 취소 관리',
          path: 'order-cancellation',
          id: 'order-cancellation',
          component: WrapRouteView
        },
        {
          name: '반품 관리',
          path: 'returns',
          id: 'returns',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '티켓상품 클레임 관리',
      component: WrapRouteView,
      path: 'ticket-product-complaint',
      id: 'ticket-product-claim',
      children: [
        {
          name: '티켓상품 클레임 목록',
          path: 'ticket-product-complaint-list',
          id: 'ticket-product-complaint-list',
          component: ComplaintTicketProductListPage,
          meta: { title: 'Ticket Product Complaint List' }
        },
        {
          name: '주문취소 관리',
          path: 'order-cancellation',
          id: 'order-cancellation',
          component: ComplaintOrderCancelList
        }
      ]
    }
  ]
}

export default data
