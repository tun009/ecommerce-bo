<script setup lang="ts">
import { WelfareTabEmits, WelfareTabProps, WelfareTabSlots } from '@/models'
import TabPanel, { TabPanelProps } from 'primevue/tabpanel'
import TabView, { TabViewChangeEvent, TabViewClickEvent, TabViewPassThroughOptions } from 'primevue/tabview'
const props = defineProps<WelfareTabProps>()
  const emit = defineEmits<WelfareTabEmits>()

const emitEvent = {
  handleTabChange: (event: TabViewChangeEvent) => {
    emit('tab-change', event)
  },
  handleTabClick: (event: TabViewClickEvent) => {
    emit('tab-click', event)
  }
}
defineSlots<WelfareTabSlots>()

const panelClass = (props: TabPanelProps, parent: TabViewPassThroughOptions, index: number) => {
  return [
    {
      /**
       * [TabViewPassThroughOptions](https://primevue.org/tabview/) does not have a *state* property as the docs mention, so we have to cast it to an object that does.
       */
      'wf_outline-tab__item--active': (parent as { state: { d_activeIndex: number } }).state.d_activeIndex === index,
      'wf_outline-tab__item--disabled': props.disabled === true
    }
  ]
}
</script>

<template>
  <TabView
    @tab-change="emitEvent.handleTabChange"
    @tab-click="emitEvent.handleTabClick"
    v-bind="props"
    :unstyled="true"
    :pt="{
      root: {
        class: 'wf_outline-tab-group'
      },
      nav: {
        class: 'wf_outline-tab'
      },
      inkBar: {
        class: 'wf-tab-ink-hidden'
      }
    }"
  >
    <TabPanel
      v-for="(tab, index) in wfTabPanelProps"
      :key="index"
      v-bind="tab"
      :pt="{
        header: {
          class: 'wf_outline-tab__item'
        },
        content: {
          class: 'wf_tab-contents'
        },
        headerAction: ({ props, parent }) => ({
          class: panelClass(props, parent, index)
        })
      }"
    >
      <!-- TabPanelSlots -->
      <template #header></template>
      <slot name="wf-tab-text-content" v-bind="{tabIndex: index}"></slot>
    </TabPanel>
  </TabView>
</template>
