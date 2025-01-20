import { DateTimePickerDateType, CalendarPositionModel } from '@/models'
import dayjs from 'dayjs'
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATETIME_FORMAT_DOT,
  FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS,
  FORMAT_DATE_YYYY_MM_DD
} from './constant'

export const getListYear = (length: number) => {
  const today = new Date()
  return Array(length)
    .fill(1)
    .map((_, index: number) => today.getFullYear() - 50 + index)
}

export const valueCorrect = (number: number): string => {
  if (number < 10) return `0${number}`
  return number.toString()
}

export const formatTime = (date: string | Date, format: string) => {
  return dayjs(date).format(format)
}

export const formatTimeByInputString = (date: string) => {
  if (date.length == 8) {
    return date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8)
  }
  return ''
}

//get all days of the month
export const getDaysOfMonth = (month: number, year: number, format: string = DEFAULT_DATE_FORMAT) => {
  return Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) => formatTime(new Date(year, month - 1, i + 1), format))
}

//get all days of the week that contain the given date
export const getDaysContainDay = (current: Date, format: string = DEFAULT_DATE_FORMAT) => {
  const week = new Array()
  current.setDate(current.getDate() - current.getDay())
  for (let i = 0; i < 7; i++) {
    week.push(formatTime(new Date(current), format))
    current.setDate(current.getDate() + 1)
  }
  return week
}

export const getTimeDetail = (dateString: string) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return { year, month, day, hour, minute }
}

export const getPositionFunction = (picker: HTMLElement | undefined, calendarPosition: CalendarPositionModel) => {
  const position = { right: true, bottom: true }
  if (!picker) return
  const rect = picker.getBoundingClientRect()
  if (window.innerWidth - rect.left < 550) {
    position.right = false
  }
  if (window.innerHeight - rect.bottom < 440) {
    position.bottom = false
  }
  calendarPosition.bottom = position.bottom
  calendarPosition.right = position.right
}

export const checkFormatValid = (format: string) => {
  return dayjs(dayjs().format(format)).isValid()
}

export const renderDateType = (format: string): DateTimePickerDateType => {
  const isDate = dayjs(dayjs().format(format)).valueOf() === dayjs(dayjs().format(DEFAULT_DATE_FORMAT)).valueOf()
  if (isDate) return 'date'
  return 'date-time'
}

export const getDateFormat = (format: undefined | string, typeInput: DateTimePickerDateType) => {
  return format ? format : typeInput === 'date' ? DEFAULT_DATE_FORMAT : DEFAULT_DATE_TIME_FORMAT
}

export const onScrollTo = (dateElement: Element | undefined, classNameParent: string, className: string) => {
  if (!dateElement) return
  const wrapperScroll = dateElement.querySelector(classNameParent)
  if (!wrapperScroll) return
  const elementScroll = wrapperScroll.querySelector(className)
  if (!elementScroll) return
  const rectChildren = elementScroll.getBoundingClientRect()
  const rectParent = wrapperScroll.getBoundingClientRect()
  wrapperScroll.scrollBy({
    top: rectChildren.top - rectParent.top,
    behavior: 'smooth'
  })
}

export const getDateByFormat = (value: Date | string, format: string) => {
  return dayjs(value).format(format)
}

export const getDatesInRange = (startDate: string, endDate: string) => {
  const dates = []
  const currentDate = new Date(startDate)
  const endDateValue = new Date(endDate)
  while (currentDate <= endDateValue) {
    dates.push(new Date(currentDate).toISOString().slice(0, 10))
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}

export const isValidDate = (date: string | Date | undefined) => {
  if (!date) return false
  return dayjs(date).isValid()
}

// compare alphabetically function
export function compareAlphabetically(a: string, b: string) {
  const lowerA = a.toLowerCase()
  const lowerB = b.toLowerCase()
  if (lowerA === lowerB) {
    return a < b ? -1 : 1
  }
  return lowerA < lowerB ? -1 : 1
}

// export excel with file name and date time

export const exportFileName = (fileName: string, formatDate: string = DEFAULT_DATE_FORMAT) => {
  const formattedDate = dayjs(new Date()).format(formatDate)
  return `${fileName}_${formattedDate}`
}

export function formatDateWithFORMAT_DATE_YYYY_MM_DD(date: Date) {
  const dateString = formatTime(date, DEFAULT_DATETIME_FORMAT_DOT)
  return dateString
}

export function formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS(date: string | Date) {
  const dateString = formatTime(date, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS)
  return dateString
}

export function handleGetTimeLines(number: number, format: string) {
  const currentDate = new Date()
  const lastCustomDay = new Date(currentDate)
  lastCustomDay.setDate(currentDate.getDate() - number)
  const currentDateString = dayjs(currentDate).format(format)
  const lastCustomDayString = dayjs(lastCustomDay).format(format)
  return {
    currentDateString,
    lastCustomDayString
  }
}

export function handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number: number) {
  return handleGetTimeLines(number, FORMAT_DATE_YYYY_MM_DD)
}
