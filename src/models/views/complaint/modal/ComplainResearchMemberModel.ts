import { ComplaintResearchMemberType, WelfareSelectOptionType } from '@/models'

export interface ComplaintResearchMemberModalProps {
  searchInput?: string
  onCancel?: () => void
  onSelect: (value: ComplaintResearchMemberModel) => void
  searchResData: ComplaintResearchMemberModel
  searchType?: ComplaintResearchMemberType
}

export interface ComplaintResearchMemberModel {
  memberKey: string
  memberName: string
}

export interface ComplaintResearchMemberTableModel {
  memberKey: number
  memberName: string
  memberId: string
  genderCode: string
  employeeNumber: string
  rankName: string
  gradeCode: string
  customerKey: number
  customerName: string
  companyLoadNameAddress: string
  marketingAgreeYn: string
  registeredDate: string
  latestLoginDate: string
}

export interface ComplaintResearchMemberSearchTableModel {
  memberKey: number
  memberName: string
  memberId: string
  customerName: string
  employeeNumber: string
  cellphoneNumber: string
  marketingAgreeYn: string
  gradeCode: string
  accountStatusCode: string
  registeredDate: string
}

export interface ComplaintResearchMemberWrapperProps {
  placeholderInput: string
  labelButton?: string
  defaultValue?: string
  disabled?: boolean
}

export type ComplaintResearchMemberWrapperEmits = (e: 'selectValue', value: ComplaintResearchMemberModel) => void

export const complaintResearchMemberModalRequestGradeCode: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '일반', value: 'GENERAL' },
  { label: '블랙', value: 'BLACK' }
]

export const complaintResearchMemberModalRequestAccountStatusCode: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' }
]

export const complaintResearchMemberModalRequestAccountStatusCodeResponse: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '사용', value: 'ACTIVE' },
  { label: '미사용', value: 'NOT_ACTIVE' }
]

export const complaintResearchMemberModalRequestMarketingAgreeYn: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '동의', value: 'Y' },
  { label: '미동의', value: 'N' }
]

export const complaintResearchMemberModalRequestGenderCode: WelfareSelectOptionType[] = [
  { label: '남자', value: 'MAN' },
  { label: '여자', value: 'WOMAN' },
  { label: 'NONE', value: 'NONE' }
]

export const complaintResearchMemberModalRequestTableHeaderConfig = [
  { header: '회원코드', field: 'memberKey', class: 'wf_m-w-120 ' },
  { header: '회원명', field: 'memberName', class: 'wf_m-w-120 ' },
  { header: '아이디(이메일)', field: 'memberId', class: 'wf_m-w-120 ' },
  { header: '성별', field: 'genderCode', class: 'wf_m-w-120 ' },
  { header: '사번', field: 'employeeNumber', class: 'wf_m-w-120 ' },
  { header: '직급', field: 'rankName', class: 'wf_m-w-120 ' },
  { header: '회원구분', field: 'gradeCode', class: 'wf_m-w-120 ' },
  { header: '고객사코드', field: 'customerKey', class: 'wf_m-w-120 ' },
  { header: '고객사', field: 'customerName', class: 'wf_m-w-120 ' },
  { header: '고객사 주소', field: 'companyLoadNameAddress', class: 'wf_m-w-120 wf-company-address' },
  { header: '마케팅 동의', field: 'marketingAgreeYn', class: 'wf_m-w-70 ' },
  { header: '회원등록일', field: 'registeredDate', class: 'wf_m-w-150 ' },
  { header: '최근 접속일', field: 'latestLoginDate', class: 'wf_m-w-150 ' }
]

export const complaintResearchMemberModalTableHeaderConfig = [
  { header: '회원코드', field: 'memberKey', class: 'wf_m-w-120 ' },
  { header: '회원명', field: 'memberName', class: 'wf_m-w-120 ' },
  { header: '아이디', field: 'memberId', class: 'wf_m-w-120 ' },
  { header: '고객사', field: 'customerName', class: 'wf_m-w-120 ' },
  { header: '사번', field: 'employeeNumber', class: 'wf_m-w-120 ' },
  { header: '휴대폰번호', field: 'cellphoneNumber', class: 'wf_m-w-120 ' },
  { header: '마케팅 동의', field: 'marketingAgreeYn', class: 'wf_m-w-120 ' },
  { header: '회원구분', field: 'gradeCode', class: 'wf_m-w-120 ' },
  { header: '계정상태', field: 'accountStatusCode', class: 'wf_m-w-120 ' },
  { header: '회원등록일', field: 'registeredDate', class: 'wf_m-w-120 ' }
]
