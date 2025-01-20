import { favoriteStorage } from '@/common'
import { useStorage } from '@/composables/common'
import { onMounted } from 'vue'
import { listRouteForwardPath } from '@/router/private'

export const useCheckFirstLoadFavorite = () => {
  const [favorites, setFavorites] = useStorage<string[]>(favoriteStorage)
  onMounted(() => {
    if (!favorites?.value) {
      const newFavorites: string[] = []
      listRouteForwardPath.forEach((list) => {
        list.children.forEach((item) => {
          if (!item?.children || !item.children.length) {
            newFavorites.push(item.id)
          }
        })
      })
      setFavorites(newFavorites)
    }
  })
}
