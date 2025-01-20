import { MockDataMemberListPointDetail } from '@/assets/mockData'
import {
  MemberListPointPaymentDetailRequest,
  MemberListPointPaymentDetailResponse,
  MemberListPointUsageDetailRequest,
  MemberListPointUsageDetailResponse
} from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberListPointDetailApi extends BaseApi {
  getMemberListPointPaymentDetail(request: MemberListPointPaymentDetailRequest) {
    return new Promise<MemberListPointPaymentDetailResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberListPointDetail.payment,
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
  getMemberListPointUsageDetail(request: MemberListPointUsageDetailRequest) {
    return new Promise<MemberListPointUsageDetailResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberListPointDetail.usage,
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

export const memberListPointDetailApi = new MemberListPointDetailApi()
