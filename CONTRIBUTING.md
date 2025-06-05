# 🤝 Contributing to the Transcription Converter

Want to help make this tool even better? You've come to the right place—whether you're fixing a typo, adding a killer feature, or just suggesting improvements, every contribution makes this project more useful for everyone.

**You'll learn**: How to contribute effectively, from reporting bugs to submitting code changes, plus all the technical details you need to get started.

**This assumes**: You're comfortable with basic Git workflows and want to help improve a tool that thousands of people use.

## 🌟 Ways You Can Help (Pick Your Adventure)

### 🐛 Found a Bug? Let's Squash It

Nothing's more frustrating than software that doesn't work as expected:

- **Check existing issues first** (someone might have beat you to it)
- **Use our bug report template** for faster resolution
- **Include reproduction steps** that actually work
- **Add screenshots or error messages** if you've got them

### ✨ Got a Feature Idea? We Want to Hear It

The best features come from real user needs:

- **Use the feature request template** to organize your thoughts
- **Explain the use case** (why would someone want this?)
- **Consider implementation complexity** (simple wins get built faster)
- **Make sure it aligns** with our goal of keeping the tool simple and focused

### 📝 Documentation Could Be Clearer? Fix It

Good docs are the unsung heroes of open source:

- **Fix typos or unclear instructions** (your future self will thank you)
- **Add usage examples** for confusing features
- **Improve API documentation** with better explanations
- **Update outdated information** when you spot it

### 🔧 Ready to Write Some Code?

The fun stuff—making the tool actually better:

- **Bug fixes** (always welcome)
- **Performance improvements** (faster is better)
- **New features** (after discussing in an issue first)
- **Code refactoring** (cleaner code makes everyone happy)
- **Test coverage** (because bugs are the worst)

## 🚀 Getting Your Development Environment Ready

### What You'll Need

- **Node.js 14+** for the development dependencies
- **A modern web browser** for testing (Chrome, Firefox, Safari, Edge)
- **Git** for version control (obviously)
- **Your favorite text editor** (VS Code works great, but use whatever makes you productive)

### Set Up Your Workspace

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/transcription-to-markdown.git
cd transcription-to-markdown

# Install dependencies (there aren't many)
npm install

# Start the development server
npm start

# Open your browser and start tinkering
open http://localhost:8000
```

## 📋 Code Style That Won't Make Me Cry

### JavaScript Standards

We keep it simple with vanilla JavaScript—no frameworks, no unnecessary complexity:

```javascript
/**
 * Write clear function descriptions
 * @param {string} transcriptData - What this parameter does
 * @returns {object} What gets returned and why
 */
function parseTranscriptData(transcriptData) {
  // Use camelCase for variables and functions
  const parsedSegments = extractSpeakerSegments(transcriptData);

  // Use descriptive names (no mystery variables)
  const isValidTranscript = validateTranscribeFormat(data);

  // Early returns make code easier to follow
  if (!isValidTranscript) {
    return { error: "Invalid format" };
  }

  // Return something useful
  return processedResult;
}
```

### CSS Organization

We use a modified BEM approach to keep styles manageable:

```css
/* Use descriptive class names */
.transcript-upload {
  /* Component styles */
}

.transcript-upload__drop-zone {
  /* Element styles */
}

.transcript-upload--active {
  /* Modifier styles */
}

/* Group related styles together */
/* ===== UPLOAD SECTION ===== */
```

### HTML That Makes Sense

Semantic HTML5 with accessibility in mind:

```html
<!-- Use proper semantic elements -->
<section class="upload-section" id="upload-section">
  <div class="upload-zone" id="upload-zone">
    <!-- Content that describes itself -->
  </div>
</section>

<!-- Always include accessibility attributes -->
<button class="btn btn--primary" aria-label="Upload transcription file">
  Upload File
