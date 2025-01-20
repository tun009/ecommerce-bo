import { MockDataMemberCustomerSpecialInfo } from '@/assets/mockData'
import { MemberCustomerSpecialInfoModelRequest, MemberCustomerSpecialInfoModelResponse } from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberCustomerSpecialInfoApi extends BaseApi {
  getMemberCustomerSpecialInfoList(request: MemberCustomerSpecialInfoModelRequest) {
    return new Promise<MemberCustomerSpecialInfoModelResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberCustomerSpecialInfo,
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

export const memberCustomerSpecialInfoApi = new MemberCustomerSpecialInfoApi()
