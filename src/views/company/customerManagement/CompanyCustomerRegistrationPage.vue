<!-- BO_O0103_010101 -->
<script setup lang="ts">
import { CompanyBasicInformation, CompanyGroupButtonAction } from '@/components/company'
import { useCompanyCustomerRegistration } from '@/composables'

const { values, onPageChange, onHandleSave, setFieldValue } = useCompanyCustomerRegistration()
</script>

<template>
  <div>
    <form>
      <div class="company-regis-main">
        <div>
          <CompanyBasicInformation :value-props="values" @set-data-value="setFieldValue" />
        </div>
      </div>
    </form>
    <CompanyGroupButtonAction @page-change="onPageChange" @on-save-data="onHandleSave" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'CompanyCustomerRegistrationPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-registration.css');
</style>
