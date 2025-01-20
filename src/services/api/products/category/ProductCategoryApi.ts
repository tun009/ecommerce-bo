import { ProductCategoryRequest, ProductCategoryResponse } from '@/models/services'
import { BaseApi } from '../../BaseApi'
import { DeliveryProductCategoryDepthRank } from '@/models'

class ProductCategoryApi extends BaseApi {
  constructor() {
    super('shop/bo/category')
  }

  getCategoryDepth(rank: DeliveryProductCategoryDepthRank, request: ProductCategoryRequest): Promise<ProductCategoryResponse> {
    return this.get('dsp-category-depth' + rank, request)
  }
}

export const productCategoryApi = new ProductCategoryApi()
