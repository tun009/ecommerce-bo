<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'
import { MemberDataExcelModel, memberPUCustomerCompanyTotalHeaderTableConfig } from '@/models/views'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import { exportExcel } from '@/common'

export interface MemberCustomerCompanyTotalTableProps {
  items: any[]
  dataDownload: MemberDataExcelModel
}
const props = defineProps<MemberCustomerCompanyTotalTableProps>()
</script>

<template>
  <div class="wf-w-full wf_flex wf_flex-col wf-space-y-16">
    <div class="wf_flex wf_justify-end">
      <WelfareMdButton
        label="엑셀 다운로드"
        class="wf_w-96"
        buttonType="liner"
        @on-click="exportExcel<any>(dataDownload.data, dataDownload.sheetName, dataDownload.customHeader, dataDownload.columnWidth)"
      />
    </div>
    <div class="">
      <!-- Table Here -->
      <DataTable class="wf-member-customer-company-total-table" ref="refTable" :value="props.items" :loading="false" :isSelectInvisible="true">
        <ColumnGroup type="header">
          <Row>
            <Column
              :rowspan="2"
              v-for="(item, index) in memberPUCustomerCompanyTotalHeaderTableConfig.slice(0, 1)"
              :key="index"
              :class="item.class"
              :header="item.header"
            />
            <Column header="전체 회원 수" :colspan="2" />
            <Column
              :rowspan="2"
              v-for="(item, index) in memberPUCustomerCompanyTotalHeaderTableConfig.slice(3, 8)"
              :key="index"
              :class="item.class"
              :header="item.header"
            />
          </Row>
          <Row>
            <Column
              v-for="(item, index) in memberPUCustomerCompanyTotalHeaderTableConfig.slice(1, 3)"
              :key="index"
              :class="item.class"
              :header="item.header"
            />
          </Row>
        </ColumnGroup>
        <Column v-for="(item, index) in memberPUCustomerCompanyTotalHeaderTableConfig" :key="index" :field="item.field" :class="item.class">
          <template #body="slotProps">
            <span>{{ slotProps.data[item.field] }}</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
