#!/usr/bin/env node --loader=@tsmodule/tsmodule/loader --no-warnings
import { argv } from "process";
import { resolve } from "path";
import glob from "fast-glob";

import { clear, error, log, success } from "@tsmodule/log";
import { SpinnerResult } from "@tsmodule/spinners";

import { printResult } from "./lib/print";

const args = argv.slice(2);
const files: string[] = args.length ? args : glob.sync("./test/**/*.test.ts");

type RunResult = {
  file: string;
  spinnerResult: SpinnerResult;
};

export const runTests = async (...files: string[]) => {
  const results: RunResult[] = [];

  for (const file of files) {
    try {
      await import(resolve(process.cwd(), file));
    } catch (spinnerResult) {
      results.push({ file, spinnerResult: spinnerResult as SpinnerResult });
    }
  }

  return results;
};

// let successes = 0;
let failures = 0;
const runResults = await runTests(...files);
clear();

for (const result of runResults) {
  const { file, spinnerResult } = result;
  failures += spinnerResult.failures.length;
  // successes += spinnerResult.successes.length;

  log(`\n${file}`, ["bold", "underline"]);
  printResult(spinnerResult);
}

log("---", ["dim"]);

if (failures) {
  error(`${failures} test(s) failed.`, ["italic"]);
  process.exit(1);
} else {
  success("All tests passed.", ["italic"]);
  process.exit(0);
}