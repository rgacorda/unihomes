import type { Editor } from '@tiptap/core'
import type { MinimalTiptapProps } from './minimal-tiptap'

type Navigator = {
  userAgentData?: {
    brands: { brand: string; version: string }[]
    mobile: boolean
    platform: string
    getHighEntropyValues: (hints: string[]) => Promise<{
      platform: string
      platformVersion: string
      uaFullVersion: string
    }>
  }
  platform?: string
}

type ShortcutKeyResult = {
  symbol: string
  readable: string
}

export type FileError = {
  file: File | string
  reason: 'type' | 'size' | 'invalidBase64' | 'base64NotAllowed'
}

export type FileValidationOptions = {
  allowedMimeTypes: string[]
  maxFileSize?: number
  allowBase64: boolean
}

type FileInput = File | { src: string | File; alt?: string; title?: string }

// Platform detection
let isMac: boolean | undefined

const getPlatform = async (): Promise<string> => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    const nav = navigator as Navigator;

    if (nav.userAgentData?.platform) {
      return nav.userAgentData.platform;
    }

    // Using `getHighEntropyValues` on the client only, with async handling
    if (nav.userAgentData && nav.userAgentData.getHighEntropyValues) {
      const highEntropyValues = await nav.userAgentData.getHighEntropyValues(['platform']);
      return highEntropyValues.platform || '';
    }

    return nav.platform || '';
  }

  // Return a default value on the server
  return 'unknown';
};



export const isMacOS = async (): Promise<boolean> => {
  if (isMac === undefined) {
    const platform = await getPlatform();
    isMac = platform.toLowerCase().includes('mac');
  }
  return isMac;
}

// Shortcut key helpers
const shortcutKeyMap: Record<string, ShortcutKeyResult> = {
  mod: isMacOS() ? { symbol: '⌘', readable: 'Command' } : { symbol: 'Ctrl', readable: 'Control' },
  alt: isMacOS() ? { symbol: '⌥', readable: 'Option' } : { symbol: 'Alt', readable: 'Alt' },
  shift: isMacOS() ? { symbol: '⇧', readable: 'Shift' } : { symbol: 'Shift', readable: 'Shift' }
}

export const getShortcutKey = (key: string): ShortcutKeyResult =>
  shortcutKeyMap[key.toLowerCase()] || { symbol: key, readable: key }

export const getShortcutKeys = (keys: string[]): ShortcutKeyResult[] => keys.map(getShortcutKey)

// Editor output
export const getOutput = (editor: Editor, format: MinimalTiptapProps['output']) => {
  if (format === 'json') return editor.getJSON()
  if (format === 'html') return editor.getText() ? editor.getHTML() : ''
  return editor.getText()
}

// URL validation and sanitization
export const isUrl = (text: string, options?: { requireHostname: boolean; allowBase64?: boolean }): boolean => {
  if (text.match(/\n/)) return false

  try {
    const url = new URL(text)
    const blockedProtocols = ['javascript:', 'file:', 'vbscript:', ...(options?.allowBase64 ? [] : ['data:'])]

    if (blockedProtocols.includes(url.protocol)) return false
    if (options?.allowBase64 && url.protocol === 'data:') return /^data:image\/[a-z]+;base64,/.test(text)
    if (url.hostname) return true

    return (
      url.protocol !== '' &&
      (url.pathname.startsWith('//') || url.pathname.startsWith('http')) &&
      !options?.requireHostname
    )
  } catch {
    return false
  }
}

export const sanitizeUrl = (
  url: string | null | undefined,
  options?: { allowBase64?: boolean }
): string | undefined => {
  if (!url) return undefined

  if (options?.allowBase64 && url.startsWith('data:image')) {
    return isUrl(url, { requireHostname: false, allowBase64: true }) ? url : undefined
  }

  const isValidUrl = isUrl(url, { requireHostname: false, allowBase64: options?.allowBase64 })
  const isSpecialProtocol = /^(\/|#|mailto:|sms:|fax:|tel:)/.test(url)

  return isValidUrl || isSpecialProtocol ? url : `https://${url}`
}

// File handling
export async function blobUrlToBase64(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl)
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert Blob to base64'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const validateFileOrBase64 = <T extends FileInput>(
  input: File | string,
  options: FileValidationOptions,
  originalFile: T,
  validFiles: T[],
  errors: FileError[]
) => {
  const { isValidType, isValidSize } = checkTypeAndSize(input, options)

  if (isValidType && isValidSize) {
    validFiles.push(originalFile)
  } else {
    if (!isValidType) errors.push({ file: input, reason: 'type' })
    if (!isValidSize) errors.push({ file: input, reason: 'size' })
  }
}

const checkTypeAndSize = (input: File | string, { allowedMimeTypes, maxFileSize }: FileValidationOptions) => {
  const mimeType = input instanceof File ? input.type : base64MimeType(input)
  const size = input instanceof File ? input.size : atob(input.split(',')[1]).length

  const isValidType =
    allowedMimeTypes.length === 0 ||
    allowedMimeTypes.includes(mimeType) ||
    allowedMimeTypes.includes(`${mimeType.split('/')[0]}/*`)

  const isValidSize = !maxFileSize || size <= maxFileSize

  return { isValidType, isValidSize }
}

const base64MimeType = (encoded: string): string => {
  const result = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)
  return result && result.length ? result[1] : 'unknown'
}

const isBase64 = (str: string): boolean => {
  if (str.startsWith('data:')) {
    const matches = str.match(/^data:[^;]+;base64,(.+)$/)
    if (matches && matches[1]) {
      str = matches[1]
    } else {
      return false
    }
  }

  try {
    atob(str)
    return true
  } catch {
    return false
  }
}

export const filterFiles = <T extends FileInput>(files: T[], options: FileValidationOptions): [T[], FileError[]] => {
  const validFiles: T[] = []
  const errors: FileError[] = []

  files.forEach(file => {
    const actualFile = 'src' in file ? file.src : file

    if (actualFile instanceof File) {
      validateFileOrBase64(actualFile, options, file, validFiles, errors)
    } else if (typeof actualFile === 'string') {
      if (isBase64(actualFile)) {
        if (options.allowBase64) {
          validateFileOrBase64(actualFile, options, file, validFiles, errors)
        } else {
          errors.push({ file: actualFile, reason: 'base64NotAllowed' })
        }
      } else {
        validFiles.push(file)
      }
    }
  })

  return [validFiles, errors]
}
