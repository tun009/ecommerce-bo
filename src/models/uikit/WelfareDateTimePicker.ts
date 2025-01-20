export interface DateViewModel {
  year: number
  month: number
  day?: number
}

export interface CurrentDateModel extends DateViewModel {
  day: number
  hour: number
  minute: number
  timeType: number
}

export interface TimeValueModel {
  hour: number
  minute: number
}

export type DateTimePickerDateType  = 'date' | 'date-time'

export type DateTimePickerSizeType = 'small' | 'normal'

export interface DateTimePickerProps {
  type?: DateTimePickerDateType
  modelValue?: string
  disabled?: boolean
  size?: DateTimePickerSizeType
  format?: string
  error?: boolean
  errorMessage?: string
  maxDate?: string
  minDate?: string
}

export interface  DataType {
  date?:string,
  size?: DateTimePickerSizeType,
  disabled?: boolean,
} 

export interface DateTimePickerEmits {
  (e: 'update:modelValue', value: string): string
}


export interface CalendarPositionModel {
  right: boolean
  bottom: boolean
}

export type ButtonDateModel = {
  label: string
  class: string
  value: number
}