import { formatTextLength } from '@/common'
import { useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables'
import {
  MemberBlackReasonCodeType,
  MemberDetailBlackMemberModel,
  MemberDetailBlackMemberRegisterDataRequest,
  MemberDetailBlackMemberRegistrationModalProps,
  defaultPageState
} from '@/models'
import { memberDetailBlackMemberApi } from '@/services'
import { PageState } from 'primevue/paginator'
import { ref, computed } from 'vue'

export const useMemberDetailBlackMemberRegistrationModalLogic = (props: MemberDetailBlackMemberRegistrationModalProps) => {
  const { openModal: openConfirm } = useModalConfirm()
  const { openModal: openNotification, closeAllModal, closeModalByPop } = useModalNotification()
  const reasonOptions = [
    {
      label: '구매의사 없는 반복 구매',
      value: MemberBlackReasonCodeType.REPT_PUCH
    },
    {
      label: '언어 폭력',
      value: MemberBlackReasonCodeType.VERBAL_ABU
    },
    {
      label: '영업 방해',
      value: MemberBlackReasonCodeType.DISTURB
    },
    {
      label: '기타',
      value: MemberBlackReasonCodeType.ETC
    }
  ]
  const tableRef = ref()
  const page = ref<PageState>(defaultPageState)
  const query = ref({
    message: '',
    reason: ''
  })
  const message = ref<string>('')
  const labelRightComputed = computed(() => formatTextLength(query.value.message.length))
  const statusSaveButton = computed(() => !query.value.message.length || !query.value.reason)

  const getData = async (page: number, size: number) => {
    if (!props.member.memberKey) throw new Error('Member Key is undefined')
    return memberDetailBlackMemberApi.getList(props.member.memberKey, { pageNum: page + 1, rowSize: size })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberDetailBlackMemberModel>(getData)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const onSave = () => {
    openConfirm({
      content: `<p>${props.member.name}</p><p>블랙회원으로 등록 하시겠습니까?</p>`,
      onConfirm: () => {
        closeModalByPop?.()
        handleSave()
      }
    })
  }

  const handleSave = async () => {
    try {
      const data: MemberDetailBlackMemberRegisterDataRequest = {
        message: query.value.message,
        reason: query.value.reason as MemberBlackReasonCodeType
      }
      await memberDetailBlackMemberApi.register(props.member.memberKey, data)
      openNotification({
        content: '블랙회원으로 등록되었습니다.',
        onAccept: () => {
          closeAllModal?.()
          props.onRefresh?.()
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    reasonOptions,
    query,
    message,
    labelRightComputed,
    statusSaveButton,
    tableRef,
    items,
    isLoading,
    totalItems,
    onPageChange,
    onSave
  }
}
