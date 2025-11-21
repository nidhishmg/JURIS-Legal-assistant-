import OpenAI from 'openai';

// Get API key from environment
const getApiKey = () => {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  console.log('=== Environment Variable Check ===');
  console.log('VITE_OPENROUTER_API_KEY exists:', !!key);
  console.log('VITE_OPENROUTER_API_KEY length:', key?.length || 0);
  console.log('VITE_OPENROUTER_API_KEY first 20 chars:', key?.substring(0, 20) || 'NOT SET');
  console.log('All env vars:', Object.keys(import.meta.env));
  console.log('================================');
  return key || '';
};

// Initialize OpenRouter client for Grok AI
// Users will need to set VITE_OPENROUTER_API_KEY in their .env file
const createClient = () => {
  const apiKey = getApiKey();
  
  return new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
      'X-Title': 'Legal Draft Generator',
    }
  });
};

export interface DraftGenerationRequest {
  templateTitle: string;
  templateDescription: string;
  templateContent: string;
  userInputs: Record<string, string>;
}

export interface DraftGenerationResponse {
  success: boolean;
  generatedContent: string;
  error?: string;
}

/**
 * Generate a legal draft using Grok AI (x-ai/grok-beta:free model via OpenRouter)
 * @param request - The draft generation request containing template and user inputs
 * @returns Promise with the generated draft content
 */
