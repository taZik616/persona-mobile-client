type MyObjectType = {
  // Другие поля вашего объекта
  [name: string]: any
}

type GroupedObjectType = {
  title: string
  data: MyObjectType[]
}

export function groupByAlphabetical<T>(
  objects: T,
  paramForGroup: string,
  mapParams?: (obj: T) => any,
): {
  title: string
  data: any
}[] {
  if (!Array.isArray(objects))
    throw new Error('prop "objects" must be a string')
  const groupedObjects: {[key: string]: MyObjectType[]} = {}

  // Группировка объектов по первой букве поля 'name'
  for (const obj of objects) {
    const firstLetter = obj[paramForGroup][0].toUpperCase()
    if (!groupedObjects[firstLetter]) {
      groupedObjects[firstLetter] = []
    }
    groupedObjects[firstLetter].push(mapParams ? mapParams(obj) : obj)
  }

  // Преобразование группированных объектов в массив объектов с полями 'title' и 'data'
  const result: GroupedObjectType[] = []
  for (const letter in groupedObjects) {
    result.push({
      title: letter,
      data: groupedObjects[letter],
    })
  }

  return result as any
}
