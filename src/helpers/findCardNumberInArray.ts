export const findCardNumberInArray = (arr: string[]) => {
  const trimmed = arr.map(replaceSpaces)

  const filtered = trimmed.filter((it: string) => it.length % 4 === 0)

  return filtered.find(item => item.length === 16 && hasHalfDigits(item))
}

const replaceSpaces = (str: string) => str.replaceAll(/[\s_\-—]/g, '')

function hasHalfDigits(input: string) {
  const digitRegex = /\d/g
  const digitMatches = input.match(digitRegex)
  const digitCount = digitMatches ? digitMatches.length : 0
  const halfStringLength = Math.ceil(input.length / 2)

  return digitCount >= halfStringLength
}
