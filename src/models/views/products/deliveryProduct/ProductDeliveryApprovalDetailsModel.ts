import { WelfareSelectOptionType } from '@/models/uikit'

export interface ProductDeliveryDetailsDataRow {
  order?: number
  item: string
  description: string
}
export enum ProductDeliveryDetailDataSource {
  external = 'external',
  manual = 'manual'
}

export enum ProductDeliveryDetailsFormFields {
  order = 'order',
  item = 'item',
  description = 'description'
}

export const productDeliveryDetailInputOptions = [
  { label: '연동', value: ProductDeliveryDetailDataSource.external },
  { label: '직접 입력', value: ProductDeliveryDetailDataSource.manual }
]

export const productDeliveryDetailSelectOptions: WelfareSelectOptionType[] = [
  { label: '판매중', value: '1' },
  { label: '판매일시중지', value: '2' },
  { label: '일시품절', value: '3' },
  { label: '품절', value: '4' }
]

export const productDeliveryDetailsMockEmptyDataRow: ProductDeliveryDetailsDataRow = {
  order: undefined,
  item: '',
  description: ''
}

export const productDeliveryDetailsMockDataRow: ProductDeliveryDetailsDataRow = {
  order: 0,
  item: '제품명',
  description:
    '한글 기준 500자 이내로 입력 해 주세요. 상세 설명 참조, 우유, 900mL * 1개. 상세 설명 참조, 우유, 900mL * 1개. \
    상세 설명 참조, 우유, 900mL * 1개. 한글 기준 500자 이내로 입력 해 주세요. 상세 설명 참조, 우유, 900mL * 1개. \
    상세 설명 참조, 우유, 900mL * 1개. 상세 설명 참조, 우유, 900mL * 1개.'
}

export const productDeliveryDetailsFormFieldsHeaders = [
  {
    label: '순서'
  },
  {
    label: '항목',
    required: true,
    flex: 1
  },
  {
    label: '내용',
    required: true,
    flex: 1
  },
  {
    label: '추가/삭제'
  }
]
