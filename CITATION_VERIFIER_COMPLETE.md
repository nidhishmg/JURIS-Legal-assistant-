# Citation Verifier - AI-Powered Legal Citation Verification

## Overview
The Citation Verifier is an AI-powered tool that automatically extracts and verifies legal citations from text, checking them against authentic Indian legal databases including SCC Online, Manupatra, LiveLaw, and Indian Kanoon.

## Features

### 1. **Automatic Citation Extraction**
- Intelligently identifies all legal citations within provided text
- Supports various citation formats (AIR, SCC, SCC OnLine, etc.)
- Handles both judgment names and citation numbers

### 2. **Multi-Source Verification**
- Cross-references citations against multiple legal databases:
  - **SCC Online** - Supreme Court Cases
  - **Manupatra** - Comprehensive legal database
  - **LiveLaw** - Latest legal updates
  - **Indian Kanoon** - Free legal resource
  - **Official Court Websites** - Supreme Court and High Courts

### 3. **Status Detection**
The system categorizes each citation into one of four statuses:

- **✓ Verified** - Citation is accurate and case law is currently valid
- **✗ Overruled** - Case has been expressly overruled by a higher court
- **⚠ Modified** - Case has been modified, distinguished, or partially overruled
- **⚠ Incorrect** - Citation format is wrong or case doesn't exist

### 4. **Citation Correction**
- Provides properly formatted citations following standard conventions
- Shows original citation with corrections side-by-side
- Highlights formatting issues and provides accurate alternatives

### 5. **Pinpoint References**
- Includes paragraph and page numbers when available
- Helps locate exact portions of judgments
- Improves citation accuracy for legal briefs

### 6. **Detailed Analysis**
For each citation, the system provides:
- **Case Name** - Full judgment title
- **Court** - Jurisdiction (Supreme Court, High Court, etc.)
- **Date** - Date of judgment
- **Sources** - Databases used for verification
- **Notes** - Explanations for overruled, modified, or incorrect citations
- **Pinpoint References** - Specific paragraph/page numbers

### 7. **Visual Status Indicators**
- Color-coded badges for quick status identification
- Icons for each status type
- Summary cards showing total, verified, overruled, and issues found

## How to Use

### Basic Workflow
1. **Input Text** - Paste text containing legal citations into the textarea
2. **Verify** - Click "Verify Citations" button
3. **Review Results** - Examine extracted citations with their verification status
4. **Take Action** - View judgments, apply corrections, or export reports

### Sample Input
```
As held in Maneka Gandhi vs. Union of India (AIR 1978 SC 597), the right to 
life and liberty under Article 21 cannot be taken away except by procedure 
established by law. This principle was further elaborated in Vishaka vs. 
State of Rajasthan (1997) 1 SCC 416.
```

### Expected Output
Each citation will be analyzed and presented with:
- Original citation as written
- Corrected citation format
- Verification status (verified/overruled/modified/incorrect)
- Full case details
- Verification sources
- Notes for any issues found

## Technical Implementation

### AI Integration
- **Model**: `openai/gpt-4o-mini` via OpenRouter
- **Temperature**: 0.3 (low temperature for accurate verification)
- **Max Tokens**: 4000
- **Service Function**: `verifyCitationsWithAI()` in `src/services/grokAI.ts`

### System Prompt Strategy
The AI is instructed to:
1. Extract ALL legal citations from text
2. Verify against authentic legal databases
3. Check if cases are overruled, modified, or valid
4. Provide corrected citation formats
5. Include pinpoint references
6. Cross-reference multiple sources

### Response Format
The AI returns structured JSON with:
```typescript
{
  citations: [
    {
      id: string;
      original: string;
      corrected: string;
      status: 'verified' | 'overruled' | 'incorrect' | 'modified';
      judgment: string;
      court: string;
      date: string;
      note?: string;
      sources: string[];
      pinpointReference?: string;
    }
  ]
}
```

## Error Handling

### Validation
- Checks if input text is provided before processing
- Validates AI response structure
- Ensures all required fields are present

### Error Messages
- Clear, user-friendly error messages
- Dismissible error alerts
- Detailed console logging for debugging

### Edge Cases
- No citations found in text
- Malformed citation formats
- API failures or timeout
- Invalid JSON responses

