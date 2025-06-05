/**
 * Transcription to Markdown Converter
 * Main JavaScript Application
 */

// ===== APPLICATION STATE =====
let currentState = {
  file: null,
  transcriptData: null,
  markdownOutput: "",
  isProcessing: false,
};

// ===== DOM ELEMENTS =====
const elements = {
  uploadSection: document.getElementById("upload-section"),
  uploadZone: document.getElementById("upload-zone"),
  fileInput: document.getElementById("file-input"),
  browseBtn: document.getElementById("browse-btn"),
  processingSection: document.getElementById("processing-section"),
  previewSection: document.getElementById("preview-section"),
  errorSection: document.getElementById("error-section"),
  markdownOutput: document.getElementById("markdown-output"),
  copyBtn: document.getElementById("copy-btn"),
  downloadBtn: document.getElementById("download-btn"),
  newFileBtn: document.getElementById("new-file-btn"),
  retryBtn: document.getElementById("retry-btn"),
  toast: document.getElementById("toast"),
  toastMessage: document.getElementById("toast-message"),
  errorMessage: document.getElementById("error-message"),
};

// ===== APPLICATION INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Transcription to Markdown Converter initialized");
  initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
  setupEventListeners();
  setupDragAndDrop();
  resetToInitialState();
  console.log("✅ App initialization complete");
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // File input events
  elements.browseBtn.addEventListener("click", () =>
    elements.fileInput.click()
  );
  elements.fileInput.addEventListener("change", handleFileSelect);

  // Action button events
  elements.copyBtn.addEventListener("click", copyToClipboard);
  elements.downloadBtn.addEventListener("click", downloadMarkdown);
  elements.newFileBtn.addEventListener("click", resetToInitialState);
  elements.retryBtn.addEventListener("click", resetToInitialState);

  // Upload zone click
  elements.uploadZone.addEventListener("click", () => {
    if (!currentState.isProcessing) {
      elements.fileInput.click();
    }
  });

  console.log("📝 Event listeners attached");
}

/**
 * Set up drag and drop functionality
 */
function setupDragAndDrop() {
  const uploadZone = elements.uploadZone;

  // Prevent default drag behaviors
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadZone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  // Highlight drop zone when item is dragged over it
  ["dragenter", "dragover"].forEach((eventName) => {
    uploadZone.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    uploadZone.addEventListener(eventName, unhighlight, false);
  });

  // Handle dropped files
  uploadZone.addEventListener("drop", handleDrop, false);

  console.log("🎯 Drag and drop functionality enabled");
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
  elements.uploadZone.classList.add("upload-zone--dragover");
}

/**
 * Remove highlight from upload zone
 */
function unhighlight(e) {
  elements.uploadZone.classList.remove("upload-zone--dragover");
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
  console.log("📁 File upload started:", file.name);

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
    .then((result) => {
      currentState.transcriptData = result.data;
      currentState.markdownOutput = result.markdown;
      currentState.isProcessing = false;
      showPreviewState();
      showToast("File processed successfully!", "success");
    })
    .catch((error) => {
      console.error("❌ Processing error:", error);
      currentState.isProcessing = false;
      showError(
        error.message || "Failed to process the file. Please try again."
      );
    });
}

/**
 * Validate uploaded file
 * @param {File} file - File to validate
 * @returns {Object} Validation result
 */
