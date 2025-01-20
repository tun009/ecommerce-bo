export enum EmployeeStatusEnum {
  Y = 'Y',
  N = 'N'
}

export enum AccountStatusEnum {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum GradeCodeEnum {
  GENERAL = 'GENERAL',
  BLACK = 'BLACK'
}

export enum GenderCodeEnum {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
  NONE = 'NONE'
}
export enum EmployeeStatusKrEnum {
  Y = '재직',
  N = '퇴사'
}

export enum AccountStatusKrEnum {
  ACTIVE = '사용',
  NOT_ACTIVE = '미사용'
}

export enum GradeCodeKrEnum {
  GENERAL = '일반',
  /* 05.12.23 do not create member with black grade */
  BLACK = '블랙'
}

export enum GenderCodeKrEnum {
  MAN = '남자',
  WOMAN = '여자',
  NONE = '구분없음'
}

export interface AddressModel {
  zipCode: string
  loadNameAddress: string
  loadLotBasedAddress: string
  detailedAddress: string
}

export type FilterResult<T> = {
  validItems: T[]
  invalidItems: T[]
}

export interface SelectOptionModel {
  label: string
  value: string
}

export const MemberGender = ['여자', '남자', '구분없음', 'MAN', 'WOMAN', 'NONE']

export const EmployeeStatus = ['재직', '퇴사', 'Y', 'N']

export const AccountStatus = ['사용', '미사용', 'ACTIVE', 'INACTIVE']

export const MemberShipLevel = ['일반', 'GENERAL']
