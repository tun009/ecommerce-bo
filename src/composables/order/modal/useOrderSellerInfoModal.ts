import { useProductVendorInformationModal } from '@/composables'
import { orderSellerInfoApi } from '@/services'

export const useOrderSellerInfoModal = () => {
  const { onShowModal } = useProductVendorInformationModal()

  const handleOpenModal = async (sellerKey: string) => {
    const { data } = await orderSellerInfoApi.getSellerInfo(sellerKey)
    onShowModal({
      sellerCode: data.sellerKey,
      nameOfSellingCompany: data.sellerName,
      salesDirectory: data.categoryList,
      masterAccount: data.masterAccountName,
      businessNumber: data.bizRegNum,
      companyRegistrationNumber: data.corpRegNum,
      representative: data.representativeName,
      workplace: data.streetAddress,
      phoneNumber: data.masterAccountPhone
    })
  }

  return { handleOpenModal }
}
