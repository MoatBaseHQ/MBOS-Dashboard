interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface OpenRouterRequest {
  model: string
  messages: OpenRouterMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string
      role: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

class OpenRouterService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || ''
    this.baseUrl = process.env.NEXT_PUBLIC_OPENROUTER_URL || 'https://openrouter.ai/api/v1'
  }

  async chat(request: OpenRouterRequest): Promise<OpenRouterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://mbos-dashboard.vercel.app',
          'X-Title': 'MBOS Dashboard'
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('OpenRouter API error:', error)
      throw error
    }
  }

  async generateAgentResponse(agentType: string, userMessage: string): Promise<string> {
    const systemPrompt = this.getSystemPrompt(agentType)
    
    const response = await this.chat({
      model: 'anthropic/claude-3.5-sonnet', // You can change this to any model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    return response.choices[0]?.message?.content || 'No response generated'
  }

  private getSystemPrompt(agentType: string): string {
    const prompts = {
      'blog': 'You are BlogAgent, an expert content writer. Generate engaging, SEO-optimized blog posts with clear structure and compelling headlines.',
      'thera': 'You are TheraAgent, a compassionate AI therapist. Provide supportive, empathetic responses while maintaining professional boundaries.',
      'tech': 'You are TechBlogAgent, a technical writer specializing in programming, AI, and technology. Write clear, informative technical content.',
      'brand': 'You are BrandOS, a brand management expert. Help create consistent brand messaging and marketing strategies.',
      'penman': 'You are PenMan, an advanced content writing assistant. Create high-quality, engaging content across various formats and styles.'
    }

    return prompts[agentType as keyof typeof prompts] || 'You are a helpful AI assistant.'
  }

  async getAvailableModels(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://mbos-dashboard.vercel.app',
          'X-Title': 'MBOS Dashboard'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`)
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching models:', error)
      return []
    }
  }

  async getUsageStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/key`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://mbos-dashboard.vercel.app',
          'X-Title': 'MBOS Dashboard'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch usage stats: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching usage stats:', error)
      return null
    }
  }
}

export const openRouterService = new OpenRouterService()
export default openRouterService 