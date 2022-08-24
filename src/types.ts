export interface TestUtilities {
  shouldBeEqual: (value1: unknown, value2: unknown) => void;
  shouldBeTruthy: (value: unknown) => void;
  shouldBeFalsy: (value: unknown) => void;
  shouldThrow: (value: unknown) => void;
  shouldNotThrow: (value: unknown) => void;
};

export interface TestContext extends TestUtilities {
  cwd: string;
};

export type TestFn = (t: TestContext) => void | Promise<void>;

export type Test = {
  name: string;
  cwd: string;
};
