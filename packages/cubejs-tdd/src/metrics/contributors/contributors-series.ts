import {
  DateRange,
  PivotConfig,
  Query,
  TimeDimensionGranularity,
} from "@cubejs-client/core";
import { cubejsApi } from "../../services/cube-api";
import { MOCK_PROJECT_LINUX_ID } from "../../utils";

const pivotConfig: PivotConfig = {
  x: ["Members.joinedAt.week"],
  y: ["measures"],
  fillMissingDates: false,
  // limit: 5000,
  // joinDateRange: false,
};

interface params {
  projectId?: string;
  dateRange?: DateRange;
  limit?: number;
  granularity?: TimeDimensionGranularity;
}

export async function contributorsSeries({
  projectId = MOCK_PROJECT_LINUX_ID,
  dateRange = ["2023-01-01", "2023-12-30"],
  granularity = "week",
  limit = 5000,
}: params = {}) {
  const query: Query = {
    measures: ["Members.count"],
    timeDimensions: [
      {
        dimension: "Members.joinedAt",
        granularity,
        dateRange,
      },
    ],
    filters: [
      {
        member: "Members.tenantId",
        operator: "equals",
        values: [projectId],
      },
    ],
    limit,
  };
  const resultSet = await cubejsApi.load(query);
  const pivot = resultSet.chartPivot(pivotConfig);
  return pivot;
}
