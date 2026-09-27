import { TiktokenTokenCounterService } from './tiktoken-token-counter.service';

describe('TiktokenTokenCounterService', () => {
  it('counts and truncates text with the same tokenizer', () => {
    const service = new TiktokenTokenCounterService();
    const text = 'Dependency injection separates construction from use.';
    const truncated = service.truncate(text, 4);

    expect(service.count(text)).toBeGreaterThan(4);
    expect(service.count(truncated)).toBeLessThanOrEqual(4);
    expect(text.startsWith(truncated)).toBe(true);
  });

  it('returns an empty value for a non-positive token limit', () => {
    const service = new TiktokenTokenCounterService();

    expect(service.truncate('content', 0)).toBe('');
  });
});
