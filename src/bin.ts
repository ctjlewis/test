#!/usr/bin/env bun

import * as glob from "fast-glob"
import { runTests } from "./lib/run";

const args = process.argv.slice(2);
const files: string[] = args.length ? args : glob.sync("./test/**/*.test.ts");

await runTests(...files);