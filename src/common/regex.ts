export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex =
  /^(?=.*[a-zA-Z_.-])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\\.])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\\._.-]+$/
export const numberFormatRegex = /(\d)(?=(\d{3})+(?!\d))/g
export const phoneFormatRegex = /(\d)(?=(\d{4})+(?!\d))/g
export const numberRegex = /^[0-9]$/i
export const strippedHtmlEditorRegex = /(<([^>]+)>)/gi
export const stringFormatNumber = /\D/g
export const phoneWithCharacterRegex = /^[0-9-]+$/
export const bnameRegex = /[동|로|가]$/
export const spaceMatchRegex = /\s+/g
export const emailRegisterRegex = /^[a-zA-Z]{1}[a-zA-Z0-9_-]{4,19}/
export const phoneNumberRegex = /^\d(-?\d){10}$/
export const YYYYMMDD_Regex = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
export const hyphenRegex = /-/g
export const dayFormatRegex = /^(\d{4})(\d{2})(\d{2})$/
export const dayGroupFormatWithHyphen = "$1-$2-$3"
export const atSplitString = '@'
