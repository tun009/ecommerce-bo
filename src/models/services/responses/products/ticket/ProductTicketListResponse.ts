import { DataTablePaginationResponseModel } from '@/models'
import { ProductTicketProductListModel } from '@/models/views'

export interface ProductTicketListResponse extends DataTablePaginationResponseModel<ProductTicketProductListModel> {}

export interface ProductTicketCategoryDspResponse {
    displayCategoryId: string | undefined,
    upperDisplayCategoryId: string | undefined,
    displayCategoryName: string | undefined
}
