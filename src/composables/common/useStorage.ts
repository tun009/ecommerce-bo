import { onMounted, ref, Ref } from 'vue'
import { storage as storageGlobal } from '@/common/storage'

export function useStorage<T>(key: string, type = 'local'): [Ref<T> | undefined, (newValue: any) => void | undefined] {
  let storage: any = null
  const value = ref<T>(storageGlobal.getItem(key, storage))
  onMounted(() => {
    loadValue()
  })
  // watch([key, type], () => {
  //   loadValue()
  // })

  const loadValue = () => {
    storage = storageGlobal.getStorage(type)
    value.value = storageGlobal.getItem(key, storage)
  }
  const setItem = () => {
    return (newValue: any) => {
      value.value = newValue
      storage.setItem(key, JSON.stringify(newValue))
    }
  }

  return [value as Ref<T>, setItem()]
}
