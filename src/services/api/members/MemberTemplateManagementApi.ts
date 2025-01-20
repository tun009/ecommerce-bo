import { MockDateMemberTemplateManagementDataTable } from '@/assets/mockData'
import { MemberTemplateManagementResponse, MemberTemplateManagementRequest } from '@/models/services'
import { BaseApi } from '../BaseApi'

class MemberTemplateManagementApi extends BaseApi {
  getMemberTemplateManagementList(request: MemberTemplateManagementRequest) {
    return new Promise<MemberTemplateManagementResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDateMemberTemplateManagementDataTable,
            id: index
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

export const memberTemplateManagementApi = new MemberTemplateManagementApi()
