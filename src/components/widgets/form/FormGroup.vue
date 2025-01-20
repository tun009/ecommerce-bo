<script setup lang="ts">
export interface FormGroupProps {
  label: string
  customClass?: string
  class?: string
  isBorderLeft?: boolean
  isRoundedTop?: boolean
  isRoundedBottom?: boolean
  isBorderBottom?: boolean
  required?: boolean
  noteTitle?: string
}
withDefaults(defineProps<FormGroupProps>(), {
  isBorderBottom: true
})
</script>

<template>
  <div class="wf_flex wf_items-center wf-group-h-44 wf_width-full" :class="[{ 'wf_br-b': isBorderBottom }, $props.class]">
    <div
      class="wf_flex wf_filter-title wf_items-center wf_w-150"
      :class="[{ 'wf-br-l-1': isBorderLeft }, { 'wf_br-tl_radius': isRoundedTop }, { 'wf_br-bl_radius': isRoundedBottom }]"
    >
      <span class="wf-body_02-semi wf_text-n-33">
        {{ label }}
        <span v-if="required" class="wf_text-sub-01"
          >&nbsp;*<span class="wf-body_04-reg">{{ noteTitle ?? '' }}</span></span
        >
      </span>
    </div>
    <div class="wf_flex wf_items-center wf_filter-body" :class="customClass">
      <slot></slot>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-form-group.css');
</style>
