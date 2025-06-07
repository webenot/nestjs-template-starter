import { Module } from '@nestjs/common';

import { TestApiModule } from './test-api/test-api.module';

const modules = [TestApiModule];

@Module({
  imports: modules,
  exports: modules,
})
export class GuestsApiModule {}
