import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/prompts';
import { getHooks, getProblems, getPitches } from '@/lib/content-loader';
import { GenerateRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { contentType, count, problemsPerScript, toneMode, ctaMode, customCta, apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    if (!contentType || !count) {
      return NextResponse.json(
        { error: 'Content type and count are required.' },
        { status: 400 }
      );
    }

    if (ctaMode === 'custom' && (!customCta || customCta.trim().length === 0)) {
      return NextResponse.json(
        { error: 'Custom CTA text is required when using custom CTA mode.' },
        { status: 400 }
      );
    }

    const hooks = getHooks();
    const problems = getProblems();
    const pitches = getPitches();

    const client = new Anthropic({ apiKey });

    const systemPrompt = buildSystemPrompt(hooks, problems, pitches);
    const userPrompt = buildUserPrompt(contentType, count, problemsPerScript || 1, toneMode || 'tactical', ctaMode, customCta || '');

    const maxTokens = count > 2 ? 4096 : 2048;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const textContent = message.content.find((block) => block.type === 'text');
    const generatedContent = textContent ? textContent.text : '';

    return NextResponse.json({ content: generatedContent });
  } catch (error: unknown) {
    const err = error as { status?: number; message?: string };

    if (err.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key. Check your key in settings.' },
        { status: 401 }
      );
    }

    if (err.status === 429) {
      return NextResponse.json(
        { error: 'Rate limited. Wait a moment and try again.' },
        { status: 429 }
      );
    }

    console.error('Generation error:', error);
    return NextResponse.json(
      { error: err.message || 'Something went wrong. Try again.' },
      { status: 500 }
    );
  }
}
