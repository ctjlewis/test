import { SpinnerResult, spinners } from "@tsmodule/spinners";
import { TestFn } from "../types";
import { printResult } from "./print";

export type TestOptions = {
  flush?: boolean;
};

export const test = async (
  name: string,
  testFn: TestFn,
  { flush = false }: TestOptions = {}
) => {
  try {
    const spinnerResult = await spinners(
      {
        [name]: async () => await testFn()
      },
      { flush }
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
  { flush = false }: TestOptions = {}
) => {
  try {
    const spinnerResult = await spinners(
      testConfigs,
      { flush }
    );

    return spinnerResult;
  } catch (spinnerResult) {
    printResult(spinnerResult as SpinnerResult);
    throw spinnerResult;
  }
};