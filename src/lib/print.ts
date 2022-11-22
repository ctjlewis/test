import { error, group, log } from "@tsmodule/log";
import { SpinnerResult } from "@tsmodule/spinners";

export const printResult = (
  spinnerResult: SpinnerResult
) => {
  const { successes = [], failures = [] } = spinnerResult;

  group.start("Failed");
  for (const [name, errorText] of failures) {
    error(`✗  ${name}`, ["bold"], { level: 1, newlines: 0 });
    group.start();
    error(`   ${errorText}`, ["dim"]);
    group.end();
  }
  group.end();

  group.start("Successful");
  for (const name of successes) {
    log(`✔  ${name}`, ["bold", "dim", "green"], { level: 1, newlines: 1 });
  }
  group.end();
};