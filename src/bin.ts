#!/usr/bin/env bun

import { runTests } from ".";

// import { style } from "bun-style";

// console.log(
//   "\n\n",
//   style(" Running tests... ", ["bold", "underline", "grey"]),
//   "\n\n",
//   style(" ✓ 10 tests passed", ["green"]),
//   "\n\n",
// );

await runTests("./test/index.test.ts");
// console.log("done");