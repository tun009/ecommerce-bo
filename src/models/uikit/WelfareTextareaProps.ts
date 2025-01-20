import { TextareaProps } from "primevue/textarea"

export interface WelfareTextareaProps extends /* @vue-ignore */ TextareaProps  {
  modelValue?: string
  autoResize?: boolean | undefined
  placeholder?: string
  size?: 'small' | undefined
  disabled?: boolean
  readonly?: boolean
  labelTop?: string
  labelLeft?: string
  labelBottomLeft?: string
  labelBottomRight?: string
}

export interface WelfareTextareaEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'keypress', event: KeyboardEvent): void
}
