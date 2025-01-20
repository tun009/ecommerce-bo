import {
  ProductItemBasicManageResponse,
  ProductTicketDetailBasicInfoRequest,
  ProductTicketDetailBasicInfoResponse,
  ProductTicketDetailBasicInfoExceptCompanyResponse,
  ProductTicketItemBasicManageRequestModel,
  ProductTicketDetailIssuedInfoRequest,
  ProductTicketIssuedManageRequest,
  ProductTicketDetailIssuedInfoResponse,
  ProductTicketIssuedManageResponse,
  ProductTicketItemOptionManageRequest,
  ProductTicketItemOptionManageResponse,
  ProductTicketItemDetailOptionInfoResponse,
  ProductTicketItemOptionInventoryManageRequest,
  ProductTicketItemOptionDeleteRequest
} from '@/models/services'
import { BaseApi } from '../../BaseApi'

class ProductTicketDetailInfoApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }

  getBasicDetailInfo(request: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketDetailBasicInfoResponse> {
    return this.get('item-detail-basic-info', request)
  }

  getBasicDetailInfoExceptCompany(request: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketDetailBasicInfoExceptCompanyResponse> {
    return this.get('item-detail-basic-except-company', request)
  }

  putItemBasicManage(request: ProductTicketItemBasicManageRequestModel): Promise<ProductItemBasicManageResponse> {
    return this.put('item-basic-manage', request)
  }

  getIssuedInfo(request: ProductTicketDetailIssuedInfoRequest): Promise<ProductTicketDetailIssuedInfoResponse> {
    return this.get('item-detail-issued-info', request)
  }

  updateIssuesInfo(request: ProductTicketIssuedManageRequest): Promise<ProductTicketIssuedManageResponse> {
    return this.put('item-issued-manage', request)
  }

  updateItemOptionManage(request: ProductTicketItemOptionManageRequest): Promise<ProductTicketItemOptionManageResponse>{
    return this.put('item-option-manage', request)
  }
  getItemDetailOptionInfo(request: ProductTicketDetailIssuedInfoRequest):Promise<ProductTicketItemDetailOptionInfoResponse>{
    return this.get('item-detail-option-info', request)
  }

  updateItemOptionInventoryManage(request: ProductTicketItemOptionInventoryManageRequest): Promise<ProductTicketItemDetailOptionInfoResponse>{
    return this.put('item-option-inventory-manage', request)
  }

  deleteItemOption(request: ProductTicketItemOptionDeleteRequest): Promise<ProductTicketItemDetailOptionInfoResponse>{
    return this.put('item-option-delete', request)
  }
}

export const productTicketDetailInfoApi = new ProductTicketDetailInfoApi()
