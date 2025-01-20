<script setup lang="ts">
import { WelfareSelectOptionType } from '@/models'
import { WelfareSelect, WelfareInputText } from '@/components'
import { FormGroup } from '@/components/widgets'
export interface ProductGroupControlFilterFormProps {
  currentFilter: WelfareSelectOptionType
  listFilters: WelfareSelectOptionType[]
  placeholder?: string
  disabled: boolean
  label?: string
  classSelect?: string
}

type ProductGroupControlFilterFormEmits = (e: 'onChangeFilter', value: WelfareSelectOptionType) => void

const emits = defineEmits<ProductGroupControlFilterFormEmits>()

withDefaults(defineProps<ProductGroupControlFilterFormProps>(), {
  placeholder: '최대 50개까지 입력 가능합니다.',
  label: '검색어',
  classSelect: 'wf_w-180'
})
</script>

<template>
  <FormGroup label="검색어" customClass="wf-space-x-6 wf_br-b-0" isRoundedBottom :isBorderBottom="false" class="wf_h-42">
    <WelfareSelect
      :modelValue="currentFilter"
      @update:modelValue="(value) => emits('onChangeFilter', value)"
      :class="classSelect"
      optionLabel="label"
      :options="listFilters"
      small
    />
    <div class="wf_flex-1">
      <WelfareInputText :disabled="!disabled" size="small" :placeholder="placeholder" />
    </div>
  </FormGroup>
</template>
