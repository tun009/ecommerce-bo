import { ProductTicketBoItemOptionListModel } from "@/models/views"
export interface ProductTicketItemOptionManageRequest {
    optionType: string,
    boItemOptionPopupInsertList: ProductTicketBoItemOptionListModel[],
    sclassOptionUseYn: string,
    productKey: number
}
export interface ProductTicketItemOptionInventoryManageRequest {
    optionUseYn: string,
    inventoryQuantity: number,
    boItemOptionUpdateList: ProductTicketBoItemOptionListModel[],
    productKey: number
}
export interface ProductTicketItemOptionDeleteRequest  {
    productOptionKey: number,
    productKey: number
}