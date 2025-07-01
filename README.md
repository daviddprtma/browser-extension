# BrowsePing Browser Extension

A simple web browser extension built with React, TypeScript, Webpack and Tailwind CSS that socializes your browsing experience.

## Technologies

- React
- TypeScript
- Tailwind CSS
- Webpack

## Installation

```bash
# Install dependencies
npm install

# Build the extension for development
npm run dev
```

## Scripts

The project includes the following npm scripts:

- **npm run dev**: Runs webpack in watch mode for development. This continuously rebuilds the extension as you make changes to the code, making it ideal for development.

- **npm run build**: Builds the extension for production. This creates optimized files in the `dist` directory ready for distribution.

## Development Workflow

1. Run `npm run dev` to start the development build process
2. Load the extension from the `dist` folder into your browser:
   - Open Chrome/Edge and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `dist` directory

After making changes to the code, the extension will automatically rebuild. You may need to reload the extension in your browser to see changes.