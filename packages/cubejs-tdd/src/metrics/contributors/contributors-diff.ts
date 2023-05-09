import { DateRange } from "@cubejs-client/core";
import {
  MOCK_PROJECT_LINUX_ID,
  calculatePercentageChange,
  getPreviousPeriod,
} from "../../utils";
import { contributorsTotal } from "./contributors-total";

interface params {
  projectId?: string;
  dateRange?: DateRange;
}

export async function getContributorsPeriodsDiff({
  projectId = MOCK_PROJECT_LINUX_ID,
  dateRange = ["2023-01-01", "2023-12-30"],
}: params = {}) {
  let from, to;
  if (dateRange === undefined) {
    // is all time  that is same that 10Y
    from = new Date().toISOString().split("T")[0];
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    to = tenYearsAgo.toISOString().split("T")[0];
  } else {
    from = dateRange[0];
    to = dateRange[1];
  }

  const currentPeriod = [from, to];
  const previousPeriod = getPreviousPeriod(from, to);

  const currentTotal = await contributorsTotal({
    projectId,
    dateRange: currentPeriod as any,
  });

  const previousTotal = await contributorsTotal({
    projectId,
    dateRange: previousPeriod,
  });

  const diff = calculatePercentageChange(previousTotal, currentTotal);
  // console.log("> test", {
  //   currentPeriod,
  //   previousPeriod,
  //   currentTotal,
  //   previousTotal,
  //   diff,
  // });
  return {
    currentPeriod,
    previousPeriod,
    currentTotal,
    previousTotal,
    diff,
  };
}
