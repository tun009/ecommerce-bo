export enum MemberPointClassificationModel {
  SEONBOK = 'Seonbok',
  SPECIAL = 'Special'
}

export enum MemberPointTypeSeonbokModel {
  ALL = 'all',
  HOLIDAY = 'holiday',
  EVENT = 'event'
}

export enum MemberPointTypeSpecialModel {
  ALL = 'all',
  BIRTHDAY = 'birthday',
  EVENT = 'event'
}

export enum MemberBenefitPointAllocationTargetModel {
  ALL = 'all',
  MEMBER = 'member',
  BULK = 'bulk'
}

export const memberPointUsageRegistrationBulkHeaders = [
  'No.',
  '회원코드',
  '회원명',
  '아이디(이메일)',
  '휴대폰번호',
  '배정 복지포인트',
  '비고(특이사항 메모)',
  '고객사코드',
  '고객사'
]

export const memberPointUsageRegistrationBulkFields = ['memberCode', 'name', 'email', 'phoneNumber', 'point', 'clientCode', 'client']

export interface MemberPointUsageRegistrationBulkModel {
  id: string
  memberCode: string
  name: string
  email: string
  phoneNumber: string
  point: string
  clientCode: string
  client: string
}

export interface MemberTransferHistoryModel {
  id: string
  no: string
  status: string
  decentralization: string
  manager: string
  updateAt: string
  reason: string
}

export const memberOptionsPointClassification = [
  {
    label: '선복 복지포인트',
    value: MemberPointClassificationModel.SEONBOK
  },
  {
    label: '특별 복지포인트',
    value: MemberPointClassificationModel.SPECIAL
  }
]

export const memberOptionsPointTypeSeonbok = [
  {
    label: '전체',
    value: MemberPointTypeSeonbokModel.ALL
  },
  {
    label: '명절포인트',
    value: MemberPointTypeSeonbokModel.HOLIDAY
  },
  {
    label: '이벤트',
    value: MemberPointTypeSeonbokModel.EVENT
  }
]

export const memberOptionsPointTypeSpecial = [
  {
    label: '전체',
    value: MemberPointTypeSpecialModel.ALL
  },
  {
    label: '생일포인트',
    value: MemberPointTypeSpecialModel.BIRTHDAY
  },
  {
    label: '이벤트',
    value: MemberPointTypeSpecialModel.EVENT
  }
]

export const memberOptionsBenefitPointAllocationTarget = [
  {
    label: '전체 회원 (N,NNN명)',
    value: MemberBenefitPointAllocationTargetModel.ALL
  },
  {
    label: '회원 지정',
    value: MemberBenefitPointAllocationTargetModel.MEMBER
  },
  {
    label: '일괄 지정',
    value: MemberBenefitPointAllocationTargetModel.BULK
  }
]

export interface MemberPointUsageRegistrationBulkFormModel {
  pointClassification: MemberPointClassificationModel
  pointType: MemberPointTypeSpecialModel | MemberPointTypeSeonbokModel
  pointName: string
  pointNumber: string
  notes: string
  reason?: string
  allocationTarget: MemberBenefitPointAllocationTargetModel
  timeStart?: string | undefined
  timeEnd?: string | undefined
}
