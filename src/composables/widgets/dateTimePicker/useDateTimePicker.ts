import {
  DEFAULT_DATE_FORMAT,
  HEADERS_CALENDAR,
  SIZE_OF_TABLE_CALENDAR_DATE,
  checkFormatValid,
  classScrollDateTimePicker,
  compareAlphabetically,
  datePickerNotification,
  defaultColor,
  formatTime,
  getDateFormat,
  getDaysContainDay,
  getDaysOfMonth,
  getListYear,
  getTimeDetail,
  isValidDate,
  onScrollTo,
  renderDateType,
  valueCorrect
} from '@/common'
import { DateTimePickerProps, DateViewModel, TimeValueModel } from '@/models'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { useModalNotification } from '../modal'

export const useDateTimePicker = (props: DateTimePickerProps, emitDate: (value: string) => void) => {
  const picker = ref<HTMLElement | undefined>(undefined)
  const hover = ref(false)
  const { format: formatDate, type: typeInput } = props

  const format = computed(() => getDateFormat(formatDate, typeInput ?? 'date'))
  const type = computed(() => (format.value ? renderDateType(format.value) : typeInput ?? 'date'))
  const validFormat = computed(() => checkFormatValid(format.value ?? DEFAULT_DATE_FORMAT))

  //day
  const today = new Date()
  const openCalendar = ref<boolean>(false)
  const openChooseMonth = ref<boolean>(false)
  const dateToday = formatTime(today, format.value)
  const years = getListYear(100)
  const yearSelect = ref<number>(today.getFullYear())
  const dateValue = ref<string>(DEFAULT_DATE_FORMAT)
  const defaultValue = ref<string>(DEFAULT_DATE_FORMAT)
  const timeValue = reactive<TimeValueModel>({
    hour: 0,
    minute: 0
  })

  const timeSelect = reactive<TimeValueModel>({
    hour: 0,
    minute: 0
  })

  const monthView = reactive<DateViewModel>({
    year: today.getFullYear(),
    month: today.getMonth() + 1
  })

  const { openModal } = useModalNotification()

  const onScrollTime = (
    classHourChildren: string = classScrollDateTimePicker.hour.children,
    classMinuteChildren: string = classScrollDateTimePicker.minute.children
  ) => {
    onScrollTo(picker.value, classScrollDateTimePicker.hour.parent, classHourChildren)
    onScrollTo(picker.value, classScrollDateTimePicker.minute.parent, classMinuteChildren)
  }

  const onSetMonthView = (month: number, year: number) => {
    monthView.month = month
    monthView.year = year
  }

  const onChangeMonth = (month: number, year: number) => {
    if (!month) return onSetMonthView(12, year - 1)
    if (month > 12) return onSetMonthView(1, year + 1)
    onSetMonthView(month, year)
  }

  const onChooseDay = (event: Event | undefined, date: string) => {
    event?.stopPropagation()
    dateValue.value = date
    const { month, year } = getTimeDetail(dateValue.value)
    onSetMonthView(month, year)
  }

  const onChooseMonth = (event: Event, month: number, year: number) => {
    event.stopPropagation()
    onSetMonthView(month, year)
    openChooseMonth.value = false
  }

  const onEmitDate = () => {
    timeValue.hour = timeSelect.hour
    timeValue.minute = timeSelect.minute
    defaultValue.value = value.value
    emitDate(value.value)
  }

  const handleValidate = () => {
    const daySelect = dayjs(value.value)
    const minDate = dayjs(props.minDate)
    const maxDate = dayjs(props.maxDate)
    if (!isValidDate(props.minDate) && !isValidDate(props.maxDate)) return onEmitDate()
    if (isValidDate(props.minDate) && minDate.isAfter(daySelect)) return openModal({ content: datePickerNotification.endDate?.[type.value] })
    if (isValidDate(props.maxDate) && maxDate.isBefore(daySelect)) return openModal({ content: datePickerNotification.startDate?.[type.value] })
    const subOneYear = dayjs(value.value).subtract(1, 'years')
    const addOneYear = dayjs(value.value).add(1, 'years')
    if ((isValidDate(props.minDate) && subOneYear.isAfter(minDate)) || (isValidDate(props.maxDate) && addOneYear.isBefore(maxDate)))
      return openModal({ content: datePickerNotification.maxLimit?.[type.value] })
    onEmitDate()
  }

  const onSubmitDate = (event: Event | undefined) => {
    event?.stopPropagation()
    openCalendar.value = false
    if (dateValue.value === DEFAULT_DATE_FORMAT) return
    handleValidate()
  }

  const onResetDate = () => {
    dateValue.value = DEFAULT_DATE_FORMAT
    timeValue.hour = 0
    timeValue.minute = 0
    onSetMonthView(today.getMonth() + 1, today.getFullYear())
    yearSelect.value = today.getFullYear()
    onScrollTime(classScrollDateTimePicker.hour.childrenReset, classScrollDateTimePicker.minute.childrenReset)
  }

  const getDayValue = (date: string) => {
    if (!isValidDate(date)) return ''
    return new Date(date?.slice(0, 10)).toISOString().slice(0, 10)
  }

  //computed
  const daysOfTable = computed((): string[] => {
    const daysOfCurrent = getDaysOfMonth(monthView.month, monthView.year, format.value)
    const daysOfMonthPre = getDaysContainDay(new Date(daysOfCurrent[0]), format.value)
    const daysOfMonthNext = getDaysContainDay(new Date(daysOfCurrent[daysOfCurrent.length - 1]), format.value)
    let daysOfTableFull = [...new Set([...daysOfMonthPre, ...daysOfCurrent, ...daysOfMonthNext])].sort(compareAlphabetically)
    if (daysOfTableFull.length < SIZE_OF_TABLE_CALENDAR_DATE) {
      const length = (SIZE_OF_TABLE_CALENDAR_DATE - daysOfTableFull.length) / 7
      Array(length)
        .fill(0)
        .forEach((_, index) => {
          const date = new Date(daysOfCurrent[daysOfCurrent.length - 1])
          date.setDate(date.getDate() + 7 * (index + 1))
          const tempArr = getDaysContainDay(date, format.value)
          daysOfTableFull = daysOfTableFull.concat(tempArr)
        })
    }
    return daysOfTableFull
  })

  const value = computed(() => {
    let result = ''
    if (props.type === 'date') result = dateValue.value
    if (dateValue.value === DEFAULT_DATE_FORMAT) result = `${dateValue.value} 00:00`
    result = `${dateValue.value} ${valueCorrect(timeValue.hour)}:${valueCorrect(timeValue.minute)}`
    return dayjs(result).format(format.value)
  })

  const classOnlyDate = computed(() => {
    return { 'only-date': props.type === 'date' }
  })

  const valueShow = computed(() => {
    return props.modelValue ?? format.value
  })

  //class
  const classDay = (date: string) => {
    const { month } = getTimeDetail(date)
    return { disable: Number(month) !== monthView.month, select: date === dateValue.value, today: dateToday.includes(date) }
  }

  const classMonth = (month: number, year: number) => ({
    select: monthView.month === month && monthView.year === year,
    today: today.getMonth() + 1 === month && today.getFullYear() === year
  })

  const colorIconDatePicker = () => {
    if (props.disabled) return defaultColor._ccc
    if (props.error) return defaultColor._d95729
    if (valueShow.value !== format.value || hover.value) return defaultColor._333
    return defaultColor._8f8
  }

  //watch
  watch(openCalendar, (newStatus: boolean) => {
    if (newStatus) {
      dateValue.value = defaultValue.value.slice(0, 10)
      onScrollTime()
    }
    if (dateValue.value === DEFAULT_DATE_FORMAT) return onResetDate()
    const { month, year } = getTimeDetail(dateValue.value)
    onSetMonthView(month, year)
    yearSelect.value = year
    timeSelect.hour = timeValue.hour
    timeSelect.minute = timeValue.minute
  })

  watch(openChooseMonth, (newStatus: boolean) => {
    if (newStatus) onScrollTo(picker.value, classScrollDateTimePicker.month.parent, classScrollDateTimePicker.month.children)
    yearSelect.value = monthView.year
  })

  return {
    openCalendar,
    HEADERS_CALENDAR,
    daysOfTable,
    monthView,
    onChangeMonth,
    onChooseDay,
    years,
    timeSelect,
    openChooseMonth,
    onChooseMonth,
    yearSelect,
    valueCorrect,
    classDay,
    classMonth,
    onSubmitDate,
    onResetDate,
    type,
    validFormat,
    valueShow,
    format,
    colorIconDatePicker,
    classOnlyDate,
    picker,
    hover,
    getDayValue
  }
}

export default useDateTimePicker
