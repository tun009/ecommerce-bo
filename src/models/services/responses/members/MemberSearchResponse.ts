import { BaseModelResponse } from '@/models'

export interface MemberSearchResponse extends BaseModelResponse<MemberSearchResponseModel> {}

export interface MemberSearchResponseModel {
  memberKey: number
  memberId: string
  memberName: string
  cellphoneNumber: string
  accountStatusCode: string
  gradeCode: string
  genderCode: string
  latestLoginDate: string
  company: {
    customerKey: number
    customerName: string
    employeeNumber: string
    rankName: string
    companyLoadNameAddress: string
  }
  agreement: {
    marketingAgreeYn: string
  }
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}
