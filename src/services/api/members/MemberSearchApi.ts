import { BaseApi } from '@/services'
import {
  DataTablePaginationResponseModel,
  memberRequestAccountStatusCodeResponse,
  memberRequestGenderCode,
  memberRequestGradeCode,
  memberRequestMarketingAgreeYn,
  MemberRequestModel,
  MemberRequestTableModel,
  MemberSearchResponseModel,
  MemberSearchTableModel,
  MemberSearchType
} from '@/models'
import { DEFAULT_DATE_TIME_FORMAT, formatTime } from '@/common'

class MemberSearchApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(
    params: MemberRequestModel,
    searchType?: string
  ): Promise<DataTablePaginationResponseModel<MemberRequestTableModel | MemberSearchTableModel>> {
    const { data, page } = await this.get('bo/members:search', params)
    const resData = {
      data: data.map((it: MemberSearchResponseModel): MemberRequestTableModel | MemberSearchTableModel => {
        const marketingAgreeYn = memberRequestMarketingAgreeYn.find((item) => item.value === it.agreement.marketingAgreeYn)?.label ?? ''
        const genderCode = memberRequestGenderCode.find((item) => item.value === it.genderCode)?.label ?? ''
        const gradeCode = memberRequestGradeCode.find((item) => item.value === it.gradeCode)?.label ?? ''
        const accountStatusCode = memberRequestAccountStatusCodeResponse.find((item) => item.value === it.accountStatusCode)?.label ?? ''
        const registeredDate = formatTime(it.auditing.registeredDate, DEFAULT_DATE_TIME_FORMAT)

        if (searchType === MemberSearchType.REQUEST) {
          return {
            memberKey: it.memberKey,
            memberName: it.memberName,
            memberId: it.memberId,
            genderCode: genderCode,
            employeeNumber: it.company.employeeNumber,
            rankName: it.company.rankName,
            gradeCode: gradeCode,
            customerKey: it.company.customerKey,
            customerName: it.company.customerName,
            companyLoadNameAddress: it.company.companyLoadNameAddress,
            marketingAgreeYn: marketingAgreeYn,
            registeredDate: registeredDate,
            latestLoginDate: formatTime(it.latestLoginDate, DEFAULT_DATE_TIME_FORMAT)
          }
        } else {
          return {
            memberKey: it.memberKey,
            memberName: it.memberName,
            memberId: it.memberId,
            customerName: it.company.customerName,
            employeeNumber: it.company.employeeNumber,
            cellphoneNumber: it.cellphoneNumber,
            marketingAgreeYn: marketingAgreeYn,
            gradeCode: gradeCode,
            accountStatusCode: accountStatusCode,
            registeredDate: registeredDate
          }
        }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }
}

export const memberSearchApi = new MemberSearchApi()
