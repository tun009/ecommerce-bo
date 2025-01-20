<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'
import { MemberPointUsageCustomerDataTableModel, memberPointUsageCustomerHeaderTableConfig } from '@/models'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'

interface MemberCustomerInfoTableProps {
  items: MemberPointUsageCustomerDataTableModel[]
}

interface MemberCustomerInfoTableEmits {
  (e: 'on-download-excel'): void
}

const props = defineProps<MemberCustomerInfoTableProps>()
const emits = defineEmits<MemberCustomerInfoTableEmits>()

</script>

<template>
  <div class="wf-w-full wf_flex wf_flex-col wf-space-y-16">
    <div class="wf_flex wf_justify-end">
      <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" @on-click="emits('on-download-excel')"/>
    </div>
    <div class="">
      <!-- Table Here -->
      <DataTable class="wf-member-customer-info-table" ref="refTable" :value="props.items" :loading="false"
        :isSelectInvisible="true">
        <ColumnGroup type="header">
          <Row>
            <Column :rowspan="2" v-for="(item, index) in memberPointUsageCustomerHeaderTableConfig.slice(0, 3)"
              :key="index" :class="item.class" :header="item.header" />
            <Column header="고객사 회원 수" :colspan="2" />
            <Column :rowspan="2" v-for="(item, index) in memberPointUsageCustomerHeaderTableConfig.slice(5, 7)"
              :key="index" :class="item.class" :header="item.header" />
            <Column header="전체 조정 포인트" :colspan="2" />
          </Row>
          <Row>
            <Column v-for="(item, index) in memberPointUsageCustomerHeaderTableConfig.slice(3, 5)" :key="index"
              :class="item.class" :header="item.header" />
            <Column v-for="(item, index) in memberPointUsageCustomerHeaderTableConfig.slice(7, 9)" :key="index"
              :class="item.class" :header="item.header" />
          </Row>
        </ColumnGroup>
        <Column v-for="(item, index) in memberPointUsageCustomerHeaderTableConfig.slice(0, 1)" :key="index" :field="item.field"
          :header="item.header" :class="item.class">
          <template #body="slotProps">
            <router-link to="#">{{ slotProps.data[item.field] }}</router-link>
          </template>
        </Column>
        <Column v-for="(item, index) in memberPointUsageCustomerHeaderTableConfig.slice(1,9)" :key="index" :field="item.field"
          :class="item.class">
          <template #body="slotProps">
            <span>{{ slotProps.data[item.field] }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
