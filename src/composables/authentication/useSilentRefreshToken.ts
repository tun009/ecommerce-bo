import { ACCESS_TOKEN, AUTH_LOGIN_ROUTER, AXIOS_TIMEOUT, REFRESH_TOKEN, storage } from '@/common'
import { AxiosOAuth2Service, authApi } from '@/services'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export const useSilentRefreshToken = () => {
  const router = useRouter()
  const saveToken = (params: { accessToken?: string; refreshToken?: string }) => {
    storage.set(ACCESS_TOKEN, params.accessToken ?? '')
    storage.set(REFRESH_TOKEN, params.refreshToken ?? '')
  }

  const clearToken = () => {
    storage.remove(ACCESS_TOKEN)
    storage.remove(REFRESH_TOKEN)
  }

  const openLoginPage = () => {
    router.push(AUTH_LOGIN_ROUTER)
  }
  /**
   * The function to setup call to server to get new one refresh token and access token when access tolen was expired
   * use it for retry call api to get data. If the refresh api has error, send a force logout event to navigation to logout
   */
  const setupRefreshToken = () => {
    const refreshToken = (originalRequestConfig: AxiosRequestConfig) => {
      console.log('called refreshToken')
      return new Promise((resolve, reject) => {
        authApi
          .refreshToken()
          .then((response) => {
            const { accessToken, refreshToken } = response.data
            saveToken({
              accessToken,
              refreshToken
            })
            AxiosOAuth2Service.attachHeaderToken({
              accessToken: accessToken
            })
            if (originalRequestConfig.headers) {
              originalRequestConfig.headers['Authorization'] = `Bearer ${accessToken}`
            }
            AxiosOAuth2Service.processWaitingQueue(null, accessToken)
            resolve(axios(originalRequestConfig))
          })
          .catch((error?: AxiosError) => {
            AxiosOAuth2Service.clearWaitingQueue()
            clearToken()
            openLoginPage()
            reject(error)
          })
      })
    }
    AxiosOAuth2Service.setup({
      refreshTokenCallback: refreshToken,
      timeout: AXIOS_TIMEOUT,
      timeoutErrorMessage: undefined
    })
  }
  onMounted(() => {
    setupRefreshToken()
  })
}
