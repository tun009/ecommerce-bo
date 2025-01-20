import {IconExhibition} from "@/components/icons"
import { RouteRecordRawExtends } from "@/models"
import { WrapRouteView } from '@/views'


const data:RouteRecordRawExtends =   {
  name: '전시 관리',
  image: IconExhibition,
  component: WrapRouteView,
  path: '/exhibition',
  id: 'exhibition',
  children: [
    {
      name: '전시 콘텐츠 관리',
      component: WrapRouteView,
      path: 'content',
      id: 'content',
      children: [
        {
          name: '템플릿 관리',
          path: 'template',
          id: 'template',
          component: WrapRouteView
        },
        {
          name: '카테고리 관리',
          path: 'category',
          id: 'category',
          component: WrapRouteView
        },
        {
          name: '기획전 관리',
          path: 'special',
          id: 'special',
          component: WrapRouteView
        },
        {
          name: '인기 검색어 관리',
          path: 'popular-search-terms',
          id: 'popular-search-terms',
          component: WrapRouteView
        },
        {
          name: '검색어 배너 관리',
          path: 'search-term-banner',
          id: 'search-term-banner',
          component: WrapRouteView
        }
      ]
    },
    {
      name: '이벤트 관리',
      path: 'event',
      id: 'event',
      component: WrapRouteView,
      children: []
    },
    {
      name: '공통 전시 관리',
      component: WrapRouteView,
      path: 'common',
      id: 'common',
      children: [
        {
          name: '팝업창 관리',
          path: 'pop-up-window',
          id: 'pop-up-window',
          component: WrapRouteView
        },
        {
          name: '공통배너 전시관리',
          path: 'common-banner',
          id: 'common-banner',
          component: WrapRouteView
        },
        {
          name: 'GNB 전시 관리',
          path: 'gnb',
          id: 'gnb',
          component: WrapRouteView
        },
        {
          name: '확장형 이미지 관리',
          path: 'extensible-image',
          id: 'extensible-image',
          component: WrapRouteView
        },
        {
          name: '플래그 관리',
          path: 'flag',
          id: 'flag',
          component: WrapRouteView
        }
      ]
    },
  ]
}
export default data