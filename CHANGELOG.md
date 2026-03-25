# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-01-26

### Changed
- **Major refactoring**: Reorganized component structure into logic-based folders (`core/`, `modules/`, `composites/`)
- **Composite components**: Refactored all composite components into feature-specific folder structures with:
  - `utils/` folder for pure utility functions
  - `addons/` folder for supplementary React components
  - `index.tsx` for main component logic
  - `types.ts` for type definitions
- Enhanced `BasePopover` to support controlled state with `open` and `onOpenChange` props
- Exported `BasePopoverTrigger` and `BasePopoverContent` as separate components for fine-grained control
- Updated `BaseSelect` to support `disabled` prop
- Updated all composite components to use module components where applicable:
  - `DatePicker` and `DateTimePicker` now use `BasePopover` instead of core `Popover`
  - `TimePicker` addons now use `BaseSelect` instead of core `Select` primitives

### Fixed
- Fixed TypeScript errors in `ChartTooltipContent` component (type conflicts with Recharts Tooltip props)
- Fixed TypeScript errors in `BasePopover` component (children prop type narrowing)
- Removed unused `RechartsPrimitive` import from tooltip-content
- Fixed optional chaining for `item.payload` in chart tooltip

### Removed
- Removed `select-primitives.tsx` module (replaced with direct `BaseSelect` usage)
- Cleaned up old `ui/` and `reusable/` folders after migration

## [0.3.1] - 2026-01-26

### Added
- `Slider` component with support for single value, range, and vertical orientations
- `Progress` component with determinate and indeterminate states
- `Calendar` component built on react-day-picker v9 with single, range, and multiple date selection
- `DatePicker` component combining Calendar with Popover for dropdown date selection
- `TimePicker` component supporting 12-hour (AM/PM) and 24-hour formats
- `Combobox` component using Base UI for searchable dropdown functionality
- `BaseDateTimePicker` component combining date and time selection with support for single and range modes
- `BaseSearchableSelect` component providing searchable select functionality with Base UI Combobox
- React Cosmos fixtures for all new components (Slider, Progress, Calendar, DatePicker, TimePicker, DateTimePicker, SearchableSelect)

### Changed
- Updated Calendar component to use react-day-picker v9 class names (`weekdays`, `weekday`, `week` instead of `head_row`, `head_cell`, `row`)
- Improved Calendar navigation button positioning to appear at the top of the calendar header
- Improved Calendar day-of-week header alignment with proper flex layout
- Updated DatePicker to use Base UI's `render` prop pattern instead of `asChild` for PopoverTrigger
- Added `max-h-[200px]` to TimePicker SelectContent components for better scrollability
- Reset Slider thumb styling to simpler default appearance

### Fixed
- Fixed DatePicker nested button warning by using Base UI's `render` prop pattern
- Fixed Calendar layout issues with misaligned day-of-week headers
- Fixed Calendar navigation buttons appearing on the left side instead of top
- Fixed TimePicker dropdown height being too tall (now scrollable with max-height)
- Fixed Slider thumb positioning and cursor feedback

### Dependencies
- Added `react-day-picker` (^9.4.4) for calendar functionality
- Added `date-fns` (^3.6.0) for date formatting utilities

## [0.2.1] - 2026-01-26

### Changed
- Migrated all components from Radix UI to Base UI for better maintenance and improved API
- Tooltip arrow positioning now adapts to all sides (top, bottom, left, right)
- Improved tooltip arrow spacing (2px closer to content) for better visual connection

## [0.1.4] - 2026-01-26

### Changed
- Version bump and build fix

## [0.1.3] - 2026-01-26

### Changed
- Version bump

## [0.1.2] - 2026-01-26

### Added
- `BaseCard` component for simplified card usage with props-based API
- Smooth transitions for Modal, SideDrawer, and Popover components
- `tailwindcss-animate` plugin for animation support
- Duration classes for overlay animations in Dialog and Sheet components

