import { DataTableContainerConfigModel } from '@/models'

export interface MemberCouponDetailModel {
  id: string
  couponCode: string
  couponName: string
  couponType: string
  discountAmount: string
  usage: string
  date: string
  available: string
  orderNumber: string
  registrant: string
  registrationDateTime: string
}

export const memberHeaderFieldTableMemberListCouponDetailConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'id', class: 'wf_m-w-50' },
  { header: '쿠폰코드', field: 'couponCode', class: 'wf_m-w-120 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer' },
  { header: '쿠폰명', field: 'couponName', class: 'wf_m-w-150' },
  { header: '쿠폰유형', field: 'couponType', class: 'wf_m-w-80' },
  { header: '할인금액', field: 'discountAmount', class: 'wf_m-w-80' },
  { header: '사용금액', field: 'usage', class: 'wf_m-w-80' },
  { header: '사용일시', field: 'date', class: 'wf_m-w-200' },
  { header: '사용여부', field: 'available', class: 'wf_m-w-80' },
  { header: '주문번호', field: 'orderNumber', class: 'wf_m-w-150 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer' },
  { header: '등록자', field: 'registrant', class: 'wf_m-w-150' },
  { header: '등록일시', field: 'registrationDateTime', class: 'wf_m-w-50' }
]

export const memberExportCouponDetailHeaderName = [
  'No.',
  '쿠폰코드',
  '쿠폰명',
  '쿠폰유형',
  '할인금액',
  '사용금액',
  '사용일시',
  '사용여부',
  '주문번호',
  '등록자',
  '등록일시'
]
