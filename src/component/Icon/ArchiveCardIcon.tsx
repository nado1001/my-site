import { BookOpenIcon } from '@heroicons/react/outline'
import { CodeIcon, DesktopComputerIcon } from '@heroicons/react/solid'
import { VFC } from 'react'

type Props = {
  icon?: string
  className?: string
}

export const ArchiveCardIcon: VFC<Props> = (props) => {
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
