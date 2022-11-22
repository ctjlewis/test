import { shouldBeEqual, shouldThrow } from "../src";
import { tests, sleep } from "../src/lib";

await tests({
  "a second time: something should do a thing": async () => {
    await sleep(3000);
  },
  "a second time: something should happen": async () => {
    await sleep(5000);
    shouldBeEqual(5, 5);
  },
  "a second time: should throw": async () => {
    await sleep(2000);
    await shouldThrow(async () => {
      throw "test";
    });
  },
  "should throw a second time": async () => {
    await sleep(2000);
    await shouldThrow(async () => {
      await sleep(1000);
      throw "test";
    });
  }
});
