import { TestContext, TestFn } from "../types";
import { shouldBeEqual, shouldBeFalsy, shouldBeTruthy, shouldNotThrow, shouldThrow } from "./shouldBe";

const toEnvKey = (name: string) => {
  return name.replace(/[^A-Za-z0-9]/g, "_").toUpperCase();
}

export const test = async (
  name: string,
  testFn: TestFn,
  cwd = process.cwd(),
): Promise<void> => {
  const envKey = toEnvKey(name);

  process.chdir(cwd);
  process.env["TESTS"] =
    process.env["TESTS"]
      ? `${process.env["TESTS"]},${envKey}`
      : envKey;

  const context: TestContext = {
    cwd,
  };

  process.env[`${envKey}_NAME`] = name;
  try {
    await testFn(context);
    process.env[`${envKey}_PASS`] = "pass";
  } catch (e) {
    process.env[`${envKey}_FAIL`] = e.message;
    throw e;
  }
};

export const tests = (
  ...args: ReturnType<typeof test>[]
) => {
  Promise.allSettled(args);
}