import { AUTH_LOGIN_ROUTER, AUTH_USER_INFORMATION_ROUTER, favoriteStorage } from '@/common'
import { useToggleNavigation, useHandleExpanderNavigation, useButtonMenuBar, useStorage, useModal } from '@/composables'
import { FavoriteModalView } from '@/views'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useMainNavigation = () => {
  const { isShow, isShowNavigationFavorite, handleToggle, handleHideNavigationFavorite } = useToggleNavigation()
  const { isExpanderAll } = useHandleExpanderNavigation()
  const isOpenFavoritesModal = ref(false)
  const { currentIndexActive, handleActiveIndex } = useButtonMenuBar()
  const [favorites, setFavorites] = useStorage(favoriteStorage)
  const { showModal, closeModalByPop } = useModal()

  const router = useRouter()

  const goToInformation = () => {
    router.push(AUTH_USER_INFORMATION_ROUTER)
  }

  const goToLogin = () => {
    router.push(AUTH_LOGIN_ROUTER)
  }

  const handleShowModalFavorite = () => {
    showModal?.({
      component: FavoriteModalView,
      props: {
        favorites,
        setFavorites,
        onClose: closeModalByPop
      }
    })
  }

  const handleCloseModalFavorite = () => {
    isOpenFavoritesModal.value = false
  }

  const handleClickBtnClose = () => {
    if (isShowNavigationFavorite.value) {
      handleHideNavigationFavorite()
      currentIndexActive.value = 0
      handleActiveIndex(0)
    }
    handleToggle()
  }

  const handleExpanderAll = (value: boolean) => {
    isExpanderAll.value = value
  }

  return {
    isExpanderAll,
    isShow,
    isShowNavigationFavorite,
    isOpenFavoritesModal,
    handleCloseModalFavorite,
    handleShowModalFavorite,
    handleClickBtnClose,
    handleExpanderAll,
    favorites,
    setFavorites,
    goToInformation,
    goToLogin
  }
}
