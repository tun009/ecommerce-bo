<script setup lang="ts">
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useProductModalSearchWithTable } from '@/composables'
import { ProductSearchModalWrapperEmits, ProductSearchModalWrapperProps, ProductSearchRecordModel, productModalSearchMeta } from '@/models'
import { onMounted, watch } from 'vue'

const { openModal, searchText, searchResData } = useProductModalSearchWithTable()

const props = defineProps<ProductSearchModalWrapperProps>()

const emits = defineEmits<ProductSearchModalWrapperEmits>()

onMounted(() => {
  searchText.value = props.defaultValue || ''
})

watch(searchResData, (searchRes) => {
  searchRes && eventEmits.handleSelect(searchRes)
})

const handleReset = () => {
  searchText.value = ''
  searchResData.value = undefined
}

onMounted(() => {
  searchText.value = props.defaultValue || ''
})

const handlePopupSearch = () => {
  openModal(props.type)
}

defineExpose({
  handleReset,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: ProductSearchRecordModel) => {
    emits('selectValue', searchRecord)
  }
}


</script>

<template>
  <div class="wf_flex wf_items-center wf-space-x-4">
    <div class="wf-search-input-wrapper wf_w-full" :class="{ 'wf-pointer': !props.disabled }" @click="!props.disabled ? handlePopupSearch() : ''">
      <WelfareInputText
        size="small"
        inputType="text"
        class="wrap-input wf_w-full test"
        v-model="searchText"
        :placeholder="props.placeholderInput ?? productModalSearchMeta[props.type].placeholderInput"
        :disabled="props.disabled"
      />
      <div class="wf-el-overlay"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="handlePopupSearch" :disabled="props.disabled" />
  </div>
</template>