</button>
```

## 🧪 Testing Your Changes (Please!)

Before you submit a pull request, run through this checklist:

### Core Functionality

- [ ] **File upload** works with drag & drop and file browser
- [ ] **JSON parsing** handles various Amazon Transcribe formats correctly
- [ ] **Speaker detection** identifies speakers and labels them properly
- [ ] **Formatting options** all function as expected
- [ ] **Copy to clipboard** works across different browsers
- [ ] **File download** generates sensible filenames
- [ ] **Error handling** shows helpful messages instead of crashing

### Browser Compatibility

Test in at least these browsers (you don't need every version, just recent ones):

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)

### Device Testing

Make sure it works on different screen sizes:

- [ ] **Desktop** (various window sizes)
- [ ] **Tablet** (both orientations)
- [ ] **Mobile** (test on actual devices if possible)

### Accessibility Testing

This matters more than you might think:

- [ ] **Keyboard navigation** works completely (try using just your keyboard)
- [ ] **Screen reader** compatibility (test with your OS screen reader)
- [ ] **High contrast** mode doesn't break the layout
- [ ] **Reduced motion** settings are respected

### Performance Considerations

Keep the tool fast and responsive:

- **Large files**: Test with Amazon Transcribe files up to 10MB
- **Memory usage**: Check browser memory consumption with large files
- **Processing speed**: UI should stay responsive during file processing
- **Mobile performance**: Test on slower devices when possible

## 🔄 Submitting Your Changes

### Before You Submit

1. **Create a descriptive branch name**

   ```bash
   git checkout -b feature/add-speaker-name-mapping
   # or
   git checkout -b fix/timestamp-calculation-bug
   ```

2. **Make focused commits**

   ```bash
   # Use conventional commit format (makes everyone's life easier)
   git commit -m "feat: add custom speaker name mapping"
   git commit -m "fix: resolve incorrect timestamp calculations"
   git commit -m "docs: update examples with new formatting options"
   ```

3. **Test everything thoroughly** (seriously, this saves everyone time later)

4. **Update documentation** if you've changed how something works

### Pull Request Checklist

Your PR should include:

- [ ] **Clear description** of what changed and why
- [ ] **Screenshots** for any UI changes (before/after is best)
- [ ] **Testing notes** (which browsers and devices you tested)
- [ ] **Documentation updates** if functionality changed
- [ ] **No breaking changes** (or clearly marked if unavoidable)

### PR Template

```markdown
## What This Changes

Brief explanation of the changes and why they're needed.

## Type of Change

- [ ] Bug fix (fixes an issue without changing existing functionality)
- [ ] New feature (adds functionality without breaking existing features)
- [ ] Documentation update (improves or corrects documentation)
- [ ] Performance improvement (makes things faster without changing functionality)
- [ ] Code refactoring (improves code quality without changing functionality)

## How I Tested This

- [ ] Tested on Chrome, Firefox, Safari, and Edge
- [ ] Tested on mobile devices
- [ ] Verified accessibility features work
- [ ] Confirmed all existing functionality still works

## Screenshots (if relevant)

Include before/after screenshots for UI changes.

## Additional Context

Anything else reviewers should know.
```

## 🎯 Areas Where We Especially Need Help

### High Priority (The Stuff That Really Matters)

- **🐛 Bug fixes** for any reported issues
- **♿ Accessibility improvements** (making the web better for everyone)
- **📱 Mobile experience** enhancements (more people use phones than desktops now)
- **🧪 Test coverage** expansion (catch bugs before users do)

### Medium Priority (Nice to Have)

- **🌐 Internationalization** support (help non-English speakers)
- **🎨 UI/UX improvements** (make it prettier and easier to use)
- **⚡ Performance optimizations** (faster is always better)
- **📚 Documentation improvements** (clear docs help everyone)

### Future Features (Dream Big)

- **🔧 Additional transcription formats** (Google Speech-to-Text, Azure Speech, etc.)
- **📊 Advanced analytics** features (speaker analytics, conversation insights)
- **🎛️ More formatting options** (custom templates, advanced styling)
- **💾 Additional export formats** (PDF, DOCX, etc.)

## 🏆 Recognition for Your Efforts

Contributors get the recognition they deserve:

- **README acknowledgments** for all contributors
- **Release notes mentions** for significant contributions
- **Maintainer invitations** for consistent, valuable contributors
- **Our eternal gratitude** for making this tool better for everyone

## ❓ Need Help or Have Questions?

### Getting Unstuck

- **GitHub Discussions**: Perfect for questions about contributing or implementation ideas
- **GitHub Issues**: The place for bug reports and specific feature requests
- **Email**: maintainers@transcription-to-markdown.com for anything else

### Useful Resources

- **[MDN Web Docs](https://developer.mozilla.org/)**: The best reference for web APIs
- **[Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)**: Make the web accessible to everyone
- **[Conventional Commits](https://www.conventionalcommits.org/)**: Write commit messages that make sense

## 📜 Code of Conduct (The Golden Rule, Expanded)

### Our Promise

We're committed to making this project welcoming for everyone, regardless of experience level, background, or any other characteristic. This is about building something useful together.

### What We Expect

- **Be kind and respectful** in all interactions
- **Welcome newcomers** and help them get started
- **Give constructive feedback** that helps people improve
- **Focus on the code and ideas**, not the person
- **Assume good intentions** when someone makes a mistake

### What We Won't Tolerate

- **Personal attacks** or harassment of any kind
- **Discriminatory language** or behavior
- **Trolling or deliberately disruptive behavior**
- **Publishing private information** without permission
- **Anything that makes people feel unwelcome**

### Enforcement

If someone's behavior is making the project unwelcoming, contact the maintainers. We'll investigate promptly and take appropriate action to keep this a place where everyone can contribute effectively.

---

Contributing to open source can feel intimidating at first, but remember that every expert was once a beginner. Whether you're fixing your first typo or submitting your hundredth feature, you're helping make transcription more accessible for everyone. Thanks for being part of this project—your contributions, no matter how small, make a real difference!

**Ready to dive in?** Start by browsing the [open issues](https://github.com/username/transcription-to-markdown/issues) or just explore the code to see what catches your interest. The best contributions come from scratching your own itch!
