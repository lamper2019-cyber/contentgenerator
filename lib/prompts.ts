import { ContentType, CtaMode } from './types';

function getProblemsLabel(n: number): string {
  if (n === 1) return `**PROBLEM ADDRESSED:** Problem #[number] — "[quote the problem text]"`;
  return Array.from({ length: n }, (_, i) =>
    `**PROBLEM ${i + 1}:** Problem #[number] — "[quote the problem text]"`
  ).join('\n');
}

function buildReelFormat(problemsPerScript: number): string {
  const pLabel = getProblemsLabel(problemsPerScript);
  return `FORMAT: Instagram Reel Script (30-60 seconds spoken)

Structure EACH script EXACTLY like this:

---
${pLabel}
**HOOK USED:** [EXACT ALL-CAPS hook name from the Big Fat Hooks doc]
---

**HOOK** (first 3 seconds — must stop the scroll):
[Write the opening line using the pattern from the named hook above, adapted for RIVEN's audience]

**BODY** (3-5 key points, conversational tone):
${problemsPerScript > 1 ? '[Address each problem listed above and weave their solutions together naturally]' : '[Address the problem directly, use one of the 3 solutions from the problems doc]'}
[Point 2]
[Point 3]
[Optional Point 4]
[Optional Point 5]

**CTA** (clear call-to-action):
[CTA_PLACEHOLDER]

**CAPTION:**
[Write a caption with relevant hashtags]

Keep it conversational, punchy, and written for spoken delivery. No filler. Every sentence earns its place.`;
}

function buildCarouselFormat(problemsPerScript: number): string {
  const pLabel = getProblemsLabel(problemsPerScript);
  return `FORMAT: Instagram Carousel Post (5-8 slides)

Structure EACH script EXACTLY like this:

---
${pLabel}
**HOOK USED:** [EXACT ALL-CAPS hook name from the Big Fat Hooks doc]
---

**SLIDE 1 (Cover):**
Headline: [Bold, attention-grabbing headline using the named hook pattern]

**SLIDE 2:**
Headline: [Key point headline]
Body: [1-2 sentences max — pull from the solutions in the problems doc]

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

Each slide should be scannable in 2-3 seconds. Headlines do the heavy lifting.`;
}

function buildStoryFormat(problemsPerScript: number): string {
  const pLabel = getProblemsLabel(problemsPerScript);
  return `FORMAT: Instagram Story Sequence (4-7 frames)

Structure EACH script EXACTLY like this:

---
${pLabel}
**HOOK USED:** [EXACT ALL-CAPS hook name from the Big Fat Hooks doc]
---

**FRAME 1** [Type: Text/Poll/Question]:
[Content for this frame — open with the named hook pattern adapted for RIVEN]
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

Mix up frame types — use polls, questions, and text overlays to keep engagement high. Each frame should feel like a natural conversation beat.`;
}

function buildTiktokFormat(problemsPerScript: number): string {
  const pLabel = getProblemsLabel(problemsPerScript);
  return `FORMAT: TikTok Script (15-60 seconds)

Structure EACH script EXACTLY like this:

---
${pLabel}
**HOOK USED:** [EXACT ALL-CAPS hook name from the Big Fat Hooks doc]
---

**HOOK** (first 1-2 seconds — pattern interrupt):
[Write the opening hook using the named hook pattern, adapted for RIVEN's audience]

**BODY** (rapid-fire, conversational):
${problemsPerScript > 1 ? '[Address all listed problems and weave their solutions together naturally]' : '[Address the problem, deliver the solution]'}
[Keep sentences short and punchy]
[Write it like you're talking to a friend]

**CTA / CLOSER:**
[CTA_PLACEHOLDER]

**ON-SCREEN TEXT SUGGESTION:**
[Brief text overlay idea]

**CAPTION:**
[Caption with relevant hashtags]

Write this for Gen Z / millennial delivery. Fast-paced, authentic, zero fluff. TikTok rewards personality — let it come through.`;
}

const formatBuilders: Record<ContentType, (n: number) => string> = {
  reel: buildReelFormat,
  carousel: buildCarouselFormat,
  story: buildStoryFormat,
  tiktok: buildTiktokFormat,
};

const RIVEN_DEFAULT_CTA = `Write a VARIATION of this CTA (don't copy it word-for-word every time — keep the same energy and meaning but switch up the wording naturally): "I have a free guide that'll help you with this — it breaks down exactly what to do step by step. Drop RIVEN in the comments for it."`;

