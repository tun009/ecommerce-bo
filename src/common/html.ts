export function handleAddClass(element: Element | null, className: string) {
  const isHasClass = element?.classList?.contains(className)
  if (!isHasClass) {
    element?.classList?.add(className)
  }
}

export function handleRemoveClass(element: Element | null, className: string) {
  const isHasClass = element?.classList?.contains(className)
  if (isHasClass) {
    element?.classList?.remove(className)
  }
}

export function hasClass(element: Element | null, className: string) {
  const isHasClass = element?.classList?.contains(className)
  return isHasClass
}

export function handleDownloadFile(url: string, nameFile = 'download') {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', nameFile)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function handleRedirectLink(url: string) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