export async function generateDraftWithGrok(
  request: DraftGenerationRequest
): Promise<DraftGenerationResponse> {
  try {
    // Check if API key is configured
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      return {
        success: false,
        generatedContent: '',
        error: 'OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.',
      };
    }

    // Construct the prompt for Grok AI
    const systemPrompt = `You are an expert legal document drafting assistant. Your task is to generate professional, accurate, and well-formatted legal documents based on templates and user inputs.

Guidelines:
1. Use formal legal language appropriate for Indian courts
2. Maintain proper structure with clear headings and sections
3. Include all required legal formalities
4. Format the document professionally with proper spacing
5. Ensure all user-provided information is properly incorporated
6. Add relevant legal citations where appropriate
7. Follow Indian legal document formatting standards`;

    const userPrompt = `Generate a complete legal document based on the following:

Template: ${request.templateTitle}
Description: ${request.templateDescription}

User Inputs:
${Object.entries(request.userInputs)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

Template Structure:
${request.templateContent}

Please generate a complete, professional legal document incorporating all the user inputs into the template structure. Replace all placeholders with appropriate content based on the user inputs. Ensure the document is properly formatted and ready to use.`;

    // Create client and call model via OpenRouter
    const client = createClient();
    // Using OpenRouter's OpenAI mini model (fast & inexpensive)
    const modelName = 'openai/gpt-4o-mini';
    console.log('=== API Request Details ===');
    console.log('Calling model:', modelName);
    console.log('Base URL:', 'https://openrouter.ai/api/v1');
    console.log('Has API Key:', !!import.meta.env.VITE_OPENROUTER_API_KEY);
    console.log('API Key (first 20):', import.meta.env.VITE_OPENROUTER_API_KEY?.substring(0, 20));
    console.log('========================');
    
    const completion = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      stream: false as const,
    });

    const generatedContent = completion.choices[0]?.message?.content || '';

    if (!generatedContent) {
      return {
        success: false,
        generatedContent: '',
        error: 'No content generated from Grok AI',
      };
    }

    return {
      success: true,
      generatedContent,
    };
  } catch (error: any) {
    console.error('Error generating draft with Grok AI:', error);
    console.error('Error details:', error.response?.data || error.message);
    
    let errorMessage = 'Failed to generate draft with Grok AI';
    
    if (error.status === 401) {
      errorMessage = 'Invalid API key. Please check your VITE_OPENROUTER_API_KEY in .env file. Get a key from https://openrouter.ai/keys';
    } else if (error.response?.data?.error) {
      errorMessage = `OpenRouter Error: ${error.response.data.error.message || JSON.stringify(error.response.data.error)}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      generatedContent: '',
      error: errorMessage,
    };
  }
}



/**
 * Stream draft generation from Grok AI (for future use)
 * This can be implemented later for real-time draft generation
 */
export async function* streamDraftGeneration(
  request: DraftGenerationRequest
): AsyncGenerator<string, void, unknown> {
  try {
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      yield 'Error: API key not configured';
      return;
    }

    const systemPrompt = `You are an expert legal document drafting assistant specialized in Indian law.`;

    const userPrompt = `Generate a ${request.templateTitle} with the following details: ${JSON.stringify(request.userInputs)}`;

    const client = createClient();
    const modelName = 'openai/gpt-4o-mini';
    console.log('Streaming with model:', modelName);
    
    const stream = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      stream: true as const,
      temperature: 0.7,
      max_tokens: 4000,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  } catch (error) {
    console.error('Error streaming draft:', error);
    yield 'Error generating draft';
  }
}

// Interface for judgment analysis
export interface JudgmentAnalysisResult {
  success: boolean;
  analysis?: {
    caseTimeline: Array<{ date: string; event: string }>;
    sectionsInvolved: string[];
    arguments: {
      petitioner: string;
      respondent: string;
    };
    ratioDecidendi: string[];
    obiterDicta: string[];
    plainLanguageSummary: string;
  };
  error?: string;
}

/**
 * Analyze a judgment document using AI and extract structured insights
 * @param judgmentText - The full text content of the judgment
 * @returns Promise with the structured judgment analysis
 */
export async function analyzeJudgmentWithAI(
  judgmentText: string
): Promise<JudgmentAnalysisResult> {
  try {
    // Check if API key is configured
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      return {
        success: false,
        error: 'OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.',
      };
    }

    const systemPrompt = `You are an expert legal analyst specializing in Indian court judgments. Your task is to analyze judgments and provide structured insights that are easy to understand.

You MUST respond ONLY with a valid JSON object in the following exact format:
{
  "caseTimeline": [{"date": "YYYY-MM-DD", "event": "description"}],
  "sectionsInvolved": ["IPC Section 302", "Evidence Act Section 65B"],
  "arguments": {
    "petitioner": "summary of petitioner arguments",
    "respondent": "summary of respondent arguments"
  },
  "ratioDecidendi": ["principle 1", "principle 2"],
  "obiterDicta": ["observation 1", "observation 2"],
  "plainLanguageSummary": "2-3 paragraph summary in simple language"
}

Do NOT include any markdown, explanations, or text outside the JSON object.`;

    const userPrompt = `Analyze the following Indian court judgment and extract:

1. **Case Timeline**: Chronological list of key events (FIR date, chargesheet, trial dates, appeals, final judgment)
2. **Sections Involved**: All legal provisions cited (IPC/BNS, Evidence Act, CPC, special acts)
3. **Arguments**: Summary of petitioner's and respondent's main contentions
4. **Ratio Decidendi**: Core legal principles established (binding precedent)
5. **Obiter Dicta**: Additional judicial observations (not binding)
6. **Plain-Language Summary**: Simple explanation without legal jargon (2-3 paragraphs)

Judgment Text:
${judgmentText.substring(0, 15000)}

Respond with ONLY the JSON object, no other text.`;

    const client = createClient();
    const modelName = 'openai/gpt-4o-mini';
    
    console.log('=== Judgment Analysis Request ===');
    console.log('Model:', modelName);
    console.log('Text length:', judgmentText.length);
    console.log('================================');
    
    const completion = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 4000,
      stream: false as const,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    console.log('AI Response (first 200 chars):', responseText.substring(0, 200));

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI did not return valid JSON');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return {
      success: true,
      analysis,
    };

  } catch (error: any) {
    console.error('Error analyzing judgment:', error);
    
    let errorMessage = 'Failed to analyze judgment. ';
    if (error.status === 401) {
      errorMessage += 'Invalid API key. Please check your OpenRouter API key.';
    } else if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Please try again or check your internet connection.';
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Interface for IPC-BNS conversion
export interface IPCBNSConversionResult {
  success: boolean;
  result?: {
    ipc: {
      section: string;
      title: string;
      description: string;
      punishment: string;
    };
    bns: {
      section: string;
      title: string;
      description: string;
      punishment: string;
    };
    changes: string[];
    caseReferences: Array<{ title: string; citation: string }>;
  };
  error?: string;
}

/**
 * Convert between IPC and BNS sections using AI
 * @param sectionNumber - The section number to convert (e.g., "420", "498A")
 * @param inputType - Whether input is 'ipc' or 'bns'
 * @returns Promise with conversion details including both IPC and BNS info
 */
export async function convertIPCBNSWithAI(
  sectionNumber: string,
  inputType: 'ipc' | 'bns'
): Promise<IPCBNSConversionResult> {
  try {
    // Check if API key is configured
    if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
      return {
        success: false,
        error: 'OpenRouter API key not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.',
      };
    }

    const systemPrompt = `You are an expert on Indian criminal law, specifically the Indian Penal Code (IPC) and its replacement, the Bharatiya Nyaya Sanhita (BNS, 2023).

You MUST respond ONLY with a valid JSON object in the following exact format:
{
  "ipc": {
    "section": "Section XXX",
    "title": "Title of the section",
    "description": "Full legal description/text of the section",
    "punishment": "Punishment prescribed"
  },
  "bns": {
    "section": "Section YYY",
    "title": "Title of the section",
    "description": "Full legal description/text of the section",
    "punishment": "Punishment prescribed"
  },
  "changes": ["change 1", "change 2", "change 3"],
  "caseReferences": [
    {"title": "Case name", "citation": "Citation"},
    {"title": "Case name 2", "citation": "Citation 2"}
  ]
}

If the section doesn't exist or you're not sure, still provide the JSON structure with appropriate error messages in the description fields.
Do NOT include any markdown, explanations, or text outside the JSON object.`;

    const userPrompt = inputType === 'ipc'
      ? `Provide complete details for IPC Section ${sectionNumber} and its corresponding BNS section.

Include:
1. IPC Section ${sectionNumber}: Full section text, title, description, and punishment
2. Corresponding BNS section: Number, title, description, and punishment
3. Key changes between IPC and BNS versions (at least 3 points)
4. At least 2 landmark case references related to this section

Respond with ONLY the JSON object.`
      : `Provide complete details for BNS Section ${sectionNumber} and its corresponding IPC section.

Include:
1. BNS Section ${sectionNumber}: Full section text, title, description, and punishment
2. Corresponding IPC section: Number, title, description, and punishment
3. Key changes from IPC to BNS (at least 3 points)
4. At least 2 landmark case references related to this section

Respond with ONLY the JSON object.`;

    const client = createClient();
    const modelName = 'openai/gpt-4o-mini';
    
    console.log('=== IPC-BNS Conversion Request ===');
    console.log('Model:', modelName);
    console.log('Input:', inputType.toUpperCase(), 'Section', sectionNumber);
    console.log('==================================');
    
    const completion = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3, // Lower temperature for more accurate legal info
      max_tokens: 3000,
      stream: false as const,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    console.log('AI Response (first 200 chars):', responseText.substring(0, 200));

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI did not return valid JSON');
    }

    const result = JSON.parse(jsonMatch[0]);

    return {
      success: true,
      result,
    };

  } catch (error: any) {
    console.error('Error converting IPC-BNS:', error);
    
    let errorMessage = 'Failed to convert section. ';
    if (error.status === 401) {
      errorMessage += 'Invalid API key. Please check your OpenRouter API key.';
    } else if (error.message?.includes('JSON')) {
      errorMessage += 'Could not parse AI response. Please try again.';
    } else if (error.message) {
      errorMessage += error.message;
    } else {
      errorMessage += 'Please check your internet connection and try again.';
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
