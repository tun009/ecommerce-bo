import { ProductTab } from '@/models'
import {
  ProductDeliveryBaseInfoPage,
  ProductDeliveryExhibitionInfoPage,
  ProductDeliverySaleInfoPage,
  ProductDeliveryOptionStockPage,
  ProductDeliveryDeliveryInfoPage,
  ProductDeliveryMoreInfoPage,
  ProductDeliveryProvisionNoticePage
} from '@/views/products'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useProductDeliveryRegistration = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: ProductTab.BASE_INFORMATION, component: ProductDeliveryBaseInfoPage, header: '기본정보' },
    { name: ProductTab.EXHIBITION, component: ProductDeliveryExhibitionInfoPage, header: '전시정보' },
    { name: ProductTab.SALES, component: ProductDeliverySaleInfoPage, header: '판매정보' },
    { name: ProductTab.OPTIONS_STOCK, component: ProductDeliveryOptionStockPage, header: '옵션/재고' },
    { name: ProductTab.SHIPPING, component: ProductDeliveryDeliveryInfoPage, header: '배송정보' },
    { name: ProductTab.MORE_INFORMATION, component: ProductDeliveryMoreInfoPage, header: '상세정보' },
    { name: ProductTab.PROVISION_NOTICE, component: ProductDeliveryProvisionNoticePage, header: '상품정보제공고시' }
  ]

  const tabPanelProps = tabData.map((item) => {
    return { header: item.header }
  })

  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }

  const currentActive = ref(searchTabIndex(route.query.tab as string))

  watch(
    () => route.query.tab,
    (value) => {
      currentActive.value = searchTabIndex(value as string)
    }
  )

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
        tab: tabData[event.index].name
      }
    })
  }
  return {
    currentActive,
    handleTabChange,
    tabData,
    tabPanelProps
  }
}
