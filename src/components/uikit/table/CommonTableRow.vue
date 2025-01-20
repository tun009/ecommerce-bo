<script setup lang="ts">
interface CommonTableRowProps {
  height?: number | string
  isLastRow?: boolean
}
withDefaults(defineProps<CommonTableRowProps>(), {
  height: 44,
  isLastRow: false
})
</script>
<template>
  <div :class="[`wf_flex wf_h-${$props.height}`, { 'wf-btn-border-b--ncc': !$props.isLastRow }]"><slot></slot></div>
</template>
