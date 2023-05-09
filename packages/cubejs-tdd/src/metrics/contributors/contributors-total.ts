import { DateRange, Query } from "@cubejs-client/core";
import { cubejsApi } from "../../services/cube-api";
import { MOCK_PROJECT_LINUX_ID } from "../../utils";

export async function contributorsTotal({
  projectId = MOCK_PROJECT_LINUX_ID,
  dateRange = ["2023-01-01", "2023-12-30"],
}: {
  projectId?: string;
  dateRange?: DateRange;
} = {}): Promise<number> {
  const query: Query = {
    measures: ["Members.count"],
    timeDimensions: [
      {
        dimension: "Members.joinedAt",
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
    order: {},
  };
  const resultSet = await cubejsApi.load(query);
  const pivot = resultSet.chartPivot();
  const total = pivot?.[0]?.["Members.count"];

  return total;
}
