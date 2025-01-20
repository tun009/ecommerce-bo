import {
  BaseModelErrorResponse,
  MemberBlackListProcessStatusType,
  MemberDetailBlackMemberGetListParamsRequest,
  MemberDetailBlackMemberListResponse,
  MemberDetailBlackMemberRegisterDataRequest
} from '@/models'
import { BaseApi } from '../BaseApi'

class MemberDetailBlackMemberApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }

  async getList(memberKey: string, params: MemberDetailBlackMemberGetListParamsRequest): Promise<MemberDetailBlackMemberListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${memberKey}/blacklist`, params)
    const resData: MemberDetailBlackMemberListResponse = {
      data: data.map((it: any) => {
        return {
          id: it.memoKey,
          content: it.memo,
          registerId: it.auditing.registerId,
          registerName: it.auditing.registerName,
          registrationDate: it.auditing.registeredDate,
          reason: it.blackReasonCode,
          status: it.blackProcessStatus
        }
      }),
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async release(memberKey: string): Promise<BaseModelErrorResponse> {
    return this.post(`${memberKey}/blacklist:release`)
  }

  async register(memberKey: string, data: MemberDetailBlackMemberRegisterDataRequest): Promise<BaseModelErrorResponse> {
    const resData = {
      memo: data.message,
      blackProcessStatus: MemberBlackListProcessStatusType.REGISTER,
      blackReasonCode: data.reason
    }
    return this.post(`${memberKey}/blacklist:register`, resData)
  }
}

export const memberDetailBlackMemberApi = new MemberDetailBlackMemberApi()
