import { IconProp } from '@fortawesome/fontawesome-svg-core'

// Example: 'faUser', 'faCoffee', 'faHome', etc.
function transformToIconProp(iconName: string): IconProp {
  // Ensure the Font Awesome icon name starts with 'fa', as they usually do
  if (!iconName.startsWith('fa')) {
    throw new Error('Invalid Font Awesome icon name')
  }
  return iconName as IconProp
}

export default transformToIconProp
