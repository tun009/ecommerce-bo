import { BaseApi } from '@/services'
import { OrderSellerInfoResponse } from '@/models'

class OrderSellerInfoApi extends BaseApi {
  constructor() {
    super('member')
  }

  async getSellerInfo(sellerKey: string): Promise<OrderSellerInfoResponse> {
    return this.get(`bo/seller-companies/${sellerKey}/simple`)
  }
}

export const orderSellerInfoApi = new OrderSellerInfoApi()
