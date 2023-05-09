// src/sum.test.ts
import { test, expect } from "vitest";
import { contributorsTotal } from "./contributors-total";

test("get total counts", async () => {
  const results = await contributorsTotal();
  expect(results).gt(0);
});
