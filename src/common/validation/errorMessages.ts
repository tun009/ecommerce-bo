import { ErrorType, WelfareErrorMessage } from '@/models'

export const getMessageByType = (errorType: ErrorType, errorCode: string): string => {
  if (errorType === ErrorType.ALL_MAIN_MESSAGES) {
    return ALL_MAIN_MESSAGES[errorCode]
  }
  return ALL_MESSAGES[errorCode]
}

export const getAllMessage = (errorCode: string): string => {
  return ALL_MESSAGES[errorCode]
}
/* add type of the page error to below and in the model ErrorType*/

/* start common validation error code */
export const SUCCESS = 'SUCCESS'
export const DUPLICATED_EMAIL_MESSAGE = 'DUPLICATED_EMAIL_MESSAGE'
export const MISSING_REQUIRED_DATA = 'MISSING_REQUIRED_DATA'

/* end common validation error code */

/* start main validation error code */
export const PASSWORD_REQUIRED = 'PASSWORD_REQUIRED'
export const NEW_PASSWORD_REQUIRED = 'NEW_PASSWORD_REQUIRED'
export const RESET_SAME_PASSWORD = 'RESET_SAME_PASSWORD'
export const PASSWORD_INVALID = 'PASSWORD_INVALID'
export const CURRENT_PASSWORD_NOT_MATCH = 'CURRENT_PASSWORD_NOT_MATCH'
export const NEW_PASSWORD_INVALID = 'NEW_PASSWORD_INVALID'
export const NEW_PASSWORD_LENGTH_INVALID = 'NEW_PASSWORD_LENGTH_INVALID'
export const NEW_PASSWORD_NOT_MATCH = 'NEW_PASSWORD_NOT_MATCH'
export const CONFIRM_PASSWORD_REQUIRED = 'CONFIRM_PASSWORD_REQUIRED'
export const ID_REQUIRED = 'ID_REQUIRED'
export const PASSWORD_LOGIN_REQUIRED = 'PASSWORD_LOGIN_REQUIRED'
export const ID_OR_PASSWORD_NOT_MATCH = 'ID_OR_PASSWORD_NOT_MATCH'
export const LOCK_ACCOUNT = 'LOCK_ACCOUNT'
export const TEMP_PASSWORD = 'TEMP_PASSWORD'
export const PASSWORD_CHANGE_CYCLE = 'PASSWORD_CHANGE_CYCLE'
/* end main validation error code */

/* end member validation error code */
export const PHONE_NUMBER_INVALID = 'PHONE_NUMBER_INVALID'
export const MEMBER_NAME_INVALID = 'MEMBER_NAME_INVALID'
export const BIRTH_DAY_INVALID = 'BIRTH_DAY_INVALID'
export const GENDER_INVALID = 'GENDER_INVALID'
export const EMPLOYEE_STATUS_INVALID = 'EMPLOYEE_STATUS_INVALID'
export const ACCOUNT_STATUS_INVALID = 'ACCOUNT_STATUS_INVALID'
export const MEMBER_SHIP_LEVEL_INVALID = 'MEMBER_SHIP_LEVEL_INVALID'
export const MEMBERSHIP_CODE_INVALID = 'MEMBERSHIP_CODE_INVALID'
export const CUSTOMER_REQUIRED = 'CUSTOMER_REQUIRED'
export const NAME_MEMBER_REQUIRED= 'NAME_MEMBER_REQUIRED'
export const EMAIL_ID_REQUIRED ='EMAIL_ID_REQUIRED'
export const PHONE_REQUIRED = 'PHONE_REQUIRED'
export const EMAIL_PERSONAL_REQUIRED = 'EMAIL_PERSONAL_REQUIRED'
export const BIRTHDAY_REQUIRED = 'BIRTHDAY_REQUIRED'
export const JOB_NUMBER_REQUIRED = 'JOB_NUMBER_REQUIRED'
export const RANK_REQUIRED = 'RANK_REQUIRED'
export const CUSTOMER_ADDRESS_REQUIRED = 'CUSTOMER_ADDRESS_REQUIRED'
export const EMAIL_INVALID = 'EMAIL_INVALID'
/* end member validation error code */

