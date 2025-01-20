<script setup lang="ts">
import { WelfareInputText, WelfareMdButton } from '@/components';
import { useMemberRequestModal } from '@/composables';
import { MemberRequestSearchModel, MemberSearchModalWrapperEmits, MemberSearchModalWrapperProps } from '@/models';
import { onMounted, watch } from 'vue';

const { openModal, searchText, searchResData } = useMemberRequestModal()

interface MemberSearchModalEmits extends MemberSearchModalWrapperEmits {
  (e: 'on-open-popup-search-member'): void
}

const props = defineProps<MemberSearchModalWrapperProps>()

const emits = defineEmits<MemberSearchModalEmits>()

onMounted(() => {
  searchText.value = props.defaultValue ?? ''
})

watch(searchResData, (searchRes) => {
  searchRes && eventEmits.handleSelect(searchRes)
})

const handleReset = () => {
  searchText.value = ''
  searchResData.value = { memberKey: '', memberName: '' }
}

const handlePopupSearch = () => {
  openModal()
}

defineExpose({
  handleReset,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: MemberRequestSearchModel) => {
    emits('selectValue', searchRecord)
  }
}

</script>

<template>
  <div class="wf_flex wf_items-center wf-space-x-4">
    <div class="wf-search-input-wrapper wf_w-full" :class="{ 'wf-pointer': !props.disabled }" @click="!props.disabled ? emits('on-open-popup-search-member') : ''">
      <WelfareInputText
        size="small"
        inputType="text"
        class="wrap-input wf_w-full test"
        v-model="searchText"
        :placeholder="props.placeholderInput"
        :disabled="props.disabled"
      />
      <div class="wf-el-overlay"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="emits('on-open-popup-search-member')" :disabled="props.disabled" />
  </div>
</template>
