import { MemberBulkRegistrationTableMockData } from '@/assets/mockData'
import { DataTablePaginationResponseModel, MemberRegistrationModel } from '@/models'
import {
  MemberBulkRegistrationRequest,
  MemberBulkRegistrationResponse,
  MemberMultiGetCompanyRequest,
  MemberMultiGetCompanyResponse,
  MemberRegisterInBulkRequest
} from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberRegistrationApi extends BaseApi {
  constructor() {
    super('member')
  }

  registerInBulk(request: MemberRegisterInBulkRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberRegistrationModel>>((resolve) => {
      setTimeout(() => {
        const items: MemberRegistrationModel[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          items.push({
            ...MemberBulkRegistrationTableMockData,
            id: i + 1
            // memberShipCode: MemberBulkRegistrationTableMockData.memberShipCode + i + ''
          })
        }
        resolve({
          totalItems: 1234,
          data: items
        })
      })
    })
  }
  getMultiCustomerCompany(request: MemberMultiGetCompanyRequest): Promise<MemberMultiGetCompanyResponse> {
    return this.post('bo/customer-companies:multiGet', request)
  }

  bulkRegistration(request: MemberBulkRegistrationRequest): Promise<MemberBulkRegistrationResponse> {
    return this.post('bo/members:batch', request)
  }
}

export const memberRegistrationApi = new MemberRegistrationApi()
