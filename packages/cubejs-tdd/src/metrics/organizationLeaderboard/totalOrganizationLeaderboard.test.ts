import { test, expect } from "vitest";
import { getTotalOrganizationLeaderboard } from "./totalOrganizationLeaderboard";

// set timeout to 10s

test("get total organization leaderboard", async () => {
  const results = await getTotalOrganizationLeaderboard();
  expect(results.orgsCurrent.length).toBeGreaterThan(0);
});
