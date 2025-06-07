import { Prop } from '@nestjs/mongoose';
import type { Document } from 'mongoose';

import type { IBaseSchema } from './types';

export type TBaseSchema = BaseSchema & Document;

export abstract class BaseSchema implements IBaseSchema {
  createdAt: Date;
  updatedAt: Date;

  @Prop({
    type: String,
    required: false,
    default: function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this?._id || '';
    },
  })
  id: string;
}
