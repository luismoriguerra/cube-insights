import { graphqlClient } from "../../services/cube-graphql";
import { gql } from "@apollo/client";
import { calculatePercentageChange, getPercentageOfRounded } from "../../utils";

export async function getTotalOrganizationLeaderboard() {
  const org_leaderboard_table = gql`
    query CubeQuery(
      $tenantIds: [String]!
      $dateRange: [String!]!
      $previousDateRange: [String!]!
    ) {
      total_current: cube(
        where: {
          activities: {
            activity_tenant_id: { in: $tenantIds }
            timestamp: { inDateRange: $dateRange }
          }
          organizations: { name: { set: true } }
        }
      ) {
        activities {
          count
        }
      }
      total_previous: cube(
        where: {
          activities: {
            activity_tenant_id: { in: $tenantIds }
            timestamp: { inDateRange: $previousDateRange }
          }
          organizations: { name: { set: true } }
        }
      ) {
        activities {
          count
        }
      }
      orgs_current: cube(
        where: {
          activities: {
            activity_tenant_id: { in: $tenantIds }
            timestamp: { inDateRange: $dateRange }
          }
          organizations: { name: { set: true } }
        }
      ) {
        activities(orderBy: { count: desc }) {
          count
        }
        organizations {
          id
          name
          logo
        }
      }
      orgs_previous: cube(
        where: {
          activities: {
            activity_tenant_id: { in: $tenantIds }
            timestamp: { inDateRange: $previousDateRange }
          }
          organizations: { name: { set: true } }
        }
      ) {
        activities {
          count
        }
        organizations {
          id
        }
      }
    }
  `;

  const { data } = await graphqlClient.query({
    query: org_leaderboard_table,
    variables: {
      tenantIds: ["ccff5355-cf54-40a1-9a2e-8e4a447ae73a"],
      dateRange: ["2023-01-02", "2023-12-31"],
      previousDateRange: ["2022-01-02", "2022-12-31"],
    },
  });
  const totalCurrent = data.total_current[0].activities.count;
  const totalPrevious = data.total_previous[0].activities.count;

  const totalDelta = calculatePercentageChange(totalPrevious, totalCurrent);

  const orgsPrevious = data.orgs_previous.map((org: any) => ({
    id: org.organizations.id,
    count: org.activities.count || 0,
  }));
  const orgsCurrent = data.orgs_current.map((org: any) => ({
    id: org.organizations.id,
    name: org.organizations.name,
    logo: org.organizations.logo,
    count: org.activities.count,
    previousCount:
      orgsPrevious.find(
        (orgPrevious: any) => orgPrevious.id === org.organizations.id
      )?.count || 0,
    percentage: getPercentageOfRounded(org.activities.count, totalCurrent),
  }));

  const response = {
    totalCurrent,
    totalPrevious,
    totalDelta,
    orgsCurrent,
  };

  console.log("> response", JSON.stringify({ data: response }, null, 2));

  return response;
}

// > response {
//   "data": {
//     "totalCurrent": 538,
//     "totalPrevious": 591,
//     "totalDelta": -8.97,
//     "orgsCurrent": [
//       {
//         "id": "1ee58b13-b959-411a-8af0-ce2b236bcf26",
//         "name": "The Linux Foundation",
//         "logo": "https://avatars.githubusercontent.com/u/1040002?v=4",
//         "count": 478,
//         "previousCount": 512,
//         "percentage": 89
//       },
//        ...
//     ]
//   }
// }
