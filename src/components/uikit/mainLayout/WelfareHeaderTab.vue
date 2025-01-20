<script setup lang="ts">
import { IconHome } from '@/components'
import { useTabsManagerStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { TabViewClickEvent } from 'primevue/tabview'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { WelfareTabSingle } from '../tab'

const router = useRouter()
const tabsManagerStore = useTabsManagerStore()
const { onCloseTab } = tabsManagerStore
const { listCache, currentActive } = storeToRefs(tabsManagerStore)

const handleTabClick = (event: TabViewClickEvent) => {
  const li = event.originalEvent?.target as HTMLLIElement
  if (!li.closest('svg')) {
    if (event.index > -1) currentActive.value = event.index
    router.push(listCache.value[event.index].path)
    return
  }
  onCloseTab(event.index, (path: string) => {
    router.push(path)
  })
}

const tabPanelProps = computed(() => {
  const listTemp = [...listCache.value]
  return listTemp.map((cache) => {
    return {
      header: cache.name
    }
  })
})

const goToHome = () => {
  router.push('/')
  currentActive.value = -1
}

</script>

<template>
  <div class="wf-header-tab">
    <div class="wf-header-tab__wrapper-icon" :class="{ active: currentActive === -1 }" @click="goToHome">
      <IconHome />
    </div>
    <WelfareTabSingle @tab-click="handleTabClick" :activeIndex="currentActive" :wfTabPanelProps="tabPanelProps">
    </WelfareTabSingle>
  </div>
</template>

