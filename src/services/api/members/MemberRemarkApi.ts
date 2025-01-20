import { BaseModelErrorResponse, MemberRemarkDeleteDataRequest, MemberRemarkGetListParamsRequest, MemberRemarkGetListResponse } from '@/models'
import { BaseApi } from '@/services'

class MemberRemarkApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }

  async getList(memberId: string, params: MemberRemarkGetListParamsRequest): Promise<MemberRemarkGetListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${memberId}/remarks`, params)
    const resData: MemberRemarkGetListResponse = {
      data: data.map((it: any) => {
        return {
          id: it.memoKey,
          detail: it.memo,
          registerId: it.auditing.registerId,
          registerName: it.auditing.registerName,
          registrationDate: it.auditing.modifiedDate
        }
      }),
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async postItem(memberKey: string, message: string): Promise<BaseModelErrorResponse> {
    const data = { memo: message }
    return this.post(`${memberKey}/remarks`, data)
  }

  async deleteList(data: MemberRemarkDeleteDataRequest): Promise<BaseModelErrorResponse> {
    const reqData = { memoKeys: data.memoIds }
    return this.delete('remarks', reqData)
  }
}

export const memberRemarkApi = new MemberRemarkApi()
