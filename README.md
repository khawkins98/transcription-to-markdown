# Transcription to Markdown Converter

A simple web application that converts Amazon Transcribe JSON output to formatted markdown text. This tool provides an easy way to transform interview transcriptions into readable markdown format with speaker identification and proper formatting.

## 🎯 Purpose

This project addresses the need to convert Amazon Transcribe JSON output into human-readable markdown format. Amazon Transcribe produces detailed JSON files with speaker labels, timestamps, and word-level confidence scores, but these files are difficult to read and share. This converter transforms them into clean, formatted markdown text that's perfect for documentation, analysis, or sharing.

## ✨ Features

- **File Upload**: Drag-and-drop or click-to-select Amazon Transcribe JSON files
- **Speaker Recognition**: Automatically identifies and labels different speakers (Speaker 1, Speaker 2, etc.)
- **Markdown Output**: Converts transcription to properly formatted markdown with:
  - Speaker labels as headers
  - Paragraph breaks for readability
  - Clean text formatting
- **Real-time Preview**: See the markdown output immediately after upload
- **Copy to Clipboard**: Easy one-click copying of the generated markdown
- **Download Option**: Save the markdown as a `.md` file
- **GitHub Pages Ready**: Static HTML/JS app that can be hosted on GitHub Pages

## 🔧 Technology Stack

- **HTML5**: File upload and drag-and-drop interface
- **CSS3**: Modern, responsive styling
- **Vanilla JavaScript**: File processing and markdown generation
- **GitHub Pages**: Free hosting solution

## 📁 Input Format

The application expects Amazon Transcribe JSON files with the following structure:

```json
{
  "jobName": "interview-name",
  "accountId": "123456789",
  "status": "COMPLETED",
  "results": {
    "transcripts": [
      {
        "transcript": "Full transcript text..."
      }
    ],
    "speaker_labels": {
      "segments": [
        {
          "start_time": "0.0",
          "end_time": "14.34",
          "speaker_label": "spk_0",
          "items": [...]
        }
      ]
    }
  }
}
```

## 📝 Output Format

The generated markdown follows this structure:

```markdown
# Interview Transcript: [Job Name]

## Speaker 1
[First speaker's content with proper paragraph breaks]

## Speaker 2
[Second speaker's content with proper paragraph breaks]

## Speaker 1
[Continued conversation...]
```

## 🚀 Getting Started

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/transcription-to-markdown.git
   cd transcription-to-markdown
   ```

2. **Quick Setup with npm** ⚡

   Install development dependencies and start the server:
   ```bash
   npm install
   npm start
   ```

3. **Development Server Options**

   **Option A: live-server (Recommended)**
   ```bash
   # Install dependencies
   npm install

   # Start with auto-browser opening
   npm start
   # or
   npm run dev:open

   # Start without auto-opening browser
   npm run dev
   ```

   **Option B: browser-sync (Advanced Features)**
   ```bash
   # Advanced development server with sync across devices
   npm run dev:sync
   ```

   **Option C: VS Code Live Server Extension**
   - Install the "Live Server" extension in VS Code
   - Right-click `index.html` and select "Open with Live Server"
   - Automatically reloads on file changes

4. Open `http://localhost:8000` in your browser

### Development Features

- **Hot Reloading**: Automatic browser refresh on file changes
- **Auto-open Browser**: Launches your default browser automatically
- **File Watching**: Monitors HTML, CSS, and JavaScript files
- **Cache Busting**: Prevents browser caching during development
- **Cross-device Sync**: With browser-sync option

### GitHub Pages Deployment

1. Fork this repository
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Your app will be available at `https://yourusername.github.io/transcription-to-markdown`

## 💻 Usage

1. **Upload File**:
   - Drag and drop an Amazon Transcribe JSON file onto the upload area
   - Or click "Choose File" to select a file from your computer

2. **View Results**:
   - The markdown output will appear automatically in the preview area
   - Speaker segments are clearly labeled and formatted

3. **Copy or Download**:
   - Click "Copy to Clipboard" to copy the markdown text
   - Click "Download Markdown" to save as a `.md` file

## 🛠️ Development

### File Structure
```
transcription-to-markdown/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styling
├── js/
│   └── script.js       # Core functionality
├── .vscode/            # VS Code workspace settings
├── package.json        # npm configuration and scripts
├── README.md           # This file
├── WORKPLAN.md         # Development roadmap
└── sample.json         # Example input file
```

### npm Scripts
- `npm start` - Start development server with auto-open browser
- `npm run dev` - Start development server without opening browser
- `npm run dev:sync` - Start browser-sync with advanced features
- `npm install` - Install development dependencies

### Key Functions
- `processTranscription()`: Main conversion logic
- `parseAmazonTranscribe()`: JSON parsing and speaker detection
- `generateMarkdown()`: Markdown formatting
- `handleFileUpload()`: File handling and validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Enhancements

- Support for other transcription service formats (Google Speech-to-Text, Azure, etc.)
- Timestamp inclusion options
- Custom speaker name mapping
- Batch file processing
- Export to other formats (PDF, DOCX)
- Advanced formatting options (bold, italic, etc.)

## 📧 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/transcription-to-markdown/issues) on GitHub.