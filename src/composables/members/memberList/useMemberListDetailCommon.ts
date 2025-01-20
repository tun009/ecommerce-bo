import { MemberDetailBaseModel } from '@/models'
import { memberDetailApi, memberDetailBlackMemberApi } from '@/services'
import { computed, onMounted, ref, watch } from 'vue'
import { useMemberDetailBlackMemberRegistrationModal, useMemberRequestModal } from '@/composables'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { useRoute, useRouter } from 'vue-router'

export const useMemberDetailCommon = () => {
  const route = useRoute()
  const router = useRouter()

  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openBlackMemberRegistration } = useMemberDetailBlackMemberRegistrationModal()
  const { openModal: openMemberModal, searchResData } = useMemberRequestModal()

  const data = ref<MemberDetailBaseModel>({
    memberKey: '',
    name: '',
    id: '',
    email: '',
    membershipLevel: '',
    phoneNumber: '',
    gender: '',
    cleanup: '',
    rank: '',
    employmentStatus: '',
    accountStatus: '',
    companyCode: '',
    customer: ''
  })

  onMounted(() => {
    if (route.query?.memberKey) {
      data.value.memberKey = route.query?.memberKey as string
      getData(route.query?.memberKey as string)
    }
  })

  watch(searchResData, (v) => {
    data.value.memberKey = v.memberKey
    router.push({
      query: {
        ...route.query,
        memberKey: v.memberKey
      }
    })
    getData(v.memberKey)
  })

  const getData = (memberId: string) => {
    memberDetailApi.getDetail(memberId).then((result) => {
      data.value = result.data
    })
  }

  const onCheck = async () => {
    openMemberModal()
  }

  const refreshData = () => {
    getData(data.value.memberKey)
  }

  const onRegister = () => {
    openBlackMemberRegistration(data.value, refreshData)
  }

  const onClear = () => {
    openConfirm({
      content: `<p>${data.value.name}</p><p>블랙회원에서 해제 하시겠습니까?</p>`,
      onConfirm: () => {
        closeModalByPop?.()
        handleClear()
      }
    })
  }

  const handleClear = async () => {
    try {
      await memberDetailBlackMemberApi.release(data.value.memberKey)
      refreshData()
      openNotification({ content: '블랙회원에서 해제 되었습니다.' })
    } catch (error) {
      console.error(error)
    }
  }

  const blackMemberStatus = computed(() => data.value.membershipLevel === 'BLACK')

  return { data, blackMemberStatus, onCheck, onRegister, onClear }
}
