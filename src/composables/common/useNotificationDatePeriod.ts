import { useModalNotification } from '@/composables'

interface NotificationDatePeriodParams<T> {
  emit: (value: string, field: keyof T) => void,
  beginDateField: keyof T,
  endDateField: keyof T,
}

export function useNotificationDatePeriod<T>({ emit, beginDateField, endDateField }: NotificationDatePeriodParams<T>) {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const handleDateChange = (beginDate: string, endDate: string) => {
    if (beginDate && endDate) {
      const date1 = new Date(beginDate)
      const date2 = new Date(endDate)
      const differentInTime = date2.getTime() - date1.getTime()
      const differentInDays = differentInTime / (1000 * 3600 * 24)
      if (differentInDays > 365) {
        openModalNotification?.({
          content: '기간은 시작일 기준으로 최대 1년까지 설정 가능합니다. (확인)',
          onAccept: () => {
            closeModalByPop?.()
          }
        })
      }
    }
    emit(beginDate, beginDateField)
    emit(endDate, endDateField)
  }

  return {
    handleDateChange
  }
}