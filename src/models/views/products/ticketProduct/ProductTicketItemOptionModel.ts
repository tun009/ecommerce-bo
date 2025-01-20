export interface ProductTicketItemOptionManageModel {
    productKey: number,
    productCode: string,
    errMessage: string,
    sucessMessage: string
}

export interface ProductTicketBoItemOptionListModel {
    productOptionKey?: number,
    productKey?: number,
    optionId?: string,
    option1DepthName?: string,
    option2DepthName?: string,
    option3DepthName?: string,
    optionPrice?: number,
    optionInventoryQuantity?: number,
    optionSaleStatus?: string,
    optionDisplayOrder?: number
}

export interface ProductTicketItemDetailOptionInfoModel {
    productKey: number,
    productCode: string,
    optionUseYn: string,
    optionType: string,
    optionTypeName: string,
    sclassOptionUseYn: string,
    inventoryQuantity: number,
    boItemOptionList: ProductTicketBoItemOptionListModel[]
}