function validateFile(file) {
  // Check file type
  if (!file.name.toLowerCase().endsWith(".json")) {
    return {
      isValid: false,
      message: "Please upload a JSON file (.json extension required).",
    };
  }

  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      message: "File size exceeds 10MB limit. Please choose a smaller file.",
    };
  }

  // Check if file is empty
  if (file.size === 0) {
    return {
      isValid: false,
      message: "The selected file is empty. Please choose a valid file.",
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

    reader.onload = function (e) {
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
          markdown: markdown,
        });
      } catch (error) {
        if (error instanceof SyntaxError) {
          reject(new Error("Invalid JSON format. Please check your file."));
        } else {
          reject(error);
        }
      }
    };

    reader.onerror = function () {
      reject(new Error("Failed to read the file. Please try again."));
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
      message: 'Invalid Amazon Transcribe format: missing "results" field.',
    };
  }

  if (!data.results.transcripts || !Array.isArray(data.results.transcripts)) {
    return {
      isValid: false,
      message:
        'Invalid Amazon Transcribe format: missing or invalid "transcripts" field.',
    };
  }

  // Check if we have at least one transcript
  if (data.results.transcripts.length === 0) {
    return {
      isValid: false,
      message: "No transcripts found in the file.",
    };
  }

  // Validate transcript content
  const firstTranscript = data.results.transcripts[0];
  if (!firstTranscript.transcript) {
    return {
      isValid: false,
      message: "Transcript content is empty or missing.",
    };
  }

  // Check for items array (optional but recommended)
  if (data.results.items && !Array.isArray(data.results.items)) {
    return {
      isValid: false,
      message: 'Invalid "items" field format. Expected an array.',
    };
  }

  // Check speaker labels format (if present)
  if (data.results.speaker_labels) {
    if (
      !data.results.speaker_labels.segments ||
      !Array.isArray(data.results.speaker_labels.segments)
    ) {
      return {
        isValid: false,
        message: "Invalid speaker labels format. Expected segments array.",
      };
    }

    // Validate at least one speaker segment
    if (data.results.speaker_labels.segments.length === 0) {
      console.warn("⚠️ Speaker labels present but no segments found");
    }
  }

  // Additional format checks
  if (data.jobName && typeof data.jobName !== "string") {
    console.warn("⚠️ Job name is not a string, will use default");
  }

  if (
    data.status &&
    !["COMPLETED", "IN_PROGRESS", "FAILED"].includes(data.status)
  ) {
    console.warn(`⚠️ Unexpected status: ${data.status}`);
  }

  return {
    isValid: true,
    warnings: [],
  };
}

/**
 * Parse Amazon Transcribe JSON data
 * @param {Object} jsonData - Raw transcription data
 * @returns {Object} Parsed transcription data
 */
function parseAmazonTranscribe(jsonData) {
  console.log("🔍 Parsing Amazon Transcribe data...");

  const result = {
    jobName: jsonData.jobName || "Transcription",
    speakers: {},
    segments: [],
    fullTranscript: "",
    metadata: {
      accountId: jsonData.accountId || null,
      status: jsonData.status || "UNKNOWN",
      hasItems: false,
      hasSpeakerLabels: false,
      totalSegments: 0,
      processingTime: Date.now(),
    },
  };

  try {
    // Extract transcript text
    if (
      jsonData.results.transcripts &&
      jsonData.results.transcripts.length > 0
    ) {
      result.fullTranscript = jsonData.results.transcripts[0].transcript || "";
    }

    // Check for items array (word-level data)
    const items = jsonData.results.items || [];
    result.metadata.hasItems = items.length > 0;

    console.log(`📊 Found ${items.length} word items in transcript`);

    // Process speaker labels if available
    if (
      jsonData.results.speaker_labels &&
      jsonData.results.speaker_labels.segments
    ) {
      result.metadata.hasSpeakerLabels = true;
      result.metadata.totalSegments =
        jsonData.results.speaker_labels.segments.length;

      console.log(`🎤 Found ${result.metadata.totalSegments} speaker segments`);

      // Process segments with enhanced text reconstruction
      result.segments = processSpeakerSegments(
        jsonData.results.speaker_labels.segments,
        items
      );
      result.speakers = mapSpeakers(result.segments);
    } else {
      // No speaker labels - treat as single speaker
      console.log("⚠️ No speaker labels found, treating as single speaker");

      let singleSpeakerText = result.fullTranscript;

      // If we have items but no speaker labels, try to reconstruct better text
      if (items.length > 0) {
        singleSpeakerText = reconstructFullTextFromItems(items);
      }

      result.segments = [
        {
          speaker: "Speaker 1",
          text: cleanupText(singleSpeakerText),
          startTime: 0,
          endTime: getTotalDuration(items),
          originalLabel: "single_speaker",
        },
      ];

      result.speakers = {
        "Speaker 1": "Speaker 1",
        _metadata: {
          count: 1,
          order: ["Speaker 1"],
        },
      };
    }

    // Validate results
    if (result.segments.length === 0) {
      throw new Error("No valid segments found in transcription");
    }

    // Update metadata
    result.metadata.processingTime =
      Date.now() - result.metadata.processingTime;

    console.log("✅ Parsing complete:", {
      segments: result.segments.length,
      speakers:
        result.speakers._metadata?.count || Object.keys(result.speakers).length,
      hasItems: result.metadata.hasItems,
      hasSpeakerLabels: result.metadata.hasSpeakerLabels,
    });

    return result;
  } catch (error) {
    console.error("❌ Error parsing Amazon Transcribe data:", error);
    throw new Error(`Failed to parse transcription data: ${error.message}`);
  }
}

