import { SpinnerConfigs, spinners } from "bun-spinners";
import { resolve } from "path";
import { TestResults } from "../types";

const waitForTests = async (): Promise<TestResults> => {
  const results: TestResults = new Map();
  const tests = process.env["TESTS"]?.split(",") || [];

  const testSpinners: SpinnerConfigs = {};
  for (const test of tests) {
    const name = process.env[`${test}_NAME`];

    testSpinners[name] = async () => {
      return await new Promise(
        (resolve, reject) => {
          const interval = setInterval(
            async () => {
              const pass = process.env[`${test}_PASS`];
              const fail = process.env[`${test}_FAIL`];

              if (pass) {
                clearInterval(interval);
                results.set(test, { name, failed: false });
                resolve();
              }

              if (fail) {
                clearInterval(interval);
                results.set(test, { name, failed: true, error: fail });
                reject(fail);
              }
            },
            100
          );
        }
      );
    };
  }

  try {
    await spinners(testSpinners);
  } catch (e) { }

  return results;
}

export const runTests = async (...files: string[]) => {
  await Promise.all(
    files.map(
      async (file) => await import(resolve(process.cwd(), file))
    )
  );

  let passed = 0;
  let failed = 0;

  const results = await waitForTests();
  for (const result of results.values()) {
    if (!result.failed) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log(`${passed} passed, ${failed} failed\n`);
  return results;
}