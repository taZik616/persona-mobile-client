import {NUM_PRECISION} from 'src/variables/common'

export function cleanNumber(number: string | number, delimiter = ' ') {
  const num = parseFloat(String(number).trim().replace(/ /g, ''))
  let precision = NUM_PRECISION
  if (num < 1 / Math.pow(10, NUM_PRECISION)) {
    precision += 1
  }

  const prec = Math.pow(10, precision)

  const raw = Math.floor(num * prec) / prec
  const [a, f] = String(raw.toFixed(precision)).split('.')
  const aFormatted = a.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
  return `${aFormatted}.${f}`
}

// console.log(cleanNumber(12345.6789)); // Output: "12 345.68"
// console.log(cleanNumber(9876.54321)); // Output: "9 876.54"
// console.log(cleanNumber(0.123456789)); // Output: "0.12"
// console.log(cleanNumber(0.00123456789)); // Output: "0.0012"
// console.log(cleanNumber(123456789, ',')); // Output: "123,456,789.00"
// console.log(cleanNumber(9876.54321, '.')); // Output: "9.876.54"
