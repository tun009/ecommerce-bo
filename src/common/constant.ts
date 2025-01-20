//localStorage
export const favoriteStorage = 'FAVORITE_STORAGE'
export const listCacheStorage = 'LIST_CACHE'
export const currentActiveStorage = 'CURRENT_ACTIVE'
export const currentAccountId = 'CURRENT_ACCOUNT_ID'
export const ID_CHECKBOX_ALL = 'all'

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD'
export const DEFAULT_DATE_FORMAT_DOT = 'YYYY.MM.DD'
export const DEFAULT_DATETIME_FORMAT_DOT = 'YYYY. MM. DD HH:MM:ss'
export const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
export const FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm = 'YYYY.MM.DD hh:mm'
export const FORMAT_DATE_YYYY_MM_DD = 'YYYY.MM.DD'
export const FORMAT_DATE_YYYY_MM_DD_HH_MM_SS = 'YYYY.MM.DD HH:MM:SS'
export const FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS = 'YYYY.MM.DD HH:mm:ss'
export const DEFAULT_DATE_ERROR_MESSAGE = 'Invalid value'
export const DEFAULT_DATE_FORMAT_ERROR_MESSAGE = 'Invalid format'
export const DEFAULT_DATE_FORMAT_ERROR_MESSAGE_NULL = 'Invalid Date'
export const HEADERS_CALENDAR = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
export const SIZE_OF_TABLE_CALENDAR_DATE = 42
export const _5MB = 5242880
export const _10MB = 10485760
export const _250MB = 262144000
export const TYPE_IMAGE_FILE = 'image/png, image/jpeg, image/jpg, image/gif'
export const TYPE_VIDEO_FILE = 'video/mp4'
export const TYPE_DOCUMENT_FILE = 'image/png, image/jpeg, image/jpg, application/pdf'
export const ERROR_TYPE = 'ERROR'
export const MAX_LIMIT_PRO_RELEASE_INFO = 1000
// using for mock data for data table
export const DATA_TABLE_NUMBER_OF_PAGE = 10
export const DATA_TABLE_TOTAL_ITEMS = 1000
export const DATA_TABLE_NUMBER_ITEMS_PAGE_50 = 50
export const DATA_TABLE_NUMBER_ITEMS_PAGE_100 = 100
export const DATA_TABLE_NUMBER_ITEMS_PAGE_200 = 200
export const DATA_TABLE_DEFAULT_DATA_KEY = 'id'
export const NUMBER_OF_PAGE = 10
export const TABLE_LOADING_WAIT_TIME = 500

// 60s
export const AXIOS_TIMEOUT = 60 * 1000

export const DEFAULT_TABLE_SELECT_OPTIONS = [
  { label: '50 개씩', value: DATA_TABLE_NUMBER_ITEMS_PAGE_50 },
  { label: '100 개씩', value: DATA_TABLE_NUMBER_ITEMS_PAGE_100 },
  { label: '200 개씩', value: DATA_TABLE_NUMBER_ITEMS_PAGE_200 }
]

export const DEFAULT_TABLE_SELECT_OPTIONS_TWO = [
  { label: '50개씩 보기', value: DATA_TABLE_NUMBER_ITEMS_PAGE_50 },
  { label: '100개씩 보기', value: DATA_TABLE_NUMBER_ITEMS_PAGE_100 },
  { label: '200개씩 보기', value: DATA_TABLE_NUMBER_ITEMS_PAGE_200 }
]

//dash board cache default
export const DASH_BOARD_CACHE = { path: '', name: '', nameComponent: 'DashboardPage' }
export const MODAL_PROVIDE = 'MODAL_PROVIDE'

// Using for number of textarea
export const TEXTAREA_NUMBER_1000 = 1000
export const TEXTAREA_NUMBER_200 = 200
export const TEXT_MAX_NUMBER_10 = 10
export const TEXT_MAX_NUMBER_30 = 30
export const TEXT_MAX_NUMBER_50 = 50
export const TEXT_MAX_NUMBER_60 = 60

export const DAYS_PER_WEEK = 6
export const DAYS_PER_MONTH = 29
export const DAYS_PER_THREE_MONTH = 89
export const DAYS_PER_YEAR = 364

//class-image-scale
export const classScale = '.image-scale'

export const PRODUCT_STATUS = {
  sold_out: '품절',
  sale: '판매중',
  refuse_approval: '승인 거부',
  approval: '승인됨'
}

export const productApprovalStatus = {
  registration: '상품등록중',
  awaitingApproval: '승인대기',
  approvalWithdrawal: '승인철회',
  approvalCompleted: '승인완료',
  rejectedApproval: '승인반려'
}

export const productBaseInfoType = {
  delivery: 'DELIVERY',
  ticket: 'TICKET',
  approval_delivery: 'APPROVAL_DELIVERY',
  approval_ticket: 'APPROVAL_TICKET'
}

export const fileDocumentNames = {
  deliveryProductList: {
    url: '/documents/배송_상품_목록.xlsx',
    name: '배송_상품_목록.xlsx'
  },
  ticketProductList: {
    url: '/documents/티켓_상품_목록.xlsx',
    name: '티켓_상품_목록.xlsx'
  },
  memberList: {
    url: '/documents/회원_목록.xlsx',
    name: '회원_목록.xlsx'
  },
  memberBulkRegistration: {
    url: '/documents/엑셀_업로드_파일_형식.xlsx',
    name: '엑셀_업로드_파일_형식.xlsx'
  }
}

export const contentHandleFileMoreInfo = {
  deleteImage: '이미지를 삭제하시겠습니까?',
  notificationImage: '이미지가 삭제되었습니다.',
  deleteVideo: '동영상을 삭제하시겠습니까?',
  notificationVideo: '동영상이 삭제되었습니다.'
}

export const existEmail = 'cuongnm@aladintech.co'
export const classScrollDateTimePicker = {
  month: {
    parent: '.wf_calendar__choose-month',
    children: '.wf_calendar__choose-item.active'
  },
  hour: {
    parent: '.wf_calendar__hour',
    children: '.wf_calendar__hour-item.select',
    childrenReset: '.wf_calendar__hour-item.reset'
  },
  minute: {
    parent: '.wf_calendar__minute',
    children: '.wf_calendar__minute-item.select',
    childrenReset: '.wf_calendar__minute-item.reset'
  }
}

export const datePickerNotification = {
  startDate: {
    date: '시작일은 종료일보다 뒤로 설정할 수 없습니다.',
    'date-time': '시작 시각은 종료 시각보다 <br/> 뒤로 설정할 수 없습니다.'
  },
  endDate: {
    date: '종료일은 시작일보다 앞으로 설정할 수 없습니다.',
    'date-time': '종료 시각은 시작 시각보다 <br/> 앞으로 설정할 수 없습니다.'
  },
  maxLimit: {
    date: '최대 1년 이내에서 조회할 수 있습니다.',
    'date-time': '최대 1년 이내에서 조회할 수 있습니다.'
  }
}

export const emptyAddress = {
  zipCode: '',
  loadNameAddress: '',
  loadLotBasedAddress: '',
  detailedAddress: ''
}
export enum ProductClassification  {
  TICKET = '01',
  DELIVERY = '02'
}

export const NAVIGATION_AFTER_AUTHENTICATION_FAIL_TIME = 300000

export const XLS_ACCEPTED_TYPE = '.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

export const DAUM_POST_CODE_SCRIPT = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'

export const PASSWORD_TEXT = '***************************'
export const XAuthorizationIdItem = 'vitamin21c@naver.com'
export const XAuthorizationRoleItem = 'ROLE_MEMBER'
