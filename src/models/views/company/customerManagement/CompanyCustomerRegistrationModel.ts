export interface CompanyCustomerRegistrationModel {
  nameCompany: string
  companyRegistrationNumber: number
  businessClassification: string
  corporationRegistrationNumber: number
  businessStatus: string
  businessField: string
  // oj location here
  businessLocation: string
  representativeName: string
  mainPhoneNumber: string
  businessRegistration: string
  companyProfile: string
  companyIntroductionStatement: string
  companyHomePage?: string
  wfCenterId: string
  wfUrl: string
  contractTerm: string
  contractTime: string
  paymentDate: string
  contractFile: string
}
export interface CompanyCustomFormRegistrationProps {
  valueProps: CompanyCustomerRegistrationModel
}

export const companyCustomerRegistrationRadioOption = [
  { label: '법인사업자', value: '1' },
  { label: '일반사업자', value: '2' }
]

export const companyCustomerRegistrationSelectOption = [
  { label: '법인사업자', value: '1' },
  { label: '일반사업자', value: '2' }
]
