import { SpinnerResult, spinners } from "@tsmodule/spinners";
import { TestFn } from "../types";
import { printResult } from "./print";

export const test = async (
  name: string,
  testFn: TestFn,
) => {
  try {
    const spinnerResult = await spinners({
      [name]: async () => await testFn()
    });

    printResult(spinnerResult);
    return spinnerResult;
  } catch (spinnerResult) {
    printResult(spinnerResult as SpinnerResult);
    throw spinnerResult;
  }
};

export const tests = async (
  testConfigs: Record<string, TestFn>,
) => {
  try {
    const result = await spinners(testConfigs);
    return result;
  } catch (spinnerResult) {
    printResult(spinnerResult as SpinnerResult);
    throw spinnerResult;
  }
};