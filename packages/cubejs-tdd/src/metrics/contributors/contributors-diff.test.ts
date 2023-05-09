import { test, expect } from "vitest";
import { getContributorsPeriodsDiff } from "./contributors-diff";

// set timeout to 10s


test("get contributors series default", async () => {
  const results = await getContributorsPeriodsDiff();
  expect(results.diff).gt(1);

});
test("get contributors series 5 months", async () => {
  const r2 = await getContributorsPeriodsDiff({
    dateRange: ["2023-01-01", "2023-05-01"],
  });
  expect(r2.diff).gt(1);
});
test("get contributors series 10Y", async () => {
 
  const r3 = await getContributorsPeriodsDiff({
    dateRange: ["2013-01-01", "2023-01-01"],
  });
  expect(r3.diff).gt(1);
});
