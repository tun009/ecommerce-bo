import { BaseModelResponse } from '../BaseModelResponse'

export interface LoginDataModelResponse {
  accessToken: string
  refreshToken: string
  authenticated: boolean
  tokenType: string
  accountStatusNormal: boolean
}

export interface LoginModelResponse extends BaseModelResponse<LoginDataModelResponse> {}
