export function captureException(error: any) {
  console.warn('Expected error - ', error)
}

export function capitalize(str: string) {
  const arr = str.split(' ')

  return arr.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export function getNumColumnsByWidth(width: number) {
  const [columns] = mappingColumnToSize.find(([, w]) => width >= w) ?? []
  return columns
}

const mappingColumnToSize: [number, number][] = [
  // padding left-right, min space between items, 200 * N
  [5, 24 * 2 + 10 * 4 + 1000],
  [4, 24 * 2 + 10 * 3 + 800],
  [3, 24 * 2 + 10 * 2 + 600],
  [2, 0],
]

export const formatSecondsTimer = (sec_num: number) => {
  let hours = Math.floor(sec_num / 3600)

  let minutes, seconds: string | number

  minutes = Math.floor((sec_num - hours * 3600) / 60)
  seconds = sec_num - hours * 3600 - minutes * 60

  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return minutes + ':' + seconds
}

export const getArrayOfField = <T extends Array<any>>(
  arr: T,
  fieldName: keyof T[number],
) => {
  return arr.map(a => a[fieldName])
}

export const getProductsCountString = (count: number) => {
  if (count > 4) {
    return `${count} товаров`
  } else if (count > 1) {
    return `${count} товара`
  } else {
    return `${count} товар`
  }
}

export const delay = (timeMS: number) => {
  return new Promise(resolve => setTimeout(() => resolve(''), timeMS))
}

export const longestStringInDoubleArr = (doubleArr: string[][]) => {
  let longest = ''
  for (let i = 0; i < doubleArr.length; i++) {
    for (let j = 0; j < doubleArr[i].length; j++) {
      if (
        typeof doubleArr[i][j] === 'string' &&
        doubleArr[i][j].length > longest.length
      ) {
        longest = doubleArr[i][j]
      }
    }
  }
  return longest
}
