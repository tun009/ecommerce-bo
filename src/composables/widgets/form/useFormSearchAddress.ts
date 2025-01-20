import { execDaumPostcode, handleClickOutsideIframe, mountDaumCode } from '@/common'
import { FormAddressEmits, FormAddressProps } from '@/models'
import { onMounted, ref, watch } from 'vue'

export const useFormSearchAddress = (props: FormAddressProps, emits: FormAddressEmits) => {
  const wfDaumLayer = ref()
  const detailAddressRef = ref()

  const postcode = ref(props.modelValue.zipCode ?? '')
  const address = ref(props.modelValue.loadNameAddress ?? '')
  const detailAddress = ref(props.modelValue.detailedAddress ?? '')
  const extraAddress = ref(props.modelValue.loadLotBasedAddress ?? '')

  const isDisplayIframe = ref(false)

  watch([postcode, address, detailAddress, extraAddress], ([newPostCode, newAddress, newDetailAddress, newExtraAddress]) => {
    emits('update:modelValue', {
      ...props.modelValue,
      zipCode: newPostCode,
      detailedAddress: newDetailAddress,
      loadNameAddress: newAddress,
      loadLotBasedAddress: newExtraAddress
    })
  })

  watch(
    () => props.modelValue,
    (addressProps) => {
      postcode.value = addressProps.zipCode
      address.value = addressProps.loadNameAddress
      detailAddress.value = addressProps.detailedAddress
      extraAddress.value = addressProps.loadLotBasedAddress
    }
  )
  onMounted(() => {
    mountDaumCode()
  })

  const updateDetailAddress = (e: string) => {
    detailAddress.value = e
  }
  const closeDaumPostcode = () => {
    wfDaumLayer.value.style.display = 'none'
    isDisplayIframe.value = false
  }

  const handleClickOutside = (event: Event) => {
    handleClickOutsideIframe(closeDaumPostcode, wfDaumLayer, event)
  }

  const handleExecDaumPostcode = () => {
    execDaumPostcode(wfDaumLayer, extraAddress, postcode, address, isDisplayIframe)
  }
  return {
    closeDaumPostcode,
    wfDaumLayer,
    postcode,
    address,
    detailAddress,
    extraAddress,
    handleClickOutside,
    isDisplayIframe,
    detailAddressRef,
    handleExecDaumPostcode,
    updateDetailAddress
  }
}
