import complaintManagement from './config/complaint-management.json'
import mainLogin from './config/main-login.json'
import memberManagement from './config/member-management.json'
import productManagement from './config/product-management.json'
import uikit from './config/uikit.json'

export const useHTMLListData = () => {
  const items = [...uikit, ...mainLogin, ...productManagement, ...memberManagement, ...complaintManagement].filter((item) => item.visible)
  items.forEach((item) => {
    item.contents = item.contents.filter(i => i.visible !== false)
  })
  return {
    items
  }
}
