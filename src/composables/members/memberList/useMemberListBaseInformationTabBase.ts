import { formatDateWithFORMAT_DATE_YYYY_MM_DD } from '@/common'
import { emptyAddress } from '@/common/constant'
import { useCheckbox } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { MemberUpdateDetailRequestConvertor } from '@/models'
import { MemberDetailBaseInformationModel } from '@/models/views'
import { memberDetailBaseInformationApi } from '@/services/api'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const listRadioEmployeesStatus = [
  { label: '재직', value: 0 },
  { label: '퇴사', value: 1 }
]

const listRadioGender = [
  { label: '구분 없음', value: 0 },
  { label: '여자', value: 1 },
  { label: '남자', value: 2 }
]

const listCheckboxAccountStatus = [
  { label: '사용', value: 0 },
  { label: '미사용', value: 1 }
]

const listRadioBenefitSetup = [
  { label: '이메일', value: 0 },
  { label: 'SMS', value: 1 }
]

export const useMemberListBaseInformationTabBase = () => {
  let initValue = {
    customer: '',
    nameCustomer: '',
    idRegister: '',
    password: '',
    phone: '',
    level: '',
    employeeNumber: '',
    employeeStatus: 0,
    birthDate: '',
    gender: 0,
    positionMember: '',
    certification: '',
    emailPersonal: '',
    customerAddress: emptyAddress,
    memberRegistrationDateTime: '',
    accountStatus: 0,
    lassAccessDate: '',
    passwordChangeDate: '',
    companyAddress: emptyAddress,
    customerKey: '',
    latestBlackListChangedAdminId: '',
    latestBlackListChangeAdminName: '',
    latestBlackListChangedDate: ''
  }

  const updateDate = ref('2023.11.01 07:55:00')
  const route = useRoute()
  const detailMember = reactive<{
    data: MemberDetailBaseInformationModel
  }>({
    data: { ...initValue }
  })

  onMounted(() => {
    if (route?.query?.memberKey) {
      getDataMemberBaseInfo(route?.query?.memberKey.toString())
    }
  })

  const getDataMemberBaseInfo = (memberKey: string) => {
    memberDetailBaseInformationApi.getMemberBaseInformationDetail({ memberKey: memberKey }).then((data) => {
      initValue = {
        ...data.data
      }
      detailMember.data = data.data
    })
  }
  const setFieldValue = (text: string, data: any) => {
    if (text === 'companyAddress') {
      detailMember.data.companyAddress.zipCode = data.zipCode
      detailMember.data.companyAddress.detailedAddress = data.detailedAddress
      detailMember.data.companyAddress.loadLotBasedAddress = data.loadLotBasedAddress
      detailMember.data.companyAddress.loadNameAddress = data.loadNameAddress
    } else {
      detailMember.data.customerAddress.zipCode = data.zipCode
      detailMember.data.customerAddress.detailedAddress = data.detailedAddress
      detailMember.data.customerAddress.loadLotBasedAddress = data.loadLotBasedAddress
      detailMember.data.customerAddress.loadNameAddress = data.loadNameAddress
    }
  }
  const { openModal } = useModalConfirm()
  const { replaceModalNotification } = useModalNotification()
  const listAccountStatusId = computed(() => {
    return listCheckboxAccountStatus.map((item) => String(item.value))
  })

  const { getChecked, handleChangeCheckBoxItem, clearChecked } = useCheckbox(listAccountStatusId)

  const refPhone = ref()
  const refLevel = ref()
  const refEmployeeNumber = ref()
  const refBirthDate = ref()
  const refEmailPersonal = ref()
  const refAddressCustomer = ref()

  const resetPassword = () => {
    openModal({
      content: '비밀번호를 초기화 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        replaceModalNotification({ content: '비밀번호가 초기화 되었습니다.' })
      }
    })
  }

  const handleReset = () => {
    detailMember.data = { ...initValue }
    clearChecked()
  }

  const handleSubmit = () => {
    openModal({
      content: '회원 기본정보를 변경하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: handleConfirmSubmit
    })
  }

  const handleConfirmSubmit = async () => {
    try {
      if (route?.query?.memberKey) {
        await memberDetailBaseInformationApi.updateMemberBaseInformationDetail(
          { memberKey: route?.query?.memberKey.toString() },
          MemberUpdateDetailRequestConvertor.from(detailMember)
        )
        getDataMemberBaseInfo(route?.query?.memberKey.toString())
      }
      updateDate.value = formatDateWithFORMAT_DATE_YYYY_MM_DD(new Date())
      replaceModalNotification({ content: '회원 기본정보가 수정 되었습니다.' })
    } catch (error: any) {
      replaceModalNotification({ content: error?.data?.message || error?.data })
    }
  }

  return {
    resetPassword,
    listRadioEmployeesStatus,
    listRadioGender,
    listRadioBenefitSetup,
    listCheckboxAccountStatus,
    getChecked,
    handleChangeCheckBoxItem,
    detailMember,
    handleReset,
    refPhone,
    refLevel,
    refEmployeeNumber,
    refBirthDate,
    refEmailPersonal,
    refAddressCustomer,
    updateDate,
    handleSubmit,
    setFieldValue
  }
}
