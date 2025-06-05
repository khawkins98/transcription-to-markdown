# 📝 Transcription to Markdown Converter

A powerful, user-friendly web application that converts Amazon Transcribe JSON files into beautifully formatted markdown documents. Perfect for content creators, journalists, researchers, and anyone who needs to transform speech-to-text output into readable, professional documentation.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

## 🌟 Features

### Core Functionality

- **📄 Amazon Transcribe Support**: Full compatibility with AWS Transcribe JSON output
- **🎤 Multi-Speaker Recognition**: Automatic speaker detection and labeling
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🚀 Real-time Processing**: Instant conversion with live preview
- **💾 Multiple Export Options**: Copy to clipboard or download as .md file

### Advanced Formatting Options

- **🎛️ Interactive Controls**: Comprehensive formatting customization panel
- **📋 Format Presets**: Quick-apply templates (Minimal, Detailed, Meeting, Conversation)
- **⏱️ Timestamp Integration**: Optional speaker timestamps and duration tracking
- **📊 Statistics**: Word count, duration, and speaker analytics
- **🎨 Multiple Styles**: Customizable headers, paragraphs, and title formats

### User Experience

- **🎯 Drag & Drop**: Intuitive file upload interface
- **⚡ No Server Required**: 100% client-side processing for privacy and speed
- **🔒 Privacy First**: Your files never leave your device
- **♿ Accessible**: Full keyboard navigation and screen reader support
- **🌙 Dark Mode**: Automatic dark mode support

## 🚀 Quick Start

### Online Version

