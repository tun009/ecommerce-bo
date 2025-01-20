/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ALL_COMMON_MESSAGES,
  ALL_MEMBER_MESSAGES,
  dayFormatRegex,
  dayGroupFormatWithHyphen,
  exportExcel,
  fileDocumentNames,
  getLastKeyByValue,
  handleDownloadFile,
  memberSchema,
  readAndValidateExcelFile,
  TABLE_LOADING_WAIT_TIME,
  isAnyPropertyEmpty
} from '@/common'
import { MemberBulkRegistrationTable } from '@/components/members'
import { useDataTablePagination } from '@/composables'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  DataTablePaginationResponseModel,
  defaultPageState,
  memberBulkRegistrationFields,
  MemberBulkRegistrationRequest,
  memberBulkRegistrationTableHeaders,
  memberBulkRegistrationXlsxSheetName,
  MemberMultiGetCompanyResponse,
  memberReasonRefusedFieldName,
  memberReasonRefusedHeaderName,
  memberRegistrationCompanyEmpty,
  MemberRegistrationModel,
  MemberRegistrationRequestConvertor
} from '@/models'
import { memberRegistrationApi } from '@/services'
import { PageState } from 'primevue/paginator'
import { TabViewChangeEvent } from 'primevue/tabview'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useMemberBulkRegistration = () => {
  const tabData = [
    { name: 'success', component: MemberBulkRegistrationTable, header: '성공' },
    { name: 'failed', component: MemberBulkRegistrationTable, header: '실패' }
  ]

  const emailFieldNumber = 1

  const page = ref<PageState>({ ...defaultPageState })
  const inputFileEl = ref<HTMLInputElement | null>(null)
  const route = useRoute()
  const router = useRouter()
  const inputFileName = ref('')
  const inputFile = ref()
  const totalSuccessItems = ref<number>(0)
  const totalFailItems = ref<number>(0)
  const totalItems = ref<number>()
  const allSuccessItems = ref<MemberRegistrationModel[]>([])
  const allFailItems = ref<any>([])
  const registerSucceed = ref<boolean>(false)
  let lastInputFileValue: File

  const { openModal: openNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const tabPanelProps = tabData.map((item) => {
    return { header: item.header }
  })

  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }

  const currentActive = ref(searchTabIndex(route.query.tab as string))

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
        tab: tabData[event.index].name
      }
    })
  }

  const resetFile = () => {
    inputFileName.value = ''
    inputFile.value = null
    resetData()
  }

  const resetData = () => {
    totalSuccessItems.value = 0
    totalFailItems.value = 0
    totalItems.value = 0
    allSuccessItems.value = []
    allFailItems.value = []
    registerSucceed.value = false
  }

  const downloadSampleFile = () => {
    handleDownloadFile(fileDocumentNames.memberBulkRegistration.url, fileDocumentNames.memberBulkRegistration.name)
  }

  const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      inputFileName.value = file.name
      inputFile.value = file
    }
    ;(event.target as HTMLInputElement).value = ''
  }

  const openFileInput = () => {
    inputFileEl?.value && inputFileEl.value.click()
  }

  const getDataSuccess = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allSuccessItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberRegistrationModel>
  }
  const getDataFail = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allFailItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberRegistrationModel>
  }

  const {
    items: pageItemsSuccess,
    totalItems: totalItemsSuccess,
    isLoading: isLoadingSuccess,
    fetchDataWith: fetchDataSuccess
  } = useDataTablePagination<MemberRegistrationModel>(getDataSuccess)

  const {
    items: pageItemsFail,
    totalItems: totalItemsFail,
    isLoading: isLoadingFail,
    fetchDataWith: fetchDataFail
  } = useDataTablePagination<MemberRegistrationModel>(getDataFail)

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
    if (inputFile.value && inputFile.value !== lastInputFileValue) {
      resetData()

      lastInputFileValue = inputFile.value

      const { validItems, invalidItems } = await readAndValidateExcelFile(
        inputFile.value,
        [...memberBulkRegistrationFields, memberReasonRefusedFieldName],
        memberSchema,
        {
          duplicatedErrorMessage: ALL_MEMBER_MESSAGES.DUPLICATED_EMAIL_MESSAGE,
          duplicatedFieldCheck: emailFieldNumber,
          refusedFieldName: memberReasonRefusedFieldName,
          addIdField: false,
          skipHeader: true
        }
      )

      try {
        const { data } = await handleGetCompanyInfo(validItems as MemberRegistrationModel[])

        let idFail = 0
        let idSuccess = 0
        const tempSuccessArr: MemberRegistrationModel[] = []
        let tempFailArr = []
        if (validItems.length > 0) {
          validItems.forEach((customer: MemberRegistrationModel) => {
            const company = data.find((it) => it.customerKey === customer.customerCompanyCode)
            if (company) {
              const customerWithAddress = {
                ...customer,
                dateOfBirth: customer.dateOfBirth.replace(dayFormatRegex, dayGroupFormatWithHyphen),
                id: ++idSuccess,
                customer: company.customerName,
                address: company.streetAddress,
                companyZipCode: parseInt(company?.zipCode),
                companyLoadNameAddress: company?.address,
                companyLoadLotBasedAddress: company?.addressDetail,
                companyDetailedAddress: company?.addressDetail
              }
              tempSuccessArr.push(customerWithAddress)
            } else {
              tempFailArr.push({
                ...customer,
                dateOfBirth: customer.dateOfBirth.replace(dayFormatRegex, dayGroupFormatWithHyphen),
                id: ++idFail,
                reasonRefused: ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA
              })
            }
          })
        }

        invalidItems.forEach((it) => {
          const lastKey = getLastKeyByValue(it)

          const reasonRefused = it[lastKey]

          it.dateOfBirth = it.dateOfBirth.replace(dayFormatRegex, dayGroupFormatWithHyphen)

          it[lastKey] = ''

          it.id = ++idFail

          it.reasonRefused = reasonRefused
        })

        tempFailArr.push(...invalidItems)

        tempFailArr = tempFailArr.map((it) => {
          const { customer, address, ...rest } = it
          if (isAnyPropertyEmpty(rest)) {
            return {
              ...it,
              reasonRefused: ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA
            }
          } else {
            return it
          }
        })

        allSuccessItems.value = tempSuccessArr

        allFailItems.value = tempFailArr

        totalSuccessItems.value = allSuccessItems.value.length

        totalFailItems.value = allFailItems.value.length

        totalItems.value = totalSuccessItems.value + totalFailItems.value
      } catch (error) {
        allSuccessItems.value = []

        validItems.forEach((it) => {
          it.reasonRefused = ALL_COMMON_MESSAGES.MISSING_REQUIRED_DATA
        })

        const invalidItemsWithId = [...validItems, ...invalidItems]

        invalidItemsWithId.forEach((it, idx) => {
          it.id = idx + 1
        })

        allFailItems.value = invalidItemsWithId

        totalFailItems.value = allFailItems.value.length

        totalItems.value = allFailItems.value.length

        totalSuccessItems.value = 0
      }
    }
  }

  const handleGetCompanyInfo = async (members: MemberRegistrationModel[]): Promise<MemberMultiGetCompanyResponse> => {
    const customerKeyList = new Set(
      members.map((member) => {
        return member.customerCompanyCode
      })
    )

    if (customerKeyList.size === 0) {
      return memberRegistrationCompanyEmpty
    } else {
      const requestData = {
        customerKeyList: [...customerKeyList]
      }
      const companyData = await memberRegistrationApi.getMultiCustomerCompany(requestData)
      return companyData
    }
  }

  const handleRegisterMember = () => {
    registerMember()

    router.push({
      query: {
        tab: tabData[0].name
      }
    })
  }

  const onDownload = () => {
    if (allSuccessItems.value && currentActive.value === 0) {
      const exportedData = allSuccessItems.value.map((it: MemberRegistrationModel) => {
        const {
          id,
          reasonRefused,
          companyDetailedAddress,
          companyLoadNameAddress,
          companyLoadLotBasedAddress,
          memberShipCode,
          companyZipCode,
          ...rest
        } = it
        return rest
      }) as any
      exportExcel<MemberRegistrationModel>(exportedData, memberBulkRegistrationXlsxSheetName, memberBulkRegistrationTableHeaders)
    } else if (allFailItems.value) {
      const exportedData = allFailItems.value.map((it: MemberRegistrationModel) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {
          id,
          companyDetailedAddress,
          companyLoadNameAddress,
          companyLoadLotBasedAddress,
          companyZipCode,
          memberShipCode,
          ...rest
        } = it
        return rest
      })
      exportExcel<MemberRegistrationModel>(exportedData, memberBulkRegistrationXlsxSheetName, [
        ...memberBulkRegistrationTableHeaders,
        memberReasonRefusedHeaderName
      ])
    }
  }

  const onSubmitRegisterMember = async (): Promise<boolean> => {
    const transformData = allSuccessItems.value.map((item) => {
      return MemberRegistrationRequestConvertor.from(item)
    })

    const preparedJSON: MemberBulkRegistrationRequest = {
      batchRequests: transformData
    }
    const { data } = await memberRegistrationApi.bulkRegistration(preparedJSON)

    const successListTemp = allSuccessItems.value

    allFailItems.value = []

    allSuccessItems.value = []

    data.forEach((res, idx) => {
      if (res.isSuccessful === 'Y') {
        allSuccessItems.value.push({ ...successListTemp[idx], memberShipCode: res.memberId })
      } else {
        allFailItems.value.push({ ...successListTemp[idx], reasonRefused: res.reasonOfFailed })
      }
    })

    totalSuccessItems.value = allSuccessItems.value.length

    // totalFailItems.value = allFailItems.value.length

    totalItems.value = totalSuccessItems.value

    registerSucceed.value = true

    return true
  }

  const onClickDeleteRecords = async (): Promise<boolean> => {
    const allItemTemp = allSuccessItems.value.filter((item: MemberRegistrationModel) => {
      return !(listChecked.value as unknown as number[]).includes(item.id)
    })

    allSuccessItems.value = allItemTemp.map((it: MemberRegistrationModel, idx) => {
      return {
        ...it,
        id: idx + 1
      }
    })

    totalItems.value = allFailItems.value.length + allSuccessItems.value.length

    totalSuccessItems.value = allSuccessItems.value.length

    clearChecked()

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, TABLE_LOADING_WAIT_TIME)
    })
  }

  const listId = computed(() => {
    if (currentActive.value) {
      return pageItemsFail.value?.map((item: any) => item.id) ?? []
    }
    return pageItemsSuccess.value?.map((item: any) => item.id) ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  watch(
    () => route.query.tab,
    (value) => {
      currentActive.value = searchTabIndex(value as string)
    }
  )

  watch([allFailItems, allSuccessItems], () => {
    fetchDataSuccess({
      numberOfItems: page.value.rows,
      page: 0
    })
    fetchDataFail({
      numberOfItems: page.value.rows,
      page: 0
    })
  })

  const onRegisterRecords = () => {
    if (inputFile.value) {
      openModalConfirm({
        content: '회원을 일괄등록 하시겠습니까?',
        onConfirm: async () => {
          closeModalByPop?.()
          const success = await onSubmitRegisterMember()
          if (success) {
            openNotification({
              content: '회원이 일괄등록 되었습니다.'
            })
          }
        }
      })
    }
  }
  const onDeleteRecords = async () => {
    if (inputFile.value) {
      openModalConfirm({
        content: '선택하신 리스트를 삭제하시겠습니까?',
        onConfirm: async () => {
          closeModalByPop?.()
          await onClickDeleteRecords()
          openNotification({
            content: '선택된 리스트가 삭제 되었습니다.'
          })
        }
      })
    }
  }

  return {
    currentActive,
    handleTabChange,
    tabData,
    tabPanelProps,
    resetFile,
    downloadSampleFile,
    openFileInput,
    inputFileName,
    inputFileEl,
    handleFileUpload,
    handleRegisterMember,
    totalItems,
    onPageChange,
    onDeleteRecords,
    onRegisterRecords,
    onDownload,
    onRowSelected,
    onSelectAllChange,
    totalSuccessItems,
    totalFailItems,
    pageItemsSuccess,
    totalItemsSuccess,
    isLoadingSuccess,
    fetchDataSuccess,
    pageItemsFail,
    totalItemsFail,
    isLoadingFail,
    fetchDataFail,
    registerSucceed
  }
}
