import { ComplaintOrderCancelListResponse, PaginationModelRequest } from '@/models/services'
import { BaseApi } from '../BaseApi'
import { MockDataComplaintOrderCancelListDataTable } from '@/assets'

class ComplaintOrderCancelApi extends BaseApi {
  getOrderCancelList(request: PaginationModelRequest) {
    return new Promise<ComplaintOrderCancelListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const totalItems = 3128
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = 0; i < maxItemInPage; i++) {
          const index = i + 1
          if (index > 0) {
            items.push({
              ...MockDataComplaintOrderCancelListDataTable,
              no: index,
              id: index
            })
          }
        }
        resolve({
          totalItems: totalItems,
          data: items
        })
      })
    })
  }
}

export const complaintOrderCancelApi = new ComplaintOrderCancelApi()
