import { shouldBeEqual, shouldThrow } from "../src";
import { tests, sleep } from "../src/lib";

await tests({
  "should throw": async () => {
    await sleep(2000);
    await shouldThrow(async () => {
      await sleep(1000);
      throw "test";
    });
  },
  "something should do a thing": async () => {
    await sleep(3000);
  },
  "something should happen": async () => {
    await sleep(5000);
    shouldBeEqual(5, 5);
  },
});
