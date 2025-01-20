import { messageRequired } from '@/assets'
import { cloneArray, getDatesInRange } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductDataValueModel, ProductDateRowKey, ProductOptionsDeliveryInfo, ProductTypeRegisterOptionValue } from '@/models'
import { computed, reactive, watch } from 'vue'
import { useProductRowAction } from './useProductRowAction'

export const useProductRegisterOptional = (
  callback: (value: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, type?: ProductTypeRegisterOptionValue) => void,
  data: ProductOptionsDeliveryInfo[] | undefined
) => {
  const { openModal } = useModalNotification()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const dataValue = reactive<ProductDataValueModel>({
    beginDate: '',
    endDate: '',
    checkOption: false,
    checkAll: false
  })
  const dataOptional = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data))
  const dataOptionalRequired = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data))
  const dataOptionalData = reactive<ProductOptionsDeliveryInfo[]>(cloneArray(data, false))
  const { decreaseRow, increaseRow } = useProductRowAction<ProductOptionsDeliveryInfo>(dataOptional)
  const { decreaseRow: decreaseRowRequired, increaseRow: increaseRowRequired } = useProductRowAction<ProductOptionsDeliveryInfo>(dataOptionalRequired)
  const { decreaseRow: decreaseRowData } = useProductRowAction<ProductOptionsDeliveryInfo>(dataOptionalData)

  const hasDataOptional = computed(() => {
    return (
      !!dataOptional.find((item) => item.option?.trim()) ||
      !!dataValue.beginDate ||
      !!dataValue.endDate ||
      !!dataOptionalRequired.find((item) => item.option?.trim())
    )
  })

  const invalidValidation = () => {
    const itemHasValue = dataOptional.find((item) => !item.option?.trim())
    if (!dataValue.beginDate || !dataValue.endDate || itemHasValue) return true
    return false
  }

  const handleChangeDate = ({ key, value }: { key: ProductDateRowKey; value: string }) => {
    dataValue[key] = value
  }

  const handleMapData = () => {
    if (invalidValidation()) return openModal({ content: messageRequired })
    dataOptionalData.splice(0)
    const list1 = getDatesInRange(dataValue.beginDate, dataValue.endDate)
    list1.forEach((option) => {
      dataOptional.forEach((option1) => {
        if (!dataValue.checkOption)
          return dataOptionalData.push({
            option,
            option1: option1.option
          })
        dataOptionalRequired.forEach((option2) => {
          dataOptionalData.push({
            option,
            option1: option1.option,
            option2: option2.option
          })
        })
      })
    })
  }

  watch(dataOptionalData, (n) => {
    const isUnchecked = n.find((_) => !_.selected)
    if (isUnchecked || !n?.length) return (dataValue.checkAll = false)
    dataValue.checkAll = true
  })

  const onConfirmDelete = () => {
    dataValue.checkAll = false
    const tempList = [...dataOptionalData]
    dataOptionalData.splice(0)
    tempList.forEach((_) => {
      if (!_.selected) {
        dataOptionalData.push({
          ..._,
          selected: dataValue.checkAll
        })
      }
    })
  }

  const deleteMultipleRecord = () => {
    openConfirm({
      content: '선택한 항목을 삭제 하시겠습니까?',
      onConfirm() {
        onConfirmDelete()
        closeModalByPop?.()
      }
    })
  }

  const handleCheckAll = () => {
    dataValue.checkAll = !dataValue.checkAll
    const tempList = [...dataOptionalData]
    dataOptionalData.splice(0)
    tempList.forEach((_) => {
      dataOptionalData.push({
        ..._,
        selected: dataValue.checkAll
      })
    })
  }

  const handleSubmit = () => {
    callback([...dataOptionalData], false, 'optional')
    closeModalByPop?.()
  }

  return {
    increaseRow,
    decreaseRow,
    dataOptional,
    hasDataOptional,
    dataOptionalRequired,
    increaseRowRequired,
    decreaseRowRequired,
    decreaseRowData,
    dataOptionalData,
    handleMapData,
    handleCheckAll,
    deleteMultipleRecord,
    handleSubmit,
    dataValue,
    handleChangeDate
  }
}
