import { DataTableContainerConfigModel } from '@/models/uikit'

export const DataFormPromotionListConfig = {
  listRadios: [
    {
      title: 'MZ 복지몰',
      value: 'mz'
    },
    {
      title: '판매사',
      value: 'seller'
    }
  ],
  listInputFindProduct: [
    {
      title: '판매사',
      class: 'wf_w-176',
      field: 'findSellerInput',
      placeholder: '표준카테고리',
      labelButton: '조회',
      type: 'SELLER'
    }
  ],
  listCheckBoxTypes: [
    {
      title: '상품 유형',
      field: 'productTypeCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52'
        },
        {
          id: 'common',
          label: '진행중',
          class: 'wf_w-52'
        },
        {
          id: 'installation_type',
          label: '종료',
          class: 'wf_w-63'
        }
      ]
    },
    {
      title: '판매상태',
      field: 'salesStatusCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52'
        },
        {
          id: 'sale',
          label: '적용 가능',
          class: 'wf_w-63'
        },
        {
          id: 'sales_pause',
          label: '적용 불가',
          class: 'wf_w-96'
        }
      ]
    }
  ],
  optionProductDate: [
    { label: '상품등록일', value: '1' },
    { label: '최종수정일 ', value: '2' }
  ],
  optionsProductListFilter: [
    { label: '사용안함', value: '1' },
    { label: '프로모션명', value: '2' },
    { label: '프로모션코드', value: '3' }
  ],
  listButtonDateFilter: [
    {
      label: '오늘',
      class: 'wf_w-176',
      value: 0
    },
    {
      label: '7일',
      class: 'wf_w-176',
      value: 6
    },
    {
      label: '1개월',
      class: 'wf_w-176',
      value: 29
    },
    {
      label: '3개월',
      class: 'wf_w-176',
      value: 89
    },
    {
      label: '1년',
      class: 'wf_w-176',
      value: 364
    }
  ]
}

export const DataHeaderPromotionProductTableModalConfig: DataTableContainerConfigModel[] = [
  {
    header: '프로모션ID',
    field: 'id',
    class: 'wf_m-w-120 '
  },
  {
    header: '프로모션명',
    field: 'promotion_name',
    class: 'wf_m-w-120 '
  },
  {
    header: '할인구분',
    field: 'discount_classification',
    class: 'wf_m-w-80 '
  },
  {
    header: '판매사코드',
    field: 'seller_code',
    class: 'wf_m-w-120 '
  },
  {
    header: '판매사',
    field: 'seller',
    class: 'wf_m-w-120'
  },
  {
    header: '쿠폰 적용 여부',
    field: 'coupon_applies',
    class: 'wf_m-w-120'
  },
  {
    header: '프로모션 기간',
    field: 'promotion_period',
    class: 'wf_m-w-300 '
  },
  {
    header: '진행 상태',
    field: 'progress',
    class: 'wf_m-w-100 '
  },
  {
    header: '등록자',
    field: 'registrant',
    class: 'wf_m-w-120 wf_justify-start'
  },
  {
    header: '등록일',
    field: 'registration_date',
    class: 'wf_m-w-200 wf_justify-start'
  },
  {
    header: '조회',
    field: 'view',
    class: 'wf_m-w-50'
  }
]

export interface PromotionProductListModal {
  id: string
  promotion_name: string
  discount_classification: string
  seller_code: string
  seller: string
  coupon_applies: string
  promotion_period: string
  progress: string
  registrant: string
  registration_date: string
  view: string
}
