import { shouldBeEqual, shouldThrow } from "../src";
import { test, tests } from "../src/lib/test";

const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms));

tests(
  test("something should do a thing", async () => {
    await sleep(3000);
  }),
  test("something should happen", async () => {
    await sleep(5000);
    shouldBeEqual(1, 5);
  }),
  test("should throw", async () => {
    await sleep(2000);
    await shouldThrow(async () => {
      await sleep(1000);
      throw "test";
    });
    // shouldThrow(async () => {
    //   // await sleep(3000);
    //   // throw "Test"
    // })
  })
);