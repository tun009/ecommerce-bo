import AxiosOAuth2Service from '../AxiosOAuth2Service'
import qs from 'qs'
import { AxiosError, AxiosResponse } from 'axios'
import { AppConfig, SYSTEM_ERROR_ROUTER } from '@/common'
import router from '@/router'

export class BaseApi {
  apiHostUrl = `${AppConfig.host}`
  baseUri?: string

  constructor(baseUri?: string) {
    this.baseUri = baseUri
  }

  createDefaultHeader(): Record<string, string> {
    return {
      // 'Accept-Language': currentLanguge === 'en' ? 'en-US' : currentLanguge ?? 'vi',
      'Accept-Language': 'en-US'
    }
  }

  async get(uri: string, params: any = {}, noAddPrefix = false) {
    const url = this.createUrl(uri, noAddPrefix)
    return AxiosOAuth2Service.getAxiosInstance()
      ?.get(url, {
        params
      })
      .then((response) => this.onSuccess(response))
      .catch((error) => {
        return this.onFailed(error)
      })
  }

  async post(uri: string, data: any = {}, params: any = {}, noAddPrefix = false) {
    const url = this.createUrl(uri, noAddPrefix)
    return AxiosOAuth2Service.getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: this.createDefaultHeader()
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error)
      })
  }

  async postMultipart(uri: string, data: any = {}, params: any = {}, noAddPrefix = false) {
    const url = this.createUrl(uri, noAddPrefix)
    return AxiosOAuth2Service.getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: {
          ...{ 'Content-Type': 'multipart/form-data' },
          ...this.createDefaultHeader()
        }
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error)
      })
  }

  async postUrlEncoded(uri: string, data: any = {}, noAddPrefix = false, onErrorHandler?: (error?: object) => void) {
    const url = this.createUrl(uri, noAddPrefix)
    return AxiosOAuth2Service.getAxiosInstance()
      ?.post(url, qs.stringify(data), {
        headers: {
          ...{ 'content-type': 'application/x-www-form-urlencoded' },
          ...this.createDefaultHeader()
        }
      })
      .then((response: AxiosResponse) => response?.data)
      .catch((error: AxiosError) => {
        onErrorHandler?.(error)
        return this.onFailed(error)
      })
  }

  async put(uri: string, data: any = {}, params: any = {}, noAddPrefix = false) {
    const url = this.createUrl(uri, noAddPrefix)
    return AxiosOAuth2Service.getAxiosInstance()
      ?.put(url, data, {
        params,
        headers: this.createDefaultHeader()
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error)
      })
  }

  async delete(uri: string, data: any = {}, params: any = {}, noAddPrefix = false) {
    const url = this.createUrl(uri, noAddPrefix)
    return AxiosOAuth2Service.getAxiosInstance()?.({
      method: 'delete',
      headers: this.createDefaultHeader(),
      url,
      data,
      params
    })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error)
      })
  }

  createUrl(uri: string, noPrefix = false) {
    const url = noPrefix ? uri : `${this.apiHostUrl}/${this.baseUri}/${uri}`
    return url
  }

  onSuccess = (response: any) => {
    let ret = null
    if (response?.status === 200) {
      ret = response.data
    }
    return ret
  }

  onFailed = (error: any) => {
    console.log('error', error)
    if (error.status === 500 || error.status === 408) {
      router?.push(SYSTEM_ERROR_ROUTER)
    }
    return Promise.reject(error)
  }
}
