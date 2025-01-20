import { BaseModelResponse } from '../BaseModelResponse'

export interface MemberBulkRegistration {
  memberKey: number
  memberId: string
  isSuccessful: 'Y' | 'N'
  reasonOfFailed?: string
}

interface CustomerAddress {
  customerKey: number
  customerName: string
  zipCode: string
  streetAddress: string
  address: string
  addressDetail: string
}

export const memberRegistrationCompanyEmpty = {
  code: '',
  message: '',
  data: []
}

export interface MemberBulkRegistrationResponse extends BaseModelResponse<MemberBulkRegistration[]> {}

export interface MemberMultiGetCompanyResponse extends BaseModelResponse<CustomerAddress[]> {}
