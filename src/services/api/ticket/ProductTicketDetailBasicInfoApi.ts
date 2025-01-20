import {
  ProductItemBasicManageResponse,
  ProductTicketDetailBasicInfoRequest,
  ProductTicketDetailBasicInfoResponse,
  ProductTicketDetailBasicInfoExceptCompanyResponse,
  ProductTicketItemBasicManageRequestModel
} from '@/models/services'
import { BaseApi } from '../BaseApi'

class ProductTicketDetailBasicInfoApi extends BaseApi {
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
}

export default new ProductTicketDetailBasicInfoApi()
