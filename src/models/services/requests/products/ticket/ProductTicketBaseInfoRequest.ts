interface ProductTicketKeywordModel {
  modifiedBy: null
  productKey: number
  keywordName: string
}

interface ProductTicketExclusionEntryModel {
  modifiedBy: null
  customerKey: number
  productKey: number
}
export interface ProductTicketDetailBasicInfoRequest {
  productClassificationCode: string
  productCode: string
}
export interface ProductTicketItemBasicManageRequestModel {
  modifiedBy: null
  productClassificationCode: string
  productType: string
  productName: string
  productKey: number
  productCode: string
  multilingualProductName: string
  sellerProductCode: string
  sellerKey: number
  lowSellerKey: number
  ticketPassType: string
  ticketCancelPossibleType: string
  ticketType: string
  ticketUseRuleType: string
  ticketValidityDateYn: string
  ticketValidityStartDateTime: string
  ticketValidityEndDateTime: string
  reviewPossibleYn: string
  inquiryPossibleYn: string
  giftPossibleYn: string
  minimumPurchaseQuantityYn: string
  minimumPurchaseQuantity: number
  maximumPurchaseQuantityYn: string
  maximumPurchaseQuantity: number
  excludedCompanyYn: string
  lastProductProgressStatusCode: string
  lastProductSalesStatusCode: string
  boKeyWordList: ProductTicketKeywordModel[]
  boExpsrExclEntList: ProductTicketExclusionEntryModel[]
}