/**
 * Reconstruct full text from items array
 * @param {Array} items - All transcript items
 * @returns {String} Reconstructed text
 */
function reconstructFullTextFromItems(items) {
  if (!items || items.length === 0) {
    return "";
  }

  let text = "";
  let lastType = null;

  items.forEach((item, index) => {
    try {
      if (
        item.alternatives &&
        item.alternatives[0] &&
        item.alternatives[0].content
      ) {
        const content = item.alternatives[0].content;
        const type = item.type || "pronunciation";

        // Handle spacing based on item type
        if (type === "punctuation") {
          // Add punctuation without space
          text += content;
        } else {
          // Add space before words (except first word)
          if (index > 0 && lastType !== "punctuation") {
            text += " ";
          }
          text += content;
        }

        lastType = type;
      }
    } catch (error) {
      console.warn(
        "⚠️ Error processing item in full text reconstruction:",
        error
      );
    }
  });

  return text.trim();
}

/**
 * Get total duration from items array
 * @param {Array} items - All transcript items
 * @returns {Number} Total duration in seconds
 */
function getTotalDuration(items) {
  if (!items || items.length === 0) {
    return 0;
  }

  // Find the last item with an end time
  let maxEndTime = 0;

  items.forEach((item) => {
    if (item.end_time) {
      const endTime = parseFloat(item.end_time);
      if (endTime > maxEndTime) {
        maxEndTime = endTime;
      }
    }
  });

  return maxEndTime;
}

/**
 * Process speaker segments
 * @param {Array} segments - Speaker segments from transcription
 * @param {Array} items - Word items from transcription
 * @returns {Array} Processed segments
 */
function processSpeakerSegments(segments, items = []) {
  console.log("📝 Processing speaker segments...");

  if (!segments || segments.length === 0) {
    console.log("⚠️ No speaker segments found");
    return [];
  }

  const processedSegments = [];

  segments.forEach((segment, segmentIndex) => {
    try {
      // Extract segment info
      const speakerLabel = segment.speaker_label || `spk_${segmentIndex}`;
      const startTime = parseFloat(segment.start_time) || 0;
      const endTime = parseFloat(segment.end_time) || 0;

      // Reconstruct text for this segment using items
      let segmentText = "";

      if (segment.items && segment.items.length > 0) {
        // Use segment items if available
        segmentText = reconstructTextFromItems(segment.items, items);
      } else {
        // Fallback: find items in time range
        segmentText = reconstructTextFromTimeRange(startTime, endTime, items);
      }

      // Clean up text
      segmentText = cleanupText(segmentText);

      // Map speaker label to readable name
      const speakerName = mapSpeakerLabel(speakerLabel);

      if (segmentText.trim()) {
        processedSegments.push({
          speaker: speakerName,
          text: segmentText,
          startTime: startTime,
          endTime: endTime,
          originalLabel: speakerLabel,
        });
      }
    } catch (error) {
      console.error(`❌ Error processing segment ${segmentIndex}:`, error);
      // Continue with other segments
    }
  });

  // Merge consecutive segments from same speaker
  const mergedSegments = mergeConsecutiveSegments(processedSegments);

  console.log(
    `✅ Processed ${segments.length} segments into ${mergedSegments.length} speaker turns`
  );
  return mergedSegments;
}