export const ALL_COMMON_MESSAGES: WelfareErrorMessage = {
  [SUCCESS]: 'Success',
  [MISSING_REQUIRED_DATA]: '필수입력 누락'
}
export const ALL_MEMBER_MESSAGES: WelfareErrorMessage = {
  [DUPLICATED_EMAIL_MESSAGE]: '아이디{이메일} 중복',
  [EMAIL_INVALID]: '{이메일} 입력 오류',
  [MEMBER_NAME_INVALID]: '{회원명} 입력 오류',
  [PHONE_NUMBER_INVALID]: '{휴대폰번호} 입력 오류',
  [BIRTH_DAY_INVALID]: '{생년월일} 입력 오류',
  [GENDER_INVALID]: '{성별} 선택 오류',
  [EMPLOYEE_STATUS_INVALID]: '{재직상태} 선택 오류',
  [ACCOUNT_STATUS_INVALID]: '{계정상태} 선택 오류',
  [MEMBER_SHIP_LEVEL_INVALID]: '{계정상태} 선택 오류',
  [MEMBERSHIP_CODE_INVALID]: '{고객사 코드} 선택 오류'
}

export const ALL_MAIN_MESSAGES: WelfareErrorMessage = {
  [PASSWORD_REQUIRED]: '현재 비밀번호를 입력해 주세요.',
  [PASSWORD_INVALID]: '현재 비밀번호가 일치하지 않습니다.',
  [NEW_PASSWORD_REQUIRED]: '새 비밀번호를 입력해 주세요.',
  [NEW_PASSWORD_NOT_MATCH]: '새 비밀번호가 일치하지 않습니다.',
  [NEW_PASSWORD_LENGTH_INVALID]: '비밀번호는 9자~16자 이내여야 합니다.',
  [NEW_PASSWORD_INVALID]: '비밀번호는 영문+숫자+특수문자를 조합해야 합니다.',
  [RESET_SAME_PASSWORD]: '동일한 비밀번호로 재설정할 수 없습니다.',
  [CONFIRM_PASSWORD_REQUIRED]: '새 비밀번호를 한 번 더 입력해 주세요.',
  [CURRENT_PASSWORD_NOT_MATCH]: '현재 비밀번호가 일치하지 않습니다.',
  [ID_REQUIRED]: '아이디를 입력해 주세요.',
  [PASSWORD_LOGIN_REQUIRED]: '비밀번호를 입력해 주세요.',
  [ID_OR_PASSWORD_NOT_MATCH]: '아이디 또는 비밀번호가 일치하지 않습니다.',
  [LOCK_ACCOUNT]: '해당 계정이 잠금 처리되었습니다. 관리자에게 문의해 주세요.',
  [TEMP_PASSWORD]: '임시비밀번호로 로그인하셨습니다. 비밀번호를 재설정해 주세요.',
  [PASSWORD_CHANGE_CYCLE]: '개인정보 보호를 위해 3개월마다 비밀번호 변경이 필요합니다. 새로운 비밀번호로 변경해 주세요.'
}

export const MEMBER_REGISTER_INDIVIDUAL: WelfareErrorMessage = {
  [CUSTOMER_REQUIRED]: '{고객사} 입력해 주세요.',
  [NAME_MEMBER_REQUIRED]: '{회원명} 입력해 주세요.',
  [EMAIL_ID_REQUIRED]: '{아이디} 입력해 주세요.',
  [PASSWORD_REQUIRED]: '{비밀번호} 입력해 주세요.',
  [PHONE_REQUIRED]: '{휴대폰 번호} 입력해 주세요.',
  [EMAIL_PERSONAL_REQUIRED]: '{개인 이메일} 입력해 주세요.',
  [BIRTHDAY_REQUIRED]: '{생년월일} 입력해 주세요.',
  [JOB_NUMBER_REQUIRED]: '{사번} 입력해 주세요.',
  [RANK_REQUIRED]: '{직급} 입력해 주세요.',
  [CUSTOMER_ADDRESS_REQUIRED]: '입력해 주세요',
  [PASSWORD_INVALID]: '{비밀번호} 잘못된 형식',
  [EMAIL_INVALID] : '{아이디}잘못된 형식'
}

export const ALL_MESSAGES: WelfareErrorMessage = {
  ...ALL_COMMON_MESSAGES,
  ...ALL_MAIN_MESSAGES,
  ...ALL_MEMBER_MESSAGES
}
