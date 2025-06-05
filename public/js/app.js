/**
 * Transcription to Markdown Converter
 * Main JavaScript Application
 */

// ===== APPLICATION STATE =====
let currentState = {
    file: null,
    transcriptData: null,
    markdownOutput: '',
    isProcessing: false
};

// ===== DOM ELEMENTS =====
const elements = {
    uploadSection: document.getElementById('upload-section'),
    uploadZone: document.getElementById('upload-zone'),
    fileInput: document.getElementById('file-input'),
    browseBtn: document.getElementById('browse-btn'),
    processingSection: document.getElementById('processing-section'),
    previewSection: document.getElementById('preview-section'),
    errorSection: document.getElementById('error-section'),
    markdownOutput: document.getElementById('markdown-output'),
    copyBtn: document.getElementById('copy-btn'),
    downloadBtn: document.getElementById('download-btn'),
    newFileBtn: document.getElementById('new-file-btn'),
    retryBtn: document.getElementById('retry-btn'),
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message'),
    errorMessage: document.getElementById('error-message')
};

// ===== APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Transcription to Markdown Converter initialized');
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    setupEventListeners();
    setupDragAndDrop();
    resetToInitialState();
    console.log('✅ App initialization complete');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // File input events
    elements.browseBtn.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Action button events
    elements.copyBtn.addEventListener('click', copyToClipboard);
    elements.downloadBtn.addEventListener('click', downloadMarkdown);
    elements.newFileBtn.addEventListener('click', resetToInitialState);
    elements.retryBtn.addEventListener('click', resetToInitialState);
    
    // Upload zone click
    elements.uploadZone.addEventListener('click', () => {
        if (!currentState.isProcessing) {
            elements.fileInput.click();
        }
    });
    
    console.log('📝 Event listeners attached');
}

/**
 * Set up drag and drop functionality
 */
function setupDragAndDrop() {
    const uploadZone = elements.uploadZone;
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    
    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, unhighlight, false);
    });
    
    // Handle dropped files
    uploadZone.addEventListener('drop', handleDrop, false);
    
    console.log('🎯 Drag and drop functionality enabled');
}

/**
 * Prevent default drag behaviors
 */
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Highlight upload zone during drag
 */
function highlight(e) {
    elements.uploadZone.classList.add('upload-zone--dragover');
}

/**
 * Remove highlight from upload zone
 */
function unhighlight(e) {
    elements.uploadZone.classList.remove('upload-zone--dragover');
}

/**
 * Handle dropped files
 */
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
}

/**
 * Handle file selection from input
 */
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFileUpload(files[0]);
    }
}

/**
 * Main file upload handler
 * @param {File} file - The uploaded file
 */
function handleFileUpload(file) {
    console.log('📁 File upload started:', file.name);
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
        showError(validation.message);
        return;
    }
    
    // Update state
    currentState.file = file;
    currentState.isProcessing = true;
    
    // Show processing state
    showProcessingState();
    
    // Process file
    processTranscriptionFile(file)
        .then(result => {
            currentState.transcriptData = result.data;
            currentState.markdownOutput = result.markdown;
            currentState.isProcessing = false;
            showPreviewState();
            showToast('File processed successfully!', 'success');
        })
        .catch(error => {
            console.error('❌ Processing error:', error);
            currentState.isProcessing = false;
            showError(error.message || 'Failed to process the file. Please try again.');
        });
}

/**
 * Validate uploaded file
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
function validateFile(file) {
    // Check file type
    if (!file.name.toLowerCase().endsWith('.json')) {
        return {
            isValid: false,
            message: 'Please upload a JSON file (.json extension required).'
        };
    }
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        return {
            isValid: false,
            message: 'File size exceeds 10MB limit. Please choose a smaller file.'
        };
    }
    
    // Check if file is empty
    if (file.size === 0) {
        return {
            isValid: false,
            message: 'The selected file is empty. Please choose a valid file.'
        };
    }
    
    return { isValid: true };
}

/**
 * Process the transcription file
 * @param {File} file - The JSON file to process
 * @returns {Promise} Processing result
 */
function processTranscriptionFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                // Parse JSON
                const jsonData = JSON.parse(e.target.result);
                
                // Validate Amazon Transcribe format
                const validation = validateTranscribeFormat(jsonData);
                if (!validation.isValid) {
                    reject(new Error(validation.message));
                    return;
                }
                
                // Parse transcription data
                const parsedData = parseAmazonTranscribe(jsonData);
                
                // Generate markdown
                const markdown = generateMarkdown(parsedData);
                
                resolve({
                    data: parsedData,
                    markdown: markdown
                });
                
            } catch (error) {
                if (error instanceof SyntaxError) {
                    reject(new Error('Invalid JSON format. Please check your file.'));
                } else {
                    reject(error);
                }
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Failed to read the file. Please try again.'));
        };
        
        reader.readAsText(file);
    });
}

/**
 * Validate Amazon Transcribe JSON format
 * @param {Object} data - Parsed JSON data
 * @returns {Object} Validation result
 */
function validateTranscribeFormat(data) {
    // Check for required fields
    if (!data.results) {
        return {
            isValid: false,
            message: 'Invalid Amazon Transcribe format: missing "results" field.'
        };
    }
    
    if (!data.results.transcripts || !Array.isArray(data.results.transcripts)) {
        return {
            isValid: false,
            message: 'Invalid Amazon Transcribe format: missing or invalid "transcripts" field.'
        };
    }
    
    return { isValid: true };
}

/**
 * Parse Amazon Transcribe JSON data
 * @param {Object} jsonData - Raw transcription data
 * @returns {Object} Parsed transcription data
 */
function parseAmazonTranscribe(jsonData) {
    console.log('🔍 Parsing Amazon Transcribe data...');
    
    const result = {
        jobName: jsonData.jobName || 'Transcription',
        speakers: {},
        segments: [],
        fullTranscript: ''
    };
    
    // Extract transcript text
    if (jsonData.results.transcripts && jsonData.results.transcripts.length > 0) {
        result.fullTranscript = jsonData.results.transcripts[0].transcript || '';
    }
    
    // Process speaker labels if available
    if (jsonData.results.speaker_labels && jsonData.results.speaker_labels.segments) {
        result.segments = processSpeakerSegments(jsonData.results.speaker_labels.segments, jsonData.results.items);
        result.speakers = mapSpeakers(result.segments);
    } else {
        // No speaker labels - treat as single speaker
        result.segments = [{
            speaker: 'Speaker 1',
            text: result.fullTranscript,
            startTime: 0,
            endTime: 0
        }];
        result.speakers = { 'Speaker 1': 'Speaker 1' };
    }
    
    console.log('✅ Parsing complete:', result);
    return result;
}

/**
 * Process speaker segments
 * @param {Array} segments - Speaker segments from transcription
 * @param {Array} items - Word items from transcription
 * @returns {Array} Processed segments
 */
function processSpeakerSegments(segments, items = []) {
    // TODO: Implement in Phase 3
    console.log('📝 Processing speaker segments...');
    
    // Placeholder implementation
    return segments.map((segment, index) => ({
        speaker: `Speaker ${parseInt(segment.speaker_label.replace('spk_', '')) + 1}`,
        text: `[Segment ${index + 1} content will be processed in Phase 3]`,
        startTime: parseFloat(segment.start_time) || 0,
        endTime: parseFloat(segment.end_time) || 0
    }));
}

/**
 * Map speakers to readable names
 * @param {Array} segments - Processed segments
 * @returns {Object} Speaker mapping
 */
function mapSpeakers(segments) {
    const speakers = {};
    segments.forEach(segment => {
        if (!speakers[segment.speaker]) {
            speakers[segment.speaker] = segment.speaker;
        }
    });
    return speakers;
}

/**
 * Generate markdown from parsed data
 * @param {Object} data - Parsed transcription data
 * @returns {String} Generated markdown
 */
