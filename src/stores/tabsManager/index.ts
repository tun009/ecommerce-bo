import { DASH_BOARD_CACHE, currentActiveStorage, listCacheStorage } from '@/common'
import { useStorage } from '@/composables'
import { listRouteForwardPathFlat } from '@/router/private'
import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface TabManagerModel {
  nameComponent: string
  path: string
  name: string
  disabled?: boolean
}

const MAX_TAB = 11

export const useTabsManagerStore = defineStore('tabs-manager', () => {
  const [currentActiveInit, setCurrentActive] = useStorage<string>(currentActiveStorage)
  const [listCacheInit, setListCache] = useStorage<TabManagerModel[]>(listCacheStorage)
  const route = useRoute()
  const currentActive = ref(Number(currentActiveInit?.value ?? 0))
  const listCache = reactive<TabManagerModel[]>(listCacheInit?.value ?? [])

  function pushTab(tab: TabManagerModel) {
    const index = listCache.findIndex((item) => item.path === tab.path)
    if (index > -1) {
      currentActive.value = index
      return
    }
    listCache.push(tab)
    currentActive.value = listCache.length - 1
    if (listCache.length < MAX_TAB) return
    listCache.shift()
  }

  function onCloseTab(index: number, callback: (arg: string) => void = () => {}) {
    if (index < currentActive.value) currentActive.value--
    const path = listCache[index].path
    listCache.splice(index, 1)
    if (path !== route.path) return
    if (!listCache.length) return callback('/')
    if (index < listCache.length - 1) return callback(listCache[index].path)
    callback(listCache[index - 1].path)
  }

  function onCloseAllTabs(callback: () => void) {
    callback()
    listCache.splice(listCache.length)
  }

  const handleChangeRouter = () => {
    let routePath = route.path
    if (routePath !== '/') {
      if (route.matched.length >= 2) {
        routePath = route.matched[1].path ?? route.path
      }
    }
    const itemPath = listRouteForwardPathFlat.find((routeItem) => routeItem.path === routePath)
    if (!itemPath) {
      currentActive.value = -1
      return
    }
    const isContain = listCacheInit?.value?.find((cache) => cache.path === route.path)
    if (isContain) return
    const { name = '', path = '', nameComponent = '' } = itemPath
    pushTab({ name, path, nameComponent })
  }

  const listComponent = computed(() => {
    return [...listCache, DASH_BOARD_CACHE].map((item) => item.nameComponent)
  })

  const updateTabActiveBy = (path?: string) => {
    const index = listCache.findIndex((cache) => cache.path === path)
    currentActive.value = index || 0
    handleChangeRouter()
  }

  watch(
    () => route.path,
    (newPath) => {
      updateTabActiveBy(newPath)
    }
  )

  onMounted(() => {
    updateTabActiveBy(route.path)
  })

  watch(listCache, (newList) => {
    setListCache(newList)
    setTimeout(() => {
      const element = document.getElementById('wf_single-tab-tablist')
      if (element) {
        element.scrollLeft = element.scrollWidth
      }
    }, 10)
  })

  watch(currentActive, (newCurrentActive) => {
    setCurrentActive(newCurrentActive)
  })

  onMounted(() => {
    handleChangeRouter()
  })

  return {
    onCloseTab,
    onCloseAllTabs,
    pushTab,
    listCache,
    listComponent,
    currentActive
  }
})
