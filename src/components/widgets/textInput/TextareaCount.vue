<script setup lang="ts">
import { formatNumberDot } from '@/common'
import { WelfareTextarea } from '@/components/uikit'
import { WelfareTextareaEmits, WelfareTextareaProps } from '@/models'
import { computed } from 'vue'

interface TextareaCountProps extends WelfareTextareaProps {
  max?: number
}
const props = withDefaults(defineProps<TextareaCountProps>(), {
  max: 200
})

defineEmits<WelfareTextareaEmits>()

const maxText = computed(() => {
  return formatNumberDot(props.max)
})

const length = computed(() => {
  return formatNumberDot(props.modelValue ? props.modelValue.length : 0)
})
</script>

<template>
  <div class="w-full wf_flex wf_flex-col wf-space-y-6">
    <WelfareTextarea
      class="wf-product-text-count"
      v-bind="props"
      :modelValue="props.modelValue"
      @keypress="(event: KeyboardEvent) => $emit('keypress', event)"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
    />
    <div class="wf_flex wf_justify-between wf_items-center">
      <slot name="note"></slot>
      <div class="wf_flex wf_justify-end wf-px-13 wf_text-n-52 wf-body_04-reg">{{ length }}/{{ maxText }} bytes</div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/common/product-textarea-count.css');
</style>