Visit the live application: **[khawkins98.github.io/transcription-to-markdown](https://khawkins98.github.io/transcription-to-markdown)**

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/username/transcription-to-markdown.git
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

## 📖 Usage Guide

### Step 1: Upload Your File

- **Drag & Drop**: Simply drag your Amazon Transcribe JSON file onto the upload zone
- **Browse**: Click "Browse Files" to select your file from the file system
- **Supported Format**: `.json` files from Amazon Transcribe (up to 10MB)

### Step 2: Customize Formatting (Optional)

Click **⚙️ Formatting Options** to access advanced controls:

#### Style Presets

- **Default**: Standard interview format with metadata
- **Minimal**: Clean, simple output with no extras
- **Detailed**: Full features with timestamps and statistics
- **Meeting**: Professional meeting notes format
- **Conversation**: Casual chat-style formatting

#### Individual Controls

- **Title Style**: Interview Transcript, Transcript, Conversation, Meeting Notes
- **Speaker Style**: ## Header 2, ### Header 3, **Bold:**
- **Include Timestamps**: Add time markers to speaker sections
- **Word Count & Duration**: Show transcript statistics
- **Paragraph Length**: Adjust sentences per paragraph (2-6)

### Step 3: Export Your Markdown

- **📋 Copy to Clipboard**: One-click copying for immediate use
- **💾 Download**: Save as a `.md` file with automatic naming
- **👀 Live Preview**: Real-time markdown preview with syntax highlighting

## 💡 Examples

### Input: Amazon Transcribe JSON

```json
{
  "jobName": "customer-interview-2024",
  "status": "COMPLETED",
  "results": {
    "transcripts": [
      {
        "transcript": "Hello thank you for calling. How can I help you today? Hi I'm having trouble with my account."
      }
    ],
    "speaker_labels": {
      "segments": [
        {
          "start_time": "0.0",
          "end_time": "3.5",
          "speaker_label": "spk_0",
          "items": [...]
        },
        {
          "start_time": "4.0",
          "end_time": "7.2",
          "speaker_label": "spk_1",
          "items": [...]
        }
      ]
    }
  }
}
```

### Output: Formatted Markdown

#### Default Format

```markdown
# Interview Transcript: Customer Interview 2024

<!-- Generated on 2024-01-15T10:30:00.000Z -->
<!-- Status: COMPLETED -->
<!-- 2 speakers detected -->

## Speaker 1

Hello thank you for calling. How can I help you today?

## Speaker 2

Hi I'm having trouble with my account.

---

_Transcript generated automatically from Amazon Transcribe output_
```

#### Meeting Format with Timestamps

```markdown
# Meeting Notes: Customer Interview 2024

## Summary

**Word Count:** 15
**Duration:** 0:07
**Speakers:** 2

---

### Speaker 1 (0:00 - 0:03)

Hello thank you for calling. How can I help you today?

### Speaker 2 (0:04 - 0:07)

Hi I'm having trouble with my account.
```

## 🛠️ Technical Details

### Architecture

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Processing**: 100% client-side with Web APIs
- **Dependencies**: Zero runtime dependencies
- **Compatibility**: Modern browsers (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)

### Amazon Transcribe Compatibility

Supports all standard Amazon Transcribe features:

- ✅ Speaker identification (`speaker_labels`)
- ✅ Word-level timestamps (`items`)
- ✅ Confidence scores
- ✅ Punctuation and capitalization
- ✅ Job metadata (name, status, account ID)

### Performance

- **File Size**: Handles transcripts up to 10MB
- **Processing Speed**: Instant processing for typical files (<1MB)
- **Memory Usage**: Optimized for large transcripts
- **Privacy**: No data sent to external servers

## 🔧 Development

### Project Structure

```
transcription-to-markdown/
├── public/                 # Static files for GitHub Pages
│   ├── index.html         # Main application
│   ├── css/style.css      # Stylesheet
│   ├── js/app.js          # Application logic
│   └── sample.json        # Example file
├── dev-server.js          # Development server
├── package.json           # Dependencies
└── README.md              # This file
```

### Key Features Implementation

- **Phase 1**: Project setup and core structure
- **Phase 2**: File upload with drag & drop
- **Phase 3**: JSON parsing and data processing
- **Phase 4**: Advanced markdown generation with formatting options
- **Phase 5**: Modern UI/UX with responsive design
- **Phase 6**: Copy/download functionality
- **Phase 7**: Testing and quality assurance
- **Phase 8**: Documentation and deployment

### Browser Console API

For advanced users and developers:

```javascript
// Test the implementation
testPhase4Implementation();

// Apply formatting presets
applyFormatPreset("detailed");

// Custom formatting options
updateFormatOptions({
  includeTimestamps: true,
  titleStyle: "meeting",
  paragraphLength: 4,
});

// Get current options
getFormatOptions();
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] File upload (drag & drop and browse)
- [ ] JSON parsing with various Amazon Transcribe formats
- [ ] Speaker detection and labeling
- [ ] Formatting options and presets
- [ ] Copy to clipboard functionality
- [ ] File download with proper naming
- [ ] Mobile responsiveness
- [ ] Error handling with invalid files

### Test Files

Use the included `sample.json` for testing or create your own Amazon Transcribe output.

## 🚀 Deployment

### GitHub Pages

This project is designed for easy GitHub Pages deployment:

1. **Fork/Clone** this repository
2. **Enable GitHub Pages** in repository settings
3. **Select source**: Deploy from `main` branch `/public` folder
4. **Access**: Your app will be available at `https://username.github.io/transcription-to-markdown`

### Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `/public` directory
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

### Alternative Deployments

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import project with zero configuration
- **Cloudflare Pages**: Deploy directly from GitHub
- **Any static hosting**: Upload the `/public` folder contents

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Use vanilla JavaScript (no frameworks)
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure mobile responsiveness

### Areas for Contribution

- 🌐 **Internationalization**: Add support for multiple languages
- 🎨 **Themes**: Create additional UI themes
- 📊 **Analytics**: Add more transcript analysis features
- 🔧 **Formats**: Support for other transcription services
- 📱 **Mobile**: Enhanced mobile experience
- ♿ **Accessibility**: Improved accessibility features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Amazon Web Services** for the Transcribe service
- **GitHub Pages** for free hosting
- **The open source community** for inspiration and tools

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/username/transcription-to-markdown/issues)
- **Discussions**: [GitHub Discussions](https://github.com/username/transcription-to-markdown/discussions)
- **Email**: <support@transcription-to-markdown.com>

## 🔮 Roadmap

### Version 1.1 (Coming Soon)

- [ ] Custom speaker name mapping
- [ ] Export to additional formats (PDF, DOCX)
- [ ] Batch processing for multiple files
- [ ] Advanced search and filter capabilities

### Version 1.2 (Future)

- [ ] Integration with other transcription services
- [ ] Cloud storage integration
- [ ] Collaboration features
- [ ] Advanced analytics dashboard

---

**Made with ❤️ for content creators, researchers, and anyone who values clear communication.**

⭐ If this project helped you, please consider giving it a star on GitHub!
