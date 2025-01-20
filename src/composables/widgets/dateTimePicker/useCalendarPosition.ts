import { getPositionFunction } from '@/common'
import { CalendarPositionModel } from '@/models'
import { Ref, onMounted, onUnmounted, reactive, ref } from 'vue'

export const useCalendarPosition = (picker: Ref<HTMLElement | undefined>) => {
  const eventScroll = ref()
  const eventResize = ref()
  const calendarPosition = reactive<CalendarPositionModel>({
    right: true,
    bottom: true
  })

  const onGetPosition = () => {
    getPositionFunction(picker.value, calendarPosition)
  }

  onMounted(() => {
    onGetPosition()
    eventScroll.value = window.addEventListener('scroll', onGetPosition)
    eventResize.value = window.addEventListener('resize', onGetPosition)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onGetPosition)
    window.removeEventListener('resize', onGetPosition)
  })
  return {
    calendarPosition
  }
}