function generateMarkdown(data) {
    console.log('📝 Generating markdown...');
    
    let markdown = `# Interview Transcript: ${data.jobName}\n\n`;
    
    if (data.segments.length === 0) {
        markdown += data.fullTranscript;
    } else {
        // Group segments by speaker
        const speakerGroups = {};
        data.segments.forEach(segment => {
            if (!speakerGroups[segment.speaker]) {
                speakerGroups[segment.speaker] = [];
            }
            speakerGroups[segment.speaker].push(segment);
        });
        
        // Generate markdown for each speaker
        Object.keys(speakerGroups).forEach(speaker => {
            markdown += `## ${speaker}\n\n`;
            speakerGroups[speaker].forEach(segment => {
                markdown += `${segment.text}\n\n`;
            });
        });
    }
    
    console.log('✅ Markdown generation complete');
    return markdown;
}

/**
 * Copy markdown to clipboard
 */
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(currentState.markdownOutput);
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = currentState.markdownOutput;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('Copied to clipboard!', 'success');
    }
}

/**
 * Download markdown as file
 */
function downloadMarkdown() {
    const filename = generateFilename();
    const blob = new Blob([currentState.markdownOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Download started!', 'success');
}

/**
 * Generate filename for download
 * @returns {String} Generated filename
 */
function generateFilename() {
    const jobName = currentState.transcriptData?.jobName || 'transcript';
    const timestamp = new Date().toISOString().slice(0, 10);
    return `${jobName}-${timestamp}.md`;
}

/**
 * Show processing state
 */
function showProcessingState() {
    hideAllSections();
    elements.processingSection.style.display = 'block';
}

/**
 * Show preview state
 */
function showPreviewState() {
    hideAllSections();
    elements.previewSection.style.display = 'block';
    elements.markdownOutput.textContent = currentState.markdownOutput;
}

/**
 * Show error state
 * @param {String} message - Error message to display
 */
function showError(message) {
    hideAllSections();
    elements.errorSection.style.display = 'block';
    elements.errorMessage.textContent = message;
}

/**
 * Reset to initial state
 */
function resetToInitialState() {
    currentState = {
        file: null,
        transcriptData: null,
        markdownOutput: '',
        isProcessing: false
    };
    
    hideAllSections();
    elements.uploadSection.style.display = 'block';
    elements.fileInput.value = '';
    
    console.log('🔄 Reset to initial state');
}

/**
 * Hide all sections
 */
function hideAllSections() {
    [
        elements.uploadSection,
        elements.processingSection,
        elements.previewSection,
        elements.errorSection
    ].forEach(section => {
        if (section) section.style.display = 'none';
    });
}

/**
 * Show toast notification
 * @param {String} message - Message to display
 * @param {String} type - Toast type (success, error)
 */
function showToast(message, type = 'info') {
    elements.toastMessage.textContent = message;
    elements.toast.className = `toast toast--${type} toast--show`;
    
    setTimeout(() => {
        elements.toast.classList.remove('toast--show');
    }, 3000);
}

/**
 * Show about dialog (placeholder)
 */
function showAbout() {
    alert('Transcription to Markdown Converter v1.0\n\nConverts Amazon Transcribe JSON files to formatted markdown.\n\nBuilt with vanilla JavaScript, HTML, and CSS.');
}

// ===== UTILITY FUNCTIONS =====

/**
 * Format file size for display
 * @param {Number} bytes - File size in bytes
 * @returns {String} Formatted file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Sanitize text for markdown output
 * @param {String} text - Text to sanitize
 * @returns {String} Sanitized text
 */
function sanitizeForMarkdown(text) {
    // Escape markdown special characters
    return text
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/_/g, '\\_')
        .replace(/`/g, '\\`')
        .replace(/~/g, '\\~');
}

/**
 * Development helper: Log current state
 */
function logCurrentState() {
    console.log('📊 Current State:', currentState);
}

// Make functions available globally for debugging
window.transcriptionApp = {
    currentState,
    elements,
    logCurrentState,
    resetToInitialState,
    showToast
};

console.log('🎉 Application loaded successfully!'); 