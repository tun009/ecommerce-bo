import { ButtonDateModel, DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'

export const memberPointUsageHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'number',
    class: 'wf_m-w-64 '
  },
  {
    header: '고객사코드',
    field: 'companyCode',
    class: 'wf_m-w-100 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-120 '
  },
  {
    header: '회원코드',
    field: 'employeeCode',
    class: 'wf_m-w-80 '
  },
  {
    header: '회원명',
    field: 'nameEmployee',
    class: 'wf_m-w-100 '
  },
  {
    header: '직급',
    field: 'rank',
    class: 'wf_m-w-80 '
  },
  {
    header: '보유포인트',
    field: 'heldPoints',
    class: 'wf_m-w-111 '
  },
  {
    header: '사용 포인트',
    field: 'usedPoints',
    class: 'wf_m-w-111 '
  },
  {
    header: '차감 포인트',
    field: 'deductionPoints',
    class: 'wf_m-w-111 '
  },
  {
    header: '조정 포인트',
    field: 'adjustmentPoint',
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

export type MemberDataExcelModel = {
  data: any[]
  sheetName: string
  customHeader?: string[]
  columnWidth?: number
}

export interface MemberPointUsageListDataTableModel {
  id: string
  number: string
  companyCode: string
  customer: string
  employeeCode: string
  nameEmployee: string
  rank: string
  heldPoints: string
  usedPoints: string
  deductionPoints: string
  adjustmentPoint: string
  lastUpdateDate: string
  memberRegistrationDate: string
}

export const memberPointUsageCustomerHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '고객사코드',
    field: 'customerCompanyCode',
    class: 'wf_m-w-168 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-168 '
  },
  {
    header: '계약상태',
    field: 'contactStatus',
    class: 'wf_m-w-128 '
  },
  {
    header: '재직',
    field: 'numberOfCustomerTenure',
    class: 'wf_m-w-168 '
  },
  {
    header: '퇴사',
    field: 'numberOfCustomerLeave',
    class: 'wf_m-w-168 '
  },
  {
    header: '전체 보유 포인트',
    field: 'totalHeldPoints',
    class: 'wf_m-w-150 '
  },
  {
    header: '전체 사용 포인트',
    field: 'totalUsedPoints',
    class: 'wf_m-w-150 '
  },
  {
    header: '추가',
    field: 'totalAdjustmentPointAddition',
    class: 'wf_m-w-150 '
  },
  {
    header: '차감',
    field: 'totalAdjustmentPointDeduction',
    class: 'wf_m-w-150 '
  }
]

export const memberPointUsageCustomerHeaderName = [
'고객사코드',
'고객사',
'계약상태',
'재직',
'퇴사',
'전체 보유 포인트',
'전체 사용 포인트',
'추가',
'차감'
]

export interface MemberPointUsageCustomerDataTableModel {
  id?: string
  customerCompanyCode: string
  customer: string
  contactStatus: string
  numberOfCustomerTenure: string
  numberOfCustomerLeave: string
  totalHeldPoints: string
  totalUsedPoints: string
  totalAdjustmentPointAddition: string
  totalAdjustmentPointDeduction: string
}

export const memberPointUsageDetailsHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'number',
    class: 'wf_m-w-64 '
  },
  {
    header: '복지포인트 코드',
    field: 'welfarePointCode',
    class: 'wf_m-w-120 '
  },
  {
    header: '포인트',
    field: 'point',
    class: 'wf_m-w-100 '
  },
  {
    header: '발생',
    field: 'generation',
    class: 'wf_m-w-100 '
  },
  {
    header: '상세내용',
    field: 'detail',
    class: 'wf_m-w-200 '
  },
  {
    header: '발생일자',
    field: 'occurrenceDate',
    class: 'wf_m-w-150 '
  },
  {
    header: '유효기간',
    field: 'expirationPeriod',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문코드',
    field: 'orderCode',
    class: 'wf_m-w-100 '
  },
  {
    header: '처리자',
    field: 'manager',
    class: 'wf_m-w-150 '
  },
  {
    header: '처리일자',
    field: 'processingDate',
    class: 'wf_m-w-140-not-important '
  }
]

export interface MemberPointUsageDetailsDataTableModel {
  number: string
  welfarePointCode: string
  point: string
  generation: string
  detail: string
  occurrenceDate: string
  expirationPeriod: string
  orderCode: string
  manager: string
  processingDate: string
}

export interface MemberPointUsageListFormModel {
  companyCode: string
  memberName: string
  pointSelect?: WelfareSelectOptionType
  dateSelect?: WelfareSelectOptionType
  fromDate: string
  toDate: string
  minPoint: number | null
  maxPoint: number | null
}

export const memberListSelectDateOptions = [
  { label: '회원등록일시', value: '회원등록일시' },
  { label: '최근 접속일', value: '최근 접속일' }
]

export const memberListSelectWelfarePointOptions = [
  { label: '회원 보유 복지포인트(디폴트)', value: '회원 보유 복지포인트(디폴트)' },
  { label: '회원 사용 복지포인트', value: '회원 사용 복지포인트' },
  { label: '회원 차감 복지포인트', value: '회원 차감 복지포인트' }
]

export const memberListButtonDateFilter: ButtonDateModel[] = [
  {
    label: '오늘',
    class: 'wf_w-55',
    value: 0
  },
  {
    label: '7일',
    class: 'wf_w-55',
    value: 6
  },
  {
    label: '1개월',
    class: 'wf_w-55',
    value: 29
  },
  {
    label: '3개월',
    class: 'wf_w-55',
    value: 89
  },
  {
    label: '1년',
    class: 'wf_w-55',
    value: 364
  }
]