/**
 * Reconstruct text from segment items
 * @param {Array} segmentItems - Items within the segment
 * @param {Array} allItems - All transcript items for fallback
 * @returns {String} Reconstructed text
 */
function reconstructTextFromItems(segmentItems, allItems = []) {
  if (!segmentItems || segmentItems.length === 0) {
    return "";
  }

  let text = "";
  let lastEndTime = 0;

  segmentItems.forEach((item, index) => {
    try {
      const startTime = parseFloat(item.start_time) || 0;
      const endTime = parseFloat(item.end_time) || 0;

      // Find corresponding word in all items
      const word = findWordByTimeRange(startTime, endTime, allItems);

      if (word) {
        // Add space if there's a time gap (indicates pause or punctuation)
        if (index > 0 && startTime > lastEndTime + 0.1) {
          text += " ";
        } else if (index > 0) {
          text += " ";
        }

        text += word;
        lastEndTime = endTime;
      }
    } catch (error) {
      console.warn("⚠️ Error processing item:", error);
    }
  });

  return text.trim();
}

/**
 * Reconstruct text from time range
 * @param {Number} startTime - Segment start time
 * @param {Number} endTime - Segment end time
 * @param {Array} items - All transcript items
 * @returns {String} Reconstructed text
 */
function reconstructTextFromTimeRange(startTime, endTime, items = []) {
  if (!items || items.length === 0) {
    return "";
  }

  let text = "";

  // Find items within time range
  const wordsInRange = items.filter((item) => {
    if (!item.start_time || !item.end_time) return false;

    const itemStart = parseFloat(item.start_time);
    const itemEnd = parseFloat(item.end_time);

    // Item overlaps with segment time range
    return itemStart >= startTime && itemEnd <= endTime;
  });

  // Sort by start time
  wordsInRange.sort(
    (a, b) => parseFloat(a.start_time) - parseFloat(b.start_time)
  );

  // Combine words
  wordsInRange.forEach((item, index) => {
    if (
      item.alternatives &&
      item.alternatives[0] &&
      item.alternatives[0].content
    ) {
      if (index > 0) text += " ";
      text += item.alternatives[0].content;
    }
  });

  return text.trim();
}

/**
 * Find word by time range in items array
 * @param {Number} startTime - Item start time
 * @param {Number} endTime - Item end time
 * @param {Array} items - All transcript items
 * @returns {String|null} Found word or null
 */
function findWordByTimeRange(startTime, endTime, items = []) {
  if (!items || items.length === 0) {
    return null;
  }

  // Find item with matching time range
  const matchingItem = items.find((item) => {
    if (!item.start_time || !item.end_time) return false;

    const itemStart = parseFloat(item.start_time);
    const itemEnd = parseFloat(item.end_time);

    // Allow small tolerance for time matching
    return (
      Math.abs(itemStart - startTime) < 0.01 &&
      Math.abs(itemEnd - endTime) < 0.01
    );
  });

  if (
    matchingItem &&
    matchingItem.alternatives &&
    matchingItem.alternatives[0]
  ) {
    return matchingItem.alternatives[0].content || "";
  }

  return null;
}

/**
 * Clean up reconstructed text
 * @param {String} text - Raw text
 * @returns {String} Cleaned text
 */
