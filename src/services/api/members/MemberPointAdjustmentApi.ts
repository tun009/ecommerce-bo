import { BaseApi } from '../BaseApi'
import { MockDataMemberPointAllocationListDataTable } from '@/assets'
import {
  MemberPointAdjustmentDeleteListFormModel,
  MemberPointAdjustmentListResponse,
  MemberPointAdjustmentTableListFormModel,
  MemberPointAdjustmentUpdateResponse,
  PaginationModelRequest
} from '@/models'

class MemberPointAdjustmentApi extends BaseApi {
  getMemberPointAdjustmentDeleteList() {
    return new Promise<MemberPointAdjustmentListResponse>((resolve) => {
      setTimeout(() => {
        const items: MemberPointAdjustmentDeleteListFormModel[] = []
        const maxItemInPage = 30
        for (let i = 0; i < maxItemInPage; i++) {
          items.push({
            ...MockDataMemberPointAllocationListDataTable.adjustment,
            no: i,
            id: i
          })
        }
        resolve({
          data: items,
          totalItems: maxItemInPage
        })
      })
    })
  }

  getMemberPointAdjustmentList(request: PaginationModelRequest) {
    return new Promise<MemberPointAdjustmentUpdateResponse>((resolve) => {
      setTimeout(() => {
        const items: MemberPointAdjustmentTableListFormModel[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          items.push({
            ...MockDataMemberPointAllocationListDataTable.update
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

export const memberPointAdjustmentApi = new MemberPointAdjustmentApi()
