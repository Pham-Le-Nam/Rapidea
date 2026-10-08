import {
  courseStructurePlainText,
  courseStructurePlainProposal,
} from './course-structure-text';
import { InstructorProposalKind } from './instructor-proposal';

describe('courseStructurePlainText', () => {
  it.each([
    ['[Real analysis](#real-analysis)', 'Real analysis'],
    ['[Real analysis](/course/abc)', 'Real analysis'],
    ['[Real analysis](/course/abc "Course title")', 'Real analysis'],
    ["[Real analysis](/course/abc 'Course title')", 'Real analysis'],
    [
      '[Real analysis](<https://example.com/math_(advanced)> "Course ) title")',
      'Real analysis',
    ],
    ['[Real analysis](https://example.com/math_(advanced))', 'Real analysis'],
    ['[Real analysis](javascript:alert(1))', 'Real analysis'],
    ['[Real analysis](data:text/plain,(example))', 'Real analysis'],
    ['![Lecture diagram](https://example.com/image.png)', 'Lecture diagram'],
    ['[**Real analysis**](#real)', '**Real analysis**'],
    ['[Real [analysis]](#real)', 'Real [analysis]'],
    ['[See [analysis](#inner)](#outer)', 'See analysis'],
    [
      '[Real analysis][ref]\n\n[ref]: https://example.com "Reference"',
      'Real analysis',
    ],
    ['[Real analysis][]\n\n[Real analysis]: /course/abc', 'Real analysis'],
    [
      '[Real analysis]\n\n[Real analysis]: https://example.com',
      'Real analysis',
    ],
    [
      'Lectures: real analysis. See <https://example.com>.',
      'Lectures: real analysis. See.',
    ],
    ['Real analysis https://example.com.', 'Real analysis.'],
    ['Real analysis www.example.com.', 'Real analysis.'],
    ['Real analysis — [R1].', 'Real analysis — [R1].'],
    [
      'Limits on [a,b] and derivatives f(x).',
      'Limits on [a,b] and derivatives f(x).',
    ],
  ])('keeps readable content from %s', (input, expected) => {
    expect(courseStructurePlainText(input)).toBe(expected);
  });
  it('handles unclosed delimiters without throwing or unbounded nesting recursion', () => {
    const text = 'Lectures ' + '['.repeat(10000);
    expect(courseStructurePlainText(text)).toBe(text);
  });
  it('normalizes proposal fields without mutating the original proposal', () => {
    const original = {
      kind: InstructorProposalKind.COURSE_STRUCTURE,
      title: '[Advanced math](#math)',
      body: 'Topics: [analysis](https://example.com).',
      items: [
        {
          title: '[Real analysis](#real)',
          details: 'Proofs. [Exercises](/post/id "Exercises")',
        },
      ],
    };
    expect(courseStructurePlainProposal(original)).toEqual({
      kind: InstructorProposalKind.COURSE_STRUCTURE,
      title: 'Advanced math',
      body: 'Topics: analysis.',
      items: [{ title: 'Real analysis', details: 'Proofs. Exercises' }],
    });
    expect(original.title).toBe('[Advanced math](#math)');
    expect(original.items[0].details).toContain('/post/id');
  });
});