function cleanupText(text) {
  if (!text) return "";

  // Remove extra spaces
  text = text.replace(/\s+/g, " ");

  // Fix punctuation spacing
  text = text.replace(/\s+([.,!?;:])/g, "$1");
  text = text.replace(/([.!?])\s*([A-Z])/g, "$1 $2");

  // Capitalize first letter
  text = text.charAt(0).toUpperCase() + text.slice(1);

  // Ensure proper sentence ending
  if (text && !text.match(/[.!?]$/)) {
    text += ".";
  }

  return text.trim();
}

/**
 * Map speaker label to readable name
 * @param {String} speakerLabel - Original speaker label (e.g., "spk_0")
 * @returns {String} Readable speaker name
 */
function mapSpeakerLabel(speakerLabel) {
  if (!speakerLabel) return "Speaker 1";

  // Extract number from label like "spk_0", "spk_1", etc.
  const match = speakerLabel.match(/spk_(\d+)/);
  if (match) {
    const speakerNumber = parseInt(match[1]) + 1; // Convert 0-based to 1-based
    return `Speaker ${speakerNumber}`;
  }

  // Fallback
  return speakerLabel;
}

/**
 * Merge consecutive segments from the same speaker
 * @param {Array} segments - Processed segments
 * @returns {Array} Merged segments
 */
function mergeConsecutiveSegments(segments) {
  if (!segments || segments.length === 0) {
    return [];
  }

  const merged = [];
  let currentSegment = null;

  segments.forEach((segment) => {
    if (!currentSegment || currentSegment.speaker !== segment.speaker) {
      // New speaker or first segment
      if (currentSegment) {
        merged.push(currentSegment);
      }

      currentSegment = {
        speaker: segment.speaker,
        text: segment.text,
        startTime: segment.startTime,
        endTime: segment.endTime,
        originalLabel: segment.originalLabel,
      };
    } else {
      // Same speaker - merge segments
      currentSegment.text += " " + segment.text;
      currentSegment.endTime = segment.endTime; // Update end time
    }
  });

  // Add final segment
  if (currentSegment) {
    merged.push(currentSegment);
  }

  return merged;
}

/**
 * Enhanced mapping of speakers with better handling
 * @param {Array} segments - Processed segments
 * @returns {Object} Speaker mapping
 */
function mapSpeakers(segments) {
  const speakers = {};
  const speakerOrder = [];

  segments.forEach((segment) => {
    if (!speakers[segment.speaker]) {
      speakers[segment.speaker] = segment.speaker;
      speakerOrder.push(segment.speaker);
    }
  });

  // Add metadata about speaker order and count
  speakers._metadata = {
    count: speakerOrder.length,
    order: speakerOrder,
  };

  return speakers;
}

/**
 * Generate markdown from parsed data
 * @param {Object} data - Parsed transcription data
 * @returns {String} Generated markdown
 */
function generateMarkdown(data) {
  console.log("📝 Generating markdown...");

  // Start with header
  let markdown = `# Interview Transcript: ${data.jobName}\n\n`;

  // Add metadata if available
  if (data.metadata) {
    markdown += `<!-- Generated on ${new Date().toISOString()} -->\n`;
    if (data.metadata.status) {
      markdown += `<!-- Status: ${data.metadata.status} -->\n`;
    }
    if (data.metadata.hasSpeakerLabels) {
      markdown += `<!-- ${
        data.speakers._metadata?.count || "Unknown"
      } speakers detected -->\n`;
    }
    markdown += "\n";
  }

  // Handle empty segments
  if (!data.segments || data.segments.length === 0) {
    markdown += data.fullTranscript || "*No transcript content available*";
    return markdown;
  }

  // Single speaker case
  if (data.segments.length === 1) {
    const segment = data.segments[0];
    markdown += `## ${segment.speaker}\n\n`;
    markdown += formatTextWithParagraphs(segment.text);
    return markdown;
  }

  // Multi-speaker conversation
  let currentSpeaker = null;
  let speakerContent = "";

  data.segments.forEach((segment, index) => {
    if (segment.speaker !== currentSpeaker) {
      // New speaker - add previous speaker's content if any
      if (currentSpeaker && speakerContent.trim()) {
        markdown += `## ${currentSpeaker}\n\n`;
        markdown += formatTextWithParagraphs(speakerContent);
        markdown += "\n";
      }

      // Start new speaker
      currentSpeaker = segment.speaker;
      speakerContent = segment.text;
    } else {
      // Same speaker - continue content
      speakerContent += " " + segment.text;
    }

    // Handle last segment
    if (index === data.segments.length - 1) {
      markdown += `## ${currentSpeaker}\n\n`;
      markdown += formatTextWithParagraphs(speakerContent);
    }
  });

  console.log("✅ Markdown generation complete");
  return markdown;
}

