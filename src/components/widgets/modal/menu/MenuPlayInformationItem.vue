<script setup lang="ts">
    interface MenuPlayInformationItemProps  {
        title: string
        data: {
            company: string
            nameTeam: string
            teamRepresentative: string
            hp: string
            phone: string
            email: string
        }
    }
    defineProps<MenuPlayInformationItemProps>()
</script>
<template>
  <div class="wf-m-info-body-main-item wf-space-y-20">
    <span class="wf-sub_tit_01" v-text="title"></span>
    <div class="wf-m-info-wrap-f-43-44 wf-space-y-12">
      <div class="wf-frame-1000002243 wf-space-y-6">
        <span class="wf-body_03-reg title" v-text="data.company"></span>
        <div class="wf-m-info-two-text wf-space-x-10">
          <span class="wf-first wf-body_01-reg" v-text="data.nameTeam"></span>
          <span class="wf-body_01-reg" v-text="data.teamRepresentative"></span>
        </div>
      </div>

      <div class="wf-frame1000002244 wf-space-y-10">
        <div class="wf-top wf-m-info-two-text wf-space-x-10">
          <div class="wf-frame1000002244-item wf-line-height-14 wf-first">
            <span class="wf-body_03-semi">HP : </span>
            <span class="wf-body_03-reg" v-text="data.hp"></span>
          </div>
          <div class="wf-frame1000002244-item wf-line-height-14">
            <span class="wf-body_03-semi wf-ml-1">TEL : </span>
            <span class="wf-body_03-reg wf-ml--1" v-text="data.phone"></span>
          </div>
        </div>
        <div class="wf-frame1000002244-item wf-line-height-14 wf-email">
          <span class="wf-body_03-semi">EMAIL : </span>
          <a :href="`mailto:${data.email}`" class="wf-body_03-reg wf-underline wf-underline-offset-2" v-text="data.email"> </a>
        </div>
      </div>
    </div>
  </div>
</template>
