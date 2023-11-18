export const removeDuplicatesByField = <T>(arr: T[], field: keyof T): T[] => {
  const uniqueMap = new Map<T[keyof T], T>()

  arr.forEach((item) => {
    const fieldValue = item[field]
    uniqueMap.set(fieldValue, item)
  })

  return Array.from(uniqueMap.values())
}