## UI Components

### Summary Cards
- **Total Citations** - Count of all extracted citations
- **Verified** - Successfully validated citations
- **Overruled** - Cases that have been overruled
- **Issues Found** - Incorrect or modified citations

### Citation Cards
Each citation is displayed with:
- Status icon (✓, ✗, ⚠)
- Judgment name
- Original vs. corrected citation
- Status badge
- Court and date
- Pinpoint reference
- Verification sources
- Explanatory notes
- Action buttons (View Judgment, Apply Correction)

### Export Options
- **Export Report as PDF** - Complete verification report
- **Export as Excel** - Spreadsheet format
- **Copy Corrected Text** - Text with corrected citations

## Benefits

### For Legal Professionals
- ✓ Saves hours of manual citation verification
- ✓ Reduces errors in legal briefs and documents
- ✓ Ensures citations are current and valid
- ✓ Identifies overruled cases before filing
- ✓ Standardizes citation formats

### For Law Students
- ✓ Learn proper citation formats
- ✓ Verify research materials quickly
- ✓ Understand case law validity
- ✓ Improve legal writing quality

### For Researchers
- ✓ Cross-verify multiple sources
- ✓ Track case law developments
- ✓ Identify citation patterns
- ✓ Access pinpoint references

## Database Coverage

### Primary Sources
1. **SCC Online** - Authoritative Supreme Court and High Court cases
2. **Manupatra** - Comprehensive legal database with extensive coverage
3. **LiveLaw** - Latest judgments and legal news
4. **Indian Kanoon** - Free access to Indian case law

### Citation Formats Supported
- AIR (All India Reporter) - `AIR 1978 SC 597`
- SCC (Supreme Court Cases) - `(1997) 1 SCC 416`
- SCC OnLine - `2024 SCC OnLine Del 1234`
- High Court reports - Various state reporters
- Tribunal citations

## Limitations and Disclaimers

### Important Notes
1. **AI-Powered Verification** - Results are based on AI knowledge and should be cross-verified for critical legal work
2. **Database Currency** - Verification accuracy depends on AI's training data cutoff
3. **Legal Advice** - This tool provides information only, not legal advice
4. **Manual Review** - Always manually review citations for court submissions
5. **Internet Connection** - Requires active internet for AI verification

### Best Practices
- Use verified citations for court filings
- Cross-check critical citations with official sources
- Update case law research regularly
- Verify pinpoint references in original judgments
- Keep records of verification sources

## Future Enhancements

### Planned Features
- [ ] PDF document upload for bulk citation extraction
- [ ] Direct links to judgment sources
- [ ] Citation style guide integration
- [ ] Comparison with older case versions
- [ ] Real-time case law update notifications
- [ ] Integration with legal research platforms
- [ ] Custom citation format templates
- [ ] Batch processing for multiple documents
- [ ] Historical case law timeline
- [ ] Related cases suggestions

## Support and Feedback

### API Configuration
Ensure your `.env` file contains:
```
VITE_OPENROUTER_API_KEY=your_api_key_here
```

### Troubleshooting
- **No citations found**: Check input text format
- **Verification fails**: Verify API key is valid
- **Slow processing**: Large texts may take longer
- **Incorrect results**: Manually verify critical citations

## Version History

### v1.0 (Current)
- ✓ AI-powered citation extraction
- ✓ Multi-source verification
- ✓ Status detection (verified/overruled/modified/incorrect)
- ✓ Citation correction suggestions
- ✓ Pinpoint reference support
- ✓ Source attribution
- ✓ Visual status indicators
- ✓ Error handling and validation

---

## Technical Stack
- **Frontend**: React + TypeScript
- **AI Service**: OpenAI SDK via OpenRouter
- **Model**: GPT-4o Mini
- **UI Components**: Tailwind CSS + Lucide Icons
- **State Management**: React Hooks

## File Structure
```
src/
├── components/
│   └── CitationVerifier.tsx          # Main component
├── services/
│   └── grokAI.ts                      # AI integration
│       └── verifyCitationsWithAI()    # Verification function
└── types/
    └── Citation interface definitions
```

---

**Developed with AI-powered verification for Indian legal citations**

*Last Updated: 2024*
