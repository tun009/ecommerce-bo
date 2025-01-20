import { IconMember } from '@/components/icons'
import { RouteRecordRawExtends } from '@/models'
import {
  MemberAutomatedShippingListPage,
  MemberBulkRegistrationWrapper,
  MemberDetailWrapperPage,
  MemberListPage,
  MemberOutgoingNumberListPage,
  MemberPointDeductionRegistrationPage,
  MemberPointAdjustmentRegistrationList,
  MemberPointUsageCustomerListPage,
  MemberPointUsageListPage,
  MemberPointUsageRegistrationBulkPage,
  MemberRegisterIndividualPage,
  MemberTemplateManagementPage,
  MemberWelfarePointAllocationListPage,
  MemberWelfarePointDeductionListPage,
} from '@/views/members'
import { WrapRouteView } from '@/views/router'

const data: RouteRecordRawExtends = {
  name: '회원 관리',
  image: IconMember,
  component: WrapRouteView,
  path: '/member',
  id: 'member',
  children: [
    {
      name: '회원 정보 관리',
      path: 'information',
      id: 'information',
      component: WrapRouteView,
      children: [
        {
          name: '회원 목록',
          path: 'list',
          id: 'list',
          component: MemberListPage,
          nameComponent: 'MemberListPage',
          meta: { title: 'Member List' }
        },
        {
          name: '회원상세',
          path: 'detail',
          id: 'detail',
          component: MemberDetailWrapperPage,
          nameComponent: 'MemberList',
          meta: { title: 'Member List' }
        },
        {
          name: '회원 일괄등록',
          path: 'bulk-registration',
          id: 'bulk-registration',
          component: MemberBulkRegistrationWrapper,
          meta: { title: 'Member Bulk Registration' }
        },
        {
          name: '회원 개별 등록',
          path: 'individual-member-registration',
          id: 'individual-member-registration',
          component: MemberRegisterIndividualPage,
          nameComponent: 'MemberRegisterIndividualPage',
          meta: { title: 'Member Register Individual Page' }
        }
      ]
    },
    {
      name: '복지포인트 배정관리',
      path: 'welfare-point-allocation-management',
      id: 'welfare-point-allocation-management',
      component: WrapRouteView,
      children: [
        {
          name: '복지포인트 배정목록',
          path: 'profit-point-allocation',
          id: 'profit-point-allocation',
          component: MemberWelfarePointAllocationListPage,
          nameComponent: 'MemberWelfarePointAllocationListPage',
          meta: { title: 'Member Profit Point Allocation Page' }
        },
        {
          name: '복지포인트 조정등록',
          path: 'point-adjustment-registration',
          id: 'point-adjustment-registration',
          component: MemberPointAdjustmentRegistrationList,
          nameComponent: 'MemberPointAdjustmentRegistrationList',
          meta: { title: 'Member Profit Point Allocation Page' }
        }
      ]
    },
    {
      name: '복지포인트 차감관리',
      path: 'welfare-point-deduction-management',
      id: 'welfare-point-deduction-management',
      component: WrapRouteView,
      children: [
        {
          name: '복지포인트 이용현황',
          path: 'profit-point-deduction',
          id: 'profit-point-deduction',
          component: MemberWelfarePointDeductionListPage,
          nameComponent: 'MemberWelfarePointDeductionListPage',
          meta: { title: 'Member Welfare Point Deduction Page' }
        },
        {
          name: '복지포인트 차감등록',
          path: 'registration',
          id: 'deduction-registration',
          component: MemberPointDeductionRegistrationPage,
          nameComponent: 'MemberPointDeductionRegistrationPage',
          meta: { title: 'Member Welfare Point Deduction Registration' }
        }
      ]
    },
    {
      name: '복지포인트 이용현황',
      path: 'welfare-point-usage-status',
      id: 'welfare-point-usage-status',
      component: WrapRouteView,
      children: [
        {
          name: '복지포인트 회원 사용목록',
          path: 'list',
          id: 'list',
          component: MemberPointUsageListPage,
          nameComponent: 'MemberPointUsageListPage',
          meta: { title: 'Member Point Usage List Page' }
        },
        {
          name: '복지포인트 고객사 사용목록',
          path: 'customer-list',
          id: 'customer-list',
          component: MemberPointUsageCustomerListPage,
          nameComponent: 'MemberPointUsageCustomerListPage',
          meta: { title: 'Member Point Usage Customer List Page' }
        },
        {
            name: '복지포인트 배정등록',
            path: 'registration-bulk',
            id: 'registration-bulk',
            component: MemberPointUsageRegistrationBulkPage,
            nameComponent: 'MemberPointUsageRegistrationBulkPage',
            meta: {title: 'Member Point Usage Registration Bulk Page'}
        }
      ]
    },
    {
      name: 'DM 발송 관리',
      path: 'dm-sending',
      id: 'dm-sending',
      component: WrapRouteView,
      children: [
        {
          name: '수동 발송 관리',
          path: 'manual-shipping',
          id: 'manual-shipping',
          component: WrapRouteView
        },
        {
          name: '자동 발송 관리',
          path: 'automatic-shipping',
          id: 'automatic-shipping',
          component: MemberAutomatedShippingListPage,
          nameComponent: 'MemberAutomatedShippingListPage',
          meta: { title: 'Member Automated Shipping List Page' }
        },
        {
          name: '템플릿 관리',
          path: 'template',
          id: 'template',
          component: MemberTemplateManagementPage,
          meta: { title: 'Member Template Management Page' }
        },
        {
          name: '알림톡 발신채널 관리',
          path: 'notification-talk-sending-channel',
          id: 'notification-talk-sending-channel',
          component: WrapRouteView,
          meta: { title: 'Notification Talk Sending Channel' }
        },
        {
          name: '발신번호 관리',
          path: 'outgoing-number',
          id: 'outgoing-number',
          component: MemberOutgoingNumberListPage,
          nameComponent: 'MemberOutgoingNumberListPage',
          meta: { title: 'Member Outgoing Number List Page' }
        }
      ]
    }
  ]
}

export default data
