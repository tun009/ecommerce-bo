<script setup lang="ts">
import { WelfareInputText, WelfareSelect } from '@/components'
import { WelfareSelectOptionType } from '@/models'
interface FormGroupSelectInputProps {
  select?: any
  selectOptions?: WelfareSelectOptionType[]
  optionLabel?: any
  selectPlaceholder?: string
  selectDisabled?: boolean
  input?: any
  inputPlaceholder?: string
  maxLengthInput?: number
  inputDisabled?: boolean
}
interface FormGroupSelectInputEmits {
  (e: 'update:select', value: any): void
  (e: 'update:input', value: any): void
}

defineProps<FormGroupSelectInputProps>()
defineEmits<FormGroupSelectInputEmits>()
</script>

<template>
  <div class="wf_flex wf-space-x-6">
    <WelfareSelect
      :model-value="$props.select"
      @update:model-value="(value) => $emit('update:select', value)"
      :options="$props.selectOptions"
      :option-label="$props.optionLabel"
      :placeholder="$props.selectPlaceholder"
      :disabled="$props.selectDisabled"
      class="wf_w-180"
      small
    />
    <WelfareInputText
      :model-value="$props.input"
      @update:model-value="(value) => $emit('update:input', value)"
      :placeholder="$props.inputPlaceholder"
      :disabled="$props.inputDisabled"
      class="wf_flex-1"
      size="small"
      :max-length="$props.maxLengthInput"
    />
  </div>
</template>
