import {
  isEmpty
} from '@/common'
import { useMemberPointRegisTrationBase } from '@/composables'
import {
  MemberBenefitPointAllocationTargetModel,
  MemberPointClassificationModel,
  MemberPointDeductionRegistrationBulkFormModel,
  MemberPointTypeSeonbokModel
} from '@/models'
import { reactive } from 'vue'

export const useMemberPointDeductionRegistration = () => {
  const classificationOptions = [
    {
      label: '선복 복지포인트',
      value: MemberPointClassificationModel.SEONBOK
    },
    {
      label: '특별 복지포인트',
      value: MemberPointClassificationModel.SPECIAL
    }
  ]

  const allocationTargetOptions = reactive([
    {
      label: '전체 회원 (N,NNN명)',
      value: MemberBenefitPointAllocationTargetModel.ALL
    },
    {
      label: '회원 지정',
      value: MemberBenefitPointAllocationTargetModel.MEMBER
    },
    {
      label: '일괄 지정',
      value: MemberBenefitPointAllocationTargetModel.BULK
    }
  ])

  const emptyForm: MemberPointDeductionRegistrationBulkFormModel = {
    pointClassification: MemberPointClassificationModel.SEONBOK,
    pointType: MemberPointTypeSeonbokModel.ALL,
    pointName: '',
    pointNumber: '',
    notes: '',
    reason: '',
    allocationTarget: MemberBenefitPointAllocationTargetModel.ALL,
    timeStart: undefined,
    timeEnd: undefined
  }

  const formValidationSchema = {
    pointClassification: isEmpty,
    pointType: isEmpty,
    pointName: isEmpty,
    pointNumber: isEmpty,
    notes: isEmpty,
    reason: isEmpty,
    allocationTarget: isEmpty,
    timeStart: isEmpty,
    timeEnd: isEmpty
  }

  const {
    optionSelected,
    optionsPointType,
    tabPanelProps,
    isAllAllocationTarget,
    isSaved,
    values,
    listChecked,
    currentActive,
    isLoadingSuccess,
    isLoadingFail,
    totalSuccessItems,
    totalFailItems,
    pageItemsFail,
    pageItemsSuccess,
    inputFileEl,
    inputFileName,
    resetFile,
    setFieldValue,
    onRegisterRecords,
    onDeleteRecords,
    onRowSelected,
    onSelectAllChange,
    onPageChange,
    handleTabChange,
    onDownload,
    downloadSampleFile,
    resetForm,
    openFileInput,
    onSave,
    handleFileUpload,
    handleRegisterMember
  } = useMemberPointRegisTrationBase(formValidationSchema, emptyForm)

  return {
    classificationOptions,
    optionSelected,
    optionsPointType,
    allocationTargetOptions,
    tabPanelProps,
    isAllAllocationTarget,
    isSaved,
    values,
    listChecked,
    currentActive,
    isLoadingSuccess,
    isLoadingFail,
    totalSuccessItems,
    totalFailItems,
    pageItemsFail,
    pageItemsSuccess,
    inputFileEl,
    inputFileName,
    resetFile,
    setFieldValue,
    onRegisterRecords,
    onDeleteRecords,
    onRowSelected,
    onSelectAllChange,
    onPageChange,
    handleTabChange,
    onDownload,
    downloadSampleFile,
    resetForm,
    openFileInput,
    onSave,
    handleFileUpload,
    handleRegisterMember
  }
}
