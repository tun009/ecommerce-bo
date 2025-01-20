import { DataTableContainerConfigModel } from '@/models/uikit'

export const memberPointAllocationSpecifyInBulkHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '회원코드',
    field: 'memberCode',
    class: 'wf_m-w-140 wf-underline wf-underline-offset-2 wf_justify-start '
  },
  {
    header: '회원명',
    field: 'name',
    class: 'wf_m-w-140 '
  },
  {
    header: '아이디(이메일)',
    field: 'email',
    class: 'wf_m-w-200 '
  },
  {
    header: '휴대폰번호',
    field: 'phoneNumber',
    class: 'wf_m-w-200 '
  },
  {
    header: '배정 복지포인트',
    field: 'point',
    class: 'wf_m-w-200 wf_justify-end '
  },
  {
    header: '고객사코드',
    field: 'clientCode',
    class: 'wf_m-w-140 '
  },
  {
    header: '고객사',
    field: 'client',
    class: 'wf_m-w-200 wf_justify-start '
  }
]

export const memberTransferHistoryHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록상태',
    field: 'status',
    class: 'wf_m-w-200 wf-underline wf-underline-offset-2 '
  },
  {
    header: '권한 구분',
    field: 'decentralization',
    class: 'wf_m-w-200 '
  },
  {
    header: '처리자',
    field: 'manager',
    class: 'wf_m-w-200 '
  },
  {
    header: '업데이트 일자',
    field: 'updateAt',
    class: 'wf_m-w-200 '
  },
  {
    header: '조정 사유',
    field: 'reason',
    class: 'wf_m-w-200 '
  },
  {
    header: '상세보기',
    field: 'seeDetail',
    class: 'wf_m-w-200 '
  }
]

