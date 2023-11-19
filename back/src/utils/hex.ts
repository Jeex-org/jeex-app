export const normolizeHex = (hex: Buffer | number | string): string => {
  let resultHex = ''

  if (Buffer.isBuffer(hex)) {
    hex = hex.toString('hex')
  }

  if (typeof hex === 'number') {
    hex = hex.toString()
  }

  if (typeof hex === 'string') {
    resultHex = hex.toLowerCase()
  }

  if (resultHex.startsWith('0x')) {
    resultHex = resultHex.slice(2)
  }

  if (resultHex === '') {
    resultHex = '0'
  }

  const data = resultHex.length % 2 ? `0${resultHex}` : resultHex

  if (Buffer.from(data, 'hex')) {
    resultHex = data
  }

  if (!resultHex.startsWith('0x')) {
    resultHex = `0x${resultHex}`
  }

  return resultHex
}

export const isHexString = (hexStr: string): boolean => {
  const hexChars = '0123456789ABCDEFabcdefx'

  for (const char of hexStr) {
    if (hexChars.indexOf(char) === -1) {
      return false
    }
  }
  return true
}

export const bufferToHex = (b: Buffer | Uint8Array): string => {
  return '0x' + Buffer.from(b).toString('hex')
}

export const fixEvmHex = (hex: string): string | undefined => {
  if (hex.slice(2).length === 40) {
    return hex
  } else if (hex.slice(2).length === 38) {
    return `0x00${hex.slice(2)}`
  } else {
    return undefined
  }
}

export const hexToUint8Array32byte = (hex: string): Uint8Array => {
  const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex
  const length = 32 // Длина в байтах (32 байта = 64 символа)
  const paddedHex = hexWithoutPrefix.padStart(length * 2, '0')
  const uint8Array = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    const startIndex = i * 2
    const endIndex = startIndex + 2
    const byte = paddedHex.substring(startIndex, endIndex)
    uint8Array[i] = parseInt(byte, 16)
  }

  return uint8Array
}

export const hexToUint8Array = (hex: string): Uint8Array => {
  const hexWithoutPrefix = hex.startsWith('0x') ? hex.slice(2) : hex
  const length = hexWithoutPrefix.length / 2
  const uint8Array = new Uint8Array(length)

  for (let i = 0; i < length; i++) {
    const startIndex = i * 2
    const endIndex = startIndex + 2
    const byte = hexWithoutPrefix.substring(startIndex, endIndex)
    uint8Array[i] = parseInt(byte, 16)
  }

  return uint8Array
}
