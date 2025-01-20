import { DataTableContainerConfigModel } from '@/models/uikit'

export enum DeliveryProductCategoryDepthRank {
  DEPTH_1 = '1',
  DEPTH_2 = '2',
  DEPTH_3 = '3',
}

export enum DeliveryProductTypeModel {
  ALL = '',
  DELIVERY_GENERAL = '01',
  DELIVERY_INSTALL = '02',
  TICKET_GENERAL = '03',
  TICKET_RESERVATION = '04'
}

export enum DeliveryCategoryTypeModel {
  STANDARD = 'STD',
  DISPLAY = 'DSP'
}

export enum DeliveryRankingByModel {
  AMOUNT = '01',
  QUANTITY = '02'
}

export enum DeliveryRankingRangeModel {
  TOP_50 = '01',
  TOP_100 = '02',
  TOP_200 = '03'
}

export enum DeliveryTargetCompanyTypeModel {
  ALL = 'ALL',
  SELECTED = 'SELECTED'
}

export const deliveryProductTypeOptions = {
  title: '상품 유형',
  field: 'productType',
  list: [
    {
      id: 'all',
      label: '전체',
      value: DeliveryProductTypeModel.ALL
    },
    {
      id: '03',
      label: '일반티켓',
      value: DeliveryProductTypeModel.TICKET_GENERAL
    },
    {
      id: '04',
      label: '예약티켓',
      value: DeliveryProductTypeModel.TICKET_RESERVATION
    }
  ]
}

export const deliveryCategoryTypeOptions = [
  {
    label: '표준카테고리',
    value: DeliveryCategoryTypeModel.STANDARD
  },
  {
    label: '전시카테고리',
    value: DeliveryCategoryTypeModel.DISPLAY
  }
]

export const deliveryRankingRangeOptions = [
  {
    label: '50위까지',
    value: DeliveryRankingRangeModel.TOP_50
  },
  {
    label: '100위까지',
    value: DeliveryRankingRangeModel.TOP_100
  },
  {
    label: '200위까지 ',
    value: DeliveryRankingRangeModel.TOP_200
  }
]

export const deliveryTargetCompanyTypeOptions = [
  {
    label: '하위업체 전체',
    value: DeliveryTargetCompanyTypeModel.ALL
  },
  {
    label: '판매사별 등록된 하위업체 목록',
    value: DeliveryTargetCompanyTypeModel.SELECTED
  }
]

export const deliveryRankingByOptions = [
  {
    label: '순주문금액순',
    value: DeliveryRankingByModel.AMOUNT
  },
  {
    label: '순주문수량순',
    value: DeliveryRankingByModel.QUANTITY
  }
]

export const deliveryKeywordSearchTypeOptions = [
  {
    label: '사용 안 함',
    value: 0
  },
  {
    label: '상품코드',
    value: 1
  }
]

export interface DeliveryStandardCategoryModel {
  categoryName: string
  depth: number
}

export interface DeliveryTicketProductOrderStatusProductFormModel {
  categoryType?: DeliveryCategoryTypeModel
  categoryId?: string
  categoryDepthId1?: string
  categoryDepthId2?: string
  categoryDepthId3?: string
  productKey?: string
  sellerKey?: string
  subcontractKey?: string
  productType?: DeliveryProductTypeModel
  mdKey?: string
  rankingBy?: string
  rankingRange?: DeliveryRankingRangeModel
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

export interface DeliveryTicketProductOrderStatusProductModel {
  productKey: number
  productName: string
  productType: DeliveryProductTypeModel
  salesPrice: number
  quantity: number
  totalProductAmount: number
  immediateDiscountAmount: number
  couponDiscountAmount: number
  lastOrderAmount: number
  cancelQuantity: number
  cancelAmount: number
  netOrderQuantity: number
  netOrderAmount: number
  sellerKey: number
  sellerName: string
  subcontractName: string
  standardCategories: DeliveryStandardCategoryModel[]
  mdId: string
  mdName: string
}

export const deliveryTicketProductOrderStatusProductHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품유형',
    field: 'productType',
    class: 'wf_m-w-200 '
  },
  {
    header: '단위판매가',
    field: 'salesPrice',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문수량',
    field: 'quantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품금액',
    field: 'totalProductAmount',
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
    header: '최종주문금액',
    field: 'lastOrderAmount',
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
    header: '순주문수량',
    field: 'netOrderQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '순주문금액',
    field: 'netOrderAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_m-w-200 '
  },
  {
    header: '하위업체',
    field: 'subcontractName',
    class: 'wf_m-w-200 '
  },
  {
    header: '표준카테고리',
    field: 'standardCategoryName',
    class: 'wf_m-w-200 '
  },
  {
    header: 'MD',
    field: 'md',
    class: 'wf_m-w-200 '
  }
]

export const deliveryTicketProductOrderStatusProductXlsxSheetName = 'Order_Status_Product'

export const deliveryTicketProductOrderStatusProductHeaders = [
  'No.',
  '상품코드',
  '상품명',
  '상품유형',
  '단위판매가',
  '주문수량',
  '상품금액',
  '즉시할인금액',
  '상품쿠폰할인금액',
  '최종주문금액',
  '취소수량',
  '취소상품금액',
  '순주문수량',
  '순주문금액',
  '판매사코드',
  '판매사',
  '하위업체',
  '표준카테고리',
  'MD'
]
