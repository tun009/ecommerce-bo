import {
  LoginModelResponse,
  LoginModelRequest,
  SkipChangePasswordModelResponse,
  ChangePasswordModelRequest,
  ChangePasswordModelResponse
} from '@/models/services'
import { BaseApi } from '../BaseApi'

class AuthApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async login(data: LoginModelRequest): Promise<LoginModelResponse> {
    return this.post('auth:login', data)
  }

  async changePassword(data: ChangePasswordModelRequest): Promise<ChangePasswordModelResponse> {
    return this.put('admins/me/password', data)
  }

  async skipChangePassword(): Promise<SkipChangePasswordModelResponse> {
    return this.post('admins/me/password:skip')
  }

  async refreshToken(): Promise<LoginModelResponse> {
    return this.post('auth:reissue')
  }
}

export const authApi = new AuthApi()
