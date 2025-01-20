import { DaumPostcodeSearchResponse } from '@/models'
import { Ref } from 'vue'
import { DAUM_POST_CODE_SCRIPT } from './constant'
import { isBNameDataValid } from './validation'

export const execDaumPostcode = (
  wfDaumLayer: Ref<any>,
  extraAddress: Ref<string>,
  postcode: Ref<string>,
  address: Ref<string>,
  isDisplayIframe: Ref<boolean>,
  options: {
    width: number
    height: number
    borderWidth: number
  } = {
    width: 500,
    height: 542,
    borderWidth: 1
  }
  // detailAddressRef?: Ref<any>
) => {
  const initLayerPosition = () => {
    isDisplayIframe.value = true
    wfDaumLayer.value.style.position = 'fixed'
    wfDaumLayer.value.style.paddingTop = '44px'
    wfDaumLayer.value.style.display = 'block'
    wfDaumLayer.value.style.backgroundColor = 'white'
    wfDaumLayer.value.style.borderRadius = '4px'
    wfDaumLayer.value.style.width = options.width + 'px'
    wfDaumLayer.value.style.height = options.height + 'px'
    wfDaumLayer.value.style.border = options.borderWidth + 'px solid'
    wfDaumLayer.value.classList.add('wf-custom-scrollbar')
  }
  // @ts-ignore
  new daum.Postcode({
    oncomplete: function (data: DaumPostcodeSearchResponse) {
      let extraAddr = ''
      const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && isBNameDataValid(data.bname)) {
          extraAddr += data.bname
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName
        }
        extraAddr = extraAddr !== '' ? ` (${extraAddr})` : ''
      }

      extraAddress.value = data.userSelectedType === 'R' ? extraAddr : ''

      postcode.value = data.zonecode
      address.value = addr
      //   detailAddressRef?.value?.focus()
      
      wfDaumLayer.value.style.display = 'none'
      isDisplayIframe.value = false
    },
    options: '100%',
    height: '100%',
    maxSuggestItems: 5
  }).embed(wfDaumLayer.value)

  wfDaumLayer.value.style.display = 'block'

  initLayerPosition()
}

export const mountDaumCode = () => {
  const script = document.createElement('script')
  script.src = DAUM_POST_CODE_SCRIPT
  script.async = true
  document.head.appendChild(script)
}

export const handleClickOutsideIframe = (closeIframe: () => void, iframeRef: Ref<any>, event: Event) => {
  if (iframeRef.value && event.target instanceof Node && !iframeRef.value.contains(event.target)) {
    closeIframe()
  }
}
