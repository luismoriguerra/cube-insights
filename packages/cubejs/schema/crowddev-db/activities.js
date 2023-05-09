cube(`Activities`, {
  sql: `SELECT * FROM activities`,

  joins: {
    MemberOrganizations: {
      sql: `${CUBE}."memberId" = ${MemberOrganizations}."memberId"`,
      relationship: `many_to_one`,
    }
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, type, timestamp],
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true,
    },

    type: {
      sql: `type`,
      type: `string`,
    },

    timestamp: {
      sql: `timestamp`,
      type: `time`,
    },

    username: {
      sql: `username`,
      type: `string`,
    },

    objectMemberUsername: {
      sql: `"objectMemberUsername"`,
      type: `string`,
    },

    objectMemberId: {
      sql: `"objectMemberId"`,
      type: `number`,
    },

    platform: {
      sql: `platform`,
      type: `string`,
    },

    sourceId: {
      sql: `"sourceId"`,
      type: `string`,
    },

    channel: {
      sql: `channel`,
      type: `string`,
    },

    activity_tenant_id: {
      sql: `${CUBE}."tenantId"`,
     type: `string`,
    },

    memberId: {
      sql: `"memberId"`,
     type: `string`,
    },
  },
});
