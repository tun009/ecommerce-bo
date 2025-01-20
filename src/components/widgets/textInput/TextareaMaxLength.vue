<script setup lang="ts">
import { WelfareTextarea } from '@/components/uikit'
import { useModalNotification } from '@/composables'
import { WelfareTextareaEmits, WelfareTextareaProps } from '@/models'
import { ref, watch } from 'vue'

interface Props extends WelfareTextareaProps {
  messageWarning?: string
  maxLength: number
  hiddenWarning?: boolean
}
const props = defineProps<Props>()

const emits = defineEmits<WelfareTextareaEmits>()

const value = ref(props.modelValue ?? '')

const { openModal, closeModalByPop } = useModalNotification()

watch(
  () => props.modelValue,
  (nValue) => {
    value.value = nValue ?? ''
  }
)

watch(value, (nValue) => {
  if (nValue.length > Number(props?.maxLength)) {
    if (props.hiddenWarning) {
      value.value = nValue.slice(0, props.maxLength)
    } else {
      openModal({
        content: props.messageWarning ?? `한글 기준 ${props.maxLength}자 이내로 입력 해주세요.`,
        onAccept() {
          closeModalByPop?.()
          value.value = nValue.slice(0, props.maxLength)
        }
      })
    }

    ;(document.activeElement as HTMLInputElement).blur()
  }
  emits('update:modelValue', nValue)
})
</script>

<template>
  <WelfareTextarea v-bind="props" :readonly="props.readonly" v-model="value" :placeholder="placeholder" :disabled="props.disabled" />
</template>
