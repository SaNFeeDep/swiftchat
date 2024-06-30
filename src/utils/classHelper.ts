/**
 * Собирает несколько классов в один, по логическим выражением.
 * @param obj
 * @returns
 */
export const classHelper = (
  obj: Record<string, boolean | undefined | null>
) => {
  const classList = Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) acc.push(key)

    return acc
  }, [] as string[])

  return classList.join(' ')
}
