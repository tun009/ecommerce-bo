/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TEXTAREA_NUMBER_200,
  isEmpty,
  isString
} from '@/common'
import { useNotificationMaxLength } from '@/composables/common'
import {
  MemberBenefitPointAllocationTargetModel,
  MemberPointClassificationModel,
  MemberPointTypeSeonbokModel,
  MemberPointUsageRegistrationBulkFormModel
} from '@/models'
import { useMemberPointRegisTrationBase } from '@/composables'

export const useMemberPointUsageRegistrationBulk = () => {
  const emptyForm: MemberPointUsageRegistrationBulkFormModel = {
    pointClassification: MemberPointClassificationModel.SEONBOK,
    pointType: MemberPointTypeSeonbokModel.ALL,
    pointName: '',
    pointNumber: '',
    notes: '',
    allocationTarget: MemberBenefitPointAllocationTargetModel.ALL,
    timeStart: undefined,
    timeEnd: undefined
  }

  const formValidationSchema = {
    pointClassification: isEmpty,
    pointType: isEmpty,
    pointName: isEmpty,
    pointNumber: isEmpty,
    notes: isString,
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
    isSubmitted,
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

  const { isReadOnly: readOnlyTextareaNotes, handelChange: handelChangeTextareaNotes } = useNotificationMaxLength({
    emit: (value: string) => {
      setFieldValue('notes', value)
    },
    length: TEXTAREA_NUMBER_200
  })

  return {
    values,
    setFieldValue,
    optionsPointType,
    handelChangeTextareaNotes,
    readOnlyTextareaNotes,
    resetForm,
    onSave,
    handleFileUpload,
    inputFileEl,
    openFileInput,
    resetFile,
    inputFileName,
    isAllAllocationTarget,
    handleTabChange,
    isLoadingFail,
    isLoadingSuccess,
    onDeleteRecords,
    onDownload,
    onRegisterRecords,
    onRowSelected,
    onSelectAllChange,
    pageItemsFail,
    pageItemsSuccess,
    totalFailItems,
    totalSuccessItems,
    onPageChange,
    listChecked,
    currentActive,
    tabPanelProps,
    downloadSampleFile,
    handleRegisterMember,
    isSaved,
    optionSelected,
    isSubmitted
  }
}
