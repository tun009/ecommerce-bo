import {
  ALL_COMMON_MESSAGES,
  exportExcel,
  fileDocumentNames,
  handleDownloadFile,
  isEmptyObject,
  readAndValidateExcelFile,
  requiredFieldMissing
} from '@/common'
import { useCheckBoxTable, useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  DataTablePaginationResponseModel,
  MemberBenefitPointAllocationTargetModel,
  MemberPointClassificationModel,
  MemberPointUsageRegistrationBulkFormModel,
  MemberPointUsageRegistrationBulkModel,
  MemberSpecifyInBulktabModel,
  defaultPageState,
  memberBulkRegistrationXlsxSheetName,
  memberOptionsPointTypeSeonbok,
  memberOptionsPointTypeSpecial,
  memberPointUsageRegistrationBulkFields,
  memberPointUsageRegistrationBulkHeaders,
  memberReasonRefusedFieldName,
  memberReasonRefusedHeaderName
} from '@/models'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useMemberPointAllocationSpecifyInBulk } from '../pointUsageList'

export const useMemberPointRegisTrationBase = (formValidationSchema: any, emptyForm: any) => {
  const tabData = [
    { name: MemberSpecifyInBulktabModel.SUCCESS, header: '성공' },
    { name: MemberSpecifyInBulktabModel.FAIL, header: '실패' }
  ]

  const listId = computed(() => {
    if (currentActive.value) {
      return pageItemsFail.value?.map((item: MemberPointUsageRegistrationBulkModel) => item.id) ?? []
    }
    return pageItemsSuccess.value?.map((item: MemberPointUsageRegistrationBulkModel) => item.id) ?? []
  })

  const optionsPointType = computed(() => {
    return values?.pointClassification === MemberPointClassificationModel.SEONBOK ? memberOptionsPointTypeSeonbok : memberOptionsPointTypeSpecial
  })

  const optionSelected = computed(() => {
    return optionsPointType.value.find((i) => i.value === values.pointType)
  })

  const router = useRouter()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const emailFieldNumber = 3
  const page = ref<PageState>(defaultPageState)
  const isSubmitted = ref<boolean>(false)
  const isSaved = ref(false)
  const inputFile = ref()
  const inputFileEl = ref<HTMLInputElement | null>(null)
  const inputFileName = ref('')
  const totalItems = ref<number>()
  const totalSuccessItems = ref<number>(0)
  const totalFailItems = ref<number>(0)
  const allSuccessItems = ref<MemberPointUsageRegistrationBulkModel[]>([])
  const allFailItems = ref<MemberPointUsageRegistrationBulkModel[]>([])
  const { tabPanelProps, currentActive, handleTabChange } = useMemberPointAllocationSpecifyInBulk()
  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  const schema = yup.object().shape({
    memberCode: requiredFieldMissing,
    name: requiredFieldMissing,
    email: requiredFieldMissing.email(ALL_COMMON_MESSAGES.DUPLICATED_EMAIL_MESSAGE),
    phoneNumber: requiredFieldMissing,
    point: requiredFieldMissing,
    clientCode: requiredFieldMissing,
    client: requiredFieldMissing
  })

  const { values, setFieldValue, resetForm, errors } = useForm<MemberPointUsageRegistrationBulkFormModel>({
    initialValues: emptyForm,
    validationSchema: yup.object(formValidationSchema)
  })

  const isAllAllocationTarget = computed(() => {
    return values.allocationTarget === MemberBenefitPointAllocationTargetModel.ALL
  })

  const getDataSuccess = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allSuccessItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberPointUsageRegistrationBulkModel>
  }

  const getDataFail = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allFailItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberPointUsageRegistrationBulkModel>
  }

  const {
    items: pageItemsSuccess,
    isLoading: isLoadingSuccess,
    fetchDataWith: fetchDataSuccess
  } = useDataTablePagination<MemberPointUsageRegistrationBulkModel>(getDataSuccess)

  const {
    items: pageItemsFail,
    isLoading: isLoadingFail,
    fetchDataWith: fetchDataFail
  } = useDataTablePagination<MemberPointUsageRegistrationBulkModel>(getDataFail)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    currentActive.value
      ? fetchDataFail({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
      : fetchDataSuccess({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
  }

  const registerMember = async () => {
    const { validItems, invalidItems } = await readAndValidateExcelFile(
      inputFile.value,
      [...memberPointUsageRegistrationBulkFields, memberReasonRefusedFieldName],
      schema,
      {
        duplicatedErrorMessage: ALL_COMMON_MESSAGES.DUPLICATED_EMAIL_MESSAGE,
        duplicatedFieldCheck: emailFieldNumber,
        refusedFieldName: memberReasonRefusedFieldName,
        addIdField: true,
        skipHeader: true
      }
    )
    allFailItems.value = invalidItems
    allSuccessItems.value = validItems
    totalSuccessItems.value = validItems.length
    totalFailItems.value = invalidItems.length
    totalItems.value = totalSuccessItems.value + totalFailItems.value
  }

  const openFileInput = () => {
    inputFileEl?.value && inputFileEl.value.click()
  }

  const handleRegisterMember = () => {
    registerMember()
    fetchDataSuccess({
      numberOfItems: page.value.rows,
      page: page.value.page
    })

    fetchDataFail({
      numberOfItems: page.value.rows,
      page: page.value.page
    })

    router.push({
      query: {
        tab: tabData[0].name
      }
    })
  }

  const handleFileUpload = (event: Event) => {
    const fileItem = (event.target as HTMLInputElement).files?.[0]
    if (fileItem) {
      inputFileName.value = fileItem.name
      inputFile.value = fileItem
    }
    ;(event.target as HTMLInputElement).value = ''
  }

  const resetFile = () => {
    inputFileName.value = ''
    inputFile.value = null
  }

  const onSubmitRegisterMember = () => {
    const preparedData = allSuccessItems.value.filter((item: MemberPointUsageRegistrationBulkModel) => listChecked.value.includes(item.id))
    if (!preparedData.length) {
      return
    }
    allSuccessItems.value = allSuccessItems.value.filter((item: MemberPointUsageRegistrationBulkModel) => !listChecked.value.includes(item.id))

    onPageChange(page.value)
    clearChecked()
  }

  const onRegisterRecords = () => {
    if (inputFile.value) {
      openModalConfirm({
        content: '회원을 일괄등록 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          onSubmitRegisterMember()
          openNotification({
            content: '회원이 일괄등록 되었습니다.'
          })
        }
      })
    }
  }

  const onDeleteRecords = () => {
    if (inputFile.value) {
      openModalConfirm({
        content: '선택하신 리스트를 삭제하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          onClickDeleteRecords()
          openNotification({
            content: '선택된 리스트가 삭제 되었습니다.'
          })
        }
      })
    }
  }

  const onClickDeleteRecords = () => {
    allSuccessItems.value = allSuccessItems.value.filter((item: MemberPointUsageRegistrationBulkModel) => !listChecked.value.includes(item.id))
    clearChecked()
    onPageChange(page.value)
  }

  const onDownload = () => {
    if (allSuccessItems.value && currentActive.value === 0) {
      const exportedData = allSuccessItems.value.map((it: MemberPointUsageRegistrationBulkModel) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = it
        return rest
      })
      exportExcel(exportedData, memberBulkRegistrationXlsxSheetName, memberPointUsageRegistrationBulkHeaders)
    } else if (allFailItems.value) {
      const exportedData = allFailItems.value.map((it: MemberPointUsageRegistrationBulkModel) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = it
        return rest
      })
      exportExcel(exportedData, memberBulkRegistrationXlsxSheetName, [...memberPointUsageRegistrationBulkHeaders, memberReasonRefusedHeaderName])
    }
  }

  const downloadSampleFile = () => {
    handleDownloadFile(fileDocumentNames.memberBulkRegistration.url, fileDocumentNames.memberBulkRegistration.url)
  }

  const onSave = () => {
    isSaved.value = true
    if (isEmptyObject(errors.value)) {
      openModalConfirm({
        content: '회원을 등록 하시겠습니까?',
        onConfirm: () => {
          isSubmitted.value = true
          closeModalByPop?.()
        }
      })
    }
  }

  return {
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
  }
}
