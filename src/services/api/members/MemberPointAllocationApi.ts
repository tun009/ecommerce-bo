import { MemberPointAllocationListResponse, MemberPointDeductionListResponse, PaginationModelRequest } from '@/models/services'
import { BaseApi } from '../BaseApi'
import { MockDataMemberPointAllocationListDataTable } from '@/assets'

class MemberPointAllocationApi extends BaseApi {
  getMemberPointAllocationList(request: PaginationModelRequest) {
    return new Promise<MemberPointAllocationListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const totalItems = 3128
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = 0; i < maxItemInPage; i++) {
          const index = totalItems - request.pageNum * request.rowSize - i
          if (index > 0) {
            items.push({
              ...MockDataMemberPointAllocationListDataTable.allocation,
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

  getMemberPointDeductionList(request: PaginationModelRequest) {
    return new Promise<MemberPointDeductionListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const totalItems = 3128
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = 0; i < maxItemInPage; i++) {
          const index = totalItems - request.pageNum * request.rowSize - i
          if (index > 0) {
            items.push({
              ...MockDataMemberPointAllocationListDataTable.deduction,
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

export const memberPointAllocationApi = new MemberPointAllocationApi()
