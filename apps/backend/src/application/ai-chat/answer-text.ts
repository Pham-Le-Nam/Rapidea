/** Keep the dedicated follow-up field from also appearing at the end of an answer. */
export function withoutTrailingFollowUp(answer: string, followUp: string): string {
  const question = followUp.trim();
  if (!question) return answer.trim();
  const pattern = question.split(/\s+/)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('\\s+');
  return answer.trim().replace(new RegExp(`(?:\\s*${pattern})+$`, 'u'), '').trim();
}
