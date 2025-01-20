import { DataTablePaginationResponseModel } from '@/models'
import { MemberAutomatedShippingListRequest } from '@/models/services'
import { MemberAutomatedShippingDataTableModel } from '@/models/views'
import { MemberPointAllocationSpecifyInBulkTableMockData } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'

class MemberPointAllocationSpecifyInBulkApi extends BaseApi {
  getSpecifyInBulk(request: MemberAutomatedShippingListRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberAutomatedShippingDataTableModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i
          items.push({
            ...MemberPointAllocationSpecifyInBulkTableMockData,
            id: index
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }
}

export const memberPointAllocationSpecifyInBulkApi = new MemberPointAllocationSpecifyInBulkApi()
