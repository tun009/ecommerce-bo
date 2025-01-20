import {
  PRODUCT_APPROVAL_DELIVERY_PRODUCT_LIST,
  PRODUCT_APPROVAL_TICKET_PRODUCT_LIST,
  PRODUCT_DELIVERY_APPROVAL_PRODUCT,
  PRODUCT_DELIVERY_PRODUCT_LIST,
  PRODUCT_DELIVERY_REGISTRATION,
  PRODUCT_TICKET_APPROVAL_PRODUCT,
  PRODUCT_TICKET_PRODUCT_LIST,
  PRODUCT_TICKET_REGISTRATION,
  productBaseInfoType
} from '@/common'
import { ProductTab } from '@/models'
import { computed } from 'vue'

export const useProductRedirectLink = (type: string, tab: string = ProductTab.EXHIBITION) => {
  const redirectSavedLink = computed(() => {
    let prefix = ''
    if (type == productBaseInfoType.delivery) {
      prefix = PRODUCT_DELIVERY_REGISTRATION
    } else if (type == productBaseInfoType.ticket) {
      prefix = PRODUCT_TICKET_REGISTRATION
    } else if (type == productBaseInfoType.approval_delivery) {
      prefix = PRODUCT_DELIVERY_APPROVAL_PRODUCT
    } else if (type == productBaseInfoType.approval_ticket) {
      prefix = PRODUCT_TICKET_APPROVAL_PRODUCT
    }

    return prefix + '?tab=' + tab
  })
  const redirectCancelLink = computed(() => {
    if (type == productBaseInfoType.delivery) {
      return PRODUCT_DELIVERY_PRODUCT_LIST
    } else if (type == productBaseInfoType.ticket) {
      return PRODUCT_TICKET_PRODUCT_LIST
    } else if (type == productBaseInfoType.approval_delivery) {
      return PRODUCT_APPROVAL_DELIVERY_PRODUCT_LIST
    } else if (type == productBaseInfoType.approval_ticket) {
      return PRODUCT_APPROVAL_TICKET_PRODUCT_LIST
    }

    return PRODUCT_DELIVERY_PRODUCT_LIST
  })

  return {
    redirectSavedLink,
    redirectCancelLink
  }
}
