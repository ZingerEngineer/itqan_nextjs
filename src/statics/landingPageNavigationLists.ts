import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faWrench,
  faPlay,
  faFlaskVial,
  faFileLines,
  faPaperclip,
  faCheckCircle,
  faBook
} from '@fortawesome/free-solid-svg-icons'
export interface navigationItem {
  type?: 'link' | 'dropdown' | 'div'
  icon?: IconProp
  label: string
  href?: string
  navigationItemsChildren?: navigationItem[]
}

export const navigationItems: navigationItem[] = [
  {
    type: 'dropdown',
    icon: faWrench,
    label: 'Products',
    navigationItemsChildren: [
      {
        type: 'div',
        icon: faFlaskVial,
        label: 'APIs',
        navigationItemsChildren: [
          {
            type: 'link',
            icon: faFileLines,
            label: 'Assessments',
            href: '/products/assessments'
          },
          {
            type: 'link',
            icon: faPlay,
            label: 'Demo',
            href: '/products/test-demo'
          }
        ]
      },
      {
        type: 'div',
        icon: faPaperclip,
        label: 'Docs',
        navigationItemsChildren: [
          {
            type: 'link',
            icon: faCheckCircle,
            label: 'Terms',
            href: '/docs/terms'
          },
          {
            type: 'link',
            icon: faBook,
            label: 'Reference',
            href: '/docs/reference'
          }
        ]
      }
    ]
  },
  {
    type: 'link',
    label: 'About',
    href: '/about'
  },
  {
    type: 'link',
    label: 'Contact',
    href: '/contact'
  }
]
