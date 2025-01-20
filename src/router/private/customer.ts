import {IconCustomer} from "@/components/icons"
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views/router'
import {CompanyCustomerRegistrationPage} from '@/views/company'

const data: RouteRecordRawExtends = {
  name: '고객사 관리',
  image: IconCustomer,
  path: '/customer',
  id: 'customer',
  component: WrapRouteView,
  children: [
    {
      name: '고객사 관리',
      component: WrapRouteView,
      path: 'information',
      id: 'information',
      children: [
        {
          name: '고객사 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: '고객사 등록',
          path: 'registration',
          id: 'registration',
          component: CompanyCustomerRegistrationPage,
          // nameComponent: 'CompanyCustomerRegistrationPage',
          meta: { title: 'Company customer registration Page' }
        }
      ]
    },
    {
      name: 'CO 관리자 관리',
      component: WrapRouteView,
      path: 'co-manager',
      id: 'co-manager',
      children: [
        {
          name: 'CO 관리자 목록',
          path: 'list',
          id: 'list',
          component: WrapRouteView
        },
        {
          name: 'CO 관리자 등록',
          path: 'registration',
          id: 'registration',
          component: WrapRouteView
        },
        {
          name: 'CO 관리자 권한 그룹 관리',
          path: 'permission-group',
          id: 'permission-group',
          component: WrapRouteView
        }
      ]
    },
    {
      name: 'CO 관리자 모니터링',
      component: WrapRouteView,
      path: 'co-manager-monitoring',
      id: 'co-manager-monitoring',
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
        }
      ]
    }
  ]
}

export default data
