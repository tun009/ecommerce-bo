import { IconProduct } from '@/components/icons'
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views'
import {
  ProductDeliveryProductWrapperPage,
  ProductTicketProductWrapperPage,
  ProductDeliveryProductListPage,
  ProductTicketProductListPage,
  ProductDiscountPromotionListPage,
  ProductApprovalDeliveryWrapperPage,
  ProductBrandRegistrationPage,
  ProductApprovalListPage,
  ProductTradeMarkProductListPage,
  ProductDiscountPromotionRegistrationPage,
  ProductTicketProductApprovalListPage,
  ProductApprovalTicketWrapperPage
} from '@/views/products'

const data: RouteRecordRawExtends = {
  name: '상품 관리',
  image: IconProduct,
  path: '/product',
  id: 'product',
  component: WrapRouteView,
  children: [
    {
      name: '배송상품 등록 관리',
      path: 'delivery-product',
      id: 'delivery-product',
      component: WrapRouteView,
      children: [
        {
          name: '배송 상품 목록',
          path: 'list',
          id: 'list',
          component: ProductDeliveryProductListPage,
          nameComponent: 'ProductDeliveryProductListPage',
          meta: { title: 'Delivery Product list' }
        },
        {
          name: '배송 상품 등록 / 수정',
          path: 'registration',
          id: 'registration',
          nameComponent: 'ProductDeliveryProductWrapperPage',
          isShowTips: true,
          component: ProductDeliveryProductWrapperPage,
          meta: { title: 'Delivery Product' }
        },
        {
          name: '배송 상품 등록 / 수정',
          path: 'edit/:id',
          id: 'delivery-product-edit',
          isShowTips: true,
          isHideMenu: true,
          nameComponent: 'ProductDeliveryProductWrapperPage',
          component: ProductDeliveryProductWrapperPage,
          meta: { title: 'Delivery Product' }
        }
      ]
    },
    {
      name: '티켓 상품 등록 관리',
      path: 'ticket-product',
      id: 'ticket-product',
      component: WrapRouteView,
      children: [
        {
          name: '티켓 상품 목록',
          path: 'list',
          id: 'list',
          component: ProductTicketProductListPage,
          nameComponent: 'ProductTicketProductListPage',
          meta: { title: 'Ticket Product' }
        },
        {
          name: '티켓 상품 등록 / 수정',
          path: 'registration',
          id: 'registration',
          isShowTips: true,
          nameComponent: 'ProductTicketProductWrapperPage',
          component: ProductTicketProductWrapperPage,
          meta: { title: 'Ticket Product' }
        },
        {
          name: '티켓 상품 등록',
          path: 'edit/:id',
          isHideMenu: true,
          isShowTips: true,
          id: 'ticket-product-edit',
          nameComponent: 'ProductTicketProductWrapperPage',
          component: ProductTicketProductWrapperPage,
          meta: { title: 'Ticket Product' }
        },
        {
          name: '티켓 상품 대량 등록',
          path: 'bulk-registration',
          id: 'bulk-registration',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '상품승인 관리',
      path: 'approval',
      id: 'approval',
      component: WrapRouteView,
      children: [
        {
          name: '배송 상품 승인 목록',
          path: 'delivery-product',
          id: 'delivery-product',
          component: ProductApprovalListPage,
          nameComponent: 'ProductApprovalListPage',
          meta: { title: 'Approval Product List' }
        },
        {
          name: '배송 상품 승인 상세',
          path: 'delivery-product/edit/:id',
          id: 'delivery-product-detail',
          isShowTips: true,
          component: ProductApprovalDeliveryWrapperPage,
          nameComponent: 'ProductApprovalDeliveryWrapperPage',
          isHideMenu: true,
          meta: { title: 'Approval Delivery Product Base' }
        },
        {
          name: '티켓 상품 승인 목록',
          path: 'ticket-product',
          id: 'ticket-product',
          component: ProductTicketProductApprovalListPage
        },
        {
          name: '티켓 상품 승인 상세',
          path: 'ticket-product/edit/:id',
          isHideMenu: true,
          isShowTips: true,
          id: 'ticket-product-detail',
          component: ProductApprovalTicketWrapperPage,
          nameComponent: 'ProductApprovalTicketWrapperPage',
          meta: { title: 'Approval Ticket Product Base' }
        }
      ]
    },
    {
      name: '할인 프로모션 관리',
      path: 'promotion',
      id: 'discount-promotion',
      component: WrapRouteView,
      children: [
        {
          name: '할인 프로모션 목록',
          path: 'list',
          id: 'discount-promotion-list',
          component: ProductDiscountPromotionListPage,
          nameComponent: 'ProductDiscountPromotionListPage',
          meta: { title: 'Promotion Product List' }
        },
        {
          name: '할인 프로모션 등록',
          path: 'registration',
          id: 'discount-promotion-registration',
          component: ProductDiscountPromotionRegistrationPage
        },
        {
          name: '할인 프로모션 등록',
          path: 'detail/:id',
          isHideMenu: true,
          id: 'discount-promotion-registration',
          component: ProductDiscountPromotionRegistrationPage
        }
      ]
    },
    {
      name: '브랜드 관리',
      path: 'brand',
      id: 'brand',
      component: WrapRouteView,
      children: [
        {
          name: '브랜드 관리',
          path: 'list',
          id: 'brand-list',
          component: ProductTradeMarkProductListPage,
          nameComponent: 'ProductTradeMarkProductListPage',
          meta: { title: 'TradeMark Product List' }
        },
        {
          name: '브랜드 등록/수정',
          path: 'registration',
          id: 'brand-registration',
          component: ProductBrandRegistrationPage,
          meta: { title: 'Trademark Registration' }
        },
        {
          name: '브랜드 등록/수정',
          path: 'edit/:id',
          id: 'brand-edit',
          isHideMenu: true,
          component: ProductBrandRegistrationPage,
          meta: { title: 'Trademark View' }
        }
      ]
    }
  ]
}

export default data
