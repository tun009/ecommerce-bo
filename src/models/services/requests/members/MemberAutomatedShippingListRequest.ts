import { PaginationModelRequest } from '@/models/services'

export interface MemberAutomatedShippingListRequest extends PaginationModelRequest {
  shippingCategory?: number
  shippingTemplate?: any
  isUse?: number
  fromDate?: string
  toDate?: string
  keyword?: string
}
