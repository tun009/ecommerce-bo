import { BaseModelResponse } from '@/models'

export interface OrderSellerInfoResponse extends BaseModelResponse<OrderSellerInfoResponseModel> {}

interface OrderSellerInfoResponseModel {
  sellerKey: number
  sellerName: string
  bizRegNum: string
  corpRegNum: string
  categoryList: string[]
  representativeName: string
  streetAddress: string
  masterAccountName: string
  masterAccountPhone: string
}
