# 📝 Transcription to Markdown Converter

Transform your Amazon Transcribe JSON files into beautifully formatted markdown documents with just a drag and drop—because nobody should have to manually format speaker transcripts in 2025.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)

## What This App Actually Does

- **📄 Drag & Drop Processing**: Upload Amazon Transcribe JSON files instantly
- **🎤 Smart Speaker Detection**: Automatically identifies and labels different speakers
- **📱 Works Everywhere**: Responsive design that looks great on any device
- **🚀 Real-time Conversion**: See your formatted markdown as you adjust settings
- **💾 Multiple Export Options**: Copy to clipboard or download as `.md` files
- **🔒 Privacy-First**: All processing happens in your browser—your files never leave your device

## Advanced Formatting That Actually Works

- **🎛️ Interactive Controls**: Comprehensive formatting panel with live preview
- **📋 Smart Presets**: One-click templates for interviews, meetings, conversations
- **⏱️ Optional Timestamps**: Add time markers when you need them
- **📊 Built-in Analytics**: Word count, duration, and speaker statistics
- **🎨 Flexible Styling**: Customize headers, paragraphs, and title formats

## Alternatives

- **[winston](https://github.com/JeeZeh/winston)**
  A Python command-line tool for converting Amazon Transcribe JSON into clean, readable text or subtitle formats (like SRT and VTT). Winston is great if you want a scriptable, developer-focused solution and don't mind working in the terminal. It's especially handy for batch processing or integrating into larger workflows.

- **[aws-transcribe-transcript](https://github.com/purdy/aws-transcribe-transcript)**
  A simple PHP script that takes Amazon Transcribe output and generates a readable transcript, with optional speaker labels and timestamps. This one's perfect for Python users who want a no-frills, scriptable way to get plain text or basic HTML from their JSON files.

- **[amazon-transcribe-output-word-document](https://github.com/aws-samples/amazon-transcribe-output-word-document)**
  An official AWS Python3 project that converts Amazon Transcribe JSON into Word documents.

## 🚀 Get Started in 30 Seconds

### Try It Online

Visit the live application: **[khawkins98.github.io/transcription-to-markdown](https://khawkins98.github.io/transcription-to-markdown)**

## 📖 How to Use This Thing

### Step 1: Upload Your Transcribe File

**Drag & Drop**: Simply drag your Amazon Transcribe JSON file onto the upload zone (seriously, it's that easy).

**Browse Files**: Click the button if you prefer the traditional approach.

**What We Support**: `.json` files from Amazon Transcribe, up to 10MB (that's a really long conversation).

### Step 2: Choose Your Style

Click **⚙️ Formatting Options** to access the good stuff:

#### Quick Presets (For When You're in a Rush)

- **Default**: Standard interview format with clean metadata
- **Minimal**: No-frills output for when you just need the text
- **Detailed**: Everything included—timestamps, stats, the works
- **Meeting**: Professional meeting notes format
- **Conversation**: Casual chat-style formatting

#### Fine-Tune Everything (For the Perfectionists)

- **Title Style**: Interview Transcript, Meeting Notes, Conversation, or just Transcript
- **Speaker Format**: H2 headers, H3 headers, or bold labels
- **Include Timestamps**: Add time markers to track the conversation flow
- **Show Statistics**: Word count, duration, and speaker analytics
- **Paragraph Length**: Adjust how many sentences group together (2-6 sentences)

### Step 3: Get Your Markdown

- **📋 Copy to Clipboard**: One click and it's ready to paste anywhere
- **💾 Download File**: Saves with a smart filename based on your original file
- **👀 Live Preview**: Watch your markdown update in real-time as you adjust settings

### Run It Locally

Want to tinker with the code or run it offline?

```bash
# Clone and enter the project
git clone https://github.com/khawkins98/transcription-to-markdown.git
cd transcription-to-markdown

# Install dependencies
npm install

# Start the development server
npm start

# Open your browser
open http://localhost:8000
```

## 💡 Real Examples That Make Sense

### What Goes In

```json
{
  "jobName": "customer-interview-2025",
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
          "speaker_label": "spk_0"
        },
        {
          "start_time": "4.0",
          "end_time": "7.2",
          "speaker_label": "spk_1"
        }
      ]
    }
  }
}
```

### What Comes Out

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

## 🛠️ Technical Details (For the Curious)

### What's Under the Hood

- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (no framework bloat)
- **Processing**: 100% client-side with Web APIs
- **Dependencies**: Zero runtime dependencies (we like to keep things simple)
- **Browser Support**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+

### Amazon Transcribe Compatibility

We support everything Amazon Transcribe throws at us:

- ✅ **Speaker identification** (`speaker_labels`)
- ✅ **Word-level timestamps** (`items`)
- ✅ **Confidence scores** (though we don't judge)
- ✅ **Punctuation and capitalization**
- ✅ **Job metadata** (name, status, account ID)

### Performance Numbers

- **File Size**: Handles transcripts up to 10MB without breaking a sweat
- **Processing Speed**: Instant for typical files (<1MB)
- **Memory Usage**: Optimized for large transcripts
- **Privacy**: Zero data sent to external servers

## 🔧 Development & Customization

### Project Structure

```
transcription-to-markdown/
├── public/                 # Ready-to-deploy files
│   ├── index.html         # Main application
│   ├── css/style.css      # All the styling magic
│   ├── js/app.js          # Application logic
│   └── sample.json        # Example file for testing
├── dev-server.js          # Development server
├── package.json           # Dependencies
└── README.md              # You are here
```

### Browser Console API (For Power Users)

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

## 🚀 Deploy Your Own Instance

### GitHub Pages (Recommended Path)

1. **Fork** this repository
2. **Enable GitHub Pages** in repository settings
3. **Select source**: Deploy from `main` branch `/public` folder
4. **Wait a minute** for GitHub to work its magic
5. **Visit**: `https://yourusername.github.io/transcription-to-markdown`

### Other Options

- **Netlify**: Drag the `/public` folder to their deploy interface
- **Vercel**: Import your GitHub repo with zero configuration
- **Cloudflare Pages**: Connect for automatic deployments
- **Any static hosting**: Upload the `/public` folder contents

## 🤝 Contributing & Support

Want to make this tool even better? We'd love your help!

### Quick Ways to Help

- **🐛 Report bugs** you encounter
- **✨ Suggest features** that would be useful
- **📝 Improve documentation**
- **🔧 Submit code improvements**

### Getting Started

Check out our [Contributing Guide](CONTRIBUTING.md) for the full rundown on development setup, coding standards, and how to submit changes.

### Get Help

- **Issues**: [GitHub Issues](https://github.com/khawkins98/transcription-to-markdown/issues)
- **Discussions**: [GitHub Discussions](https://github.com/khawkins98/transcription-to-markdown/discussions)

## 📄 License

This project is licensed under the MIT License—use it, modify it, share it however you'd like.

---

⭐ **Found this helpful?** Give us a star on GitHub—it helps other people discover the tool and keeps us motivated to make it even better!
