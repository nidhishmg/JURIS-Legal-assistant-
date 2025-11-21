# Grok AI Integration Setup Guide

## Overview
The draft generation system now uses x.ai's Grok AI model (grok-beta) to generate professional legal documents based on templates.

## Setup Instructions

### 1. Get Your Grok API Key
1. Visit [x.ai Console](https://console.x.ai/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy your API key

### 2. Configure Environment Variables
1. Create a `.env` file in the project root (if it doesn't exist)
2. Add your API key:
   ```
   VITE_XAI_API_KEY=your_actual_api_key_here
   ```
3. Save the file

### 3. Restart Development Server
After adding the API key, restart your development server:
```bash
npm run dev
```

## How It Works

### Draft Generation Flow
1. **User selects a template** from the 10 available legal document templates
2. **User fills required fields** like court name, case number, petitioner name, etc.
3. **User clicks "Generate Draft with Grok AI"**
4. **System sends request to Grok AI** with:
   - Template structure
   - User inputs
   - Legal formatting guidelines
5. **Grok AI generates the complete document** with:
   - Proper legal language
   - Correct formatting
   - All placeholders filled
   - Relevant legal citations
6. **Draft is saved to Draft Library** with:
   - Generated content
   - Attached photos (if any)
   - Timestamp
   - Source template reference

### Files Modified

#### 1. `src/services/grokAI.ts` (NEW)
- Handles all Grok AI API communication
- Contains `generateDraftWithGrok()` function
- Includes error handling and validation
- Supports streaming (for future use)

#### 2. `src/components/TemplateSelector.tsx`
- Updated to use Grok AI instead of simple placeholder replacement
- Added error state management
- Enhanced loading states with AI-specific messaging
- Better user feedback during generation

#### 3. `.env.example` (NEW)
- Template for environment variables
- Documents required API keys

## Features

### ✅ AI-Powered Generation
- Uses Grok AI for intelligent draft creation
- Understands legal document structure
- Maintains professional language

### ✅ Error Handling
- Clear error messages for users
- API key validation
- Network error handling
- Graceful fallbacks

### ✅ Loading States
- Visual feedback during generation
- Disabled inputs while processing
- Cancel capability

### ✅ Draft Library Integration
- Generated drafts automatically saved
- Includes all metadata
- Ready for editing and export

## Usage Example

```typescript
// User fills template fields:
{
  "CourtName": "Delhi High Court",
  "PetitionerName": "John Doe",
  "CaseNumber": "CRL.M.C. 1234/2024",
  "FIRNumber": "123/2024",
  "PoliceStation": "Connaught Place",
  "OffenceSections": "Section 420 IPC"
}

// Grok AI generates complete bail application with:
// - Proper court formatting
// - Legal language
// - All sections filled
// - Ready to file
```

## API Key Security

⚠️ **Important**: 
- Never commit `.env` file to version control
- Keep your API key confidential
- The `.env.example` file is safe to commit (contains no actual keys)
- API calls are made client-side with `dangerouslyAllowBrowser: true`
  - For production, consider using a backend proxy

## Troubleshooting

### Error: "API key not configured"
- Ensure `.env` file exists in project root
- Verify `VITE_XAI_API_KEY` is set correctly
- Restart the development server

### Error: "API Error: Invalid API key"
- Check that your API key is correct
- Verify it's active in x.ai console
- Ensure no extra spaces in `.env` file

### Draft generation is slow
- Grok AI typically takes 5-15 seconds for complex legal documents
- This is normal for AI generation
- Loading indicator shows progress

### No content generated
- Check browser console for errors
- Verify API key is valid
- Check network connectivity
- Ensure input fields are properly filled

## Model Information

**Model**: `grok-beta`
- **Provider**: x.ai
- **Base URL**: `https://api.x.ai/v1`
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 4000 (supports long documents)

## Future Enhancements

- [ ] Streaming support for real-time generation
- [ ] Multiple AI model support
- [ ] Backend proxy for API key security
- [ ] Draft history and versioning
- [ ] AI-powered editing suggestions
- [ ] Citation verification
- [ ] Multi-language support
