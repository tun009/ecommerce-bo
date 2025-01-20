import { MockDataMemberListOrderDetail } from '@/assets/mockData'
import { MemberListOrderDetailResponse, MemberListOrderDetailRequest } from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberListOrderDetailApi extends BaseApi {
  getMemberListOrderDetail(request: MemberListOrderDetailRequest) {
    return new Promise<MemberListOrderDetailResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberListOrderDetail,
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

export const memberListOrderDetailApi = new MemberListOrderDetailApi()
