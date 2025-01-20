import { messageRequired } from '@/assets'
import { useModalNotification } from '@/composables/widgets'
import { ProductOptionsDeliveryInfo, ProductTypeRegisterOptionValue } from '@/models'
import { computed, reactive, ref } from 'vue'
import { useProductRowAction } from './useProductRowAction'
import { cloneArray } from '@/common'

export const useProductRegisterMultipleOptionModal = (
  callback: (value: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, type?: ProductTypeRegisterOptionValue) => void,
  data: ProductOptionsDeliveryInfo[] | undefined,
  checkOptionValue?: boolean
) => {
  const { openModal, closeModalByPop } = useModalNotification()
  const checkOption = ref<boolean>(checkOptionValue ?? false)
  const dataMultiple = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data))
  const { decreaseRow, increaseRow } = useProductRowAction<ProductOptionsDeliveryInfo>(dataMultiple)
  const handleValidateMultiple = () => {
    const isError = [...dataMultiple].find((item) => !item.option?.trim() || !item?.option1?.trim())
    if (isError) return openModal({ content: messageRequired })
    const checkDataMultiple = checkOption.value
      ? [...dataMultiple]
      : [...dataMultiple].map((item) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { option2, ...rest } = item
          return rest
        })

    callback(checkDataMultiple, checkOption.value, 'multiple')
    closeModalByPop?.()
  }

  const hasDataMultiple = computed(() => {
    return !!dataMultiple.find((item) => item.option?.trim() ?? item.option1?.trim())
  })

  const handleUpdateCheckOption = (value: boolean) => {
    checkOption.value = value
  }

  return { increaseRow, decreaseRow, dataMultiple, handleValidateMultiple, checkOption, hasDataMultiple, handleUpdateCheckOption }
}
