import { PaginationModelRequest } from '@/models'

export interface MemberCustomerSearchRequest extends PaginationModelRequest {
  customerKey?: number
  customerName?: string
  customerStatus?: string
  bizRegNum?: string
  corpRegNum?: string
  contractStatus?: string
  startDate?: string
  endDate?: string
}
