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
