import { BaseApi } from '@/services'
import { MemberCustomerSearchRequest, productContractStatus } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'

class MemberCustomerSearchApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(params: MemberCustomerSearchRequest) {
    const { data } = await this.get('bo/customer-companies:search', params)
    let dataRecord = 0
    const resData = {
      data: data
        .filter((it: any) => {
          return it.customerStatus === 'Y' || it.customerStatus === 'N'
        })
        .map((it: any) => {
          dataRecord++
          let contactStatus
          productContractStatus.forEach((item) => {
            if (it.contractStatus === item.value) {
              contactStatus = item.label
            }
          })

          return {
            code: it.customerKey,
            name: it.customerName,
            status: it.customerStatus === 'Y' ? '활성' : '비활성',
            registrationCode: it.bizRegNum,
            companyRegistrationCode: it.corpRegNum,
            contractStatus: contactStatus,
            startContractDate: formatTime(it.contractStartDate, DEFAULT_DATE_FORMAT_DOT),
            endContractDate: formatTime(it.contractEndDate, DEFAULT_DATE_FORMAT_DOT),
            registrationDate: formatTime(it.createdDate, DEFAULT_DATE_FORMAT_DOT)
          }
        }),
      totalItems: dataRecord
    }
    return Promise.resolve(resData)
  }
}

export const memberCustomerSearchApi = new MemberCustomerSearchApi()
