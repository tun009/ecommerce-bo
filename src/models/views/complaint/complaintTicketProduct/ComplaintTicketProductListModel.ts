import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'

export interface ComplaintCheckBoxConfigType {
  field: string
  list: ComplaintCheckBoxItemType[]
}
export interface ComplaintCheckBoxItemType {
  id: string
  label: string
  class?: string
}

export const complaintCheckBoxClaimConfig: ComplaintCheckBoxConfigType = {
  field: 'claimTypeCheckBox',
  list: [
    {
      id: 'all',
      label: '전체',
      class: 'wf_w-52'
    },
    {
      id: 'draw_order',
      label: '주문취소',
      class: 'wf_w-52'
    },
    {
      id: 'cancel_order',
      label: '판매취소',
      class: 'wf_w-63'
    }
  ]
}

export interface ComplaintTicketProductListDataTableModel {
  id: string
  claimKey: string
  claimType: string
  orderKey: string
  productName: string
  quantity: number
  sellerKey: string
  sellerName: string
  subcontract: string
  ordererName: string
  paymentDatetime: string
  lastPaymentAmount: string
  cancelFee: string
  lastRefundAmount: string
  memberKey: string
  memberName: string
  memberId: string
  companyKey: string
  companyName: string
  claimApplyDatetime: string
  claimDetailReason: string
  claimApplierName: string
  claimApplierKey: string
}

export const complaintHeaderFieldTableTicketProductListConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'id', class: 'wf_m-w-50' },
  { header: '클레임코드', field: 'claimKey', class: 'wf_m-w-250' },
  { header: '클레임코드', field: 'claimType', class: 'wf_m-w-250' },
  { header: '클레임유형', field: 'orderKey', class: 'wf_m-w-200' },
  { header: '주문코드', field: 'productName', class: 'wf_m-w-300' },
  { header: '클레임 상품명', field: 'quantity', class: 'wf_m-w-150' },
  { header: '수량', field: 'sellerKey', class: 'wf_m-w-50' },
  { header: '판매사코드', field: 'sellerName', class: 'wf_m-w-150' },
  { header: '판매사', field: 'subcontract', class: 'wf_m-w-150' },
  { header: '하위업체', field: 'ordererName', class: 'wf_m-w-150' },
  { header: '주문자', field: 'paymentDatetime', class: 'wf_m-w-150' },
  { header: '결제일시', field: 'lastPaymentAmount', class: 'wf_m-w-100' },
  { header: '최종결제금액', field: 'cancelFee', class: 'wf_m-w-200' },
  { header: '취소수수료', field: 'lastRefundAmount', class: 'wf_m-w-150' },
  { header: '최종환불금액', field: 'memberKey', class: 'wf_m-w-150' },
  { header: '회원코드', field: 'memberName', class: 'wf_m-w-150' },
  { header: '회원명', field: 'memberId', class: 'wf_m-w-200' },
  { header: '회원아이디', field: 'companyKey', class: 'wf_m-w-200' },
  { header: '고객사코드', field: 'companyName', class: 'wf_m-w-150' },
  { header: '고객사명', field: 'claimApplyDatetime', class: 'wf_m-w-150' },
  { header: '신청일시', field: 'claimDetailReason', class: 'wf_m-w-200' },
  { header: '클레임사유', field: 'claimApplierName', class: 'wf_m-w-150' },
  { header: '클레임 신청자', field: 'claimApplierKey', class: 'wf_m-w-150' }
]

export interface ComplaintTicketProductListFormModel {
  claimType: string
  claimKey: string
  orderMemberKey: string
  customerKey: string
  orderKey: string
  orderer: string
  sellerKey: string
  companyChild?: WelfareSelectOptionType | undefined
  periodSearchType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  // keywordSearchType: WelfareSelectOptionType
  // keyword: string
}

export const complaintSelectDateOptionsConfig = [
  { label: '회원등록일시', value: '1' },
  { label: '최근 접속일 ', value: '2' }
]

export const complaintKeyWorkSearchOptionsConfig = [
  { label: '사용안함', value: '1' },
  { label: '클레임코드', value: '2' },
  { label: '주문코드', value: '3' },
  { label: '회원코드', value: '4' },
  { label: '회원아이디', value: '5' },
  { label: '고객사코드', value: '6' },
  { label: '상품코드', value: '7' },
  { label: '상품명', value: '8' },
  { label: '판매사코드 ', value: '9' }
]

export const complaintFindProductConfig = {
  listInputFindProduct: [
    {
      title: '판매사',
      class: 'wf_w-176',
      field: 'findSellerInput',
      placeholder: '전체',
      labelButton: '조회',
      type: 'SELLER'
    },
    {
      title: 'MD',
      class: 'wf_w-176',
      field: 'findMdInput',
      placeholder: 'MD 조회',
      labelButton: '조회',
      type: 'MD'
    },
    {
      title: '브랜드',
      class: 'wf_w-176',
      field: 'findBrandInput',
      placeholder: '브랜드 조회',
      labelButton: '조회',
      type: 'BRAND'
    },
    {
      title: '모델명',
      class: 'wf_w-176',
      field: 'findModelInput',
      placeholder: '모델명 조회'
    }
  ],
  listCompanyChild: [
    { label: '사용안함 ', value: '1' },
    { label: '클레임코드 ', value: '2' },
    { label: '주문코드 ', value: '3' },
    { label: '회원코드 ', value: '4' },
    { label: '회원아이디 ', value: '5' },
    { label: '고객사코드 ', value: '6' },
    { label: '상품코드 ', value: '7' },
    { label: '상품명 ', value: '8' },
    { label: '판매사코드 ', value: '9' }
  ]
}

