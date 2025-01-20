import { ProductGroupOption } from '@/components/products'
import { ProductTypeRegisterOptionValue, ProductRegisterSingleOptionModel, ProductSelectOptionModel } from '@/models'
import { Ref } from 'vue'

export const useProductContentTableData = (
  data: ProductRegisterSingleOptionModel,
  selectOptions: ProductSelectOptionModel[],
  selectStep: Ref<ProductTypeRegisterOptionValue>
) => {
  const contentTableData = [
    {
      label: '상품 ID',
      isProductCode: true,
      content: data?.productCode,
      classNameContent: 'wf-pb-1'
    },
    {
      label: '상품명',
      content: data?.productName,
      className: 'wf_h-45'
    },
    {
      label: '옵션 여부 ',
      required: true,
      element: ProductGroupOption,
      props: {
        selectOptions,
        selectStep,
        type: data?.type
      },
      className: 'wf_h-43',
      classNameContent: 'wf-pt-1'
    }
  ]
  return { contentTableData }
}
