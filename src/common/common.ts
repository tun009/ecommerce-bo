import { FilterResult } from '@/models'
import { numberFormatRegex } from './regex'

// format money with "," => ex: 100,000
export function formatNumberDot(num = 0) {
  if (num !== undefined) {
    return `${num.toString().replace(numberFormatRegex, '$1,')}`
  }
  return ''
}

export const scrollMouseHorizontal = (event: any, element: Element) => {
  event.preventDefault()
  element.scrollLeft += event?.deltaY
}

export function isEmptyObject(o: any) {
  return Object.keys(o).length === 0 && o.constructor === Object
}

export function deepEqualObject(object1: any, object2: any) {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = typeof val1 === 'object' && typeof val2 === 'object'
    if ((areObjects && !deepEqualObject(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false
    }
  }

  return true
}

export const cloneArray = <T>(data?: T[], isDefaultObjectWhenEmpty: boolean = true): T[] => {
  const length = data?.length ?? 0
  if (length > 0) return JSON.parse(JSON.stringify(data))
  if (!isDefaultObjectWhenEmpty) return []
  return [{} as T]
}

export const getRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(randomNumberLessThanOne() * characters.length))
  }
  return result
}

/**
 * Returns a pseudorandom number between 0 and 1.
 */
export const randomNumberLessThanOne = () => {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32
}

export const filterDuplicateField = <T>(arrays: T[], fieldNumber: number): FilterResult<T> => {
  const duplicateFields = new Set<string>()
  const invalidItems: T[] = []

  const validItems = arrays.filter((item) => {
    const fieldValue = (item as any[])[fieldNumber] // Assuming the items are arrays

    if (!duplicateFields.has(fieldValue)) {
      duplicateFields.add(fieldValue)
      return true
    } else {
      invalidItems.push(item)
      return false
    }
  })

  return {
    validItems,
    invalidItems
  }
}

/**
 * Converts an array of objects into an object, using specified keys.
 * If a key does not exist in an object, a default field value is used.
 *
 * @param array - The array of objects to convert.
 * @param keys - The keys to use when converting the objects.
 * @param defaultFieldValue - The default field value to use when a key does not exist.
 * @returns The converted object.
 */
export const convertArrayToObject = <T>(array: T[], keys: (keyof T)[], defaultFieldValue: string = ''): Record<string, any> => {
  return keys.reduce(
    (obj, key, idx) => {
      obj[String(key)] = (array[idx] || String(array[idx]) === '0' ? array[idx] : defaultFieldValue) as T[keyof T]
      return obj
    },
    {} as Record<string, T[keyof T]>
  )
}

export const convertNestedArraysToObject = <T>(array: T[][], keys: (keyof T)[], defaultFieldValue?: string): Record<string, any>[] => {
  const data: Record<string, T>[] = []

  array.forEach((item) => {
    if (item && item?.length > 0) {
      const converted = convertArrayToObject(item, keys, defaultFieldValue)
      data.push(converted)
    }
  })

  return data
}

export const getLastKeyByValue = (obj: Record<string, any>): string => {
  let lastKey: string = ''
  const hasOwnProperty = Object.prototype.hasOwnProperty

  for (const key in obj) {
    if (hasOwnProperty.call(obj, key) && !!obj[key]) {
      lastKey = key
    }
  }

  return lastKey ?? Object.keys(obj).pop()
}

export const formatTextLength = (currentLength: number | string, maxLength: number | string = 200) => {
  return `${currentLength}/${maxLength} bytes`
}

export function createEnumFromKeys<T extends Record<string, any>>(obj: T): { [K in keyof T]: K } {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[key as keyof T] = key as keyof T
      return acc
    },
    {} as { [K in keyof T]: K }
  )
}

export const convertDateLocalDateTime = (date?: string) => {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 19)
}

export const isAnyPropertyEmpty = (obj: Record<string, any>): boolean => {
  return Object.values(obj).some((value) => value === '' || value === null || value === undefined)
}
