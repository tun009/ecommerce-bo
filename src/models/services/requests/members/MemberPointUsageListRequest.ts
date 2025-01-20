import { PaginationModelRequest } from '@/models/services'

export interface MemberPointUsageListRequest extends PaginationModelRequest {
  customerCode?: string
  employeeName?: string
  pointWelfare?: string
  fromDate?: string
  toDate?: string
  keyword?: string
}
