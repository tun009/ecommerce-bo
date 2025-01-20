import {IconDelivery} from "@/components/icons"
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views'
import { DeliveryTicketProductListOrderStatusPage, DeliveryTicketProductListOrderStatusProductPage } from "@/views/delivery"

const data: RouteRecordRawExtends = {
  name: '주문/배송 관리',
  image: IconDelivery,
  path: '/delivery',
  id: 'delivery',
  component: WrapRouteView,
  children: [
    {
      name: '배송상품 주문관리',
      path: 'product-order-management',
      id: 'product-order-management',
      component: WrapRouteView,
      children: [
        {
          name: '전체주문현황',
          path: 'list-order-status',
          id: 'list-order-status',
          component: WrapRouteView
        },
        {
          name: '상품별주문현황',
          path: 'order-status-product',
          id: 'order-status-product',
          component: WrapRouteView
        },
        {
          name: '주문상세내역',
          path: 'order-detail',
          id: 'order-detail',
          component: WrapRouteView
        },
        {
          name: '상품준비중목록',
          path: 'list-preparation-product',
          id: 'list-preparation-product',
          component: WrapRouteView
        },
        {
          name: '배송중목록',
          path: 'list-delivery',
          id: 'list-delivery',
          component: WrapRouteView
        },
        {
          name: '배송완료목록',
          path: 'list-completion-delivery',
          id: 'list-completion-delivery',
          component: WrapRouteView
        },
        {
          name: '구매확정목록',
          path: 'purchase-confirm-list',
          id: 'purchase-confirm-list',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '티켓상품 주문관리',
      path: 'ticket-product-order-management',
      id: 'ticket-product-order-management',
      component: WrapRouteView,
      children: [
        {
          name: '전체주문현황',
          path: 'list-order-status',
          id: 'list-order-status',
          component: DeliveryTicketProductListOrderStatusPage,
          nameComponent: 'DeliveryTicketProductListOrderStatusPage',
          meta: { title: 'List Order Status' }
        },
        {
          name: '상품별주문현황',
          path: 'order-status-product',
          id: 'order-status-product',
          component: DeliveryTicketProductListOrderStatusProductPage,
          nameComponent: 'DeliveryTicketProductListOrderStatusProductPage',
          meta: { title: 'Order Status Product' }
        },
        {
          name: '주문상세내역',
          path: 'order-detail',
          id: 'order-detail',
          component: WrapRouteView
        },
        {
          name: '티켓발급목록',
          path: 'ticket-list',
          id: 'ticket-list',
          component: WrapRouteView
        },
        {
          name: '사용완료목록',
          path: 'usage-list',
          id: 'usage-list',
          component: WrapRouteView
        },
        {
          name: '구매확정목록',
          path: 'purchase-confirm-list',
          id: 'purchase-confirm-list',
          component: WrapRouteView
        }
      ]
    }
  ]
}
export default data
