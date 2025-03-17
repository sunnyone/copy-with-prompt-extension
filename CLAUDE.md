# Copy With Prompt - Development Guide

## Build & Lint Commands
- Build: `npm run compile`
- Watch mode: `npm run watch` 
- Lint: `npm run lint`
- Type check: `npm run check-types`
- Package: `npm run package`
- Run tests: `npm run test`
- Run single test: `npx @vscode/test-cli --extensionDevelopmentPath=. --extensionTestsPath=./out/test/suite/index --file=./out/test/suite/extension.test.js`

## Code Style Guidelines
- **Typescript**: Use strict type checking with ES2022 target
- **Naming**: camelCase for variables/functions, PascalCase for classes/interfaces
- **Indentation**: Use spaces, not tabs
- **Imports**: Order imports by type (VS Code API, then project files)
- **Curly braces**: Required for all control statements (enforced by linter)
- **Strict equality**: Use `===` and `!==` instead of `==` and `!=`
- **Error handling**: Use proper error messages with vscode.window.showErrorMessage
- **Semicolons**: Required at the end of statements
- **Line length**: Keep lines reasonably short for readability
- **Documentation**: Add comments for non-obvious functionality