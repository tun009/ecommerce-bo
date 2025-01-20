import { WelfareSelectOptionType } from '@/models'

export interface ComplaintOrderCancelListFormModel {
  no: number
  claimCode: string
  claimType: string
  orderCode: string
  transactionNumber: string
  claimStatus: string
  orderStatus: string
  productCode: string
  claimProductName: number
  optionName: string
  ticketNumber: number
  recipientName: string
  recipientPhoneNumber: string
  sellerCode: string
  seller: string
  subCompanyName: string
  ordered: string
  paymentDateTime: string
  finalPaymentAmount: string
  cancellationFee: string
  finalRefundAmount: string
  membershipCode: string
  memberName: string
  memberId: string
  customerCode: string
  customerMissionName: string
  claimDateTime: string
  claimApprovalDateTime: string
  dateClaimWithdrawal: string
  reasonForClaim: string
  claimApplicant: string
  claimsProcessor: string
}

export interface ComplaintOrderCancelFormModel {
  claimCode: string
  claimStatus: WelfareSelectOptionType
  member: string
  customer: string
  orderCode: string
  orderName: string
  recipientName: string
  recipientPhoneNumber: string
  seller: string
  subCompany: WelfareSelectOptionType
  MD: string
  dateSelect: WelfareSelectOptionType
  fromDate: string
  toDate: string
  product: string
  searchWord: string
}

export const complaintOrderCancelListModelConfig = {
  inputRow1: {
    label: '클레임 코드',
    placeholder: '포인트 명 입력',
    field: 'claimCode'
  },
  selectRow1: {
    label: '클레임 상태',
    field: 'claimStatus',
    options: [
      { label: '전체', value: '1' },
      { label: '주문취소 신청', value: '2' },
      { label: '티켓폐기 실패', value: '3' },
      { label: '환불요청 완료', value: '4' },
      { label: '환불완료', value: '5' },
      { label: '환불실패', value: '6' },
      { label: '주문취소 철회', value: '7' }
    ]
  },
  listInputRow2: [
    {
      label: '회원',
      placeholder: '포인트 명 입력',
      field: 'member'
    },
    {
      label: '고객사',
      placeholder: '포인트 코드 입력',
      field: 'customer'
    }
  ],
  listInputRow3: [
    {
      label: '주문 코드',
      placeholder: '',
      field: 'orderCode'
    },
    {
      label: '주문자명',
      placeholder: '',
      field: 'orderName'
    },
    {
      label: '수령자명',
      placeholder: '',
      field: 'recipientName'
    },
    {
      label: '수령자 휴대폰 번호',
      placeholder: '',
      field: 'recipientPhoneNumber'
    }
  ],
  inputRow4: {
    label: '판매사',
    placeholder: '포인트 명 입력',
    field: 'seller'
  },
  listInputRow4: [
    {
      label: 'MD',
      placeholder: '',
      field: 'MD'
    },
    {
      label: '상품',
      placeholder: '',
      field: 'product'
    }
  ],
  selectRow4: {
    label: '하위업체',
    field: 'subCompany',
    options: [{ label: '하위업체 전체', value: '1' }]
  },
  listSelectDate: {
    label: '기간',
    field: 'dateSelect',
    options: [
      { label: '등록일', value: '1' },
      { label: '조정일 ', value: '2' },
      { label: '사용 시작일', value: '3' },
      { label: '사용 종료일', value: '4' }
    ]
  },
  listSelectSearchType: {
    label: '검색어',
    field: 'dateSelect',
    options: [
      { label: '등록일', value: '1' },
      { label: '조정일 ', value: '2' },
      { label: '사용 시작일', value: '3' },
      { label: '사용 종료일', value: '4' }
    ]
  },
  querySearch: {
    label: '클레임상태',
    placeholder: '포인트 코드 입력',
    field: 'pointAllocationCode'
  }
}

export const ComplaintOrderCancelTableConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '고객사코드',
    field: 'claimCode',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'claimType',
    class: 'wf_m-w-120'
  },
  {
    header: '복지포인트 배정 코드',
    field: 'orderCode',
    class: 'wf_m-w-200'
  },
  {
    header: '복지포인트 구분',
    field: 'transactionNumber',
    class: 'wf_m-w-168'
  },
  {
    header: '복지포인트 유형',
    field: 'claimStatus',
    class: 'wf_m-w-140 '
  },
  {
    header: '복지포인트 배정명',
    field: 'orderStatus',
    class: 'wf_m-w-231'
  },
  {
    header: '배정 복지포인트',
    field: 'productCode',
    class: 'wf_m-w-120 '
  },
  {
    header: '대상자수',
    field: 'claimProductName',
    class: 'wf_m-w-100'
  },
  {
    header: '등록상태',
    field: 'optionName',
    class: 'wf_m-w-100'
  },
  {
    header: '기준년도',
    field: 'ticketNumber',
    class: 'wf_m-w-200'
  },
  {
    header: '사용시작',
    field: 'recipientName',
    class: 'wf_m-w-200'
  },
  {
    header: '사용종료',
    field: 'recipientPhoneNumber',
    class: 'wf_m-w-200'
  },
  {
    header: '등록일자',
    field: 'sellerCode',
    class: 'wf_m-w-200'
  },
  {
    header: '등록자',
    field: 'seller',
    class: 'wf_m-w-200'
  },
  {
    header: '조정일자',
    field: 'subCompanyName',
    class: 'wf_m-w-200'
  },
  {
    header: '조정자',
    field: 'ordered',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'paymentDateTime',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'finalPaymentAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'cancellationFee',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'finalRefundAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'membershipCode',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'memberName',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'memberId',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'customerCode',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'customerMissionName',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'claimDateTime',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'claimApprovalDateTime',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'dateClaimWithdrawal',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'reasonForClaim',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'claimApplicant',
    class: 'wf_m-w-120'
  },
  {
    header: '조정자',
    field: 'claimsProcessor',
    class: 'wf_m-w-120'
  }
]
