<script setup lang="ts">
import Textarea from 'primevue/textarea'
import { WelfareTextareaProps, WelfareTextareaEmits } from '@/models'
const props = defineProps<WelfareTextareaProps>()
defineEmits<WelfareTextareaEmits>()

const { size } = props
</script>
<template>
  <div class="wf-text-box">
    <label class="wf-text-box-label wf-text-box-label-vertical">
      <span v-if="props.labelTop" class="wf-text-box-label-text wf-w-26" :class="size === 'small' && 'wf-text-box-label-text-sm'">
        {{ props.labelTop }}
      </span>
      <div class="wf-text-box-label-horizontal-group">
        <span v-if="props.labelLeft" class="wf-text-box-label-text wf-w-26" :class="size === 'small' && 'wf-text-box-label-textarea-sm'">
          {{ props.labelLeft }}
        </span>
        <div class="wf-text-box-control">
          <Textarea
            v-bind="props"
            :class="size === 'small' && 'textarea-sm'"
            :modelValue="props?.modelValue"
            @keypress="(event) => $emit('keypress', event)"
            @update:modelValue="(value) => $emit('update:modelValue', value)"
            :readonly="props.readonly"
            :placeholder="placeholder"
            :disabled="props.disabled"
            :autoResize="autoResize"
          >
          </Textarea>
          <div class="wf_justify-between wf_flex">
            <small v-if="props.labelBottomLeft" class="wf-text-box-message left">{{ props.labelBottomLeft }}</small>
            <small v-if="props.labelBottomRight" class="wf-text-box-message right">{{ props.labelBottomRight }}</small>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