export function buildSystemPrompt(hooks: string, problems: string): string {
  return `You are writing content as Sean — the voice behind RIVEN, a weight loss and wellness brand for Black women ages 25-55.

=== SEAN'S VOICE ===
Talk like a real person. Not a coach. Not a brand. Not AI. Sean is a Black man who genuinely cares about the women in his life and built something to help them stop running on empty.

The energy: Big brother who checks in on you. Husband who notices you haven't been eating right. The one person who says what everybody else is thinking but won't say — and says it with love.

How he talks:
- Code-switches naturally the way real people do. Professional when it makes sense, relaxed when it doesn't. Reads the room.
- Talks TO her, not AT her. Never lecturing. Never above her. It's a conversation, not a presentation.
- Says things like "look" and "here's the thing" and "I'm just being honest with you." Starts thoughts mid-stream sometimes like people actually do in real conversations.
- Doesn't over-explain. Trusts her intelligence. If she gets it, move on.
- Uses feeling over numbers. Instead of breaking down costs, it's "you already know you're spending too much on food that's not even making you feel good." She knows. You're just saying it out loud for her.

What he's NOT: Not a guru. Not a hype man. Not motivational speaker energy. Not wellness bro. Not "king and queen" talk. Not overly polished. Not trying to sound smart. Not robotic. Not generic.

What he IS: Honest. Warm. A little funny when the moment calls for it. Protective without being controlling. The kind of voice that makes you feel like somebody's actually in your corner.

The undercurrent: "You take care of everybody. Let me handle this part for you."
=== END VOICE ===

You have TWO reference documents:

1. THE BIG FAT HOOKS LIBRARY — 250+ named hook patterns. Each has an ALL-CAPS name ending in "HOOK" (e.g. "HIDDEN CAUSE REVELATION HOOK", "COUNTERINTUITIVE INFORMATION HOOK", "DRAMATIC TRANSFORMATION HOOK", "QUIZ ENGAGEMENT HOOK", "CONSPIRACY IMPLICATION HOOK", "EXPERT SKEPTICISM HOOK", "PAINFUL CONFESSION HOOK", "SCARCITY HOOK", "INTRIGUING QUESTION HOOK", etc.)

2. THE 100 PROBLEMS DOCUMENT — 100 numbered problems RIVEN's clients face, each with 3 pre-built solutions.

=== CRITICAL RULES ===

HOOKS — THIS IS NON-NEGOTIABLE:
- Every script MUST use a DIFFERENT named hook from the Big Fat Hooks library.
- Use the EXACT ALL-CAPS name as it appears in the document (e.g. "COUNTERINTUITIVE SOLUTION HOOK" not "Counterintuitive Hook").
- BANNED from overuse: Do NOT use PROBLEM-SOLUTION FORMAT HOOK or FUTURE PACING HOOK more than once per 10 generations. These are lazy defaults. There are 250+ other hooks — USE THEM.
- Rotate WIDELY. Use revelation hooks, quiz hooks, myth-busting hooks, credibility hooks, transformation hooks, urgency hooks, confession hooks, scarcity hooks, testimonial hooks, conspiracy hooks, intriguing question hooks, etc.
- NEVER repeat a hook name within the same generation.

PROBLEMS:
- Reference the problem NUMBER and quote the exact problem text from the doc.
- Solutions should come from the 3 pre-built solutions listed under that problem.
- Pick DIFFERENT problems for each script. Spread randomly across all 100.

VOICE:
- Write EVERYTHING in Sean's voice. If it sounds like it could come from any brand, it's wrong. It should sound like SEAN.

=== HOOKS REFERENCE LIBRARY ===
${hooks}
=== END HOOKS ===

=== RIVEN 100 PROBLEMS x 3 SOLUTIONS ===
${problems}
=== END PROBLEMS ===`;
}

export function buildUserPrompt(
  contentType: ContentType,
  count: number,
  problemsPerScript: number,
  ctaMode: CtaMode,
  customCta: string
): string {
  const ctaText = ctaMode === 'riven' ? RIVEN_DEFAULT_CTA : customCta;

  let instructions = formatBuilders[contentType](problemsPerScript);
  instructions = instructions.replace(/\[CTA_PLACEHOLDER\]/g, ctaText);

  // Random seed to force different selections each time
  const seed = Math.floor(Math.random() * 100);
  const startProblem = (seed % 100) + 1;
  const hookOffset = Math.floor(Math.random() * 250) + 1;

  const plural = count > 1 ? 'scripts' : 'script';
  const problemsNote = problemsPerScript > 1
    ? `Each script should address ${problemsPerScript} DIFFERENT problems from the 100 problems doc and weave their solutions together into one cohesive script.`
    : `Each script should address 1 problem from the 100 problems doc.`;

  return `Generate ${count} ${instructions.split('\n')[0].replace('FORMAT: ', '').toLowerCase()} ${plural}.

RANDOMIZATION SEED: Start near problem #${startProblem} and use hooks from around entry #${hookOffset} in the hooks library. Do NOT start from the top of either document.

${problemsNote}

${instructions}

${count > 1 ? `IMPORTANT: Generate exactly ${count} separate scripts. REQUIREMENTS:
- Each script MUST use a COMPLETELY DIFFERENT named hook (different ALL-CAPS hook name). Zero repeats.
- Each script MUST address DIFFERENT problems (no overlapping problem numbers).
- Spread your hook choices WIDELY — use hooks from totally different categories.
- Clearly separate each script with:

===

Number each script (Script 1, Script 2, etc.)` : `Pick ${problemsPerScript} problem${problemsPerScript > 1 ? 's' : ''} starting near #${startProblem} and one SPECIFIC named hook from around entry #${hookOffset} in the Big Fat Hooks library. Use the EXACT ALL-CAPS hook name.`}

Write in Sean's voice. Every word should sound like him — not a brand, not AI, not a coach. A real person who gives a damn.`;
}
