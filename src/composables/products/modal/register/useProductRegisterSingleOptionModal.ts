import { messageRequired } from '@/assets'
import { cloneArray } from '@/common'
import { useModalNotification } from '@/composables/widgets'
import { ProductOptionsDeliveryInfo, ProductTicketBoItemOptionListModel, ProductTicketItemOptionManageRequest, ProductTypeRegisterOptionValue } from '@/models'
import { computed, reactive } from 'vue'
import { useProductRowAction } from './useProductRowAction'
import { productTicketDetailInfoApi } from '@/services'

export const useProductRegisterSingleOptionModal = (
  callback: (value: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, type?: ProductTypeRegisterOptionValue) => void,
  data: ProductOptionsDeliveryInfo[] | undefined,
  baseInfoType?: string
) => {
  const dataSingle = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data))
  const { openModal, closeModalByPop } = useModalNotification()
  const { decreaseRow, increaseRow } = useProductRowAction<ProductOptionsDeliveryInfo>(dataSingle)
  const handleValidateSingle = () => {
    const isError = [...dataSingle].find((item) => !item.option?.trim())
    if (isError) return openModal({ content: messageRequired })
    if (baseInfoType === "TICKET") {
      updateItemOptionManage()
    }else{
      callback([...dataSingle], false, 'single')
      closeModalByPop?.()
    }
  }

  const updateItemOptionManage = () => {
    const boItemOptionPopupInsertList: ProductTicketBoItemOptionListModel[] = dataSingle.map((it: ProductOptionsDeliveryInfo, idx: number) => {
      return {
        optionDisplayOrder: idx + 1,
        option1DepthName: it.option,
        optionId: it.optionId?.toString(),
        productKey: it.productKey
      }
    })

    const request: ProductTicketItemOptionManageRequest = {
      optionType: '01',
      sclassOptionUseYn: 'N',
      boItemOptionPopupInsertList: boItemOptionPopupInsertList,
      productKey: boItemOptionPopupInsertList.length > 0 && boItemOptionPopupInsertList[0]?.productKey
    }
    productTicketDetailInfoApi.updateItemOptionManage(request).then(() => {
      callback([...dataSingle], false, 'single')
      closeModalByPop?.()
    })
  }

  const hasDataSingle = computed(() => {
    const itemHasValue = dataSingle.find((item) => item.option?.trim())
    return !!itemHasValue
  })

  return { decreaseRow, increaseRow, dataSingle, handleValidateSingle, hasDataSingle }
}
