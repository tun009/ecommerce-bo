import { PaginationModelRequest } from "@/models";

export interface MemberRemarkGetListParamsRequest extends PaginationModelRequest {

}

export interface MemberRemarkDeleteDataRequest {
  memoIds: number[]
}