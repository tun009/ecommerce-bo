<!-- BO_B0101_020102 -->
<script setup lang="ts">
import { MemberListAcceptInformationTableWrapper } from '@/components/members'
import { DataTableContainer, WelfareRadioGroup } from '@/components/uikit'
import { useMemberListBaseInformationTabAccept } from '@/composables'
import { MemberDetailBaseTabProps, memberAgreeRadiosList } from '@/models'
const props = defineProps<MemberDetailBaseTabProps>()

const { handleAgreeInformation, handleResetInformation, acceptListData, handleSaveInformation } = useMemberListBaseInformationTabAccept(props)
</script>
<template>
  <div>
    <MemberListAcceptInformationTableWrapper
      v-for="(item, index) in acceptListData"
      :key="index"
      @reset="() => handleResetInformation(index)"
      @save="() => handleSaveInformation(index)"
      :classGroup="item.classGroup"
      :title="item.label"
    >
      <DataTableContainer :value="item.data" isSelectInvisible :columnConfigs="item.thead">
        <template #body-isAgree="{ props }">
          <div class="">
            <WelfareRadioGroup
              size="sm"
              @update:model-value="() => handleAgreeInformation(index, props.index)"
              :model-value="props?.data?.isAgreeCheck"
              :name="`wf-mall-${index}-${props.index}`"
              :options="memberAgreeRadiosList"
            />
          </div>
        </template>
      </DataTableContainer>
    </MemberListAcceptInformationTableWrapper>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-list-accept-information-page.css');
</style>
