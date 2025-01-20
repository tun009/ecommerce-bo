import { DEFAULT_DATE_FORMAT_ERROR_MESSAGE_NULL, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, PASSWORD_TEXT, formatTime } from '@/common'
import {
  BaseModelResponse,
  MemberAccountStatus,
  MemberDetailBaseInformationModel,
  MemberDetailBaseModel,
  MemberDetailWelfareMallInformationModel,
  MemberDetailWelfareMallInMallInformationModel,
  MemberGenderCode,
  MemberHoldingOfficeYn
} from '@/models'

export type MemberDetailResponse = BaseModelResponse<MemberDetailBaseModel>

export interface MemberDetailBaseInformationResponse {
  data: MemberDetailBaseInformationModel
}

export class MemberDetailBaseInformationResponseConvertor {
  static fromMemberBaseInformationDetailResponse(data: any) {
    return {
      customer: data.data.company.customerName,
      nameCustomer: data.data.memberName,
      idRegister: data.data.memberId,
      password: PASSWORD_TEXT,
      phone: data.data.cellphoneNumber,
      level: data.data.company.rankName,
      employeeNumber: data.data.company.employeeNumber,
      employeeStatus:
        data.data.company.holdingOfficeYn === MemberHoldingOfficeYn.YES ? Number(MemberHoldingOfficeYn.VALUE_YES) : Number(MemberHoldingOfficeYn.VALUE_NO),
      birthDate: data.data.birthDate,
      gender: data.data.genderCode === MemberGenderCode.MAN ? 2 : data.data.genderCode === MemberGenderCode.NONE ? 0 : 1,
      positionMember: data.data.gradeCode,
      certification: data.data.company.companyZipCode,
      emailPersonal: data.data.email,
      customerAddress: {
        zipCode: data.data.deliveryZipCode,
        loadNameAddress: data.data.deliveryLoadNameAddress,
        loadLotBasedAddress: data.data.deliveryLoadLotBasedAddress,
        detailedAddress: data.data.deliveryDetailedAddress,
      },
      memberRegistrationDateTime: formatTime(data.data.auditing.registeredDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS),
      accountStatus: data.data.accountStatusCode === MemberAccountStatus.ACTIVE ? 0 : 1,
      lassAccessDate: formatTime(data.data.latestLoginDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS),
      passwordChangeDate:
        formatTime(data.data.passwordChangeDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) == DEFAULT_DATE_FORMAT_ERROR_MESSAGE_NULL
          ? FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS
          : formatTime(data.data.passwordChangeDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS),
      companyAddress: {
        zipCode: data.data.company.companyZipCode,
        loadNameAddress: data.data.company.companyLoadNameAddress,
        loadLotBasedAddress: data.data.company.companyLoadLotBasedAddress,
        detailedAddress: data.data.company.companyDetailedAddress,
      },
      customerKey: data.data.company.customerKey,
      latestBlackListChangedAdminId: data.data.latestBlackListChangedAdminId,
      latestBlackListChangeAdminName: data.data.latestBlackListChangeAdminName,
      latestBlackListChangedDate: data.data.latestBlackListChangedDate
    }
  }
}

export interface MemberDetailAcceptInformationMallResponse {
  data: MemberDetailWelfareMallInformationModel[]
}

export interface MemberDetailAcceptInformationMallInMallResponse {
  data: MemberDetailWelfareMallInMallInformationModel[]
}
