<script setup lang="ts">
import { DataTableContainer, TextInputNumber, WelfareMdButton, WelfareSelect } from '@/components'
import { computed, reactive } from 'vue'
import { productDataTableRegisterOptionConfig, ProductOptionsDeliveryInfo, productOptionsTypeRegisterConfig } from '@/models/views'
import { WelfareSelectOptionType } from '@/models'
import { useModalNotification } from '@/composables'

export interface ProductTableOptionsContent {
  valueType: ProductOptionsDeliveryInfo[]
}

interface ProductTableOptionsContentEmits {
  (e: 'edit-value-type', newValue: ProductOptionsDeliveryInfo, index: number): void

  (e: 'delete-value-type', index: number, productOptionKey?: number): void

  (e: 'update-value-total'): void
}

const { openModal: openNotificationModal } = useModalNotification()

const emit = defineEmits<ProductTableOptionsContentEmits>()
const props = defineProps<ProductTableOptionsContent>()

const valueType = reactive<ProductOptionsDeliveryInfo[]>(props.valueType)
const deleteValueType = (index: number, productOptionKey: number) => {
  emit('delete-value-type', index, productOptionKey)
}

const updateValueTotalCount = () => {
  emit('update-value-total')
}

const activeButtonCount = computed(() => {
  return props.valueType.every(
    (item) => 'optionPrice' in item && item.optionPrice && (item.salesStatus?.value === '1' ? 'inventory' in item && item.inventory : true)
  )
})

const pressButtonCount = () => {
  updateValueTotalCount()
}

const OnPressEvent = (e: Event, index: number) => {
  if (props.valueType[index].salesStatus?.value.toString() !== '01') {
    openNotificationModal({
      content: '판매중 상태에서만 수량을 입력할 수 있습니다.'
    })
    ;(document.activeElement as HTMLInputElement).blur()
  }
}

const updateValueType = (e: WelfareSelectOptionType, index: number) => {
  valueType[index].salesStatus = e
  if (e.value !== '1') {
    valueType[index].inventory = undefined
  }
}

</script>
<template>
  <div class="table-body-product-content">
    <DataTableContainer isSelectInvisible :value="valueType" :column-configs="productDataTableRegisterOptionConfig">
      <template #body-no="{ props }">
        <div class="text-input-center wf-input-width-50 wf-mt--2">
          <TextInputNumber size="small" v-model="props.data.no" placeholder="00" format-value should-check-press-key />
        </div>
      </template>
      <template #body-optionId="{ props }">
        {{ props.data.optionId || '-' }}
      </template>
      <template #body-option="{ props }">
        {{ props.data.option }}
      </template>
      <template #body-option1="{ props }">
        {{ props.data.option1 || '-' }}
      </template>
      <template #body-option2="{ props }">
        {{ props.data.option2 || '-' }}
      </template>
      <template #body-optionPrice="{ props }">
        <div class="text-input-right wf-mt--2 wf-w-96">
          <TextInputNumber size="small" v-model="props.data.optionPrice" placeholder="0" :format-value="false" should-check-press-key />
        </div>
      </template>
      <template #body-inventory="{ props }">
        <div class="text-input-right wf-w-96 wf-mt--2">
          <TextInputNumber
            size="small"
            v-model="props.data.inventory"
            placeholder="0"
            format-value
            should-check-press-key
            @focus-text="(e: Event) => OnPressEvent(e, props.index)"
          />
        </div>
      </template>
      <template #body-salesStatus="{ props }">
        <div class="wf-w-96-select wf-mt--2">
          <WelfareSelect
            v-model="props.data.salesStatus"
            placeholder="텍스트"
            optionLabel="label"
            :options="productOptionsTypeRegisterConfig"
            @update:model-value="(e) => updateValueType(e, props.index)"
            small
          />
        </div>
      </template>
      <template #body-action="{ props }">
        <div class="wf-mt--2">
          <WelfareMdButton label="삭제" buttonType="liner" buttonSize="small" @on-click="deleteValueType(props.index, props.data.no)" />
        </div>
      </template>
      <template #header-optionPrice="{ props }">
        {{ props }}
        <span class="wf_text-sub-01">*</span>
      </template>
      <template #header-inventory="{ props }">
        {{ props }}
        <span class="wf_text-sub-01">*</span>
      </template>
      <template #header-salesStatus="{ props }">
        {{ props }}
        <span class="wf_text-sub-01">*</span>
      </template>
    </DataTableContainer>
    <div class="wf_flex wf_justify-center wf-mt--3">
      <WelfareMdButton label="적용" buttonType="liner" class="w-200" :disabled="!activeButtonCount" @on-click="pressButtonCount" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
