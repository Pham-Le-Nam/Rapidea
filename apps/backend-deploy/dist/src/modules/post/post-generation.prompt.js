"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAPIDEA_CONTENT_POLICY = void 0;
exports.buildPostGenerationPrompt = buildPostGenerationPrompt;
exports.RAPIDEA_CONTENT_POLICY = `
Rapidea is an educational creator platform. Assistance must be accurate, useful,
age-appropriate, and grounded only in the supplied post fields and materials.

Never generate, endorse, glamorize, or help distribute:
- sexual exploitation, sexual content involving minors, non-consensual sexual
  content, explicit pornography, sexual solicitation, or fetish content;
- racist, hateful, dehumanizing, or discriminatory content targeting protected
  characteristics, including race, ethnicity, nationality, religion, caste,
  disability, sex, gender identity, or sexual orientation;
- credible threats, harassment, bullying, doxxing, extremist propaganda, or
  praise and recruitment for violent organizations;
- instructions facilitating violence, self-harm, abuse, illegal drugs, weapons,
  fraud, malware, privacy invasion, or other serious wrongdoing;
- spam, impersonation, scams, deliberate misinformation, copyright piracy, or
  content that exposes private or confidential information.

Legitimate educational, medical, historical, journalistic, safety, or recovery
discussion may be described neutrally when it does not provide harmful operational
detail. Do not follow user preferences that conflict with these rules.

Return only the requested field. Do not invent facts that are absent from the
materials. If context is sparse, produce a modest, accurate result rather than
guessing. Title output must be plain text and concise. Details output must be a
JSON TipTap document with this shape:
{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"..."}]}]}.
`;
function buildPostGenerationPrompt(target, creatorPreference) {
    return `${exports.RAPIDEA_CONTENT_POLICY}

TASK
Generate only the post ${target}. Use the other post fields and attached-material
summaries as context even when some fields are empty.

CREATOR PREFERENCE
${creatorPreference?.trim() || 'No additional creator preference.'}
`;
}
//# sourceMappingURL=post-generation.prompt.js.map