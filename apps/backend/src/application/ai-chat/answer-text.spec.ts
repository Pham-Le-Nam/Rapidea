import { withoutTrailingFollowUp } from './answer-text';

describe('withoutTrailingFollowUp', () => {
  it.each([
    ['A useful review.\n\nReview the plan?', 'Review the plan?', 'A useful review.'],
    ['A review. Review the plan? Review the plan?', 'Review the plan?', 'A review.'],
    ['A review.\nBạn muốn xem ví dụ không?', 'Bạn muốn xem ví dụ không?', 'A review.'],
    ['A review. See (a+b)?', 'See (a+b)?', 'A review.'],
    ['A review. Show\nme an example?', 'Show me an example?', 'A review.'],
    ['Why? Here is why.', 'Why?', 'Why? Here is why.'],
    ['A useful answer.', 'Next step?', 'A useful answer.'],
  ])('normalizes trailing follow-ups without changing body text', (answer, question, expected) => {
    expect(withoutTrailingFollowUp(answer, question)).toBe(expected);
  });
});
