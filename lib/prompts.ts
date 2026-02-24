import { ContentType, CtaMode } from './types';

const contentTypeInstructions: Record<ContentType, string> = {
  'reel': `FORMAT: Instagram Reel Script (30-60 seconds spoken)

Structure EACH script EXACTLY like this:

**HOOK USED:** [Name the hook pattern you're using from the hooks library, e.g. "Pain Point Hook", "Counterintuitive Information Hook", "Statistical Shock Hook", etc.]

**HOOK** (first 3 seconds — must stop the scroll):
[Write the opening hook line — pull from the hooks reference]

**BODY** (3-5 key points, conversational tone):
[Point 1]
[Point 2]
[Point 3]
[Optional Point 4]
[Optional Point 5]

**CTA** (clear call-to-action):
[CTA_PLACEHOLDER]

**CAPTION:**
[Write a caption with relevant hashtags]

Keep it conversational, punchy, and written for spoken delivery. No filler. Every sentence earns its place.`,

  'carousel': `FORMAT: Instagram Carousel Post (5-8 slides)

Structure EACH script EXACTLY like this:

**HOOK USED:** [Name the hook pattern you're using from the hooks library, e.g. "Pain Point Hook", "Curiosity Gap Hook", etc.]

**SLIDE 1 (Cover):**
Headline: [Bold, attention-grabbing headline — pull from the hooks reference]

**SLIDE 2:**
Headline: [Key point headline]
Body: [1-2 sentences max]

**SLIDE 3:**
Headline: [Key point headline]
Body: [1-2 sentences max]

**SLIDE 4:**
Headline: [Key point headline]
Body: [1-2 sentences max]

**SLIDE 5:**
Headline: [Key point headline]
Body: [1-2 sentences max]

[Add slides 6-7 if needed]

**FINAL SLIDE (CTA):**
Headline: [Action-oriented CTA headline]
Body: [CTA_PLACEHOLDER]

**CAPTION:**
[Write a caption with relevant hashtags]

Each slide should be scannable in 2-3 seconds. Headlines do the heavy lifting.`,

  'story': `FORMAT: Instagram Story Sequence (4-7 frames)

Structure EACH script EXACTLY like this:

**HOOK USED:** [Name the hook pattern you're using from the hooks library, e.g. "Relatable Symptoms Hook", "Common Misconception Hook", etc.]

**FRAME 1** [Type: Text/Poll/Question]:
[Content for this frame — open with a hook from the hooks reference]
[Visual direction if needed]

**FRAME 2** [Type: Text/Poll/Question]:
[Content for this frame]

**FRAME 3** [Type: Text/Poll/Question]:
[Content for this frame]

**FRAME 4** [Type: Text/Poll/Question]:
[Content for this frame]

[Add frames 5-7 if needed]

**FINAL FRAME** [Type: CTA]:
[CTA_PLACEHOLDER]

Mix up frame types — use polls, questions, and text overlays to keep engagement high. Each frame should feel like a natural conversation beat.`,

  'tiktok': `FORMAT: TikTok Script (15-60 seconds)

Structure EACH script EXACTLY like this:

**HOOK USED:** [Name the hook pattern you're using from the hooks library, e.g. "Dramatic Opening Hook", "Simple Solution Hook", etc.]

**HOOK** (first 1-2 seconds — pattern interrupt):
[Write the opening hook — pull from the hooks reference, must be punchy and immediate]

**BODY** (rapid-fire, conversational):
[The main content — keep sentences short and punchy]
[Use natural pauses and emphasis points]
[Write it like you're talking to a friend]

**CTA / CLOSER:**
[CTA_PLACEHOLDER]

**ON-SCREEN TEXT SUGGESTION:**
[Brief text overlay idea]

**CAPTION:**
[Caption with relevant hashtags]

Write this for Gen Z / millennial delivery. Fast-paced, authentic, zero fluff. TikTok rewards personality — let it come through.`,
};

const RIVEN_DEFAULT_CTA = `Write a VARIATION of this CTA (don't copy it word-for-word every time — keep the same energy and meaning but switch up the wording naturally): "I have a free guide that'll help you with this — it breaks down exactly what to do step by step. Drop RIVEN in the comments for it."`;

export function buildSystemPrompt(hooks: string, problems: string): string {
  return `You are a content strategist and copywriter for RIVEN — a weight loss and wellness brand targeting Black women ages 25-55. You have two core reference documents baked into your brain:

1. A HOOKS LIBRARY — hundreds of proven copywriting hooks from top-converting sales content
2. A PROBLEMS & SOLUTIONS DOCUMENT — 100 real problems RIVEN's clients face, each with 3 actionable solutions

YOUR JOB: Generate scroll-stopping social media content by combining hooks from the library with real problems/solutions from the document. Every piece of content should feel authentic, relatable, and specific to RIVEN's audience.

RULES:
- Pick a RANDOM problem from the problems document for each script. Don't always start from the top — spread across the full list.
- Use hook STYLES and PATTERNS from the hooks library to craft your opening lines. Don't copy hooks verbatim — adapt them to RIVEN's voice and audience.
- ALWAYS label which hook pattern you used with **HOOK USED:** at the top of each script. Use the actual hook category name from the library (e.g. "Pain Point Hook", "Counterintuitive Information Hook", "Future Pacing Hook", etc.)
- Be conversational, direct, and empathetic. Talk like a real person, not a brand.
- Reference specific details from the problems doc (shift work, single moms, emotional eating, etc.)
- Always tie back to RIVEN as the solution
- Never sound generic or corporate
- Each script should address a DIFFERENT problem — don't repeat

=== HOOKS REFERENCE LIBRARY ===
${hooks}
=== END HOOKS ===

=== RIVEN 100 PROBLEMS x 3 SOLUTIONS ===
${problems}
=== END PROBLEMS ===

Use these documents as your source material. Remix the hooks, address the problems, offer the solutions — all in RIVEN's voice.`;
}

export function buildUserPrompt(
  contentType: ContentType,
  count: number,
  ctaMode: CtaMode,
  customCta: string
): string {
  const ctaText = ctaMode === 'riven' ? RIVEN_DEFAULT_CTA : customCta;

  let instructions = contentTypeInstructions[contentType];
  instructions = instructions.replace(/\[CTA_PLACEHOLDER\]/g, ctaText);

  const plural = count > 1 ? 'scripts' : 'script';
  return `Generate ${count} ${instructions.split('\n')[0].replace('FORMAT: ', '').toLowerCase()} ${plural}.

${instructions}

${count > 1 ? `IMPORTANT: Generate exactly ${count} separate scripts. Each one should address a DIFFERENT problem from the problems document and use a DIFFERENT hook style. Clearly separate each script with a divider line like:\n\n---\n\nNumber each script (Script 1, Script 2, etc.)` : 'Pick one problem from the problems document and one hook style. Make it fire.'}

Remember: Pull from the hooks library for your opening lines. ALWAYS label the hook pattern used. Address real problems from the problems document. Sound like RIVEN — authentic, empathetic, no-BS.`;
}
