import { MockDataApprovalTicketProductList } from '@/assets/mockData'
import {
  ProductTicketApproveListRequest,
  ProductTicketApproveListRequestConvertor,
  ProductTicketApproveListResponse,
  ProductTicketCategoryDspResponse,
  ProductTicketListResponse
} from '@/models/services'
import { BaseApi } from '../BaseApi'
import { ProductTicketListForm } from '@/models'

class ProductTicketApi extends BaseApi {
  constructor() {
    super('shop/bo')
  }
  getTicketApprovalList(request: ProductTicketApproveListRequest) {
    return new Promise<ProductTicketApproveListResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataApprovalTicketProductList,
            id: index,
            product_code: `${MockDataApprovalTicketProductList.product_code}${index}`
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }

  async getDataTicketList(pageNum: number, size: number, otherParams: ProductTicketListForm) {
    const params = ProductTicketApproveListRequestConvertor.from(otherParams, pageNum, size)

    const { data, page: pageRes, ...otherData } = await this.get('item/product-list', params)
    const resData: ProductTicketListResponse = {
      data: data.map((it: any) => {
        return {
          id: it.productKey,
          product_code: it.productCode,
          product_name: it.productName,
          integration: it.externalInterfaceYn,
          product_type: it.productType,
          exposure_channel: it.exposureChannelName,
          exhibition_status: it.displayYn,
          price: it.salePrice,
          instant_discount_price: it.productDiscountAmount,
          sales_status: it.lastProductSalesStatusName,
          tax_classification: it.taxTypeName,
          standard_category: it.standardCategoryPath,
          exhibition_category: it.exhibition_category,
          seller: it.sellerKey,
          sub_company: it.lowSellerKey,
          product_registration_date: it.createdYyyymmdd,
          product_modification_date: it.lastModifiedYyyymmdd,
          sales_start_date: it.saleStartYyyymmdd,
          sale_end_date: it.saleEndYyyymmdd,
          md: it.chargeMdKey,
          registrant: it.createdByName,
          modifier: it.lastModifiedByName,
          approver: it.lastProductApprovedByName
        }
      }),
      totalItems: pageRes.totalCount,
      ...otherData
    }
    return Promise.resolve(resData)
  }

  async getDataTicketDspCategoryDepth1(): Promise<ProductTicketCategoryDspResponse> {
    return await this.get('category/dsp-category-depth1')
  }

  async getDataTicketDspCategoryDepth2(params: string): Promise<ProductTicketCategoryDspResponse> {
    const paramConvert = ProductTicketApproveListRequestConvertor.fromCategory(params)
    return this.get('category/dsp-category-depth2', paramConvert)
  }

  async getDataTicketDspCategoryDepth3(params: string): Promise<ProductTicketCategoryDspResponse> {
    const paramConvert = ProductTicketApproveListRequestConvertor.fromCategory(params)
    return this.get('category/dsp-category-depth3', paramConvert)
  }
}

export const productTicketApi = new ProductTicketApi()
