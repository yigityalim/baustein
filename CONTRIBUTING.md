# Contributing to Baustein

Thank you for considering contributing to Baustein! 🧱

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Features

Feature requests are welcome! Please:

- Check if the feature already exists or is planned
- Explain the use case clearly
- Consider if it fits A1.1 learning scope
- Provide examples if possible

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yigityalim/baustein.git
   cd baustein
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Write meaningful commit messages
   - Test your changes locally

4. **Run linter**
   ```bash
   pnpm lint
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add new vocabulary category system"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Describe what you changed and why
   - Link related issues if any
   - Add screenshots for UI changes

## Code Style

- **TypeScript** - Use proper types, avoid `any`
- **Components** - Use Server Components by default
- **Actions** - Use Server Actions for mutations
- **Formatting** - We use Biome (runs automatically)
- **Naming** - Use descriptive names for variables/functions

## Commit Convention

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add verb conjugation practice mode
fix: article game not loading on mobile
docs: update setup instructions in README
```

## Project Philosophy

Remember the core principle:

> "The goal is to learn German A1.1, not to build the perfect app."

**Priorities:**
- ✅ Features that help learn A1.1 German
- ✅ Simple, focused functionality
- ✅ Manual data entry (typing reinforces learning)
- ❌ Over-engineering
- ❌ Features beyond A1.1 scope

## What to Contribute

**High-value contributions:**
- German vocabulary lists (JSON format)
- Bug fixes
- A1.1 practice modes (verb conjugation, etc.)
- UI/UX improvements
- Documentation improvements
- Accessibility improvements

**Please avoid:**
- Adding A1.2+ features before A1.1 is complete
- Major architectural changes without discussion
- New dependencies without good reason

## Questions?

Feel free to open an issue for discussion before starting work on major features.

Thank you for helping make German learning better for developers! 🙏
