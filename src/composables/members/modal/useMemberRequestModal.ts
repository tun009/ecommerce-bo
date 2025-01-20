import { useModal } from '@/composables'
import { MemberRequestModalProps, MemberRequestSearchModel, MemberSearchType } from '@/models'
import { ref } from 'vue'
import { MemberRequestModal } from '@/views/members'

export const useMemberRequestModal = (searchType?: MemberSearchType) => {
  const modalTable = useModal<MemberRequestModalProps>()

  const searchText = ref()
  const searchResData = ref<MemberRequestSearchModel>({ memberKey: '', memberName: '' })

  const openModal = () => {
    modalTable.showModal?.({
      component: MemberRequestModal,
      props: {
        onCancel: modalTable.closeModalByPop,
        onSelect: onSelect,
        searchInput: searchText.value,
        searchResData: searchResData.value,
        searchType: searchType
      }
    })
  }

  const onSelect = (value: MemberRequestSearchModel) => {
    searchText.value = value.memberKey ? `${value.memberKey} (${value.memberName})` : ''
    searchResData.value = value
    modalTable.closeModalByPop?.()
  }

  return { openModal, searchText, searchResData }
}
