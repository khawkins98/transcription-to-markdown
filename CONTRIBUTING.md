# 🤝 Contributing to Transcription to Markdown Converter

Thank you for your interest in contributing to this project! We welcome contributions from everyone, whether you're fixing bugs, adding features, improving documentation, or helping with testing.

## 🌟 Ways to Contribute

### 🐛 Bug Reports

- Found a bug? Please check existing issues first
- Use the bug report template
- Include steps to reproduce, expected vs actual behavior
- Add screenshots or error messages if applicable

### ✨ Feature Requests

- Suggest new features or improvements
- Use the feature request template
- Explain the use case and potential implementation
- Consider if it aligns with the project's goals

### 📝 Documentation

- Fix typos or unclear instructions
- Add usage examples or tutorials
- Improve API documentation
- Update outdated information

### 🔧 Code Contributions

- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test coverage improvements

## 🚀 Getting Started

### Prerequisites

- **Node.js 14+** for development dependencies
- **Modern web browser** for testing
- **Git** for version control
- **Text editor** (VS Code recommended)

### Development Setup

1. **Fork the repository**

   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/transcription-to-markdown.git
   cd transcription-to-markdown
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📋 Development Guidelines

### Code Style

- Use **vanilla JavaScript** (no frameworks)
- Follow **ES6+** syntax where supported
- Use **meaningful variable and function names**
- Add **JSDoc comments** for functions
- Maintain **consistent indentation** (2 spaces)

### File Organization

```
public/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # All styles (organized by sections)
├── js/
│   └── app.js         # All JavaScript (organized by functionality)
└── sample.json        # Example test file
```

### Coding Standards

#### JavaScript

```javascript
/**
 * Function description
 * @param {Type} param - Parameter description
 * @returns {Type} Return value description
 */
function exampleFunction(param) {
  // Use camelCase for variables and functions
  const localVariable = processData(param);

  // Use descriptive names
  const isValidTranscript = validateTranscribeFormat(data);

  // Use early returns for better readability
  if (!isValidTranscript) {
    return { error: "Invalid format" };
  }

  return processedResult;
}
```

#### CSS

```css
/* Use BEM-style naming */
.component-name {
  /* Properties */
}

.component-name__element {
  /* Element styles */
}

.component-name--modifier {
  /* Modifier styles */
}

/* Group related styles together */
/* ===== SECTION NAME ===== */
```

#### HTML

```html
<!-- Use semantic HTML5 elements -->
<section class="upload-section" id="upload-section">
  <div class="upload-zone" id="upload-zone">
    <!-- Descriptive content -->
  </div>
</section>

<!-- Include accessibility attributes -->
<button class="btn btn--primary" aria-label="Upload transcription file">
  Upload File
</button>
```

### Testing Requirements

Before submitting a PR, ensure:

#### Functionality Testing

- [ ] File upload works (drag & drop and browse)
- [ ] JSON parsing handles various formats correctly
- [ ] Speaker detection and labeling works
- [ ] All formatting options function properly
- [ ] Copy to clipboard works across browsers
- [ ] File download generates correct filenames
- [ ] Error handling displays appropriate messages

#### Browser Testing

- [ ] **Chrome** (latest 2 versions)
- [ ] **Firefox** (latest 2 versions)
- [ ] **Safari** (latest 2 versions)
- [ ] **Edge** (latest 2 versions)

#### Device Testing

- [ ] **Desktop** (various screen sizes)
- [ ] **Tablet** (landscape and portrait)
- [ ] **Mobile** (various screen sizes)

#### Accessibility Testing

- [ ] **Keyboard navigation** works completely
- [ ] **Screen reader** compatibility
- [ ] **High contrast** mode support
- [ ] **Reduced motion** preference respected

### Performance Considerations

- **File Size**: Test with files up to 10MB
- **Memory Usage**: Monitor browser memory consumption
- **Processing Speed**: Ensure responsive UI during processing
- **Mobile Performance**: Test on slower devices

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes**

   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test thoroughly**

   - Run through testing checklist
   - Test on multiple browsers and devices
   - Verify accessibility compliance

4. **Commit your changes**
   ```bash
   # Use conventional commit format
   git commit -m "feat: add timestamp formatting options"
   git commit -m "fix: resolve speaker detection issue"
   git commit -m "docs: update usage examples"
   ```

### PR Requirements

Your pull request should include:

- [ ] **Clear description** of changes made
- [ ] **Screenshots** for UI changes
- [ ] **Testing evidence** (which browsers/devices tested)
- [ ] **Documentation updates** if applicable
- [ ] **No breaking changes** (or clearly marked)

### PR Template

```markdown
## Description

Brief description of changes made.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing

- [ ] Tested on Chrome, Firefox, Safari, Edge
- [ ] Tested on mobile devices
- [ ] Tested accessibility features
- [ ] All existing functionality still works

## Screenshots (if applicable)

Include before/after screenshots for UI changes.

## Additional Notes

Any additional information or context.
```

## 🎯 Priority Areas

We especially welcome contributions in these areas:

### High Priority

- **🐛 Bug fixes** for reported issues
- **♿ Accessibility** improvements
- **📱 Mobile experience** enhancements
- **🧪 Test coverage** expansion

### Medium Priority

- **🌐 Internationalization** (i18n) support
- **🎨 UI/UX** improvements
- **⚡ Performance** optimizations
- **📚 Documentation** improvements

### Future Features

- **🔧 Additional transcription formats** (Google, Azure, etc.)
- **📊 Advanced analytics** features
- **🎛️ More formatting options**
- **💾 Export formats** (PDF, DOCX)

## 🏆 Recognition

Contributors will be:

- **Listed in README** acknowledgments
- **Mentioned in release notes** for significant contributions
- **Invited to become maintainers** for consistent, valuable contributions

## ❓ Questions?

### Getting Help

- **GitHub Discussions**: For questions about contributing
- **GitHub Issues**: For bug reports and feature requests
- **Email**: maintainers@transcription-to-markdown.com

### Resources

- [MDN Web Docs](https://developer.mozilla.org/) - Web API reference
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 📜 Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team. All complaints will be reviewed and investigated promptly and fairly.

## 🙏 Thank You!

Every contribution, no matter how small, makes this project better. We appreciate your time and effort in helping improve the Transcription to Markdown Converter!

---

**Happy Contributing! 🚀**
