import { plainToInstance } from 'class-transformer';

import { objectFromBase64, objectToBase64 } from '../../../../../modules/utils/buffer';

export class PaginationCursorDto<M = undefined> {
  type: 'string' | 'number' | 'object';
  private value: string | number | undefined;
  lastId: string;
  meta: M;

  static toBase64<M>(value?: string | number | Date | null, lastId?: string, cursorMeta?: M): string {
    return objectToBase64({
      meta: cursorMeta,
      type: typeof value,
      value,
      lastId,
    });
  }

  static fromBase64<M>(cursorReference: string): PaginationCursorDto<M> {
    const cursor = objectFromBase64(cursorReference);
    const cls = PaginationCursorDto<M>;
    return plainToInstance(cls, cursor);
  }

  getValue(): string | number | Date | undefined {
    switch (this.type) {
      case 'object':
        if (!this.value) {
          return;
        }
        return new Date(this.value);
      case 'number':
        return Number(this.value);
      default:
        return this.value;
    }
  }
}
