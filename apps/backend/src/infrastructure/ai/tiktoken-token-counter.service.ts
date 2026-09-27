import { Injectable } from '@nestjs/common';
import { getEncoding } from 'js-tiktoken';
import { TokenCounterPort } from '../../application/ports/token-counter.port';

@Injectable()
export class TiktokenTokenCounterService implements TokenCounterPort {
  private readonly tokenizer = getEncoding('cl100k_base');

  count(text: string): number {
    return this.tokenizer.encode(text).length;
  }

  truncate(text: string, maxTokens: number): string {
    if (maxTokens <= 0) return '';
    const tokens = this.tokenizer.encode(text);
    if (tokens.length <= maxTokens) return text;
    return this.tokenizer.decode(tokens.slice(0, maxTokens)).trimEnd();
  }
}
