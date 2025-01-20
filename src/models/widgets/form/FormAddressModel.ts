import { AddressModel } from "@/models/common"

export interface FormAddressProps {
  modelValue: AddressModel
}

export type FormAddressEmits = (e: 'update:modelValue', value: AddressModel) => void
