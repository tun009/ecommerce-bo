import { MockDataMemberOutgoingNumberListDataTable } from '@/assets/mockData'
import { MemberOutgoingNumberListRequest, MemberOutgoingNumberListResponse } from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberOutgoingNumberListApi extends BaseApi {
  getOutgoingNumbers(request: MemberOutgoingNumberListRequest) {
    return new Promise<MemberOutgoingNumberListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberOutgoingNumberListDataTable,
            id: index,
            number: index
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

export const memberOutgoingNumberListApi = new MemberOutgoingNumberListApi()
