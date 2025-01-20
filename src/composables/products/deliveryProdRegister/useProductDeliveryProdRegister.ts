import { useModalConfirm, useModalNotification, useProductRedirectLink } from '@/composables'
import { ProductTicketDetailIssuedInfoRequest, ProductTicketItemOptionDeleteRequest, ProductTicketItemOptionInventoryManageRequest, WelfareSelectOptionType } from '@/models'
import {
  ProductOptionsDeliveryInfo,
  ProductRegisterValueOptionType,
  ProductTicketBoItemOptionListModel,
  ProductTypeRegisterOptionValue,
  productOptionsTypeRegisterConfig
} from '@/models/views/products'
import router from '@/router'
import { productTicketDetailInfoApi } from '@/services'
import { ComputedRef, computed, onMounted, reactive, ref } from 'vue'

const TYPE_TICKET = 'TICKET'
const OPTION_USE_Y = 'Y';
const OPTION_USE_N = 'N';
const SCLASS_OPTION_USE_Y = 'Y';
const TYPE_SINGLE = '01';
const TYPE_MULTIPLE = '02';
const TYPE_OPTIONAL = '03';

export const useProductDeliveryProdRegister = (type: string) => {
  let idDefault = 1000
  const valueType = reactive<ProductOptionsDeliveryInfo[]>([])
  const valueOption = ref<ProductRegisterValueOptionType>(ProductRegisterValueOptionType.notUsed)
  const totalCount = ref<number | undefined>()
  const isSaveSuccess = ref<boolean>(false)
  const approvalValue = ref<boolean>(false)
  const dataMultipleValue = ref<boolean>(false)
  const typeOptionValue = ref<ProductTypeRegisterOptionValue>('single')
  const sclassOptionUseYn = ref<boolean>(false)
  const productKey = ref<number>(0)
  const { openModal: openConfirmModal } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()

  const { redirectCancelLink } = useProductRedirectLink(type)
  const updateValueType = (newValue: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, typeOption?: ProductTypeRegisterOptionValue) => {
    typeOptionValue.value = typeOption
    dataMultipleValue.value = checkDataMultiple || false
    const updatedValue = newValue.map((item) => ({
      ...item,
      optionId: item.optionId || ++idDefault,
      salesStatus: item.salesStatus || productOptionsTypeRegisterConfig[0]
    }))
    valueType.splice(0, valueType.length, ...updatedValue)
  }

  const editValueType = (newValue: ProductOptionsDeliveryInfo, index: number) => {
    valueType[index] = newValue
  }

  const updateValueOption = (newValue: ProductRegisterValueOptionType) => {
    valueOption.value = newValue
  }

  const deleteValueType = (index: number, productOptionKey?: number) => {
    if (type === TYPE_TICKET) {
      deleteItemOption(productOptionKey ?? 0, 2, index);
    } else {
      valueType.splice(index, 1)
    }
  }

  const updateValueTotalCount = (value: number | undefined) => {
    totalCount.value = value
  }

  const openCancelModal = () => {
    openConfirmModal({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(redirectCancelLink.value)
      }
    })
  }

  const openTemporaryStorageModal = () => {
    openNotificationModal({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const countTotalOption = () => {
    let totalCountValue = 0
    valueType.map((item) => {
      if (item.inventory && item.salesStatus?.value === '01') totalCountValue = totalCountValue + item.inventory
    })
    totalCount.value = totalCountValue
  }

  const openSaveModal = () => {
    let checkValue = true
    countTotalOption()

    if (!totalCount.value) {
      checkValue = false
    }
    if (valueOption.value === ProductRegisterValueOptionType.use) {
      if (
        !valueType.every(
          (item) => 'optionPrice' in item && item.optionPrice && (item.salesStatus?.value === '01' ? 'inventory' in item && item.inventory : true)
        )
      ) {
        checkValue = false
      }
    }
    if (checkValue) {
      if (type === TYPE_TICKET) {
        updateItemOptionInventoryManage()
      } else {
        openNotificationModal({
          content: '배송정보 입력이 완료되었습니다.'
        })
      }
      isSaveSuccess.value = true
    } else {
      openConfirmModal({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
      })
    }
  }

  const onClickApproval = () => {
    approvalValue.value = true
  }

  const typeRegisterOption: ComputedRef<ProductTypeRegisterOptionValue> = computed(() => {
    if (valueType.length == 0) return undefined
    return typeOptionValue.value
  })

  const findSalesStatus = (value: string): WelfareSelectOptionType => {
    const salesStatus = productOptionsTypeRegisterConfig.find((it) => it.value === value)
    return salesStatus ?? productOptionsTypeRegisterConfig[0]
  }

  const getItemDetailOptionInfo = (productClassificationCode: string, productCode: string) => {
    const request: ProductTicketDetailIssuedInfoRequest = { productClassificationCode, productCode }
    productTicketDetailInfoApi.getItemDetailOptionInfo(request).then((res) => {
      const data = res.data
      const dataBoItemOptionListConvert: ProductOptionsDeliveryInfo[] = data.boItemOptionList.map((it: ProductTicketBoItemOptionListModel) => {
        return {
          no: it.productOptionKey,
          optionId: Number(it.optionId),
          option: it.option1DepthName,
          option1: it.option2DepthName,
          option2: it.option3DepthName,
          optionPrice: it.optionPrice,
          inventory: it.optionInventoryQuantity,
          salesStatus: findSalesStatus(it.optionSaleStatus ?? ''),
          selected: true,
          optionDisplayOrder: it.optionDisplayOrder,
          productKey: it.productKey
        }
      })
      productKey.value = data.productKey
      valueOption.value = data.optionUseYn && data.optionUseYn === OPTION_USE_Y ? ProductRegisterValueOptionType.use : ProductRegisterValueOptionType.notUsed
      totalCount.value = data.inventoryQuantity
      typeOptionValue.value = data.optionType === TYPE_SINGLE ? 'single' : data.optionType === TYPE_MULTIPLE ? 'multiple' : data.optionType === TYPE_OPTIONAL ? 'optional' : undefined
      sclassOptionUseYn.value = data.sclassOptionUseYn === SCLASS_OPTION_USE_Y
      updateValueType(dataBoItemOptionListConvert)
    })
  }

  const updateItemOptionInventoryManage = () => {
    const boItemOptionList: ProductTicketBoItemOptionListModel[] = valueType.map((it: ProductOptionsDeliveryInfo) => {
      return {
        productOptionKey: it.no,
        optionId: it.optionId?.toString(),
        optionPrice: it.optionPrice,
        optionInventoryQuantity: it.inventory,
        optionSaleStatus: it.salesStatus?.value,
        optionDisplayOrder: it.optionDisplayOrder
      }
    })
    const request: ProductTicketItemOptionInventoryManageRequest = {
      optionUseYn: valueOption.value === ProductRegisterValueOptionType.use ? OPTION_USE_Y : OPTION_USE_N,
      inventoryQuantity: totalCount.value ?? 0,
      boItemOptionUpdateList: boItemOptionList,
      productKey: productKey.value
    }
    productTicketDetailInfoApi.updateItemOptionInventoryManage(request).then(() => {
      openNotificationModal({
        content: '배송정보 입력이 완료되었습니다.'
      })
    })
  }

  const deleteItemOption = (productOptionKey: number, productKey: number, index: number) => {
    const request: ProductTicketItemOptionDeleteRequest = { productOptionKey, productKey }
    productTicketDetailInfoApi.deleteItemOption(request).then(() => {
      valueType.splice(index, 1)
    })
  }

  onMounted(() => {
    if (type === TYPE_TICKET) {
      getItemDetailOptionInfo("01", "1000000000002")
    }
  })

  return {
    valueType,
    valueOption,
    isSaveSuccess,
    approvalValue,
    updateValueType,
    updateValueOption,
    editValueType,
    deleteValueType,
    totalCount,
    updateValueTotalCount,
    openCancelModal,
    openTemporaryStorageModal,
    openSaveModal,
    onClickApproval,
    typeRegisterOption,
    dataMultipleValue,
    countTotalOption,
    sclassOptionUseYn
  }
}
