export interface TestContext {
  cwd: string;
};

export type TestFn = (t: TestContext) => void | Promise<void>;

export type Test = {
  name: string;
  cwd: string;
};

export type TestResults = Map<string, TestResult>;
export interface TestResult {
  name: string;
  failed: boolean;
  error?: string;
}
