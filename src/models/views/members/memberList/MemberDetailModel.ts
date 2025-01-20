export interface MemberDetailBaseModel {
  memberKey: string
  name: string
  id: any
  email?: string
  membershipLevel: string
  phoneNumber: string
  gender: string
  cleanup: string
  rank: string
  employmentStatus: string
  accountStatus: string
  companyCode: string
  customer: string
}

export interface MemberDetailBaseTabProps {
  data: MemberDetailBaseModel
}

export enum MemberBlackListProcessStatusType {
  REGISTER = 'REGISTER',
  RELEASE = 'RELEASE'
}

export enum MemberBlackReasonCodeType {
  REPT_PUCH = 'REPT_PUCH',
  VERBAL_ABU = 'VERBAL_ABU',
  DISTURB = 'DISTURB',
  ETC = 'ETC'
}

export interface MemberDetailBlackMemberModel {
  id: number | string,
  content: string,
  reason: string,
  registerId: number | string,
  registerName: string,
  registrationDate: string,
  status: MemberBlackListProcessStatusType
}

export interface MemberDetailBlackMemberRegistrationModalProps {
  member: MemberDetailBaseModel
  onRefresh: () => void
}

export interface MemberDetailBaseInformationModel {
  customer: string
  nameCustomer: string
  idRegister: string
  password: string
  phone: string
  level: string
  employeeNumber: any
  employeeStatus: any
  birthDate: string
  gender: any
  positionMember: string
  certification: string
  emailPersonal: string
  customerAddress: {
    zipCode: string,
    loadNameAddress: string,
    loadLotBasedAddress: string,
    detailedAddress: string
  }
  memberRegistrationDateTime: string
  accountStatus: any
  lassAccessDate: string,
  passwordChangeDate: string
  companyAddress: {
    zipCode: string,
    loadNameAddress: string,
    loadLotBasedAddress: string,
    detailedAddress: string
  }
  customerKey: string
  latestBlackListChangedAdminId: string
  latestBlackListChangeAdminName: string
  latestBlackListChangedDate: string
}

export interface MemberDetailWelfareMallInformationModel {
  selectAgreeItem: string
  isAgree: boolean
  dateApplication: string
  isAgreeCheck?: boolean
}

export interface MemberDetailWelfareMallDataModel {
  marketingAgreeYn: string,
  smsAgreeYn: string,
  emailAgreeYn: string,
  kakaoAgreeYn: string,
  marketingAgreeDate?: string,
  smsAgreeDate?: string,
  emailAgreeDate?: string,
  kakaoAgreeDate?: string
}
export interface MemberDetailWelfareMallInMallInformationModel {
  salesCompanyName: string
  division: string
  isAgree: boolean
  dateApplication: string
  isAgreeCheck?: boolean
}

export enum MemberListTabType {
  BASE_INFORMATION = 'base-information',
  DELIVERY_ADDRESS = 'delivery-address',
  ORDER_DETAIL = 'order-detail',
  COUPON_DETAIL = 'coupon-detail',
  WELFARE_POINT_DETAIL = 'point-detail',
  EVENT_DETAIL = 'event-detail',
  INQUIRY_CS = 'inquiry-cs',
  CUSTOMER_SPECIAL_INFO = 'customer-special-information'
}
