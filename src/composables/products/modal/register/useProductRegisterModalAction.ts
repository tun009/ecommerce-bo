import { useModalConfirm } from '@/composables/widgets'
import { ProductTypeRegisterOptionValue } from '@/models'
import { ComputedRef, Ref, computed } from 'vue'

export const useProductRegisterModalAction = (
  selectStep: Ref<ProductTypeRegisterOptionValue>,
  handleValidateSingle: () => void,
  handleValidateMultiple: () => void,
  hasDataSingle: ComputedRef<boolean>,
  hasDataMultiple: ComputedRef<boolean>,
  hasDataOptional: ComputedRef<boolean>,
  handleSubmit: () => void
) => {
  const { closeModalByPop } = useModalConfirm()
  const { openModal: openModalCancel, closeModalByPop: closeModalByPopCancel } = useModalConfirm()

  const handleConfirm = () => {
    switch (selectStep.value) {
      case 'single':
        return handleValidateSingle()
      case 'multiple':
        return handleValidateMultiple()
      case 'optional':
        return handleSubmit()
      default:
        return handleValidateSingle()
    }
  }

  const handleClose = () => {
    const isInvalid =
      selectStep.value === 'single' ? hasDataSingle.value : selectStep.value === 'multiple' ? hasDataMultiple.value : hasDataOptional.value
    if (isInvalid) {
      openModalCancel?.({
        content: '변경사항이 저장되지 않습니다. 닫으시겠습니까?',
        onConfirm() {
          closeModalByPopCancel?.()
          closeModalByPop?.()
        }
      })
      return
    }
    closeModalByPop?.()
  }

  const indexData = computed(() => {
    return selectStep.value === 'single' ? 0 : selectStep.value === 'multiple' ? 1 : 2
  })

  const enabledOption = computed(() => {
    if (selectStep.value === 'single') return hasDataSingle.value
    return hasDataMultiple.value
  })

  return { handleConfirm, handleClose, indexData, enabledOption }
}
