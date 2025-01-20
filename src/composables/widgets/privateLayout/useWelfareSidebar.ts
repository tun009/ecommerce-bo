import { useToggleNavigation, useHandleExpanderNavigation, useButtonMenuBar, useModal } from '@/composables'
import { ManualModalView, PlayInformationModalView } from '@/views'

export const useWelfareSidebar = () => {
  const { handleToggle, handleHideNavigationFavorite, handleShowNavigationFavorite, isShowNavigationFavorite } = useToggleNavigation()
  const { isExpanderAll } = useHandleExpanderNavigation()
  const { currentIndexActive, handleActiveIndex } = useButtonMenuBar()
  const { showModal, closeModalByPop } = useModal()

  const handleActiveBtn = (index: number) => {
    if (currentIndexActive.value === 0 || index === 0 || index === 1) {
      handleActiveIndex(index)
      currentIndexActive.value = index
    }
  }

  const listActionBtn = {
    _0: () => {
      if (isShowNavigationFavorite.value) {
        handleHideNavigationFavorite()
      } else {
        handleToggle()
      }
    },
    _1: () => {
      if (!isShowNavigationFavorite.value) {
        handleShowNavigationFavorite()
      } else {
        currentIndexActive.value = 0
        handleActiveIndex(0)
        handleHideNavigationFavorite()
      }
      isExpanderAll.value = false
    },
    _2: () => {
      // showModalManual()
      showModal?.({
        component: ManualModalView,
        props: {
          onClose: () => {
            closeModalByPop?.()
            handleActiveIndex(currentIndexActive.value)
          }
        }
      })
      isExpanderAll.value = false
    },
    _3: () => {
      showModal?.({
        component: PlayInformationModalView,
        events: {
          onClose: () => {
            closeModalByPop?.()
            handleActiveIndex(currentIndexActive.value)
          }
        }
      })
      isExpanderAll.value = false
    }
  }

  const handleClick = (e: MouseEvent, index: number) => {
    handleActiveBtn(index)
    const key = `_${index}` as '_0'
    listActionBtn?.[key]?.()
  }

  return {
    currentIndexActive,
    handleClick,
    handleActiveIndex
  }
}
