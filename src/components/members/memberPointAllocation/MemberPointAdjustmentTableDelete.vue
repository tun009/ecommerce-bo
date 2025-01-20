<script setup lang="ts">
import { MemberPointAdjustmentTableDeleteConfig } from '@/models'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { useMemberPointAdjustmentTableDelete } from '@/composables'
import Column from 'primevue/column'

const { items, isLoading, onRowSelected, onSelectAllChange, removeItem, listChecked } = useMemberPointAdjustmentTableDelete()
</script>

<template>
  <DataTablePaginationWithCheckbox
    :value="items"
    :loading="isLoading"
    @row-checked-change="onRowSelected"
    @select-all-change="onSelectAllChange"
    is-select-invisible
  >
    <template #columns>
      <Column
        v-for="(item, index) in MemberPointAdjustmentTableDeleteConfig"
        :key="index"
        :field="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <span v-if="slotProps.field !== MemberPointAdjustmentTableDeleteConfig[8].field">{{ slotProps.data[item.field] }}</span>
          <WelfareMdButton
            v-if="slotProps.field === MemberPointAdjustmentTableDeleteConfig[8].field"
            label="삭제"
            class="wf_w-50"
            buttonType="liner"
            button-size="small"
            @on-click="removeItem([slotProps.data.id])"
          />
        </template>
      </Column>
    </template>
    <template #title>
      <div></div>
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex">
        <WelfareMdButton
          @on-click="removeItem(listChecked.map((item) => Number(item)))"
          label="선택 삭제"
          class="wf_w-72"
          buttonType="liner"
          :disabled="listChecked?.length <= 0"
        />
      </div>
    </template>
  </DataTablePaginationWithCheckbox>
</template>