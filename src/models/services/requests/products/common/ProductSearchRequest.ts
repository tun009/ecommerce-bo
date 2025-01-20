import { PaginationModelRequest } from '@/models/services'

export interface ProductSearchRequest extends PaginationModelRequest {
  totalItems?: number
}
