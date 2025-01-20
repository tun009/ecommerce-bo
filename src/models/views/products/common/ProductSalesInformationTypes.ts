export enum ProductSalesTax {
  TAXATION = '과세',
  TAXFREE = '면세',
  YOUNG = '영세'
}

export enum ProductSalesTestCase {
  EMPTY_DATA = 'empty',
  SUCCESS = 'success',
  UPDATE = 'update',
  WAIT_APPROVE = 'wait-approve',
  CANT_BE_MODIFIED = 'cant-be-modified',
  EDIT_BEFORE = 'edit-before',
  EDIT_COMPLETE = 'edit-complete'
}
export interface ProductSalesCouponPromotionData {
  id?: any
  name?: any
  fixedRate?: any
  fixedAmount?: any
  discountPrice?: any
}

export interface ProductSalesDiscountPromotionData {
  id?: any
  name?: any
  price?: any
  discountPrice?: any
  discountRate?: any
}
export interface ProductPricingInformationProps {
  contractMarginRate: string | number
  tax?: ProductSalesTax
  sellingPrice?: any
  marginRate?: any
}

export interface ProductPricingInformationEmits {
  (e: 'update:sellingPrice', value: any): void
  (e: 'update:marginRate', value: any): void
}
