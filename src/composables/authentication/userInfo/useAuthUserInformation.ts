import { onMounted, ref } from 'vue'
import { UserInfoModelRequest } from '@/models'
import { userInfoApi } from '@/services'
export const useAuthUserInformation = () => {
  const userInfo = ref<UserInfoModelRequest>({} as UserInfoModelRequest)
  const fetchDataUser = async () => {
    try {
      const res = await userInfoApi.getDataUser()
      if (res) {
        userInfo.value = res.data
      }
    } catch (error) {
      console.log({ error })
    }
  }

  onMounted(() => {
    fetchDataUser()
  })

  return {
    userInfo
  }
}

