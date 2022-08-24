import { test } from "../src";

test("first test", async (t) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
})

test("second test", async (t) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  t.shouldBeEqual(1, 1);
})