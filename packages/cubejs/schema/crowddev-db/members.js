cube(`Members`, {
  sql: `SELECT * FROM members`,

  joins: {},

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, displayName, joinedAt]
    }
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },

    displayName: {
      sql: `"displayName"`,
      type: `string`
    },

    attributes: {
      sql: `attributes`,
      type: `string`
    },

    emails: {
      sql: `emails`,
      type: `string`
    },

    usernameOld: {
      sql: `"usernameOld"`,
      type: `string`
    },

    tenantId: {
      sql: `"tenantId"`,
      type: `string`,
    },

    joinedAt: {
      sql: `"joinedAt"`,
      type: `time`
    }
  }
});
