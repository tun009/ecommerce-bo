import { App } from 'vue'

export const addDateTimerPickerDirective = (app: App<Element>) => {
  app.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutsideEvent = function (event: Event) {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value()
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted: (el) => {
      document.removeEventListener('click', el.clickOutsideEvent)
    }
  })
}
