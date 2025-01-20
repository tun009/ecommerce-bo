import { DeliveryTicketProductListOrderStatusRequest, DeliveryTicketProductListOrderStatusResponse, DeliveryTicketProductOrderStatusProductRequest, DeliveryTicketProductOrderStatusProductResponse } from '@/models'
import { BaseApi } from '@/services'

class DeliveryListOrderStatusApi extends BaseApi {
  constructor() {
    super('order/bo/orders/tickets')
  }

  async getList(params: DeliveryTicketProductListOrderStatusRequest): Promise<DeliveryTicketProductListOrderStatusResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`overall`, params)
    const resData: DeliveryTicketProductListOrderStatusResponse = {
      data,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getListByProduct(params: DeliveryTicketProductOrderStatusProductRequest): Promise<DeliveryTicketProductOrderStatusProductResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`by-product`, params)
    const resData: DeliveryTicketProductOrderStatusProductResponse = {
      data,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }
}

export const deliveryListOrderStatusApi = new DeliveryListOrderStatusApi()
