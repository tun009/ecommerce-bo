import { useToggleFavorite } from '@/composables'
import { IFavoriteNavigation, IMenuFavoriteProps } from '@/models'
import { listRouteForwardPath } from '@/router/private'
import { useTabsManagerStore } from '@/stores'
import { computed } from 'vue'

export const useWelfareNavigationFavorite = ({ setFavorites, favorites }: IMenuFavoriteProps) => {
  const { handleToggleFavorite } = useToggleFavorite(favorites ?? [], setFavorites)
  const { pushTab } = useTabsManagerStore()

  const handleHover = (event: MouseEvent) => {
    const popup = document.getElementById('wf-body-navigation-favorite-hover')
    const textTag = popup?.querySelector('.wf-body-navigation-favorite-hover-text')
    if (textTag && popup) {
      const target = event.target as HTMLAnchorElement
      const { top, left } = target.getBoundingClientRect()
      textTag.textContent = target.dataset.text ?? ''
      popup.style.display = 'flex'
      popup.style.top = `${top + 14 + 6 + 4}px`
      popup.style.left = `${left - 6}px`
    }
  }

  const handleMouseLeave = () => {
    const popup = document.getElementById('wf-body-navigation-favorite-hover')
    if (popup) {
      popup.style.display = 'none'
    }
  }

  const listLinksFavorite = computed(() => {
    if (!favorites) return []
    const listFavorite: IFavoriteNavigation[] = []
    listRouteForwardPath.forEach((item) => {
      item.children.forEach((_item) => {
        const isHasFavorite = favorites.some((f) => f === _item.id)
        if (isHasFavorite) {
          listFavorite.push({
            id: _item.id,
            item: {
              name: item.name,
              path: item.path,
              nameComponent: item?.nameComponent,
              children: {
                path: _item.path,
                name: _item.name,
                nameComponent: _item?.nameComponent
              }
            }
          })
        }
        _item.children.forEach((__item) => {
          const isHasFavorite = favorites.some((f) => f === __item.id)
          if (isHasFavorite) {
            listFavorite.push({
              id: __item.id,
              item: {
                name: item.name,
                path: item.path,
                nameComponent: item?.nameComponent,
                children: {
                  path: _item.path,
                  name: _item.name,
                  nameComponent: _item?.nameComponent,
                  children: {
                    path: __item.path,
                    name: __item.name,
                    nameComponent: __item?.nameComponent
                  }
                }
              }
            })
          }
        })
      })
    })

    return listFavorite
  })

  const handlePushTab = (favorite: IFavoriteNavigation) => {
    const item = favorite.item?.children?.children ?? favorite.item?.children
    const data = {
      nameComponent: item.nameComponent ?? '',
      name: item.name ?? '',
      path: item.path ?? ''
    }
    pushTab(data)
  }

  return {
    handleHover,
    handleMouseLeave,
    handleToggleFavorite,
    favorites: listLinksFavorite,
    handleClickStar: handleToggleFavorite,
    handlePushTab
  }
}
