---
name: integrating-ai
description: Integrates AI capabilities using Vercel AI SDK (for OpenAI/Anthropic/Groq) and Ollama (for local models). Use when the user wants to add chatbots, text generation, RAG, or image analysis.
---

# Integrating AI (Vercel AI SDK & Ollama)

## When to use this skill

- When the user mentions "AI", "LLM", "Chatbot", "GPT", or "Ollama".
- When building features like "Explain this", "Generate text", or "Chat with PDF".
- When implementing streaming text responses.

## Workflow

1. **Installation**:
    - `npm install ai @ai-sdk/openai @ai-sdk/anthropic ollama-ai-provider`
2. **Backend Route (Edge/Serverless)**:
    - Create an API route using `streamText` from `ai`.
3. **Frontend Hook**:
    - Use `useChat` or `useCompletion` from `ai/react` to handle UI state automatically.

## Instructions

### 1. API Route (Next.js App Router)

**`app/api/chat/route.ts`**

```ts
import { openai } from '@ai-sdk/openai'; // or 'ollama-ai-provider'
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4-turbo'), // or ollama('llama3')
    messages,
    system: 'You are a helpful assistant.',
  });

  return result.toDataStreamResponse();
}
```

### 2. Frontend UI (React)

**`components/Chat.tsx`**

```tsx
'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
```

### 3. Using Ollama (Local Models)

To run entirely open-source/local:

1. Run Ollama locally: `ollama run llama3`
2. Change the model provider in the API route:

    ```ts
    import { ollama } from 'ollama-ai-provider';
    // ...
    model: ollama('llama3'),
    ```

## Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Ollama](https://ollama.com/)
