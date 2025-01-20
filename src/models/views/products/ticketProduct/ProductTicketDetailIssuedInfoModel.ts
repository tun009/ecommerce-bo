export interface ProductTicketDetailIssuedInfoModel {
    productKey: number,
    productCode: string,
    ticketType: string,
    ticketTypeName: string,
    deliveryFeePolicyTypeName: string,
    exchangeReturnPeriodContents: string,
    exchangeReturnContents: string,
    exchangeReturnWarningContents: string
}

export interface ProductTicketIssuedManageModel {
    productKey: number,
    productCode: string,
    errMessage: string,
    sucessMessage: string
}