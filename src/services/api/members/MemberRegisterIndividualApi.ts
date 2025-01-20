import { MemberCustomerRegisterIndividualRequest, MemberCustomerRegisterIndividualResponse } from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberRegisterIndividualApi extends BaseApi {
  constructor() {
    super('member')
  }

  saveIndividualMember(data: MemberCustomerRegisterIndividualRequest): Promise<MemberCustomerRegisterIndividualResponse> {
    return this.post('bo/members', data)
  }
}

export const memberRegisterIndividualApi = new MemberRegisterIndividualApi()
