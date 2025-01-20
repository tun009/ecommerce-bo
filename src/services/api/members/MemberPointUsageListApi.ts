import {
  MockDataMemberPUCustomerInfo,
  MockDataMemberPointUsageCustomerListDataTable,
  MockDataMemberPointUsageDetailDataTable,
  MockDataMemberPointUsageListDataTable
} from '@/assets/mockData'
import { MemberPointUsageListRequest, PaginationModelRequest, MemberPointUsageCustomerInformationResponse } from '@/models/services'
import { DataTablePaginationResponseModel } from '@/models'
import { MemberPUCustomerListDataTableModel, MemberPointUsageDetailsDataTableModel, MemberPointUsageListDataTableModel } from '@/models/views'
import { BaseApi } from '../BaseApi'

class MemberPointUsageListApi extends BaseApi {
  getPointUsageList(request: MemberPointUsageListRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberPointUsageListDataTableModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i
          items.push({
            ...MockDataMemberPointUsageListDataTable,
            id: index,
            number: index,
            companyCode: MockDataMemberPointUsageListDataTable.companyCode + index,
            employeeCode: MockDataMemberPointUsageListDataTable.employeeCode + index
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }

  getPointUsageDetailTable(request: PaginationModelRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberPointUsageDetailsDataTableModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i
          items.push({
            ...MockDataMemberPointUsageDetailDataTable,
            number: index,
            welfarePointCode: MockDataMemberPointUsageDetailDataTable.welfarePointCode + index
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }

  getPointUsageCustomerList(request: MemberPointUsageListRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberPUCustomerListDataTableModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize

        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i
          items.push({
            ...MockDataMemberPointUsageCustomerListDataTable,
            id: index,
            number: index,
            customerCompanyCode: MockDataMemberPointUsageCustomerListDataTable.customerCompanyCode + index
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomerInformation(request?: MemberPointUsageListRequest) {
    return new Promise<MemberPointUsageCustomerInformationResponse>((resolve) => {
      setTimeout(() => {
        const data = {
          ...MockDataMemberPUCustomerInfo
        }
        resolve({
          data: Array.from({ length: 1 }).map(() => data)
        })
      })
    })
  }
}

export const memberPointUsageListApi = new MemberPointUsageListApi()
