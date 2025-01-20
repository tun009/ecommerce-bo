import {
  BaseModelErrorResponse,
  MemberDeliveryAddressDeleteDataRequest,
  MemberListDeliveryAddressResponse,
  MemberListListResponse,
  MemberListListResponseConvertor,
  MemberListRequest
} from '@/models/services'
import { BaseApi } from '../BaseApi'
class MemberListApi extends BaseApi {
  constructor() {
    super('member/bo/')
  }
  getMemberListList(request: MemberListRequest) {
    return new Promise<MemberListListResponse>((resolve) => {
      this.get('members', request)
        .then((data) => {
          resolve(MemberListListResponseConvertor.fromMemberListResponse(data))
        })
        .catch(() => {
          resolve({
            totalItems: 0,
            data: []
          })
        })
    })
  }

  async getMemberDeliveryAddressList(memberId: string): Promise<MemberListDeliveryAddressResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${memberId}/delivery-address`)
    const resData: MemberListDeliveryAddressResponse = {
      data: data.map((it: any) => {
        return {
          id: it.deliveryAddressKey,
          memberKey: it.memberKey,
          deliveryAddressCode: it.deliveryAddressCode,
          deliveryLoadNameAddress: it.deliveryLoadNameAddress,
          deliveryLoadLotBasedAddress: it.deliveryLoadLotBasedAddress,
          deliveryDetailedAddress: it.deliveryDetailedAddress,
          deliveryTelNumber: it.deliveryTelNumber,
          deliveryCellphoneNumber: it.deliveryCellphoneNumber
        }
      }),
      totalItems: pageRes?.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async deleteListDeliveryAddress(data: MemberDeliveryAddressDeleteDataRequest): Promise<BaseModelErrorResponse> {
    const reqData = { deliveryAddressKeys: data.deliveryAddressIds }
    return this.delete('delivery-address', reqData)
  }
}
export const memberListApi = new MemberListApi()
