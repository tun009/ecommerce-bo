<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useProductTicketRegistration } from '@/composables'
const { currentActive, handleTabChange, tabData, tabPanelProps } = useProductTicketRegistration()
</script>

<template>
  <div class="wf-product-menu-wrap">
    <WelfareTabFilled :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" />
      </template>
    </WelfareTabFilled>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/ticketProduct/product-ticket-product-wrapper.css');
</style>

<script lang="ts">
export default {
  name: 'ProductTicketProductWrapperPage'
}
</script>
