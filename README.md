
# Generate Figma Folders Flow Map

This is a code bundle for Generate Figma Folders Flow Map. The original project is available at https://www.figma.com/design/M9T7oDKl50UDLc2qOBW4fG/Generate-Figma-Folders-Flow-Map.

## Features

### 🤖 AI-Powered Draft Generation
- Uses **x.ai Grok AI (grok-beta)** to generate professional legal documents
- Intelligent placeholder replacement with contextual understanding
- Professional legal language and formatting
- Supports 10+ legal document templates

### 📝 Draft Management
- Template-based document creation
- Real-time editing with rich text editor
- Photo/document attachment support
- Auto-save and version tracking
- Export to various formats

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Grok AI (Required for Draft Generation)
1. Get your API key from [x.ai Console](https://console.x.ai/)
2. Create a `.env` file in the project root
3. Add your API key:
   ```
   VITE_XAI_API_KEY=your_grok_api_key_here
   ```

See [GROK_AI_SETUP.md](./GROK_AI_SETUP.md) for detailed setup instructions.

### 3. Run Development Server
```bash
npm run dev
```

## How to Generate Drafts

1. **Navigate to Drafts** section
2. **Click "Create New Draft"** button
3. **Select a template** from 10 available legal document templates
4. **Fill in required fields** (court name, case details, etc.)
5. **Click "Generate Draft with Grok AI"**
6. **Wait for AI generation** (5-15 seconds)
7. **Draft appears in your library** ready for editing

## Available Templates

1. Bail Application
2. Consumer Complaint
3. Divorce Petition
4. Property Dispute
5. Employment Contract
6. Legal Notice
7. PIL (Public Interest Litigation)
8. Writ Petition
9. Arbitration Agreement
10. Power of Attorney

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + Tailwind CSS
- **AI Integration**: x.ai Grok API (grok-beta model)
- **State Management**: React Hooks
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/          # React components
│   ├── Drafts.tsx      # Draft library management
│   ├── TemplateSelector.tsx  # Template selection & AI generation
│   ├── DraftEditor.tsx # Rich text editor
│   └── ui/             # Reusable UI components
├── services/
│   └── grokAI.ts       # Grok AI integration
├── data/
│   └── templatesData.ts # Legal document templates
└── contexts/
    └── ThemeContext.tsx # Dark/Light theme
```

## Environment Variables

Create a `.env` file with:

```env
VITE_XAI_API_KEY=your_grok_api_key_here
```

See `.env.example` for reference.

## Troubleshooting

**Draft generation not working?**
- Ensure `VITE_XAI_API_KEY` is set in `.env`
- Restart the dev server after adding environment variables
- Check browser console for errors

**API Key errors?**
- Verify your API key is active in x.ai console
- Ensure no extra spaces in the `.env` file

For more details, see [GROK_AI_SETUP.md](./GROK_AI_SETUP.md)

## License

This project is based on the Figma design linked above.  