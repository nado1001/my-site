import { BookOpenIcon } from '@heroicons/react/24/outline'
import {
  CheckCircleIcon,
  CodeBracketIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/solid'
import { FC } from 'react'

type Props = {
  icon?: string | null
  className?: string
}

export const ArchiveCardIcon: FC<Props> = (props) => {
  const { icon, className } = props
  switch (icon) {
    case 'code':
      return <CodeBracketIcon className={className} />

    case 'pc':
      return <ComputerDesktopIcon className={className} />

    case 'check':
      return <CheckCircleIcon className={className} />

    default:
      return <BookOpenIcon className={className} />
  }
}
