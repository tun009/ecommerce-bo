import { WelfareSelectOptionType } from '@/models'

export interface MemberPointAdjustmentDeleteListFormModel {
  id: number
  no: number
  membershipCode: string
  memberName: string
  idEmail: string
  phoneNumber: string
  customerCompanyCode: string
  customer: string
  lastAccessDate: string
  delete: string
}

export interface MemberPointAdjustmentTableListFormModel {
  membershipCode: string
  memberName: string
  idEmail: string
  phoneNumber: string
  allocationPoints: string
  individualAdjustmentPoints: string
  pointsAfterAdjustment: string
  adjustmentNotes: string
  remarks: string
  companyCode: string
  customer: string
}

export interface MemberPointAdjustmentListFormModel {
  no: number
  customerCode: string
  customer: string
  pointDeductionCode: string
  pointClassification: string
  pointType: string
  pointDeductionName: string
  deductedPoint: string
  numberOfSubjects: number
  baseYear: number
  startUsing: string
  registrant: string
}

export interface MemberPointAdjustmentFormModel {
  pointAdjustmentCode: string
  pointAdjustmentName: string
  pointClassification: string
  pointType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  pointAllocationName: string
  allottedPoint: string
  totalAllocatedPoints: string
  administratorNotes: string
  reasonAdjustment: string
  pointAllocationTarget: string
}

export interface MemberPointListFormFieldModel {
  label: string
  field: string
  placeholder?: string
  optionsNormal?: WelfareSelectOptionType[]
  options?: WelfareSelectOptionType[]
  optionsSpecial?: WelfareSelectOptionType[]
}

export const memberPointAdjustmentListModelConfig = {
  listInputRow1: [
    {
      label: '복지포인트 배정코드',
      placeholder: '포인트 코드 입력',
      field: 'pointAdjustmentCode'
    },
    {
      label: '등록상태',
      field: 'pointAdjustmentName'
    }
  ],
  listSelectRow2: [
    {
      label: '복지 포인트 구분',
      field: 'pointClassification',
      optionsNormal: [
        { label: '선복 복지포인트', value: '1' },
        { label: '특별 복지포인트 ', value: '2' }
      ]
    },
    {
      label: '복지포인트 유형',
      field: 'pointType',
      optionsNormal: [
        { label: '전체', value: '1' },
        { label: '명절포인트', value: '2' },
        { label: '이벤트', value: '3' }
      ],
      optionsSpecial: [
        { label: '전체', value: '1' },
        { label: '생일포인트', value: '2' },
        { label: '이벤트', value: '3' }
      ]
    }
  ],
  listInputRow3: {
    label: '복지포이트 배정명',
    placeholder: '포인트 코드 입력',
    field: 'pointAllocationName'
  },
  listInputRow4: [
    {
      label: '배정 복지포인트',
      placeholder: '포인트 코드 입력',
      field: 'allottedPoint'
    },
    {
      label: '총 배정 복지포인트',
      field: 'totalAllocatedPoints'
    }
  ],
  inputRow6: {
    label: '배정 복지포인트',
    placeholder: '포인트 코드 입력',
    field: 'administratorNotes'
  },
  inputRow7: {
    label: '조정등록 사유 입력',
    placeholder: '포인트 코드 입력',
    field: 'reasonAdjustment'
  },
  listSelectRow8: {
    label: '복지 포인트 배정 대상',
    field: 'pointAllocationTarget',
    optionsNormal: [
      { label: '전체 회원 (N,NNN명)', value: '1' },
      { label: '회원 지정', value: '2' },
      { label: '일괄 지정', value: '3' }
    ]
  }
}

export interface MemberPointAdjustmentTableFormModel {
  typeSearch: WelfareSelectOptionType
  querySearch: string
  filterType: WelfareSelectOptionType
}

export const memberPointAdjustmentTableModelConfig = {
  selectRow1: {
    label: '복지 포인트 구분',
    field: 'typeSearch',
    optionsNormal: [
      { label: '회원명', value: '1' },
      { label: '회원코드', value: '2' }
    ]
  },

  inputRow1: {
    label: '등록상태',
    placeholder: '쉼표(,)구분하여 검색어 입력',
    field: 'querySearch'
  },
  selectRow2: {
    label: '복지 포인트 구분',
    field: 'filterType',
    optionsNormal: [
      { label: '일괄 조정 선택', value: '1' },
      { label: '일괄 추가', value: '2' }
    ]
  },
  inputRow2: {
    label: '등록상태',
    placeholder: '쉼표(,)구분하여 검색어 입력',
    field: 'queryType'
  }
}

export const MemberWelfarePointAdjustmentTableConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '고객사 코드',
    field: 'customerCode',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-120'
  },
  {
    header: '복지포인트 차감코드',
    field: 'pointDeductionCode',
    class: 'wf_m-w-200'
  },
  {
    header: '복지포인트 구분',
    field: 'pointClassification',
    class: 'wf_m-w-168'
  },
  {
    header: '복지포인트 유형',
    field: 'pointType',
    class: 'wf_m-w-140 '
  },
  {
    header: '복지포인트 차감명',
    field: 'pointDeductionName',
    class: 'wf_m-w-231'
  },
  {
    header: '배정 복지포인트',
    field: 'deductedPoint',
    class: 'wf_m-w-120 '
  },
  {
    header: '대상자수',
    field: 'numberOfSubjects',
    class: 'wf_m-w-100'
  },
  {
    header: '기준년도',
    field: 'baseYear',
    class: 'wf_m-w-200'
  },
  {
    header: '사용시작',
    field: 'startUsing',
    class: 'wf_m-w-200'
  },
  {
    header: '등록자',
    field: 'registrant',
    class: 'wf_m-w-200'
  }
]

export const MemberPointAdjustmentTableDeleteConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '회원코드',
    field: 'membershipCode',
    class: 'wf_m-w-120'
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-120'
  },
  {
    header: '아이디(이메일)',
    field: 'idEmail',
    class: 'wf_m-w-200'
  },
  {
    header: '휴대폰번호',
    field: 'phoneNumber',
    class: 'wf_m-w-200'
  },
  {
    header: '고객사코드',
    field: 'customerCompanyCode',
    class: 'wf_m-w-100 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-200'
  },
  {
    header: '최근접속일',
    field: 'lastAccessDate',
    class: 'wf_m-w-231'
  },
  {
    header: '삭제',
    field: 'delete',
    class: 'wf_m-w-100'
  }
]

export const MemberPointAdjustmentTableUpdateConfig = [
  {
    header: '회원코드',
    field: 'membershipCode',
    class: 'wf_m-w-80'
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-100'
  },
  {
    header: '아이디(이메일)',
    field: 'idEmail',
    class: 'wf_m-w-150'
  },
  {
    header: '휴대폰번호',
    field: 'phoneNumber',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사코드',
    field: 'allocationPoints',
    class: 'wf_m-w-100 '
  },
  {
    header: '조정 후 배정 포인트',
    field: 'individualAdjustmentPoints',
    class: 'wf_m-w-231'
  },
  {
    header: '조정 후 배정 포인트',
    field: 'pointsAfterAdjustment',
    class: 'wf_m-w-140'
  },
  {
    header: '조정 메모',
    field: 'adjustmentNotes',
    class: 'wf_m-w-100'
  },
  {
    header: '비고(특이사항 메모)',
    field: 'remarks',
    class: 'wf_m-w-150'
  },
  {
    header: '고객사코드',
    field: 'companyCode',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-50'
  }
]
