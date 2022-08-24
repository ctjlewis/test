import { resolve } from "path";
import { shouldBeEqual, shouldBeFalsy, shouldBeTruthy, shouldNotThrow, shouldThrow } from "./lib/utils";
import { TestContext, TestFn } from "./types";

interface TestResult {
  name: string;
  failed: boolean;
}

const toEnvKey = (name: string) => {
  return name.replace(/[^A-Za-z0-9]/g, "_").toUpperCase();
}

export const test = (
  name: string,
  testFn: TestFn,
  cwd = process.cwd(),
) => {
  const envKey = toEnvKey(name);
  process.env["TESTS"] =
    process.env["TESTS"] 
      ? `${process.env["TESTS"]},${envKey}` 
      : envKey; 

  (async () => {
    process.chdir(cwd);

    const context: TestContext = {
      cwd,
      shouldBeEqual,
      shouldBeTruthy,
      shouldBeFalsy,
      shouldThrow,
      shouldNotThrow,
    };

    process.env[`${envKey}_NAME`] = name;
    try {
      await testFn(context);
      process.env[`${envKey}_PASS`] = "pass";
    } catch (e) {
      process.env[`${envKey}_FAIL`] = e.message;
    }
  })();
};

type TestResults = Map<String, TestResult>;

const aggregateResults = (results: TestResults) => {
  let passed = 0;
  let failed = 0;

  for (const result of results.values()) {
    if (result.failed) {
      failed++;
    } else {
      passed++;
    }
  }

  return { passed, failed };
}

const loopUntilFinished = async (): Promise<TestResults> => {
  const results: TestResults = new Map();

  return await new Promise(
    (resolve) => {
      const interval = setInterval(
        () => {
          const tests = process.env["TESTS"]?.split(",") || [];
    
          for (const test of tests) {
            const name = process.env[`${test}_NAME`];
            const pass = process.env[`${test}_PASS`];
            const fail = process.env[`${test}_FAIL`];
    
            if (pass) {
              results.set(test, { name, failed: false });
            } else if (fail) {
              results.set(test, { name, failed: true });
            }
          }

          const { passed, failed } = aggregateResults(results);
          console.log(`${passed} passed, ${failed} failed`);

          if (results.size === tests.length) {
            clearInterval(interval);
            resolve(results);
          }
        },
        1000,
      );
    }
  );
}

export const runTests = async (...files: string[]) => {
  for (const file of files) {
    await import(resolve(process.cwd(), file));
  }

  const results = await loopUntilFinished();
  for (const [test, result] of results) {
    if (result.failed) {
      console.log(`✗ ${test}`);
    } else {
      console.log(`✓ ${test}`);
    }
  }

  const { failed } = aggregateResults(results);
  if (failed > 0) {
    process.exit(1);
  }

  process.exit(0);
}