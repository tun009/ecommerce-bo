import { MemberDetailResponse } from '@/models'
import { BaseApi } from '../BaseApi'

class MemberDetailApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }

  async getDetail(memberKey: string): Promise<MemberDetailResponse> {
    const { data, ...otherRes } = await this.get(`${memberKey}`)
    const resData: MemberDetailResponse = {
      data: {
        memberKey: data.memberKey,
        name: data.memberName,
        id: data.memberId,
        email: data.email,
        membershipLevel: data.gradeCode,
        phoneNumber: data.cellphoneNumber,
        gender: data.genderCode,
        cleanup: data.deliveryZipCode,
        rank: data.company?.rankName,
        employmentStatus: data?.authenticationYn,
        accountStatus: data.accountStatusCode,
        companyCode: data.company.companyZipCode,
        customer: data.company.customerName
      }, ...otherRes
    }
    return Promise.resolve(resData)
  }
}

export const memberDetailApi = new MemberDetailApi()
