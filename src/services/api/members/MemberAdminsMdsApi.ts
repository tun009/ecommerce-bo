import { BaseApi } from '@/services'
import { MemberAdminsMdsResponse } from '@/models'

class MemberAdminsMdsApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(searchWord: string): Promise<MemberAdminsMdsResponse> {
    return this.get('bo/admins/mds', { searchWord: searchWord })
  }
}

export const memberAdminsMdsApi = new MemberAdminsMdsApi()
