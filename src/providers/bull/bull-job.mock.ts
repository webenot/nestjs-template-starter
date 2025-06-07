import { faker } from '@faker-js/faker';
import type { Job } from 'bull';

jest.mock('bull');

export const getValidBullJobMock = (): Partial<Job> => ({
  data: faker.word.noun(),
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  remove: jest.fn(),
});
