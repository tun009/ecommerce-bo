import { ProductClassification } from '@/common'
import { PaginationModelRequest } from '@/models/services'
import { ProductTicketListForm } from '@/models/views'

export interface ProductTicketApproveListRequest extends PaginationModelRequest {
  productClassificationCode: string
  categoryType?: string
  catgoryId?: string
  sellerKey?: string
  lowSellerKey?: string
  chargeMdKey?: string
  externalInterfaceYn?: string
  searchDateType?: string
  fromDate?: string
  toDate?: string
  productType?: string[]
  lastProductSalesStatusCode?: string[]
  displayYn?: string
  exposureChannel?: string[]
  searchWordType?: string
  searchWord?: string
}

export interface ProductDataTicketDspCategoryDepthRequest {
  upperDisplayCategoryId: string
}

export class ProductTicketApproveListRequestConvertor {
  static from(item: ProductTicketListForm, page: number, numberOfItems: number): ProductTicketApproveListRequest {
    return {
      pageNum: page + 1,
      rowSize: numberOfItems,
      productClassificationCode: ProductClassification.TICKET,
      categoryType: item.standardCategorySelect.value
    }
  }

  static fromCategory(item: string): ProductDataTicketDspCategoryDepthRequest {
    return {
      upperDisplayCategoryId: item
    }
  }
}
