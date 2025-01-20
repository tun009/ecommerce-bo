import { computed, onMounted, ref, watch } from 'vue'
import { memberDetailBaseInformationApi } from '@/services'
import {
  MemberDetailBaseTabProps,
  MemberDetailUpdateWelfareMallRequest,
  MemberDetailWelfareMallInMallInformationModel,
  MemberDetailWelfareMallInformationModel,
  memberHeadersAcceptInformationTableWelfareConfig,
  memberHeadersAcceptInformationTableWelfareMallConfig
} from '@/models'
import { formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS } from '@/common'

const KEYS_AGREE: string[] = ['marketing', 'email', 'sms', 'kakao']
const AGREE_YN = 'AgreeYn'
const IS_ARGEE_Y = 'Y'
const IS_ARGEE_N = 'N'
const AGREE_DATE = 'AgreeDate'
export const useMemberListBaseInformationTabAccept = (props: MemberDetailBaseTabProps) => {
  const memberKey = ref<any>(props?.data?.memberKey)

  const acceptInformationMall = ref<MemberDetailWelfareMallInformationModel[]>([])
  const acceptInformationMallInMall = ref<MemberDetailWelfareMallInMallInformationModel[]>([])

  watch(
    () => props.data,
    () => {
      memberKey.value = props.data.memberKey
      getAcceptInformationMall(props.data.memberKey)
    }
  )

  const getAcceptInformationMall = (memberKey: string) => {
    memberDetailBaseInformationApi.getMemberAcceptInformationDetailWelfareMall({ memberKey: memberKey }).then((res) => {
      const selectAgreeItems: string[] = ['(선택) 마케팅정보 수집 및 이용동의', '이메일 수신', '문자 SMS 수신', '카카오 알림톡 수신']
      const dataConvert: MemberDetailWelfareMallInformationModel[] = KEYS_AGREE.map((key, idx) => {
        const keyAgree = `${key}${AGREE_YN}`
        //@ts-ignore
        const isAgree = res[`${keyAgree}`] === IS_ARGEE_Y
        return {
          selectAgreeItem: selectAgreeItems[idx],
          isAgree: isAgree,
          //@ts-ignore
          dateApplication: formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS(res[`${key}${AGREE_DATE}`] ?? ''),
          isAgreeCheck: isAgree
        }
      })
      acceptInformationMall.value = dataConvert
    })
  }

  const getAcceptInformationMallInMall = () => {
    memberDetailBaseInformationApi.getMemberAcceptInformationDetailWelfareMallInMall({ memberKey: 'any-key' }).then((result) => {
      acceptInformationMallInMall.value = result.data.map((item) => {
        return {
          ...item,
          isAgreeCheck: item.isAgree
        }
      })
    })
  }

  const acceptListData = computed(() => {
    return [
      {
        label: '복지몰',
        data: acceptInformationMall.value,
        thead: memberHeadersAcceptInformationTableWelfareConfig,
        classGroup: 'wf-mall'
      },
      {
        label: '몰인몰',
        data: acceptInformationMallInMall.value,
        thead: memberHeadersAcceptInformationTableWelfareMallConfig,
        classGroup: 'wf-mall-in-mall'
      }
    ]
  })

  const handleUpdateWelfareMall = () => {
    //@ts-ignore
    const convertedObject: MemberDetailUpdateWelfareMallRequest = acceptInformationMall.value.reduce((acc, item, idx) => {
      const key = KEYS_AGREE[idx] + AGREE_YN
      //@ts-ignore
      acc[key] = item.isAgreeCheck ? IS_ARGEE_Y : IS_ARGEE_N
      return acc
    }, {})

    memberDetailBaseInformationApi.updateWelfareMall({ memberKey: memberKey.value }, convertedObject).then(() => {
      getAcceptInformationMall(memberKey.value)
    })
  }

  const handleSaveInformation = (index: number) => {
    if (index === 0) {
      handleUpdateWelfareMall()
    }
  }

  const handleAgreeInformation = (index: number, id: number) => {
    if (index === 0) {
      acceptInformationMall.value[id].isAgreeCheck = !acceptInformationMall.value[id].isAgreeCheck
      return
    }
    acceptInformationMallInMall.value[id].isAgreeCheck = !acceptInformationMallInMall.value[id].isAgreeCheck
  }

  const handleResetInformation = (index: number) => {
    if (index === 0) {
      acceptInformationMall.value = acceptInformationMall.value.map((item) => ({
        ...item,
        isAgreeCheck: item.isAgree
      }))
      return
    }
    acceptInformationMallInMall.value = acceptInformationMallInMall.value.map((item) => ({
      ...item,
      isAgreeCheck: item.isAgree
    }))
  }

  onMounted(() => {
    getAcceptInformationMall(memberKey.value)
    getAcceptInformationMallInMall()
  })

  return {
    acceptInformationMall,
    acceptInformationMallInMall,
    handleAgreeInformation,
    handleResetInformation,
    acceptListData,
    handleSaveInformation
  }
}
