import { MockPromotionProductListTable } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import { ProductPromotionDiscountListRequest, ProductPromotionDiscountListResponse } from '@/models'

class ProductPromotionApi extends BaseApi {
  getDiscountPromotionList(request: ProductPromotionDiscountListRequest) {
    return new Promise<ProductPromotionDiscountListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockPromotionProductListTable,
            id: `${MockPromotionProductListTable.id}${index}`
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }
}

export const productPromotionApi = new ProductPromotionApi()
