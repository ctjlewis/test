#!/usr/bin/env tsmodule
import { argv } from "process";
import { resolve } from "path";
import glob from "fast-glob";

import { clear, error, log, success } from "@tsmodule/log";
import { SpinnerResult } from "@tsmodule/spinners";

import { printResult } from "./lib/print";
import { pathToFileURL } from "url";

const args = argv.slice(2);
const files: string[] = args.length ? args : glob.sync("./test/**/*.test.ts");

type RunResult = {
  file: string;
  spinnerResult: SpinnerResult;
};

export const runTests = async (...files: string[]) => {
  const failureResults: RunResult[] = [];

  for (const file of files) {
    try {
      const url = pathToFileURL(resolve(process.cwd(), file));
      await import(url.href);
    } catch (spinnerResult) {
      failureResults.push({
        file,
        spinnerResult: spinnerResult as SpinnerResult
      });
      continue;
    }
  }

  return failureResults;
};

const runResults = await runTests(...files) || [];
clear();

for (const result of runResults) {
  const { file, spinnerResult } = result;

  log(`\n${file}`, ["bold", "underline"]);
  printResult(spinnerResult);
}

log("---", ["dim"]);

const failures = runResults.length;
if (failures) {
  error(`${failures} test(s) failed.`, ["italic"]);
  process.exit(1);
} else {
  success("All tests passed.", ["italic"]);
  process.exit(0);
}