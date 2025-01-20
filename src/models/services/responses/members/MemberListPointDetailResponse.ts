import { MemberPointPaymentDetailModel, MemberPointUsageDetailModel } from '@/models/views'
import { DataTablePaginationResponseModel } from '../BaseModelResponse'

export interface MemberListPointPaymentDetailResponse extends DataTablePaginationResponseModel<MemberPointPaymentDetailModel> {}
export interface MemberListPointUsageDetailResponse extends DataTablePaginationResponseModel<MemberPointUsageDetailModel> {}
