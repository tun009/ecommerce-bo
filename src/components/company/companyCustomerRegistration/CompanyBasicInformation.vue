<script setup lang="ts">
import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, FORMAT_DATE_YYYY_MM_DD } from '@/common'
import {
  TextInputMaxLengthValidation,
  WelfareRadioGroup,
  WelfareSelect,
  TextareaMaxLength,
  WelfareMdButton,
  FormGroup,
  WelfareCloseIcon,
  WelfareDateTimePicker,
  WelfareInputNumber
} from '@/components'
import { ProductBorderBottomTitle } from '@/components/products'
import { CompanyCustomFormRegistrationProps, companyCustomerRegistrationRadioOption, companyCustomerRegistrationSelectOption } from '@/models/views'

type CompanyBasicInformationEmit = (e: 'setDataValue', field: string, value: any) => void
const props = defineProps<CompanyCustomFormRegistrationProps>()
const emit = defineEmits<CompanyBasicInformationEmit>()

const eventEmit = {
  setFieldValues: (field: string, value: any) => {
    emit('setDataValue', field, value)
  }
}
</script>

<template>
  <div>
    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10">기업 기본정보</ProductBorderBottomTitle>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex wf_h-44">
        <FormGroup class="wf_flex-1" is-rounded-top label="기업명" required>
          <div class="wf_flex wf-space-x-6 wf_items-center wf-tr-match-parent">
            <TextInputMaxLengthValidation
              :max-length="30"
              name=""
              size="small"
              placeholder="20자 이내로 입력해 주세요."
              class="wf_flex-1"
              :model-value="props.valueProps.nameCompany"
              @update:model-value="(value) => eventEmit.setFieldValues('nameCompany', value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="사업자등록번호" required is-border-left>
          <div class="wf_flex wf-space-x-3 wf_items-center">
            <WelfareInputNumber
              :max-length="30"
              name=""
              size="small"
              placeholder='"-" 제외 숫자만 입력'
              class="wf_flex-1 wf_w-180"
              :model-value="props.valueProps.companyRegistrationNumber"
              @update:model-value="(value) => eventEmit.setFieldValues('companyRegistrationNumber', value)"
            />
            <WelfareMdButton label="중복확인" button-size="small" button-type="liner" />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="사업자 구분" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="companyCustomerRegistrationRadioOption"
              :model-value="props.valueProps.businessClassification"
              @update:model-value="(value) => eventEmit.setFieldValues('businessClassification', value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="법인등록번호" required is-border-left>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareInputNumber
              :max-length="30"
              name=""
              size="small"
              placeholder='"-" 제외 숫자만 입력'
              class="wf_flex-1 wf_w-180"
              :model-value="props.valueProps.corporationRegistrationNumber"
              @update:model-value="(value) => eventEmit.setFieldValues('corporationRegistrationNumber', value)"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="업태" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareSelect
              placeholder="생활용 포장 및 위생용품, 봉투 및 유사 제품 도매업"
              :model-value="props.valueProps.businessStatus"
              :options="companyCustomerRegistrationSelectOption"
              optionLabel="label"
              class="wf_m-w-300 height_30 select_custom"
              @update:modelValue="(value) => eventEmit.setFieldValues('businessStatus', value.value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="업종" required is-border-left>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareSelect
              placeholder="업종 선택"
              :model-value="props.valueProps.businessField"
              optionLabel="label"
              :options="companyCustomerRegistrationSelectOption"
              :disabled="true"
              class="wf_m-w-300 height_30 select_custom"
              @update:modelValue="(value) => eventEmit.setFieldValues('businessField', value.value)"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf-tr-match-parent" label="사업장 소재지" required>
          <div class="wf-tr-match-parent">
            <div class="wf_flex flex-col wf_justify-center wf-body_03-reg wf_text--14 wf-w-550 custom_py_7 wf-tr-match-parent wf-space-y-10">
              <div class="wf_flex wf-space-x-6 wf_justify-start wf_w-fit-content">
                <TextInputMaxLengthValidation
                  :max-length="30"
                  name=""
                  size="small"
                  placeholder="우편주소"
                  class="wf_flex-1 wf_w-input-180"
                  :model-value="props.valueProps.businessLocation"
                  disabled
                  @update:model-value="(value) => eventEmit.setFieldValues('businessLocation', value)"
                />
                <WelfareMdButton label="우편번호 찾기" button-size="small" button-type="liner" />
              </div>

              <div>
                <TextInputMaxLengthValidation
                  name=""
                  size="small"
                  placeholder="우편번호 찾기를 이용해 주세요."
                  :disabled="true"
                  class="wf_flex-1"
                  :model-value="props.valueProps.businessLocation"
                  @update:model-value="(value) => eventEmit.setFieldValues('businessLocation', value)"
                />
              </div>
              <div>
                <TextInputMaxLengthValidation
                  name=""
                  size="small"
                  placeholder="우편번호 찾기를 이용해 주세요."
                  class="wf_flex-1"
                  :model-value="props.valueProps.businessLocation"
                  @update:model-value="(value) => eventEmit.setFieldValues('businessLocation', value)"
                />
              </div>
              <div class="wf_flex wf-space-x-14 wf_items-center">
                <WelfareMdButton class="wf_btn-s-20" label="지번 주소" button-type="liner" button-size="small" />
                <span>지번주소 노출</span>
              </div>
            </div>
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="대표자 명" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <TextInputMaxLengthValidation
              name=""
              size="small"
              placeholder="10자 이내로 입력해 주세요."
              class="wf_flex-1 wf_w-180"
              :model-value="props.valueProps.representativeName"
              @update:model-value="(value) => eventEmit.setFieldValues('representativeName', value)"
            />
          </div>
        </FormGroup>

        <FormGroup class="wf_flex-1" label="대표 전화번호" required is-border-left>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <TextInputMaxLengthValidation
              name=""
              size="small"
              placeholder='"-" 제외 숫자만 입력'
              class="wf_flex-1 wf_w-180"
              :model-value="props.valueProps.mainPhoneNumber"
              @update:model-value="(value) => eventEmit.setFieldValues('mainPhoneNumber', value)"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_custom-form-group-label" label="사업자등록증" required>
          <div class="wf_py-14 wf-tr-match-parent">
            <div class="wf_flex wf_justify-between">
              <WelfareMdButton label="파일선택" button-size="small" button-type="liner" />
              <WelfareCloseIcon class="wf_ic-close-custom" :width="11" :height="11" />
            </div>
            <div class="wf-tr-match-parent wf_m-t-10">
              <TextInputMaxLengthValidation
                name=""
                size="small"
                placeholder="쿠폰 이미지 완전 대박 세일 100%.jpg"
                :disabled="true"
                class="wf_flex-1"
                :model-value="props.valueProps.businessRegistration"
                @update:model-value="(value) => eventEmit.setFieldValues('businessRegistration', value)"
              />
            </div>
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="회사소개서" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareMdButton label="파일선택" button-size="small" button-type="liner" />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1" label="회사소개문구" required>
          <div class="wf-tr-match-parent wf-textarea-py">
            <TextareaMaxLength
              :model-value="props.valueProps.companyIntroductionStatement"
              @update:model-value="(value) => eventEmit.setFieldValues('companyIntroductionStatement', value)"
              class="wf_set-h-textarea"
              placeholder="200자 이내로 입력해 주세요."
              :max-length="100"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_border-b-rm" label="회사 홈페이지">
          <div class="wf-tr-match-parent">
            <TextInputMaxLengthValidation
              name=""
              size="small"
              placeholder="회사 소개페이지 URL을 입력해 주세요."
              class="wf_flex-1"
              :model-value="props.valueProps.companyHomePage"
              @update:model-value="(value) => eventEmit.setFieldValues('companyHomePage', value)"
            />
          </div>
        </FormGroup>
      </div>
    </div>
  </div>

  <div>
    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10 wf-tr-match-parent company-regis-main-title_w-full">
      <div class="wf_flex wf_flex-custom">
        사이트 정보
        <span class="wf_text-sub-01 wf-body_04-reg">※ 복지몰 아이디는 복지몰 URL에 사용되므로, 신중히 입력 부탁드립니다.</span>
      </div>
    </ProductBorderBottomTitle>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex">
        <FormGroup class="wf_border-b-rm" label="복지몰 아이디" required>
          <div class="wf_items-center wf_justify-between wf_flex wf-tr-match-parent">
            <div class="wf_flex wf-space-x-4">
              <TextInputMaxLengthValidation
                :max-length="30"
                name=""
                size="small"
                placeholder="아이디 입력"
                class="wf_flex-1 wf_w-180"
                :model-value="props.valueProps.wfCenterId"
                @update:model-value="(value) => eventEmit.setFieldValues('wfCenterId', value)"
              />
              <WelfareMdButton label="중복확인" button-size="small" button-type="liner" />
            </div>
            <span class="wf_text-sub-01 wf-body_04-reg"> ※ 10자 이내 영문으로 입력해 주세요. </span>
          </div>
        </FormGroup>
        <FormGroup class="wf_border-b-rm" label="복지몰 URL" required is-border-left>
          <div class="wf-body_03-reg text-default">
            <span>{{ props.valueProps.wfUrl }}</span>
          </div>
        </FormGroup>
      </div>
    </div>
  </div>

  <div>
    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10 wf-tr-match-parent company-regis-main-title_w-full">
      <div class="wf_flex wf_flex-custom">
        계약 정보
        <span class="wf_text-sub-01 wf-body_04-reg">※ 복지몰 아이디는 복지몰 URL에 사용되므로, 신중히 입력 부탁드립니다.</span>
      </div>
    </ProductBorderBottomTitle>
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex">
        <FormGroup label="계약기간" required>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pb-2 wf-body_03-reg wf_text--14">
            <WelfareDateTimePicker
              :model-value="FORMAT_DATE_YYYY_MM_DD"
              size="small"
              :format="FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS"
              @update:model-value="() => {}"
            />&nbsp;~&nbsp;&nbsp;
            <WelfareDateTimePicker
              :model-value="FORMAT_DATE_YYYY_MM_DD"
              size="small"
              :format="FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS"
              @update:model-value="() => {}"
            />
          </div>
        </FormGroup>
        <FormGroup label="계약일" required is-border-left>
          <div class="">
            <WelfareDateTimePicker
              :model-value="FORMAT_DATE_YYYY_MM_DD"
              size="small"
              :format="FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS"
              @update:model-value="() => {}"
            />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup label="정산일" required>
          <div class="wf_flex wf-tr-match-parent">
            <WelfareInputNumber class="wf_w-input-180 wf-tr-match-parent" placeholder="텍스트" label-left="매월" :max-length="2" size="small" />
          </div>
        </FormGroup>
      </div>

      <div class="wf_flex">
        <FormGroup class="wf_flex-1 wf_border-b-rm" label="계약서" required>
          <div class="wf_py-14 wf-tr-match-parent">
            <div class="wf_flex wf_justify-between">
              <WelfareMdButton label="파일선택" button-size="small" button-type="liner" />
              <WelfareCloseIcon :width="13" :height="13" />
            </div>
            <div class="wf-tr-match-parent wf_m-t-10">
              <TextInputMaxLengthValidation
                name=""
                size="small"
                placeholder="쿠폰 이미지 완전 대박 세일 100%.jpg"
                :disabled="true"
                class="wf_flex-1"
                :model-value="''"
                @update:model-value="() => {}"
              />
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-registration.css');
</style>
