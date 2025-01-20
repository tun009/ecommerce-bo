import { MemberBlackReasonCodeType, PaginationModelRequest } from "@/models";

export interface MemberDetailBlackMemberGetListParamsRequest extends PaginationModelRequest {

}

export interface MemberDetailBlackMemberRegisterDataRequest {
  message: string
  reason: MemberBlackReasonCodeType
}