# @retrodevs/ui-library

A modern, ESM-only React UI component library built with Vite, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Pure ESM** - Modern ES modules only, no CommonJS
- 📦 **Tree-shakeable** - Import only what you need
- 🎨 **Tailwind CSS** - Styled with Tailwind CSS and CSS variables
- 🧩 **Radix UI** - Built on accessible Radix UI primitives
- 📝 **TypeScript** - Fully typed with TypeScript
- 🎭 **React Cosmos** - Component development and documentation with Cosmos
- 🎯 **Zero Runtime** - No runtime dependencies for styling

## Installation

```bash
npm install @retrodevs/ui-library
```

### Peer Dependencies

This library requires React and React DOM as peer dependencies:

```bash
npm install react react-dom
```

## Usage

```tsx
import { Button, Card, Input } from '@retrodevs/ui-library'

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Enter text..." />
        </CardContent>
      </Card>
    </div>
  )
}
```

## Components

### UI Components

- **Button** - Versatile button component with multiple variants
- **Card** - Container component for content sections
- **Input** - Text input component
- **Avatar** - User avatar with image and fallback
- **Checkbox** - Checkbox input component
- **Switch** - Toggle switch component
- **Dialog** - Modal dialog component
- **AlertDialog** - Alert dialog component
- **Popover** - Popover component
- **Select** - Select dropdown component
- **Sheet** - Side sheet component
- **Tabs** - Tab navigation component
- **Tooltip** - Tooltip component
- **DropdownMenu** - Dropdown menu component
- **Form** - Form component with validation
- **Label** - Form label component
- **Textarea** - Textarea input component
- **Carousel** - Carousel component
- **Table** - Table component
- **Toaster** - Toast notification component
- **Chart** - Chart components (ChartContainer, ChartTooltip, etc.)

### Reusable Components

- **BaseCarousel** - Base carousel component
- **BasePopover** - Base popover component
- **BaseSelect** - Base select component
- **BaseSheet** - Base sheet component
- **BaseTooltip** - Base tooltip component
- **FormBase** - Base form component
- **FormField** - Form field component
- **FormFooter** - Form footer component
- **BaseDropdown** - Base dropdown component
- **BaseConfirmation** - Base confirmation dialog component
- **BaseAvatar** - Base avatar component

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install
```

### Build

```bash
# Build the library
npm run build
```

The build output will be in the `dist` directory:
- `dist/index.js` - ESM bundle
- `dist/index.d.ts` - TypeScript type definitions

### React Cosmos

This library uses React Cosmos for component development and documentation.

```bash
# Start Cosmos dev server
npm run cosmos
```

This will start the Cosmos UI at `http://localhost:5002` where you can:
- Browse and test all components
- View component fixtures
- Develop new components in isolation

### Linting

```bash
# Run ESLint
npm run lint
```

## Styling

This library uses Tailwind CSS with CSS variables for theming. To use the components in your project, you'll need to:

1. **Install Tailwind CSS** in your project (if not already installed)
2. **Import the CSS variables** - The library components use CSS variables for theming. You may need to configure your Tailwind setup to match the library's theme variables.

The library includes the following CSS variables:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--border`, `--input`, `--ring`
- And more...

## Publishing

This library is configured for npm publishing under the `@retrodevs` scope.

```bash
# Build the library
npm run build

# Publish to npm (requires npm login)
npm publish --access public
```

## Styles

Import the library’s base styles once in your app (after your Tailwind setup):

```ts
import "@retrodevs/ui-library/styles.css";
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
