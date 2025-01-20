import { ProductTab } from '@/models/views'
import {
  ProductApprovalTicketBaseInfoPage,
  ProductApprovalTicketExhibitionInfoPage,
  ProductApprovalTicketSalesInfoPage,
  ProductApprovalTicketProvisionNoticePage,
  ProductApprovalTicketMoreInfoPage,
  ProductApprovalTicketOptionDetailPage,
  ProductApprovalTicketReleaseInfoPage
} from '@/views/products'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useProductApprovalTicketWrapper = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: ProductTab.BASE_INFORMATION, component: ProductApprovalTicketBaseInfoPage, header: '기본정보' },
    { name: ProductTab.EXHIBITION, component: ProductApprovalTicketExhibitionInfoPage, header: '전시정보' },
    { name: ProductTab.SALES, component: ProductApprovalTicketSalesInfoPage, header: '판매정보' },
    { name: ProductTab.OPTIONS_STOCK, component: ProductApprovalTicketOptionDetailPage, header: '옵션/재고' },
    { name: ProductTab.RELEASE, component: ProductApprovalTicketReleaseInfoPage, header: '발급정보' },
    { name: ProductTab.MORE_INFORMATION, component: ProductApprovalTicketMoreInfoPage, header: '상세정보' },
    { name: ProductTab.PROVISION_NOTICE, component: ProductApprovalTicketProvisionNoticePage, header: '상품정보제공고시' }
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
    (newTab) => {
      currentActive.value = searchTabIndex(newTab as string)
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
