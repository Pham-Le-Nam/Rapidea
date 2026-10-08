import { InstructorProposal } from './instructor-proposal';

/** Course outlines describe proposed lectures, not navigable resources. */
export function courseStructurePlainText(text: string): string {
  const references = new Set<string>();
  let result = text.replace(
    /^[ \t]{0,3}\[([^\]\r\n]+)\]:[ \t]*(?:<[^>\r\n]+>|\S+)(?:[ \t]+(?:"[^"\r\n]*"|'[^'\r\n]*'|\([^\)\r\n]*\)))?[ \t]*$/gm,
    (_definition, label: string) => {
      references.add(label.toLowerCase());
      return '';
    },
  );
  // Bound nesting work; each pass is linear and also handles links in labels.
  for (let pass = 0; pass < 4; pass++) {
    const labels = delimiterPairs(result, '[', ']');
    const destinations = delimiterPairs(result, '(', ')');
    const parts: string[] = [];
    for (let index = 0; index < result.length; ) {
      if (result[index] === '\\' && index + 1 < result.length) {
        parts.push(result.slice(index, index + 2));
        index += 2;
        continue;
      }
      const labelStart =
        result[index] === '!' && result[index + 1] === '[' ? index + 1 : index;
      const labelEnd =
        result[labelStart] === '[' ? labels.get(labelStart) : undefined;
      if (labelEnd !== undefined) {
        const next = labelEnd + 1;
        const end =
          result[next] === '('
            ? destinations.get(next)
            : result[next] === '['
              ? labels.get(next)
              : undefined;
        const label = result.slice(labelStart + 1, labelEnd);
        if (end !== undefined || references.has(label.toLowerCase())) {
          parts.push(label);
          index = (end ?? labelEnd) + 1;
          continue;
        }
      }
      parts.push(result[index++]);
    }
    const next = parts.join('');
    if (next === result) break;
    result = next;
  }
  return result
    .replace(/<(?:https?:\/\/|mailto:)[^>\r\n]+>/gi, '')
    .replace(
      /\b(?:https?:\/\/|www\.)[^\s<>]+/gi,
      (url) => url.match(/[.,;!?]+$/)?.[0] ?? '',
    )
    .replace(/\/(?:course|post|file)\/[^\s<>]+/g, '')
    .replace(/[ \t]+([,.;:!?])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Immutable normalization for reviewed title/body/module text, not IDs/citations. */
export function courseStructurePlainProposal(
  proposal: InstructorProposal,
): InstructorProposal {
  return {
    ...proposal,
    title: courseStructurePlainText(proposal.title),
    body: courseStructurePlainText(proposal.body),
    items: proposal.items.map((item) => ({
      title: courseStructurePlainText(item.title),
      details: courseStructurePlainText(item.details),
    })),
  };
}

function delimiterPairs(
  text: string,
  open: string,
  close: string,
): Map<number, number> {
  const stack: number[] = [];
  const pairs = new Map<number, number>();
  let quote: string | null = null;
  for (let index = 0; index < text.length; index++) {
    const character = text[index];
    if (character === '\\') {
      index++;
      continue;
    }
    if (open === '(' && stack.length) {
      if (quote) {
        if (character === quote) quote = null;
        continue;
      }
      if (
        (character === '"' || character === "'") &&
        /[\s(]/.test(text[index - 1] ?? '')
      ) {
        quote = character;
        continue;
      }
      if (character === '<') {
        const end = text.indexOf('>', index + 1);
        if (end !== -1) {
          index = end;
          continue;
        }
      }
    }
    if (character === open) stack.push(index);
    else if (character === close && stack.length)
      pairs.set(stack.pop()!, index);
  }
  return pairs;
}
