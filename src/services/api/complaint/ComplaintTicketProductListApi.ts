import { ComplaintTicketProductListRequest, ComplaintTicketProductListResponse } from '@/models';
import { BaseApi } from './../BaseApi';
import { MockDataComplaintTicketProdListDataTable } from '@/assets';
class ComplaintTicketProductApi extends BaseApi {
    getComplainTicketProductList(request: ComplaintTicketProductListRequest) {
        return new Promise<ComplaintTicketProductListResponse>((resolve) => {
            setTimeout(() => {
                const items: any[] = []
                const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
                for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
                  const index = i + 1
                  items.push({
                    ...MockDataComplaintTicketProdListDataTable,
                    id: index,
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
export default new ComplaintTicketProductApi()