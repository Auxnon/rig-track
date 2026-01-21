# Contributing to RigTrack

Thank you for your interest in contributing to RigTrack! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/rig-track.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes thoroughly
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

Quick start:
```bash
npm install
cd ios && pod install && cd ..
npm run ios # or npm run android
```

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting (enforced by Prettier)
- Use ESLint rules defined in `.eslintrc.js`
- Write meaningful commit messages

### Running Linters
```bash
npm run lint
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Test on both iOS and Android when possible

```bash
npm test
```

## Pull Request Guidelines

- Keep PRs focused on a single feature or bug fix
- Update documentation for user-facing changes
- Include screenshots/videos for UI changes
- Reference related issues in PR description
- Ensure CI checks pass

## Code Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged

## Reporting Bugs

- Use GitHub Issues
- Include steps to reproduce
- Provide device/OS information
- Include screenshots if applicable
- Check if issue already exists

## Feature Requests

- Use GitHub Issues with "Feature Request" label
- Describe the problem you're trying to solve
- Suggest your proposed solution
- Be open to discussion

## License

By contributing, you agree that your contributions will be licensed under the ISC License.
