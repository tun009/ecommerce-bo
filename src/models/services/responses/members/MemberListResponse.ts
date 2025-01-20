import { DEFAULT_DATETIME_FORMAT_DOT, formatTime } from '@/common'
import { MemberListDataTableModel } from '@/models/views'
import { DataTablePaginationResponseModel } from '../BaseModelResponse'
import { ref } from 'vue'

export interface MemberListListResponse extends DataTablePaginationResponseModel<MemberListDataTableModel> {}
export const allSuccessDataMember = ref<MemberListDataTableModel[]>([])
export class MemberListListResponseConvertor {
  static fromMemberListResponse(data: any): MemberListListResponse {
    const items: MemberListDataTableModel[] = []
    allSuccessDataMember.value = []
    const maxItemInPage = data.data.length
    for (let i = 0; i < maxItemInPage; i++) {
      const itemData = {
        code: data.data[i].memberKey,
        name: data.data[i].memberName,
        email: data.data[i].memberId,
        phone: data.data[i].cellphoneNumber,
        gender: data.data[i].genderCode,
        employeeNumber: data.data[i].company.employeeNumber,
        rank: data.data[i].company.rankName,
        employmentStatus: data.data[i].authenticationYn,
        accountStatus: data.data[i].accountStatusCode,
        membershipLevel: data.data[i].gradeCode,
        customerCompanyCode: data.data[i].company.customerKey,
        customer: data.data[i].company.customerName,
        customerAddress: data.data[i].company.companyLoadNameAddress,
        certification: data.data[i].auditing.modifierName,
        marketingConsent: data.data[i].agreement.marketingAgreeYn,
        lastAccessDate:
          formatTime(data.data[i].latestLoginDate, DEFAULT_DATETIME_FORMAT_DOT) === 'Invalid Date'
            ? '-'
            : formatTime(data.data[i].latestLoginDate, DEFAULT_DATETIME_FORMAT_DOT),
        registrationDateTime: formatTime(data.data[i].auditing.registeredDate, DEFAULT_DATETIME_FORMAT_DOT),
      }
      items.push({
        ...itemData
      })
      allSuccessDataMember.value.push({
        ...itemData
      })
    }
    return {
      totalItems: data.page.totalCount,
      data: items
    }
  }
}
