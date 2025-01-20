import { RouteRecordRawChildItem } from '@/models'
import { useTabsManagerStore } from '@/stores'

export const useToggleFavorite = (favorites: string[], handleSetFavorites: (data: string[]) => void) => {
  const { pushTab } = useTabsManagerStore()
  const handleToggleFavorite = (id: string) => {
    const newFavorites = favorites ?? []
    if (newFavorites) {
      const index = newFavorites.findIndex((item) => item === id)
      if (index !== -1) {
        newFavorites.splice(index, 1)
      } else {
        newFavorites.push(id)
      }

      handleSetFavorites([...newFavorites])
    }
  }

  const hasFavorite = (id: string) => {
    if (!favorites?.length) return false
    return favorites.some((item) => item === id)
  }

  const handlePushTab = (data: RouteRecordRawChildItem) => {
    pushTab({
      name: data.name,
      path: data.path,
      nameComponent: data.nameComponent ?? ''
    })
  }

  return {
    handleToggleFavorite,
    favorites,
    hasFavorite,
    handlePushTab
  }
}
