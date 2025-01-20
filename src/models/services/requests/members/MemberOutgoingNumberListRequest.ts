import { PaginationModelRequest } from '@/models/services'

export interface MemberOutgoingNumberListRequest extends PaginationModelRequest {
  callingNumber?: string
  fromDate?: string
  toDate?: string
}
