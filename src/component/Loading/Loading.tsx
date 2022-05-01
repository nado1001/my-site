import type { FC } from 'react'

import styles from './Loading.module.css'

/**
 * @package
 */
export const Loading: FC = () => {
  return <div className={styles.loader} />
}
