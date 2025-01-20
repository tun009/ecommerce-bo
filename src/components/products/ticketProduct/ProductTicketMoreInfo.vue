<script setup lang="ts">
import { reactive, ref } from 'vue'
import { WelfareRadioGroup, WelfareSelect, WelfareDateTimePicker } from '@/components/uikit'
import { WelfareRadioProps, WelfareSelectOptionType } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT } from '@/common'

interface ProductTicketMoreInfoProps {
  startTime: string
  endTime: string
  selectTypeTicket: WelfareSelectOptionType | undefined
  optionsTypeTicket: WelfareSelectOptionType[]
}

interface ProductTicketMoreInfoEmits {
  (e: 'onChangeStartTime', value: string): void
  (e: 'onChangeEndTime', value: string): void
  (e: 'onChangeSelectTypeTicket', value: WelfareSelectOptionType): void
}

const props = defineProps<ProductTicketMoreInfoProps>()
const emits = defineEmits<ProductTicketMoreInfoEmits>()

const radioPassType = ref(1)
const optionsPassTypeRadio = reactive<WelfareRadioProps[]>([
  { label: '해당 없음', value: 1 },
  { label: '당일 사용 가능', value: 2 },
  { label: '구매 다음날 부터 사용', value: 3 },
  { label: '지정일 사용', value: 4 }
])

const radioCancel = ref(1)
const optionsCancelRadio = reactive<WelfareRadioProps[]>([
  { label: '해당 없음', value: 1 },
  { label: '유효기간 내 취소가능', value: 2 },
  { label: '판매사 환불 정책에 따름', value: 3 }
])

const radioRule = ref(1)
const optionsRuleRadio = reactive<WelfareRadioProps[]>([
  { label: '해당 없음', value: 1 },
  { label: '시설별 이용규정 다름', value: 2 },
  { label: '사용기간 내 이용 필수', value: 3 }
])

const radioExpiration = ref(1)
const optionsExpirationRadio = reactive<WelfareRadioProps[]>([
  { label: '유효기간 없음', value: 1 },
  { label: '유효기간 있음', value: 2 }
])
</script>

<template>
  <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
    <div class="wf_flex wf_flex-1">
      <div
        class="wf-btn-border-r--ncc wf_br-tl--6 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
      >
        패스 타입
      </div>
      <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14 wf-w-550">
        <WelfareRadioGroup v-model="radioPassType" :options="optionsPassTypeRadio" size="sm" />
      </div>
    </div>
    <div class="wf_flex wf_flex-1">
      <div
        class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
      >
        취소 가능일
      </div>
      <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14">
        <WelfareRadioGroup v-model="radioCancel" :options="optionsCancelRadio" size="sm" />
      </div>
    </div>
  </div>
  <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
    <div class="wf_flex wf_flex-1">
      <div
        class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
      >
        티켓 타입&nbsp;<span class="wf_text-sub-01">*</span>
      </div>
      <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14 wf-w-550">
        <WelfareSelect
          @update:model-value="(value) => emits('onChangeSelectTypeTicket', value)"
          :model-value="props.selectTypeTicket"
          class="wf_w-180"
          placeholder="모바일 티켓"
          optionLabel="label"
          :options="props.optionsTypeTicket"
          small
        />
      </div>
    </div>
    <div class="wf_flex wf_flex-1">
      <div
        class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
      >
        이용필수규칙
      </div>
      <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14">
        <WelfareRadioGroup v-model="radioRule" :options="optionsRuleRadio" size="sm" />
      </div>
    </div>
  </div>
  <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
    <div class="wf_flex wf_flex-1">
      <div
        class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
      >
        유효기간&nbsp;<span class="wf_text-sub-01">*</span>
      </div>
      <div
        class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14 wf-w-550 wf-space-x-20"
      >
        <WelfareRadioGroup v-model="radioExpiration" :options="optionsExpirationRadio" size="sm" />
        <div class="wf_flex wf_items-center wf_justify-start wf-body_03-reg wf_text--14 wf-space-x-4">
          <WelfareDateTimePicker
            :model-value="props.startTime"
            @update:model-value="(value) => emits('onChangeStartTime', value)"
            :type="'date'"
            size="small"
            :format="DEFAULT_DATE_FORMAT_DOT"
          />
          <span class="wf-body_01-reg wf_text-n-33">~</span>
          <WelfareDateTimePicker
            class="wf-ml-6"
            :model-value="props.endTime"
            @update:model-value="(value) => emits('onChangeEndTime', value)"
            :type="'date'"
            size="small"
            :format="DEFAULT_DATE_FORMAT_DOT"
          />
        </div>
      </div>
    </div>
  </div>
</template>