/**
 * Format text with proper paragraph breaks
 * @param {String} text - Raw text
 * @returns {String} Formatted text with paragraphs
 */
function formatTextWithParagraphs(text) {
  if (!text) return "";

  // Clean up the text first
  text = text.trim();

  // Split into sentences
  const sentences = text.split(/([.!?]+\s+)/);
  let formattedText = "";
  let currentParagraph = "";
  let sentenceCount = 0;

  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];

    if (part.match(/^[.!?]+\s*$/)) {
      // This is punctuation and space
      currentParagraph += part;
      sentenceCount++;

      // Start new paragraph after 3-4 sentences or at natural breaks
      if (sentenceCount >= 3) {
        formattedText += currentParagraph.trim() + "\n\n";
        currentParagraph = "";
        sentenceCount = 0;
      }
    } else if (part.trim()) {
      // This is sentence content
      currentParagraph += part;
    }
  }

  // Add remaining content
  if (currentParagraph.trim()) {
    formattedText += currentParagraph.trim();
  }

  // Clean up extra whitespace
  formattedText = formattedText.replace(/\n{3,}/g, "\n\n");

  // Ensure we end with proper spacing
  if (!formattedText.endsWith("\n\n")) {
    formattedText += "\n\n";
  }

  return formattedText;
}

/**
 * Copy markdown to clipboard
 */
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(currentState.markdownOutput);
    showToast("Copied to clipboard!", "success");
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = currentState.markdownOutput;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showToast("Copied to clipboard!", "success");
  }
}

/**
 * Download markdown as file
 */
