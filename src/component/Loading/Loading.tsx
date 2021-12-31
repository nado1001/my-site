import type { VFC } from 'react'

import styles from './Loading.module.css'

/**
 * @package
 */
export const Loading: VFC = () => {
  return <div className={styles.loader} />
}