### Fixed
- DialogOverlay ref forwarding issue (now uses `React.forwardRef`)
- Modal fixture to remove unused state variables
- Dialog and Tabs components reset to standard shadcn/ui styling
- BaseTab component reset to use standard horizontal tabs layout

### Changed
- Improved transition timing: Modal (500ms open, 300ms close), Popover (300ms open, 200ms close), SideDrawer (500ms open, 300ms close)
- Updated DialogContent to use `transition-all` for smoother animations
- Updated SheetContent to use `transition-all ease-in-out` for better transitions

## [0.1.1] - 2026-01-26

### Added
- `BaseModal` component export
- `BaseCard` component (simplified card API)
- Popover color to Tailwind config
- All shadcn/ui sub-components exported (CardHeader, CardTitle, DialogContent, etc.)
- Dark mode toggle in FixtureWrapper for Cosmos fixtures
- Comprehensive JSDoc documentation for all components

### Changed
- Renamed `BaseSheet` to `BaseSideDrawer` for clarity
- Renamed `BaseDialog` to `BaseConfirmation` for better naming
- Updated component naming conventions: Dialog → Modal, Sheet → SideDrawer
- Updated all exports to include all shadcn/ui sub-components
- Removed restrictive styling from reusable components (fixed widths, heights, gaps)
- Replaced hardcoded colors with theme colors in BaseForm error states
- Updated destructive color values for better visual appearance

### Fixed
- Dropdown menu transparency and sizing issues
- Missing `cn` utility import in BaseDropdown
- Missing `popover` color in Tailwind config
- React ref forwarding warnings for Input and Textarea components
- DOM nesting warning in BaseSheet (added `asChild` to SheetTrigger)
- BaseTab component to make image prop optional

### Removed
- Redundant AlertDialog fixture (BaseDialog/BaseConfirmation covers it)
- `react-router-dom` dependency from BaseDropdown (made router-agnostic)
- Custom color overrides (reset to default Tailwind colors)
- Fixed pixel values and restrictive styling from reusable components

## [0.1.0] - 2026-01-26

### Added
- Initial release of `@greg_retro/ui-library`
- Pure ESM library setup with Vite
- TypeScript support with declaration files
- React Cosmos integration for component development and documentation
- Tailwind CSS v3 with CSS variables for theming
- Comprehensive component library:

  **UI Components:**
  - Button (with multiple variants)
  - Card (with Header, Title, Description, Content, Footer, Action)
  - Input
  - Textarea
  - Label
  - Checkbox
  - Switch
  - Avatar
  - Dialog (with all sub-components)
  - AlertDialog (with all sub-components)
  - Popover
  - Select (with all sub-components)
  - Sheet (with all sub-components)
  - Tabs (with List, Trigger, Content)
  - Tooltip
  - DropdownMenu (with all sub-components)
  - Form (with Field, Control, Label, Description, Message)
  - Carousel
  - Table (with Header, Body, Footer, Row, Cell, Caption)
  - Toaster (toast notifications)
  - Chart (ChartContainer, ChartTooltip, ChartLegend)

  **Reusable Components:**
  - BaseCarousel
  - BasePopover
  - BaseSelect
  - BaseSideDrawer (formerly BaseSheet)
  - BaseTooltip
  - FormBase, FormField, FormFooter
  - BaseDropdown
  - BaseConfirmation (formerly BaseDialog)
  - BaseAvatar
  - BaseModal
  - BaseCard
  - BaseTab

- Utility function: `cn` (class name merger)
- React Cosmos fixtures for all components
- FixtureWrapper component for consistent fixture styling
- Dark mode support via `next-themes`
- JSDoc documentation for IntelliSense support

[Unreleased]: https://github.com/greg_retro/ui-library/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/greg_retro/ui-library/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/greg_retro/ui-library/compare/v0.2.1...v0.3.1
[0.2.1]: https://github.com/greg_retro/ui-library/compare/v0.1.4...v0.2.1
[0.1.4]: https://github.com/greg_retro/ui-library/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/greg_retro/ui-library/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/greg_retro/ui-library/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/greg_retro/ui-library/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/greg_retro/ui-library/releases/tag/v0.1.0
