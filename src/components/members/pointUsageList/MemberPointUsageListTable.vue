<script setup lang="ts">
import { MEMBER_DETAIL_INFO, formatNumberDot } from '@/common'
import { BaseDataTablePagination } from '@/components'
import { useBaseDataTablePaginationEmit } from '@/composables'
import { WelfareDataTableEmits, WelfareDataTableExpose, WelfareDataTableProps, memberPointUsageHeaderTableConfig } from '@/models'
import Column from 'primevue/column'
import { ImgLoader } from '@/assets'

export interface MemberPointUsageListTableProps extends WelfareDataTableProps {}

export interface MemberPointUsageListTableEmits extends WelfareDataTableEmits {
  (e: 'show-modal-detail'): void
}

const props = defineProps<MemberPointUsageListTableProps>()
const emit = defineEmits<MemberPointUsageListTableEmits>()
const { event,  tableRef } = useBaseDataTablePaginationEmit(emit)

const scrollToTop = () => {
  tableRef?.value?.scrollToTop()
}

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})
</script>

<template>
  <BaseDataTablePagination class="wf-member-point-usage-list" ref="tableRef" v-bind="props" v-on="event" noDataLabel="복지포인트 리스트가 없습니다.">
    <template #title>
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ formatNumberDot(props.totalRecords) }} 건</h6>
    </template>
    <template #loading>
      <div class='p-datatable-loading-overlay p-component-overlay' data-pc-section='loadingoverlay'>
        <img class='wf-loading-table' alt='' :src='ImgLoader' />
      </div>
    </template>
    <template #columns>
      <Column
        v-for="(item, index) in memberPointUsageHeaderTableConfig.slice(0, 1)"
        :key="index"
        :field="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
      <Column
        :field="memberPointUsageHeaderTableConfig[1].field"
        :header="memberPointUsageHeaderTableConfig[1].header"
        :class="memberPointUsageHeaderTableConfig[1].class"
      >
        <template #body="slotProps">
          <router-link to="#" class="wf_text-sub-02 wf-underline wf-pointer">
            {{ slotProps.data[memberPointUsageHeaderTableConfig[1].field] }}
          </router-link>
        </template>
      </Column>
      <Column
        v-for="(item, index) in memberPointUsageHeaderTableConfig.slice(2, 3)"
        :key="index"
        :field="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
      <Column
        :field="memberPointUsageHeaderTableConfig[3].field"
        :header="memberPointUsageHeaderTableConfig[3].header"
        :class="memberPointUsageHeaderTableConfig[3].class"
      >
        <template #body="slotProps">
          <router-link
            :to="{ path: `${MEMBER_DETAIL_INFO}`, query: { memberKey: slotProps.data[memberPointUsageHeaderTableConfig[3].field]}}"
            class="wf_text-sub-02 wf-underline wf-pointer"
          >
            {{ slotProps.data[memberPointUsageHeaderTableConfig[3].field] }}
          </router-link>
        </template>
      </Column>
      <Column
        v-for="(item, index) in memberPointUsageHeaderTableConfig.slice(4, 6)"
        :key="index"
        :field="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
      <Column
        :field="memberPointUsageHeaderTableConfig[6].field"
        :header="memberPointUsageHeaderTableConfig[6].header"
        :class="memberPointUsageHeaderTableConfig[6].class"
      >
        <template #body="slotProps">
          <a class="wf_text-sub-02 wf-underline wf-pointer" @click="($event) => emit('show-modal-detail')">
            {{ slotProps.data[memberPointUsageHeaderTableConfig[6].field] }}
          </a>
        </template>
      </Column>

      <Column
        v-for="(item, index) in memberPointUsageHeaderTableConfig.slice(7, 12)"
        :key="index"
        :field="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <span>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
    </template>
  </BaseDataTablePagination>
</template>
