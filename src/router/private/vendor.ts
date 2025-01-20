import {IconVendor} from "@/components/icons"
import { RouteRecordRawExtends } from "@/models"
import { WrapRouteView } from '@/views'


const data:RouteRecordRawExtends =  { 
  name: '판매사 관리',
  image: IconVendor,
  path: '/vendor',
  id: 'vendor',
  component: WrapRouteView,
  children: [
    {
      name: '판매사 관리',
      path: 'manager',
      id: 'manager',
      component: WrapRouteView,
      children: [
        {
          name: '판매사 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: '판매사 등록',
          path: 'register-seller',
          id: 'register-seller',
          component: WrapRouteView
        },
      ]
    },
    {
      name: 'PO 관리자 관리',
      path: 'po-manager',
      id: 'po-manager',
      component: WrapRouteView,
      children: [
        {
          name: 'PO 관리자 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: 'PO 관리자 등록',
          path: 'po-registration',
          id: 'po-registration',
          component: WrapRouteView
        },
        {
          name: 'PO 관리자 권한 그룹 관리',
          path: 'permission-group-management',
          id: 'permission-group-management',
          component: WrapRouteView
        },
      ]
    },
    {
      name: 'PO 관리자 모니터링',
      path: 'po-manager-monitoring',
      id: 'po-manager-monitoring',
      component: WrapRouteView,
      children: [
        {
          name: '관리자 접속 이력 조회',
          path: 'check-administrator-access-history',
          id: 'check-administrator-access-history',
          component: WrapRouteView
        },
        {
          name: '개인정보 열람 이력 조회',
          path: 'check-personal-information-viewing-history',
          id: 'check-personal-information-viewing-history',
          component: WrapRouteView
        },
      ]
    },
    {
      name: '제휴몰인몰 관리',
      path: 'affiliate-mall-in-mall',
      id: 'affiliate-mall-in-mall',
      component: WrapRouteView,
      children: [
        {
          name: '제휴몰인몰 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: '제휴몰인몰 등록',
          path: 'registration',
          id: 'registration',
          component: WrapRouteView
        },
      ]
    },
  ]
}

export default data