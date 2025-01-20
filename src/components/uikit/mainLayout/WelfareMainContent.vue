<script setup lang="ts">
import { useToggleNavigation } from '@/composables'
import { useTabsManagerStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { WelfareHeaderTab,WelfareContentHeaderFromPathUrl } from "@/components"

const { isShow } = useToggleNavigation()
const tabsManagerStore = useTabsManagerStore()
const { listComponent } = storeToRefs(tabsManagerStore)
</script>

<template>
  <div id="wf-content" :class="!isShow ? 'wf-navigation' : ''">
    <div id="wf-body-content">
      <WelfareHeaderTab />
      <WelfareContentHeaderFromPathUrl />
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="listComponent">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </router-view>

    </div>
  </div>
</template>
