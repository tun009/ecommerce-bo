import { WelfareSelectOptionType } from '@/models/uikit'

export interface MemberListOrderDetailModel {
  id: string
  orderNumber: string
  productOrderNumber: string
  productCode: string
  productName: string
  optionName: string
  price: string
  discountPrice: string
  shippingInformation: string
  seller: string
  recipient: string
  phoneNumber: string
  zipCode: string
  deliveryAddress: string
  orderStatus: string
  courierCompany: string
  invoiceNumber: string
  paymentDate: string
  claimNumber: string
  reasonForClaim: string
  claimProcessingStatus: string
  claimApplicationDate: string
  claimApproveDate: string
}
export const memberHeaderFieldTableMemberListOrderDetailConfig = [
  [
    { header: 'No.', field: 'id', class: 'wf_m-w-80' },
    { header: '주문번호', field: 'orderNumber', class: 'wf_m-w-120' },
    { header: '상품주문번호', field: 'productOrderNumber', class: 'wf_m-w-200' },
    { header: '상품코드', field: 'productCode', class: 'wf_m-w-120' }
  ],
  [
    { header: '상품명', field: 'productName', class: 'wf_m-w-200' },
    { header: '옵션명', field: 'optionName', class: 'wf_m-w-80' },
    { header: '판매가', field: 'price', class: 'wf_m-w-80' },
    { header: '할인가', field: 'discountPrice', class: 'wf_m-w-100' },
    { header: '배송정보', field: 'shippingInformation', class: 'wf_m-w-120' },
    { header: '판매사', field: 'seller', class: 'wf_m-w-120' }
  ],
  [
    { header: '수령인', field: 'recipient', class: 'wf_m-w-100' },
    { header: '휴대폰번호', field: 'phoneNumber', class: 'wf_m-w-200' },
    { header: '우편번호', field: 'zipCode', class: 'wf_m-w-200' },
    { header: '배송지주소', field: 'deliveryAddress', class: 'wf_m-w-280' },
    { header: '주문상태', field: 'orderStatus', class: 'wf_m-w-120' },
    { header: '택배사', field: 'courierCompany', class: 'wf_m-w-120' },
    { header: '송장번호', field: 'invoiceNumber', class: 'wf_m-w-150' },
    { header: '결제일', field: 'paymentDate', class: 'wf_m-w-200' }
  ],
  [
    { header: '클레임번호', field: 'claimNumber', class: 'wf_m-w-120' },
    { header: '클레임사유', field: 'reasonForClaim', class: 'wf_m-w-120' },
    { header: '클레임 처리상태', field: 'claimProcessingStatus', class: 'wf_m-w-150' },
    { header: '클레임신청일', field: 'claimApplicationDate', class: 'wf_m-w-200' },
    { header: '클레임승인일', field: 'claimApproveDate', class: 'wf_m-w-200' }
  ]
]

export interface MemberSearchMemberListOrderDetailQuery {
  orderStatus: any
  invoiceNumber: string
  period: WelfareSelectOptionType
  startDate: string
  endDate: string
  codeSearch: any
  codeQuery: string
}

export const memberSearchMemberOrderStatusSearch = [
  {
    label: '전체',
    value: '전체'
  },
  {
    label: '결제완료',
    value: '결제완료'
  },
  {
    label: '상품준비지시지연',
    value: '상품준비지시지연'
  },
  {
    label: '배송지연',
    value: '배송지연'
  },
  {
    label: '교환최종승인',
    value: '교환최종승인'
  },
  {
    label: '교환상품준비지시지연',
    value: '교환상품준비지시지연'
  },
  {
    label: '교환상품배송지연',
    value: '교환상품배송지연'
  }
]

export const memberSearchMemberOrderPeriodOptions = [
  { label: '결제일', value: '결제일' },
  { label: '클레임 신청일', value: '클레임 신청일' },
  { label: '클레임 승인일', value: '클레임 승인일' }
]

export const memberSearchMemberOrderCodeSearchOptions = [
  { label: '전체', value: '전체' },
  { label: '상품명', value: '상품명' },
  { label: '상품코드', value: '상품코드' },
  { label: '주문번호', value: '주문번호' },
  { label: '상품주문번호', value: '상품주문번호' }
]
