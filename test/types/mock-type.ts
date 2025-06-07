export type MockType<T> = {
  [P in keyof T]: jest.Mock<T[P] extends (...arguments_: unknown[]) => infer U ? U : never>;
};
