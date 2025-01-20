import {
  MemberPointAdjustmentDeleteListFormModel,
  MemberPointAdjustmentListFormModel,
  MemberPointAdjustmentTableListFormModel,
  MemberPointAllocationListFormModel
} from '@/models/views'
import { DataTablePaginationResponseModel } from '@/models'

export interface MemberPointAllocationListResponse extends DataTablePaginationResponseModel<MemberPointAllocationListFormModel> {}

export interface MemberPointDeductionListResponse extends DataTablePaginationResponseModel<MemberPointAdjustmentListFormModel> {}
export interface MemberPointAdjustmentListResponse extends DataTablePaginationResponseModel<MemberPointAdjustmentDeleteListFormModel> {}
export interface MemberPointAdjustmentUpdateResponse extends DataTablePaginationResponseModel<MemberPointAdjustmentTableListFormModel> {}
