# 💡 Usage Examples

This document provides comprehensive examples of how to use the Transcription to Markdown Converter with different types of Amazon Transcribe output and formatting options.

## 📁 Example Input Files

### Basic Interview Format

Amazon Transcribe output for a simple two-person interview:

```json
{
  "jobName": "customer-interview-2024-01-15",
  "accountId": "123456789012",
  "status": "COMPLETED",
  "results": {
    "transcripts": [
      {
        "transcript": "Hello thank you for calling our support line today. How can I help you? Hi there I'm having trouble accessing my account. I keep getting an error message when I try to log in."
      }
    ],
    "items": [
      {
        "start_time": "0.0",
        "end_time": "0.54",
        "alternatives": [{ "content": "Hello", "confidence": "1.0" }],
        "type": "pronunciation"
      },
      {
        "start_time": "0.54",
        "end_time": "1.02",
        "alternatives": [{ "content": "thank", "confidence": "0.999" }],
        "type": "pronunciation"
      },
      {
        "start_time": "1.02",
        "end_time": "1.26",
        "alternatives": [{ "content": "you", "confidence": "1.0" }],
        "type": "pronunciation"
      }
    ],
    "speaker_labels": {
      "segments": [
        {
          "start_time": "0.0",
          "end_time": "6.47",
          "speaker_label": "spk_0",
          "items": [
            {
              "start_time": "0.0",
              "end_time": "0.54",
              "speaker_label": "spk_0"
            },
            {
              "start_time": "0.54",
              "end_time": "1.02",
              "speaker_label": "spk_0"
            }
          ]
        },
        {
          "start_time": "6.47",
          "end_time": "15.23",
          "speaker_label": "spk_1",
          "items": [
            {
              "start_time": "6.47",
              "end_time": "6.71",
              "speaker_label": "spk_1"
            },
            {
              "start_time": "6.71",
              "end_time": "7.05",
              "speaker_label": "spk_1"
            }
          ]
        }
      ]
    }
  }
}
```

## 🎨 Output Examples

### 1. Default Format

**Settings**: Default options with metadata enabled

```markdown
# Interview Transcript: Customer Interview 2024 01 15

<!-- Generated on 2024-01-15T14:30:22.750Z -->
<!-- Status: COMPLETED -->
<!-- 2 speakers detected -->

## Speaker 1

Hello thank you for calling our support line today. How can I help you?

## Speaker 2

Hi there I'm having trouble accessing my account. I keep getting an error message when I try to log in.

---

_Transcript generated automatically from Amazon Transcribe output_

_Processing completed in 45ms_
```

### 2. Minimal Format

**Settings**: Minimal preset - no metadata, clean output

```markdown
# Transcript: Customer Interview 2024 01 15

**Speaker 1:** Hello thank you for calling our support line today. How can I help you?

**Speaker 2:** Hi there I'm having trouble accessing my account. I keep getting an error message when I try to log in.
```

### 3. Meeting Format with Timestamps

**Settings**: Meeting preset with timestamps and statistics

```markdown
# Meeting Notes: Customer Interview 2024 01 15

## Summary

**Word Count:** 28
**Duration:** 0:15
**Speakers:** 2

---

### Speaker 1 (0:00 - 0:06)

Hello thank you for calling our support line today. How can I help you?

### Speaker 2 (0:06 - 0:15)

Hi there I'm having trouble accessing my account. I keep getting an error message when I try to log in.

---

_Transcript generated automatically from Amazon Transcribe output_

_Processing completed in 67ms_
```

### 4. Detailed Format

**Settings**: Detailed preset with all features enabled

```markdown
# Interview Transcript: Customer Interview 2024 01 15

<!-- Generated on 2024-01-15T14:30:22.750Z -->
<!-- Status: COMPLETED -->
<!-- 2 speakers detected -->
<!-- Word-level timing data available -->
<!-- Processing time: 67ms -->

## Summary

**Word Count:** 28
**Duration:** 0:15
**Speakers:** 2

---

## Speaker 1 (0:00 - 0:06)

Hello thank you for calling our support line today.

How can I help you?

## Speaker 2 (0:06 - 0:15)

Hi there I'm having trouble accessing my account.

I keep getting an error message when I try to log in.

---

_Transcript generated automatically from Amazon Transcribe output_

_Processing completed in 67ms_
```

### 5. Conversation Format

**Settings**: Conversation preset for casual dialogue

```markdown
# Conversation: Customer Interview 2024 01 15

**Speaker 1:** Hello thank you for calling our support line today. How can I help you?

**Speaker 2:** Hi there I'm having trouble accessing my account. I keep getting an error message when I try to log in.
```

## 🎛️ Formatting Options Guide

### Title Styles

