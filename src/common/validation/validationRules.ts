import {
  YYYYMMDD_Regex,
  bnameRegex,
  emailRegex,
  emailRegisterRegex,
  passwordRegex,
  phoneNumberRegex,
  phoneWithCharacterRegex,
  spaceMatchRegex,
  atSplitString
} from '@/common/regex'
import { AccountStatus, EmployeeStatus, MemberGender, MemberShipLevel } from '@/models'
import { boolean, mixed, number, object, string, ref as yupRef } from 'yup'
import {
  ALL_COMMON_MESSAGES,
  ALL_MEMBER_MESSAGES,
  CONFIRM_PASSWORD_REQUIRED,
  NEW_PASSWORD_INVALID,
  NEW_PASSWORD_LENGTH_INVALID,
  NEW_PASSWORD_NOT_MATCH,
  NEW_PASSWORD_REQUIRED,
  PASSWORD_INVALID,
  PASSWORD_REQUIRED,
  RESET_SAME_PASSWORD
} from './errorMessages'

export const isEmail = string().email()
export const isString = string()
export const isEmpty = string().required()
export const isNumber = number()
export const isPasswordValid = string()
  .required(PASSWORD_REQUIRED)
  .min(9, PASSWORD_INVALID)
  .max(16, PASSWORD_INVALID)
  .matches(passwordRegex, PASSWORD_INVALID)
export const isNewPasswordValid = string()
  .required(NEW_PASSWORD_REQUIRED)
  .min(9, NEW_PASSWORD_LENGTH_INVALID)
  .max(16, NEW_PASSWORD_LENGTH_INVALID)
  .matches(passwordRegex, NEW_PASSWORD_INVALID)
  .notOneOf([yupRef('password')], RESET_SAME_PASSWORD)
// .oneOf([yupRef('confirmNewPassword')], NEW_PASSWORD_NOT_MATCH)

export const isConfirmPasswordValid = string()
  .required(CONFIRM_PASSWORD_REQUIRED)
  .min(9, NEW_PASSWORD_LENGTH_INVALID)
  .max(16, NEW_PASSWORD_LENGTH_INVALID)
  .matches(passwordRegex, NEW_PASSWORD_INVALID)
  // .notOneOf([yupRef('password')], RESET_SAME_PASSWORD)
  .oneOf([yupRef('newPassword')], NEW_PASSWORD_NOT_MATCH)

export const isPasswordEmpty = string().required(PASSWORD_REQUIRED)
export const isBoolean = boolean()

/* [or mix rules](https://www.npmjs.com/package/yup#mixed) */
/* write separate test function and pass to callback if any type error happen */
export const isValidPattern = (value: any, pattern: RegExp) => {
  return pattern.test(value)
}

export const isInteger = (value: any) => {
  return /^\d+$/.test(value)
}
export const integerNumber = mixed().test('is-integer', 'The number must be integer!', isInteger)

export const isEven = (value: any) => {
  const val = isInteger(value)
  if (val && value % 2 === 0) {
    return true
  }
  return false
}

export const evenNumber = mixed().test('is-even', 'The number must be even!', isEven)
export const isValidEmail = (value: any) => {
  return emailRegex.test(value)
}
export const isBNameDataValid = (value: string) => {
  return bnameRegex.test(value)
}
export const isValidPhoneNumberWithCharacter = (value: any) => {
  return phoneWithCharacterRegex.test(value)
}

export const isValidImage = (fileType: string) => {
  return fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/gif' && fileType !== 'image/jpg'
}
export const isValidVideo = (fileType: string) => {
  return fileType !== 'video/mp4'
}

export const requiredFieldMissing = string().required(ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA)

export const memberSchema = object().shape({
  name: requiredFieldMissing.max(8, ALL_MEMBER_MESSAGES.MEMBER_NAME_INVALID),
  email: requiredFieldMissing.transform((value) => value.split(atSplitString)[0]).matches(emailRegisterRegex, ALL_MEMBER_MESSAGES.EMAIL_INVALID),
  phone: requiredFieldMissing.matches(phoneNumberRegex, ALL_MEMBER_MESSAGES.PHONE_NUMBER_INVALID),
  dateOfBirth: requiredFieldMissing.matches(YYYYMMDD_Regex, ALL_MEMBER_MESSAGES.BIRTH_DAY_INVALID),
  gender: mixed()
    .transform((value) => (value ? value.toString().replace(spaceMatchRegex, '') : value))
    .notOneOf([''], ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA)
    .oneOf(MemberGender, ALL_MEMBER_MESSAGES.GENDER_INVALID),
  employeeStatus: mixed()
    .transform((value) => (value ? value.toString().replace(spaceMatchRegex, '') : value))
    .notOneOf([''], ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA)
    .oneOf(EmployeeStatus, ALL_MEMBER_MESSAGES.EMPLOYEE_STATUS_INVALID),
  accountStatus: mixed()
    .transform((value) => (value ? value.toString().replace(spaceMatchRegex, '') : value))
    .notOneOf([''], ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA)
    .oneOf(AccountStatus, ALL_MEMBER_MESSAGES.ACCOUNT_STATUS_INVALID),
  memberShipLevel: mixed()
    .transform((value) => (value ? value.toString().replace(spaceMatchRegex, '') : value))
    .notOneOf([''], ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA)
    .oneOf(MemberShipLevel, ''),
  memberShipCode: string().notOneOf([''], ALL_COMMON_MESSAGES.MEMBERSHIP_CODE_INVALID),
  jobNumber: requiredFieldMissing,
  rank: requiredFieldMissing,
  customerCompanyCode: requiredFieldMissing
  // customer: requiredFieldMissing,
  // address: requiredFieldMissing
})
export const isValidDocument = (fileType: string) => {
  return fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'application/pdf' && fileType !== 'image/jpg'
}
/*
usage:
export const validationSchema = yup.object().shape({
     age: customRule.required()
    // other validation rules...
});
*/
