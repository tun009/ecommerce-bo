import { InputNumberInputEvent } from 'primevue/inputnumber'
import { Nullable } from 'primevue/ts-helpers'

export interface WelfareBaseInputProps {
  size?: 'small' | 'large'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  labelTop?: string
  labelLeft?: string
  labelBottomLeft?: string
  labelBottomRight?: string
  icon?: any
  maxLength?: number
}

export interface WelfareInputNumberProps extends WelfareBaseInputProps {
  modelValue?: Nullable<number | undefined | null>
  inputId?: string
  useGrouping?: boolean
}

export interface WelfareInputMaskProps extends WelfareBaseInputProps {
  modelValue: string | undefined
  inputId?: string
  mask?: string
}

export interface WelfareInputProps extends WelfareBaseInputProps {
  modelValue?: Nullable<string | undefined | null>
  textAlign?: 'left' | 'right'
  inputType?: any
}

export interface WelfareInputMaxLengthValidationProps extends WelfareInputProps {
  hiddenWarning?: boolean
}

export interface WelfareBaseInputEmits {
  (e: 'update:modelValue', value: any): void

  (e: 'clickIconRight', event: Event): void

  (e: 'keypress', event: KeyboardEvent): void

  (e: 'keydown', event: KeyboardEvent): void

  (e: 'focus', event: Event): void
}

export interface WelfareInputEmits extends WelfareBaseInputEmits {
  (e: 'blur', event: Event): void
}

export interface WelfareInputNumberEmits extends WelfareBaseInputEmits {
  (e: 'input', event: InputNumberInputEvent): void
  (e: 'focusText', event: Event): void
}

export interface WelfareInputMaskEmits extends WelfareBaseInputEmits { }

export interface WelfareInputValidationProps extends WelfareInputProps {
  name: string
  invalid?: boolean
}
