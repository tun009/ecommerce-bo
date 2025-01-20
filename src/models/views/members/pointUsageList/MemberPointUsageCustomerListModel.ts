import { DataTableContainerConfigModel } from '@/models'

export const memberPUCustomerListHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'number',
    class: 'wf_m-w-64 '
  },
  {
    header: '고객사코드',
    field: 'customerCompanyCode',
    class: 'wf_m-w-114 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-120 '
  },
  {
    header: '보유포인트',
    field: 'heldPoints',
    class: 'wf_m-w-128 '
  },
  {
    header: '총 사용포인트',
    field: 'totalUsagePoints',
    class: 'wf_m-w-111 '
  },
  {
    header: '총 차감 포인트',
    field: 'totalDeductionPoints',
    class: 'wf_m-w-111 '
  },
  {
    header: '총 누적 포인트',
    field: 'totalAccumulatedPoint',
    class: 'wf_m-w-128 '
  },
  {
    header: '재직',
    field: 'tenure',
    class: 'wf_m-w-111 '
  },
  {
    header: '퇴사',
    field: 'leave',
    class: 'wf_m-w-111 '
  },
  {
    header: '최근 업데이트 일시',
    field: 'lastUpdateDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '회원 등록일',
    field: 'memberRegistrationDate',
    class: 'wf_m-w-200 wf_w-200 '
  }
]

export interface MemberPUCustomerListDataTableModel {
  id: string
  number: string
  customerCompanyCode: string
  customer: string
  heldPoints: string
  totalUsagePoints: string
  totalDeductionPoints: string
  totalAccumulatedPoint: string
  tenure: string
  leave: string
  lastUpdateDate: string
  memberRegistrationDate: string
}

export const memberPUCustomerCompanyTotalHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '전체 고객사 수',
    field: 'totalCustomer',
    class: 'wf_m-w-250 '
  },
  {
    header: '재직',
    field: 'numberOfMemberTenure',
    class: 'wf_m-w-140 '
  },
  {
    header: '퇴사',
    field: 'numberOfMemberLeave',
    class: 'wf_m-w-140 '
  },
  {
    header: '보유 포인트',
    field: 'heldPoints',
    class: 'wf_m-w-168 '
  },
  {
    header: '사용 포인트',
    field: 'usedPoints',
    class: 'wf_m-w-168 '
  },
  {
    header: '잔여 포인트',
    field: 'remainingPoints',
    class: 'wf_m-w-168 '
  },
  {
    header: '차감 포인트',
    field: 'deductionPoints',
    class: 'wf_m-w-168 '
  },
  {
    header: '총 누적 포인트',
    field: 'totalAccumulatedPoint',
    class: 'wf_m-w-200 '
  }
]

export interface MemberPUCustomerCompanyTotalDataTableModel {
  id: string
  totalCustomer: string
  numberOfMemberTenure: string
  numberOfMemberLeave: string
  heldPoints: string
  usedPoints: string
  remainingPoints: string
  deductionPoints: string
  totalAccumulatedPoint: string
}

export interface MemberPointUsageCustomerListFormModel {
  dateSelect?: any
  memberPoint?: any
  fromDate: string
  toDate: string
  keyword?: string
  minimumPoint?: number
  maximumPoint?: number
  customer?: string
}

export const memberPointUsageCustomerListSelectDateOptions = [
  { label: '고객사 등록일', value: '1' },
  { label: '최근 업데이트 일시', value: '2' }
]

export const memberPointUsageCustomerTotalPointOptions = [
  { label: '총 보유 포인트', value: '1' },
  { label: '총 사용 포인트', value: '2' },
  { label: '총 잔여 포인트', value: '3' },
  { label: '총 차감 포인트', value: '4' }
]

export const memberPointUsageCustomerSearchOptions = [
  { label: '고객사', value: '1' },
  { label: '고객사 코드', value: '2' }
]