Choose from different title formats:

| Option         | Output                           |
| -------------- | -------------------------------- |
| `interview`    | `# Interview Transcript: [Name]` |
| `transcript`   | `# Transcript: [Name]`           |
| `conversation` | `# Conversation: [Name]`         |
| `meeting`      | `# Meeting Notes: [Name]`        |

### Speaker Styles

Control how speaker sections appear:

| Option | Output           |
| ------ | ---------------- |
| `h2`   | `## Speaker 1`   |
| `h3`   | `### Speaker 1`  |
| `bold` | `**Speaker 1:**` |

### Paragraph Length

Control sentence grouping (2-6 sentences per paragraph):

**Length 2**: Shorter paragraphs for easy reading

```markdown
## Speaker 1

Hello thank you for calling. How can I help you?

This is a new paragraph with the next sentences.
```

**Length 4**: Longer paragraphs for detailed content

```markdown
## Speaker 1

Hello thank you for calling. How can I help you? This is continuing in the same paragraph. Here's another sentence to demonstrate the longer format.

Now this would be a new paragraph.
```

## 🔧 Advanced Use Cases

### Single Speaker Monologue

For presentations or single-person recordings:

```json
{
  "jobName": "presentation-q1-2024",
  "results": {
    "transcripts": [
      {
        "transcript": "Welcome everyone to our quarterly review. Today we'll be covering three main topics. First, our sales performance..."
      }
    ]
  }
}
```

Output:

```markdown
# Interview Transcript: Presentation Q1 2024

## Speaker 1

Welcome everyone to our quarterly review. Today we'll be covering three main topics.

First, our sales performance. We exceeded our targets by fifteen percent this quarter.

This demonstrates exceptional growth across all departments.
```

### Multi-Speaker Meeting

For complex discussions with multiple participants:

```json
{
  "jobName": "team-standup-2024-01-15",
  "results": {
    "speaker_labels": {
      "segments": [
        { "speaker_label": "spk_0", "start_time": "0.0", "end_time": "10.5" },
        { "speaker_label": "spk_1", "start_time": "10.5", "end_time": "25.2" },
        { "speaker_label": "spk_2", "start_time": "25.2", "end_time": "40.1" },
        { "speaker_label": "spk_0", "start_time": "40.1", "end_time": "55.8" }
      ]
    }
  }
}
```

Output with timestamps:

```markdown
# Meeting Notes: Team Standup 2024 01 15

### Speaker 1 (0:00 - 0:10)

Good morning everyone. Let's start with our daily standup.

### Speaker 2 (0:10 - 0:25)

Yesterday I completed the user authentication module. Today I'm working on the dashboard.

### Speaker 3 (0:25 - 0:40)

I finished the database migration. No blockers for me today.

### Speaker 1 (0:40 - 0:55)

Great progress team. Let's reconvene tomorrow at the same time.
```

## 🎯 Common Formatting Patterns

### Customer Support Calls

**Recommended**: Meeting format with timestamps

- Clear speaker identification
- Timestamp tracking for issue resolution
- Professional appearance

### Interviews & Podcasts

**Recommended**: Default or detailed format

- Natural conversation flow
- Speaker-focused sections
- Optional metadata for reference

### Meeting Notes

**Recommended**: Meeting format with summary

- Executive summary with key metrics
- Clear action items and decisions
- Professional documentation style

### Casual Conversations

**Recommended**: Conversation or minimal format

- Clean, readable dialogue
- Minimal technical metadata
- Focus on content over structure

## 📊 Performance Examples

### Large File Handling

For files over 5MB with extensive speaker changes:

- **Processing time**: Typically 100-500ms
- **Memory usage**: Optimized for browser limits
- **Output quality**: Consistent formatting maintained

### Complex Speaker Patterns

Handling rapid speaker changes and overlapping segments:

- **Automatic merging**: Consecutive same-speaker segments combined
- **Time accuracy**: Precise timestamp calculations
- **Error recovery**: Graceful handling of malformed data

## 🚀 Tips for Best Results

### File Preparation

1. **Ensure complete JSON**: Verify file isn't truncated
2. **Check speaker labels**: Best results with speaker identification enabled
3. **Optimize file size**: Compress large files before upload

### Formatting Selection

1. **Know your audience**: Choose appropriate formality level
2. **Consider use case**: Match format to intended purpose
3. **Test options**: Try different presets to find optimal output

### Quality Assurance

1. **Review output**: Check for formatting issues
2. **Verify timestamps**: Ensure time accuracy if needed
3. **Test downloads**: Confirm file naming and content

---

**Need more examples?** Check the [sample.json](public/sample.json) file included with the project, or create your own Amazon Transcribe output to experiment with different formatting options!
