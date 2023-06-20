export const hexColorWithOpacity = (hexColor: string, opacity: number) => {
  const color = hexColor.replace('#', '')

  const red = parseInt(color.substring(0, 2), 16)
  const green = parseInt(color.substring(2, 4), 16)
  const blue = parseInt(color.substring(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}
