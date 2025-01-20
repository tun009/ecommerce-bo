import { MockDataMemberListCouponDetail } from '@/assets/mockData'
import { MemberListCouponDetailRequest, MemberListCouponDetailResponse } from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberListCouponDetailApi extends BaseApi {
  getMemberListCouponDetail(request: MemberListCouponDetailRequest) {
    return new Promise<MemberListCouponDetailResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberListCouponDetail,
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

export const memberListCouponDetailApi = new MemberListCouponDetailApi()
