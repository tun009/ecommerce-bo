import {IconOperational} from "@/components/icons"
import { RouteRecordRawExtends } from "@/models"
import { WrapRouteView } from '@/views'

const data:RouteRecordRawExtends =   {
  name: '운영 관리',
  image: IconOperational,
  component: WrapRouteView,
  path: '/operation',
  id: '/operation',
  children: [
    {
      name: '사이트 관리',
      component: WrapRouteView,
      path: 'site',
      id: 'site',
      children: [
        {
          name: 'Footer 정보 관리',
          path: 'footer-information',
          id: 'footer-information',
          component:  WrapRouteView
        },
        {
          name: '배치관리',
          path: 'batch',
          id: 'batch',
          component:  WrapRouteView
        },
        {
          name: '관리자 접근 IP 관리',
          path: 'administrator-access-ip',
          id: 'administrator-access-ip',
          component:  WrapRouteView
        }
      ]
    },
    {
      name: 'BO 관리자 관리',
      path: 'bo-administrator',
      id: 'bo-administrator',
      component: WrapRouteView,
      children: [
        {
          name: '관리자 목록',
          path: 'administrator-list',
          id: 'administrator-list',
          component:  WrapRouteView
        },
        {
          name: '관리자 등록',
          path: 'administrator-registration',
          id: 'administrator-registration',
          component:  WrapRouteView
        },
        {
          name: '권한 그룹 목록',
          path: 'permission-group-list',
          id: 'permission-group-list',
          component:  WrapRouteView
        }
      ]
    },
    {
      name: '모니터링',
      path: 'monitoring',
      id: 'monitoring',
      component: WrapRouteView,
      children: [
        {
          name: '관리자 접속 이력 조회',
          path: 'administrator-access-history-inquiry',
          id: 'administrator-access-history-inquiry',
          component:  WrapRouteView
        },
        {
          name: '개인정보 열람 이력 조회',
          path: 'check-personal-information-viewing-history',
          id: 'check-personal-information-viewing-history',
          component:  WrapRouteView
        },
      ]
    },
    {
      name: '혜택 관리',
      path: 'benefits',
      id: 'benefits',
      component: WrapRouteView,
      children: [
        {
          name: '신용카드 무이자정보 목록',
          path: 'credit-card-interest-free-information-list',
          id: 'credit-card-interest-free-information-list',
          component:  WrapRouteView
        },
        {
          name: '결제혜택정보 목록',
          path: 'payment-benefit-information-list',
          id: 'payment-benefit-information-list',
          component:  WrapRouteView
        }
      ]
    },
  ]
}

export default data