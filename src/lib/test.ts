import { SpinnerResult, spinners } from "@tsmodule/spinners";
import { TestFn } from "../types";
import { printResult } from "./print";

export type TestOptions = {
  flushStdout?: boolean;
};

export const test = async (
  name: string,
  testFn: TestFn,
  { flushStdout = true }: TestOptions = {}
) => {
  try {
    const spinnerResult = await spinners(
      {
        [name]: async () => await testFn()
      },
      { flushStdout }
    );

    printResult(spinnerResult);
    return spinnerResult;
  } catch (spinnerResult) {
    printResult(spinnerResult as SpinnerResult);
    throw spinnerResult;
  }
};

export const tests = async (
  testConfigs: Record<string, TestFn>,
  { flushStdout = true }: TestOptions = {}
) => {
  try {
    const spinnerResult = await spinners(
      testConfigs,
      { flushStdout }
    );

    return spinnerResult;
  } catch (spinnerResult) {
    printResult(spinnerResult as SpinnerResult);
    throw spinnerResult;
  }
};