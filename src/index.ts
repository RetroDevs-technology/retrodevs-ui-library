// Core Components - Basic UI primitives
export * from './components/core'

// Module Components - Simplified UI templates
export {
  BaseCarousel,
  BasePopover,
  BaseSelect,
  BaseSideDrawer,
  BaseTooltip,
  FormBase,
  FormField,
  FormFooter,
  BaseDropdown,
  BaseConfirmation,
  BaseAvatar,
  BaseModal,
  BaseCard,
  BaseTab,
  type ITabProps,
} from './components/modules'

// Composite Components - Complex multi-part features
export * from './components/composites'

// Adapter patterns (inject services / data from the host app)
export * from './components/adapters'

// Motion / animation helpers
export * from './components/animations'

// Hooks
export * from './lib/hooks'

// Utilities
export { cn } from './lib/utils'
