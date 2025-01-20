import { DataTableContainerConfigModel } from '@/models'
export interface MemberPointPaymentDetailModel {
  id: string
  bend: string
  pointCode: string
  point: string
  welfarePoints: string
  expirationPeriod: string
  registrant: string
  registrationDateTime: string
}

export const memberHeaderFieldTableMemberListPointPaymentDetailConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'id', class: 'wf_m-w-50' },
  { header: '구부', field: 'bend', class: 'wf_m-w-150' },
  { header: '복지포인트 코드', field: 'pointCode', class: 'wf_m-w-250' },
  { header: '포인트', field: 'point', class: 'wf_m-w-150' },
  { header: '복지포인트 명', field: 'welfarePoints', class: 'wf_m-w-150' },
  { header: '유효기간', field: 'expirationPeriod', class: 'wf_m-w-300' },
  { header: '등록자', field: 'registrant', class: 'wf_m-w-150' },
  { header: '등록일시', field: 'registrationDateTime', class: 'wf_m-w-200' }
]

export interface MemberPointUsageDetailModel {
  id: string
  division: string
  pointCode: string
  point: string
  welfarePoints: string
  orderCode: string
  registrant: string
  registrationDateTime: string
}

export const memberHeaderFieldTableMemberListPointUsageDetailConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'id', class: 'wf_m-w-50' },
  { header: '구부', field: 'division', class: 'wf_m-w-150' },
  { header: '복지포인트 코드', field: 'pointCode', class: 'wf_m-w-250' },
  { header: '포인트', field: 'point', class: 'wf_m-w-150' },
  { header: '복지포인트 명', field: 'welfarePoints', class: 'wf_m-w-150' },
  { header: '유효기간', field: 'orderCode', class: 'wf_m-w-300' },
  { header: '등록자', field: 'registrant', class: 'wf_m-w-150' },
  { header: '등록일시', field: 'registrationDateTime', class: 'wf_m-w-200' }
]

export const memberExportPointPaymentHeaderName = ['No.', '구부', '복지포인트 코드', '포인트', '복지포인트 명', '유효기간', '등록자', '등록일시']

export const memberExportPointUsageHeaderName = ['No.', '구부', '복지포인트 코드', '포인트', '복지포인트 명', '유효기간', '등록자', '등록일시']
