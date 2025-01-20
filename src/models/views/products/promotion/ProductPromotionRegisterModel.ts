export interface ProductPromotionRegisterModel {
  discountCat: string
  seller: object
  promotionName: string
  discountPeriodBegin: string
  discountPeriodEnd: string
  couponApplies: boolean
  discountAmount: number
  promotionCode: string
  product: any[]
  productDiscounted: any[]
}
export const ProductPromotionRegisterConfig = {
  discountCatOptions: [
    { label: '플랫폼', value: 'platform' },
    { label: '판매사', value: 'seller' }
  ],
  couponAppliesOptions: [
    { label: '적용 가능', value: true },
    { label: '적용 불가', value: false }
  ]
}
