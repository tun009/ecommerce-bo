import { isEmptyObject } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalNotification } from '@/composables/widgets'
import { CompanyCustomerRegistrationModel } from '@/models/views'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { number, object, string } from 'yup'

export const useCompanyCustomerRegistration = () => {
  const { openModal: showNotification } = useModalNotification()
  const { setLoading } = useLoading()
  const router = useRouter()
  const formData = {
    nameCompany: string().required(),
    companyRegistrationNumber: number().required(),
    businessClassification: string().required(),
    corporationRegistrationNumber: number().required(),
    businessStatus: string().required(),
    businessField: string().required(),
    businessLocation: string().required(),
    representativeName: string().required(),
    mainPhoneNumber: string().required(),
    businessRegistration: string().required(),
    companyProfile: string().required(),
    companyIntroductionStatement: string().required(),
    wfCenterId: string().required(),
    wfUrl: string().required(),
    contractTerm: string().required(),
    contractTime: string().required(),
    paymentDate: string().required(),
    contractFile: string().required()
  }

  const initData = {
    nameCompany: ''
  }

  const { values, setFieldValue, resetForm, errors } = useForm<CompanyCustomerRegistrationModel>({
    initialValues: initData,
    validationSchema: object(formData)
  })

  const onHandleSave = () => {
    try {
      if (isEmptyObject(errors.value)) {
        showNotification?.({
          content: '신규 고객사 정보가 생성되었습니다.마스터 관리자를 등록하여고객사 등록을 완료해 주세요'
        })
      } else {
        showNotification?.({
          content: '필수입력 항목을 모두 기입해 주세요.'
        })
      }
      setLoading?.(true)
      resetForm()
    } catch (error) {
      //
    } finally {
      setLoading?.(false)
    }
  }

  const onPageChange = () => {
    router.push('/')
  }

  return {
    values,
    onPageChange,
    onHandleSave,
    setFieldValue
  }
}
