import { BookOpenIcon } from '@heroicons/react/outline'
import { CodeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import { FC } from 'react'

type Props = {
  icon?: string | null
  className?: string
}

export const ArchiveCardIcon: FC<Props> = (props) => {
  const { icon, className } = props
  switch (icon) {
    case 'code':
      return <CodeIcon className={className} />

    case 'pc':
      return <DesktopComputerIcon className={className} />

    default:
      return <BookOpenIcon className={className} />
  }
}
