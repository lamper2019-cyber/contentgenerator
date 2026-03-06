import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSlidesSystemPrompt, buildSlidesUserPrompt } from '@/lib/prompts';
import { getProblems } from '@/lib/content-loader';

export async function POST() {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server API key not configured.' },
        { status: 500 }
      );
    }

    const problems = getProblems();

    const client = new Anthropic({ apiKey });

    const systemPrompt = buildSlidesSystemPrompt(problems);
    const userPrompt = buildSlidesUserPrompt();

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 2048,
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
        { error: 'API key issue. Contact Sean.' },
        { status: 401 }
      );
    }

    if (err.status === 429) {
      return NextResponse.json(
        { error: 'Rate limited. Wait a moment and try again.' },
        { status: 429 }
      );
    }

    console.error('Slides generation error:', error);
    return NextResponse.json(
      { error: err.message || 'Something went wrong. Try again.' },
      { status: 500 }
    );
  }
}