function downloadMarkdown() {
  const filename = generateFilename();
  const blob = new Blob([currentState.markdownOutput], {
    type: "text/markdown",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast("Download started!", "success");
}

/**
 * Generate filename for download
 * @returns {String} Generated filename
 */
function generateFilename() {
  const jobName = currentState.transcriptData?.jobName || "transcript";
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${jobName}-${timestamp}.md`;
}

/**
 * Show processing state
 */
function showProcessingState() {
  hideAllSections();
  elements.processingSection.style.display = "block";
}

/**
 * Show preview state
 */
function showPreviewState() {
  hideAllSections();
  elements.previewSection.style.display = "block";
  elements.markdownOutput.textContent = currentState.markdownOutput;
}

/**
 * Show error state
 * @param {String} message - Error message to display
 */
function showError(message) {
  hideAllSections();
  elements.errorSection.style.display = "block";
  elements.errorMessage.textContent = message;
}

/**
 * Reset to initial state
 */
function resetToInitialState() {
  currentState = {
    file: null,
    transcriptData: null,
    markdownOutput: "",
    isProcessing: false,
  };

  hideAllSections();
  elements.uploadSection.style.display = "block";
  elements.fileInput.value = "";

  console.log("🔄 Reset to initial state");
}

/**
 * Hide all sections
 */
function hideAllSections() {
  [
    elements.uploadSection,
    elements.processingSection,
    elements.previewSection,
    elements.errorSection,
  ].forEach((section) => {
    if (section) section.style.display = "none";
  });
}

/**
 * Show toast notification
 * @param {String} message - Message to display
 * @param {String} type - Toast type (success, error)
 */
function showToast(message, type = "info") {
  elements.toastMessage.textContent = message;
  elements.toast.className = `toast toast--${type} toast--show`;

  setTimeout(() => {
    elements.toast.classList.remove("toast--show");
  }, 3000);
}

/**
 * Show about dialog (placeholder)
 */
function showAbout() {
  alert(
    "Transcription to Markdown Converter v1.0\n\nConverts Amazon Transcribe JSON files to formatted markdown.\n\nBuilt with vanilla JavaScript, HTML, and CSS."
  );
}

// ===== UTILITY FUNCTIONS =====

/**
 * Format file size for display
 * @param {Number} bytes - File size in bytes
 * @returns {String} Formatted file size
 */
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Sanitize text for markdown output
 * @param {String} text - Text to sanitize
 * @returns {String} Sanitized text
 */
function sanitizeForMarkdown(text) {
  // Escape markdown special characters
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/`/g, "\\`")
    .replace(/~/g, "\\~");
}

/**
 * Log current application state (for debugging)
 */
function logCurrentState() {
  console.log("📊 Current Application State:", {
    hasFile: !!currentState.file,
    fileName: currentState.file?.name,
    isProcessing: currentState.isProcessing,
    hasTranscriptData: !!currentState.transcriptData,
    segmentCount: currentState.transcriptData?.segments?.length || 0,
    speakerCount: currentState.transcriptData?.speakers?._metadata?.count || 0,
    hasMarkdown: !!currentState.markdownOutput,
    markdownLength: currentState.markdownOutput?.length || 0,
  });
}

/**
 * Test function for Phase 3 implementation
 * This function can be called from browser console for testing
 */
function testPhase3Implementation() {
  console.log("🧪 Testing Phase 3 Implementation...");

  // Test with sample data structure
  const sampleData = {
    jobName: "test-transcription",
    accountId: "123456789",
    status: "COMPLETED",
    results: {
      transcripts: [
        {
          transcript: "Hello world. How are you today? I am fine thank you.",
        },
      ],
      items: [
        {
          start_time: "0.0",
          end_time: "0.5",
          alternatives: [{ content: "Hello" }],
          type: "pronunciation",
        },
        {
          start_time: "0.5",
          end_time: "1.0",
          alternatives: [{ content: "world" }],
          type: "pronunciation",
        },
        {
          start_time: "1.0",
          end_time: "1.1",
          alternatives: [{ content: "." }],
          type: "punctuation",
        },
      ],
      speaker_labels: {
        segments: [
          {
            start_time: "0.0",
            end_time: "1.1",
            speaker_label: "spk_0",
            items: [
              { start_time: "0.0", end_time: "0.5", speaker_label: "spk_0" },
              { start_time: "0.5", end_time: "1.0", speaker_label: "spk_0" },
              { start_time: "1.0", end_time: "1.1", speaker_label: "spk_0" },
            ],
          },
        ],
      },
    },
  };

  try {
    // Test validation
    console.log("Testing validation...");
    const validation = validateTranscribeFormat(sampleData);
    console.log("Validation result:", validation);

    // Test parsing
    console.log("Testing parsing...");
    const parsed = parseAmazonTranscribe(sampleData);
    console.log("Parsed result:", parsed);

    // Test markdown generation
    console.log("Testing markdown generation...");
    const markdown = generateMarkdown(parsed);
    console.log("Generated markdown:", markdown);

    console.log("✅ Phase 3 test completed successfully!");
    return { validation, parsed, markdown };
  } catch (error) {
    console.error("❌ Phase 3 test failed:", error);
    return { error: error.message };
  }
}

// Make test function available globally for console testing
window.testPhase3Implementation = testPhase3Implementation;

console.log("🎉 Application loaded successfully!");
