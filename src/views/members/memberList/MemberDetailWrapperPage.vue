<script setup lang="ts">
import { useMemberDetailCommon, useMemberDetailTabWrapper } from '@/composables/members'
import { MemberListDetailCommon } from '@/components/members'
import { WelfareTabOutline } from '@/components'

const { data, onCheck, onRegister, onClear } = useMemberDetailCommon()
const { currentActive, tabPanelProps, tabData, handleTabChange } = useMemberDetailTabWrapper()
</script>

<template>
  <div class="wf_border-page wf-px-30 wf-pt-30 wf-pb-19_5">
    <MemberListDetailCommon :data="data" v-model:name="data.name" @on-check="onCheck" @on-register="onRegister" @on-clear="onClear" />
    <hr class="wf_break-line-gray wf-my-26" />
    <div class="wf_member-list-tab-wraper wf-mx--1">
      <WelfareTabOutline :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
        <template #wf-tab-text-content="{ tabIndex }">
          <component :key="tabIndex" :is="tabData[tabIndex].component" :data="data" />
        </template>
      </WelfareTabOutline>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/css/view/member/member-list-wrapper.css);
</style>
