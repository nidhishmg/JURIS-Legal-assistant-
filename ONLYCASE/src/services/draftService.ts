import OpenAI from 'openai';

const getApiKey = () => {
  return import.meta.env.VITE_OPENROUTER_API_KEY || '';
};

const createClient = () => {
  const apiKey = getApiKey();
  
  return new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3002',
      'X-Title': 'Legal Draft Generator',
    }
  });
};

export interface GenerateDraftRequest {
  templateId: string;
  caseData: {
    title: string;
    caseNumber: string;
    court: string;
    client: {
      name: string;
      address: string;
    };
    opponent: {
      name: string;
      address: string;
    };
    summary: string;
    facts: any[];
    issues: any[];
  };
}

export interface GenerateDraftResponse {
  success: boolean;
  draftContent: string;
  error?: string;
}

/**
 * Generate a legal draft using AI based on template and case data
 */
export async function generateDraftWithAI(
  request: GenerateDraftRequest
): Promise<GenerateDraftResponse> {
  try {
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      return {
        success: false,
        draftContent: '',
        error: 'OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.',
      };
    }

    const systemPrompt = `You are an expert Indian legal document drafting assistant. Your task is to generate professional, accurate, and well-formatted legal documents based on templates and case information.

Guidelines:
1. Use formal legal language appropriate for Indian courts
2. Maintain proper structure with clear headings and sections
3. Include all required legal formalities
4. Format the document professionally with proper spacing
5. Ensure all case information is properly incorporated
6. Add relevant legal citations where appropriate
7. Follow Indian legal document formatting standards
8. Use proper paragraph numbering and formatting
9. Include verification clause at the end
10. Make the document ready to file in court`;

    const userPrompt = `Generate a complete legal ${request.templateId.toUpperCase()} based on the following case information:

Case Title: ${request.caseData.title}
Case Number: ${request.caseData.caseNumber}
Court: ${request.caseData.court}

Client Details:
Name: ${request.caseData.client.name}
Address: ${request.caseData.client.address}

Opponent Details:
Name: ${request.caseData.opponent.name}
Address: ${request.caseData.opponent.address}

Case Summary: ${request.caseData.summary}

Facts of the Case:
${request.caseData.facts.map((f, idx) => `${idx + 1}. ${f.title}: ${f.description}`).join('\n')}

Legal Issues:
${request.caseData.issues.map((i, idx) => `${idx + 1}. ${i.title} (Priority: ${i.priority})\n   Relevant Laws: ${i.lawSections.join(', ')}`).join('\n')}

Please generate a complete, professional ${request.templateId} document that:
- Uses proper legal formatting and structure
- Includes all necessary sections (heading, parties, facts, prayer, verification)
- Is formatted for Indian courts
- Uses appropriate legal language
- Is ready to file
- Includes proper paragraph numbering
- Has verification clause signed by ${request.caseData.client.name}

Generate ONLY the legal document content, without any explanations or markdown formatting. Make it professional and court-ready.`;

    const client = createClient();
    const modelName = 'openai/gpt-4o-mini';

    console.log('=== Generating Draft ===');
    console.log('Template:', request.templateId);
    console.log('Case:', request.caseData.title);

    const completion = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.4, // Lower temperature for more consistent legal documents
      max_tokens: 4000
    });

    const draftContent = completion.choices[0]?.message?.content?.trim();

    if (!draftContent) {
      throw new Error('No draft content generated');
    }

    console.log('=== Draft Generated Successfully ===');

    return {
      success: true,
      draftContent
    };

  } catch (error: unknown) {
    console.error('=== Draft Generation Error ===');
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      return {
        success: false,
        draftContent: '',
        error: error.message || 'Failed to generate draft'
      };
    }
    return {
      success: false,
      draftContent: '',
      error: 'Unknown error occurred during draft generation'
    };
  }
}
