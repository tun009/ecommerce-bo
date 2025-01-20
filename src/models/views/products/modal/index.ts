import { ProductTypeRegisterOptionValue, WelfareSelectOptionType } from '@/models'

export * from './ProductSearchModalData'
export * from './ProductSearchModel'

export * from './ProductRegisterModalModel'

export interface ProductVendorInformationModel {
  sellerCode: number
  nameOfSellingCompany: string
  salesDirectory: string | string[]
  masterAccount?: string
  businessNumber: string
  companyRegistrationNumber: string
  representative: string
  workplace: string
  phoneNumber?: string
}

export interface ProductOptionsDeliveryInfo {
  no?: number
  optionId?: number
  option?: string
  option1?: string
  option2?: string
  optionPrice?: number
  inventory?: number
  salesStatus?: WelfareSelectOptionType
  selected?: boolean
  optionDisplayOrder?: number,
  productKey?: number
}

export interface ProductRegisterSingleOptionModel {
  productCode: string
  productName: string
  type?: ProductTypeRegisterOptionValue
  dataTable?: ProductOptionsDeliveryInfo[]
  enableMultipleValue?: boolean
  optionShow?: boolean,
  baseInfoType?: string
}

export interface ProductSelectOptionModel {
  label?: string
  value?: string
  path?: string
}

export interface ProductHeaderTableOptionModel {
  label?: string
  labelElement?: any
  isProductCode?: boolean
  element?: any
  required?: boolean
  flex?: number
  props?: any
  events?: any
  labelProps?: any
  labelEvents?: any
  className?: string
}

export interface ProductContentTableDataModel extends ProductHeaderTableOptionModel {
  content?: string
  classNameContent?: string
}

export interface ProductWarningModel {
  label: string
  contentList: string[]
}

export interface ProductSearchModalProps {
  searchInput?: string
  searchResData?: ProductSearchRecordModel
  searchType: ProductSearchType
  onCancel?: () => void
  onSelect: (value: ProductSearchRecordModel) => void
}

export interface ProductSearchRecordModel {
  code: number
  name: string
}

export enum ProductSearchType {
  MD = 'MD',
  SELLER = 'SELLER',
  BRAND = 'BRAND',
  CUSTOMER = 'CUSTOMER',
}

export interface ProductSearchModalWrapperProps {
  placeholderInput?: string
  labelButton?: string
  type: ProductSearchType
  defaultValue?: string
  disabled?: boolean
}

export type ProductSearchModalWrapperEmits = (e: 'selectValue', value: ProductSearchRecordModel) => void

export interface ProductRegisterFileProps {
  name?: string
}

export type ProductRegisterFileEmits = (e: 'get-file', value: any) => void

export type ProductImageType = 'square' | 'pcBanner' | ''

export interface ProductSearchItemModalProps {
  onCancel?: () => void
  onSelect: (items: any[]) => void
}

export type ProductDateRowKey = 'beginDate' | 'endDate'

export const productSearchRecordRes: ProductSearchRecordModel = {
  code: NaN,
  name: ''
}

export const listButtonDate = [
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
  },
  {
    label: '직접입력',
    class: 'wf_w-55',
    value: -1
  }
]