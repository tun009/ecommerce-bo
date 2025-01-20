<script setup lang="ts">
interface CommonTableTitleCellProps {
  title: string
  required?: boolean
  isFirstCol?: boolean
}
defineProps<CommonTableTitleCellProps>()
</script>
<template>
  <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray" :class="[{ 'wf-btn-border-l--ncc': !$props.isFirstCol }]">
    <span class="wf-body_02-semi wf_text-n-33 wf-mr--1">{{ $props.title }} <span v-show="$props.required" class="wf_text-sub-01">*</span></span>
  </div>
</template>
