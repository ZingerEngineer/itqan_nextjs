import {
  faClipboardList,
  faUsers,
  faBookOpen,
  IconDefinition,
  faUserPen,
  faPen,
  faBurger,
  faList
} from '@fortawesome/free-solid-svg-icons'

export interface sideBarNavTab {
  accessRoles: string[]
  type: 'link' | 'dropdown'
  label: string
  href?: string
  icon?: IconDefinition
  tabChildren?: sideBarNavTab[]
}

export const sideBarNavTabs: sideBarNavTab[] = [
  {
    accessRoles: ['super-admin', 'hr'],
    type: 'dropdown',
    label: 'Assessments',
    icon: faClipboardList,
    tabChildren: [
      {
        accessRoles: ['super-admin', 'hr'],
        type: 'link',
        label: 'New Assessment',
        href: '/assessments/create',
        icon: faPen
      },
      {
        accessRoles: ['super-admin', 'hr'],
        type: 'link',
        label: 'Assessment List',
        href: '/assessments',
        icon: faList
      }
    ]
  },
  {
    accessRoles: ['super-admin'],
    type: 'link',
    label: 'Contacts',
    icon: faUserPen,
    href: '/contacts'
  },
  {
    accessRoles: ['super-admin', 'hr'],
    type: 'link',
    label: 'Candidates',
    icon: faUsers,
    href: '/candidates'
  },
  {
    accessRoles: ['super-admin'],
    type: 'dropdown',
    label: 'Library',
    icon: faBookOpen,
    tabChildren: [
      {
        accessRoles: ['super-admin'],
        type: 'link',
        label: 'Item 1',
        href: '/item-1'
      },
      {
        accessRoles: ['super-admin'],
        type: 'link',
        label: 'Item 2',
        href: '/item-2'
      }
    ]
  }
]
