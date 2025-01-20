import { BaseApi } from "../BaseApi";
import { UserInfoModelRequest, UserInfoModelResponse } from '@/models/services';

class UserInfoApi extends BaseApi {
    constructor() {
        super('member')
    }
    async getDataUser() : Promise<UserInfoModelResponse> {
        return this.get('bo/admins/me')
    }
    async editUserInfo(data: UserInfoModelRequest) : Promise<UserInfoModelResponse> {
        return this.put('bo/admins/me', data)
    }
}

export const userInfoApi = new UserInfoApi()