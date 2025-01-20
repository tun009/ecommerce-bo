import { DataTableContainerConfigModel } from '@/models/uikit'

export enum DeliveryPaymentMethodModel {
  ALL = '',
  WELFARE_POINT = 'WLFPT',
  CREDIT_CARD = 'CRCD',
  TRANSFER = 'ATRNS',
  MEGAZONE = 'MZPAY',
  NAVER = 'NVPR',
  KAKAO = 'KAKP',
  TOSS = 'TSPY'
}

export enum DeliveryOrderChannelModel {
  ALL = '',
  WEB_PC = 'WPC',
  WEB_MO = 'WMO',
  APP_IOS = 'IOS',
  APP_AOS = 'AOS'
}

export enum DeliveryKeywordSearchModel {
  ALL = '',
  ORDER_KEY = 'ITM_CD',
  MEMBER_KEY = 'ITM_NM',
  MEMBER_ID = 'MBR_CD'
}

export interface DeliveryTicketProductListReceiverModel {
  memberKey: number
  name: string
  phone: string
  ticketQuantity: number | null
}

export interface DeliveryTicketProductListOrderStatusFormModel {
  orderKey?: string
  customerKey?: string
  orderMemberKey?: string
  ordererName?: string
  receiverName?: string
  receiverPhone?: number
  paymentMethod?: string
  orderChannel?: string
  periodSearchType?: string
  fromDate?: string
  toDate?: string
  keywordSearchType: string
  keyword: string
  dateSelect?: {
    label: string
    value: string
  }
}

export interface DeliveryTicketProductListOrderStatusModel {
  orderKey: number
  memberKey: number
  memberName: string
  memberId: string
  ordererName: string
  customerKey: number
  customerName: string
  productAmount: number
  immediateDiscountAmount: number
  couponDiscountAmount: number
  lastPaymentAmount: number
  cancelQuantity: number
  cancelAmount: number
  cancelFeeAmount: number
  netOrderQuantity: number
  netOrderAmount: number
  welfarePointPaymentAmount: number
  creditCartPaymentAmount: number
  transferPaymentAmount: number
  megazonePaymentAmount: number
  naverPaymentAmount: number
  kakaoPaymentAmount: number
  tossPaymentAmount: number
  orderChannel: string
  orderDate: string
  paymentStatus: string
  receivers: DeliveryTicketProductListReceiverModel[]
}

export const deliveryPaymentMethodOptions = [
  {
    label: '전체',
    value: DeliveryPaymentMethodModel.ALL
  },
  {
    label: '복지포인트',
    value: DeliveryPaymentMethodModel.WELFARE_POINT
  },
  {
    label: '신용카드',
    value: DeliveryPaymentMethodModel.CREDIT_CARD
  },
  {
    label: '계좌이체',
    value: DeliveryPaymentMethodModel.TRANSFER
  },
  {
    label: '메가존페이',
    value: DeliveryPaymentMethodModel.MEGAZONE
  },
  {
    label: '네이버페이',
    value: DeliveryPaymentMethodModel.NAVER
  },
  {
    label: '카카오페이',
    value: DeliveryPaymentMethodModel.KAKAO
  },
  {
    label: '토스페이 ',
    value: DeliveryPaymentMethodModel.TOSS
  }
]

export const deliveryOrderChannelOptions = [
  {
    label: '전체',
    value: DeliveryOrderChannelModel.ALL
  },
  {
    label: 'Web(PC)',
    value: DeliveryOrderChannelModel.WEB_PC
  },
  {
    label: 'Web(MO)',
    value: DeliveryOrderChannelModel.WEB_MO
  },
  {
    label: 'App(iOS)',
    value: DeliveryOrderChannelModel.APP_IOS
  },
  {
    label: 'App(AOS)',
    value: DeliveryOrderChannelModel.APP_AOS
  }
]

export const deliveryKeywordSearchOptions = [
  {
    label: '사용 안 함',
    value: DeliveryKeywordSearchModel.ALL
  },
  {
    label: '주문코드',
    value: DeliveryKeywordSearchModel.ORDER_KEY
  },
  {
    label: '회원코드',
    value: DeliveryKeywordSearchModel.MEMBER_KEY
  },
  {
    label: '아이디',
    value: DeliveryKeywordSearchModel.MEMBER_ID
  }
]

export const deliveryTicketProductListOrderStatusHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '주문코드',
    field: 'orderKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-200 '
  },
  {
    header: '아이디',
    field: 'memberId',
    class: 'wf_m-w-200 '
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문수량',
    field: 'netOrderQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품금액',
    field: 'productAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '즉시할인금액',
    field: 'immediateDiscountAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품쿠폰할인금액',
    field: 'couponDiscountAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '최종결제금액',
    field: 'lastPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '취소수량',
    field: 'cancelQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '취소상품금액',
    field: 'cancelAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '취소수수료',
    field: 'cancelFeeAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '순주문수량',
    field: 'netOrderQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '순결제금액',
    field: 'netOrderAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '복지포인트',
    field: 'welfarePointPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '신용카드',
    field: 'creditCartPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '계좌이체',
    field: 'transferPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '메가존페이',
    field: 'megazonePaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '네이버페이',
    field: 'naverPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '카카오페이',
    field: 'kakaoPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '토스페이',
    field: 'tossPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문자명',
    field: 'ordererName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자명',
    field: 'receiverName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자 휴대폰번호',
    field: 'receiverPhone',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문채널',
    field: 'orderChannel',
    class: 'wf_m-w-200 '
  },
  {
    header: '결제일시',
    field: 'orderDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '결제상태',
    field: 'paymentStatus',
    class: 'wf_m-w-200 '
  }
]

export const deliveryTicketProductListOrderStatusXlsxSheetName = 'List_Order_Status'

export const deliveryTicketProductListOrderStatusHeaders = [
  '주문코드',
  '회원코드',
  '회원명',
  '아이디',
  '고객사코드',
  '고객사',
  '주문수량',
  '상품금액',
  '즉시할인금액',
  '상품쿠폰할인금액',
  '최종결제금액',
  '취소수량',
  '취소상품금액',
  '취소수수료',
  '순주문수량',
  '순결제금액',
  '복지포인트',
  '신용카드',
  '계좌이체',
  '메가존페이',
  '네이버페이',
  '카카오페이',
  '토스페이',
  '주문자명',
  '수령자명',
  '수령자 휴대폰번호',
  '주문채널',
  '결제일시',
  '결제상태'
]

export const deliveryListSelectDateOptionsConfig = [
  { label: '회원등록일시', value: '1' },
  { label: '최근 접속일 ', value: '2' }
]
