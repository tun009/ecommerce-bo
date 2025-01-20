import { MemberRequestModel } from '@/models'
import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'

export class MemberRequestRequestConvertor {
  static from(member: MemberRequestModel, page: number, size: number): MemberRequestModel {
    return {
      pageNum: page + 1,
      rowSize: size,
      memberKey: member.memberKey,
      memberName: member.memberName,
      memberId: member.memberId,
      customerKey: member.customerKey,
      employeeNumber: member.employeeNumber,
      cellphoneNumber: member.cellphoneNumber,
      gradeCode: member.gradeCode,
      accountStatusCode: member.accountStatusCode,
      marketingAgreeYn: member.marketingAgreeYn,
      startDate: formatTime(member.startDate, DEFAULT_DATE_FORMAT),
      endDate: formatTime(member.endDate, DEFAULT_DATE_FORMAT)
    }
  }
}
