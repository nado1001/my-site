import useSWRImmutable from 'swr/immutable'

/**
 * @package
 *
 * @param {string} key -ステート毎に所持するキー
 * @param {any} fallbackData -ステートの初期値
 */
export const useStaticSWR = (key: string, fallbackData: any) => {
  const { data, mutate } = useSWRImmutable(key, { fallbackData })
  return [data, mutate]
}
