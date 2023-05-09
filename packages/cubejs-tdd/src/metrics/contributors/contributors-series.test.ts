// src/sum.test.ts
import { test, expect } from "vitest";
import { contributorsSeries } from "./contributors-series";

test("get contributors series", async () => {
  const results = await contributorsSeries();
  expect(results.length).gt(1);
  // /{
  //   "x": "2023-04-17T00:00:00.000",
  //   "xValues": [
  //     "2023-04-17T00:00:00.000"
  //   ],
  //   "Members.count": 10
  // },
  expect(results[0]["Members.count"]).not.null;
  expect(results[0]["Members.count"]).gt(0);
  expect(new Date(results[0]["x"])).toBeInstanceOf(Date);
});
