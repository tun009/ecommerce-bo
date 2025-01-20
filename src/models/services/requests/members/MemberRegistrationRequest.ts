import { hyphenRegex, spaceMatchRegex } from '@/common'
import {
  AccountStatusEnum,
  AccountStatusKrEnum,
  EmployeeStatusEnum,
  EmployeeStatusKrEnum,
  GenderCodeEnum,
  GenderCodeKrEnum,
  GradeCodeEnum,
  GradeCodeKrEnum
} from '@/models/common'
import { PaginationModelRequest } from '@/models/services'
import { MemberRegistrationModel } from '@/models/views'
export interface MemberRegisterInBulkRequest extends PaginationModelRequest {}

interface CompanyInfoModel {
  customerKey: number
  employeeNumber: string
  holdingOfficeYn: string
  rankName: string
  companyZipCode?: number
  companyLoadNameAddress?: string
  companyLoadLotBasedAddress?: string
  companyDetailedAddress?: string
}

interface MemberRegistrationModelApi {
  memberId: string
  memberName: string
  cellphoneNumber: string
  birthDate: string
  genderCode: string
  accountStatusCode: string
  gradeCode: string
  company: CompanyInfoModel
}
export interface MemberBulkRegistrationRequest {
  batchRequests: MemberRegistrationModelApi[]
}
export interface MemberMultiGetCompanyRequest {
  customerKeyList: number[]
}

export class MemberRegistrationRequestConvertor {
  static from(member: MemberRegistrationModel): MemberRegistrationModelApi {
    const {
      email,
      name,
      phone,
      dateOfBirth,
      gender,
      accountStatus,
      memberShipLevel,
      customerCompanyCode,
      jobNumber,
      rank,
      employeeStatus,
      companyZipCode,
      companyLoadNameAddress,
      companyLoadLotBasedAddress,
      companyDetailedAddress
    } = member

    const genderCode =
      {
        [GenderCodeKrEnum.MAN]: GenderCodeEnum.MAN,
        [GenderCodeKrEnum.WOMAN]: GenderCodeEnum.WOMAN,
        [GenderCodeKrEnum.NONE]: GenderCodeEnum.NONE
      }[gender.replace(spaceMatchRegex, '').toUpperCase()] ?? gender

    const accountStatusCode =
      {
        [AccountStatusKrEnum.ACTIVE]: AccountStatusEnum.ACTIVE,
        [AccountStatusKrEnum.NOT_ACTIVE]: AccountStatusEnum.INACTIVE
      }[accountStatus.replace(spaceMatchRegex, '').toUpperCase()] ?? accountStatus

    const gradeCode = memberShipLevel

    const rankName =
      {
        [GradeCodeKrEnum.GENERAL]: GradeCodeEnum.GENERAL
      }[rank.replace(spaceMatchRegex, '').toUpperCase()] ?? rank

    const holdingOfficeYn =
      {
        [EmployeeStatusKrEnum.Y]: EmployeeStatusEnum.Y,
        [EmployeeStatusKrEnum.N]: EmployeeStatusEnum.N
      }[employeeStatus.replace(spaceMatchRegex, '').toUpperCase()] ?? employeeStatus

    return {
      memberId: email,
      memberName: name,
      cellphoneNumber: phone.replace(hyphenRegex, ''),
      birthDate: dateOfBirth,
      genderCode,
      accountStatusCode,
      gradeCode,
      company: {
        customerKey: customerCompanyCode,
        employeeNumber: jobNumber,
        rankName,
        holdingOfficeYn,
        companyZipCode,
        companyLoadNameAddress,
        companyLoadLotBasedAddress,
        companyDetailedAddress
      }
    }
  }
}
