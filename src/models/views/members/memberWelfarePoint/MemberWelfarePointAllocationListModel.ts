import { WelfareSelectOptionType } from '@/models'

export interface MemberPointAllocationListFormModel {
  no: number
  companyCode: string
  customer: string
  pointAllocationCode: string
  pointClassification: string
  pointType: string
  pointAllocationName: string
  allottedWelfarePoints: string
  numberOfSubjects: number
  registrationStatus: string
  baseYear: number
  startUsing: string
  endOfUse: string
  registrationDate: string
  registrant: string
  adjustmentDate: string
  coordinator: string
}

export interface MemberPointAllocationFormModel {
  codeCustomer: string
  pointAllocationName: string
  pointAllocationCode: string
  pointClassification: string
  pointType: WelfareSelectOptionType
  registrationStatus: WelfareSelectOptionType
  dateSelect: WelfareSelectOptionType
  fromDate: string
  toDate: string
}

export const memberPointAllocationListModelConfig = {
  listInputRow1: [
    {
      label: '복지포인트 배정명',
      placeholder: '포인트 명 입력',
      field: 'pointAllocationName'
    },
    {
      label: '복지포인트 배정코드',
      placeholder: '포인트 코드 입력',
      field: 'pointAllocationCode'
    }
  ],
  listSelectRow2: [
    {
      label: '복지포인트 유형',
      field: 'pointType',
      options: [
        { label: '전체', value: '1' },
        { label: '명절포인트 ', value: '2' },
        { label: '생일포인트 ', value: '3' },
        { label: '이벤트', value: '4' }
      ],
      optionsNormal: [
        { label: '전체', value: '1' },
        { label: '명절포인트 ', value: '2' },
        { label: '이벤트', value: '3' }
      ],
      optionsSpecial: [
        { label: '전체', value: '1' },
        { label: '생일포인트', value: '2' },
        { label: '이벤트', value: '3' }
      ]
    },
    {
      label: '등록 상태',
      field: 'registrationStatus',
      options: [
        { label: '전체', value: '1' },
        { label: '명절포인트 ', value: '2' },
        { label: '생일포인트 ', value: '3' },
        { label: '이벤트', value: '4' }
      ],
      optionsNormal: [
        { label: '전체', value: '1' },
        { label: '배정등록', value: '2' },
        { label: '조정등록', value: '3' }
      ],
      optionsSpecial: [
        { label: '전체', value: '1' },
        { label: '생일포인트', value: '2' },
        { label: '이벤트', value: '3' }
      ]
    }
  ],
  listRadioLevelMember: {
    label: '복지포인트 구분',
    field: 'pointClassification',
    options: [
      { label: '전체', value: '1' },
      { label: '선복 복지포인트', value: '2' },
      { label: '특별 복지포인트', value: '3' }
    ]
  },
  listSelectDate: {
    label: '등록일',
    field: 'dateSelect',
    options: [
      { label: '등록일', value: '1' },
      { label: '조정일 ', value: '2' },
      { label: '사용 시작일', value: '3' },
      { label: '사용 종료일', value: '4' }
    ]
  }
}
export const MemberWelfarePointAllocationTableConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '고객사코드',
    field: 'companyCode',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-120'
  },
  {
    header: '복지포인트 배정 코드',
    field: 'pointAllocationCode',
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
    header: '복지포인트 배정명',
    field: 'pointAllocationName',
    class: 'wf_m-w-231'
  },
  {
    header: '배정 복지포인트',
    field: 'allottedWelfarePoints',
    class: 'wf_m-w-120 '
  },
  {
    header: '대상자수',
    field: 'numberOfSubjects',
    class: 'wf_m-w-100'
  },
  {
    header: '등록상태',
    field: 'registrationStatus',
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
    header: '사용종료',
    field: 'endOfUse',
    class: 'wf_m-w-200'
  },
  {
    header: '등록일자',
    field: 'registrationDate',
    class: 'wf_m-w-200'
  },
  {
    header: '등록자',
    field: 'registrant',
    class: 'wf_m-w-200'
  },
  {
    header: '조정일자',
    field: 'adjustmentDate',
    class: 'wf_m-w-200'
  },
  {
    header: '조정자',
    field: 'coordinator',
    class: 'wf_m-w-120'
  }
]
