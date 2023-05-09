cube(`Tenants`, {
  sql: `SELECT * FROM tenants`,

  joins: {
    // MemberIdentities: {
    //   sql: `${CUBE}.id = ${MemberIdentities}.tenantId`,
    //   relationship: `hasOne`,
    // },
    // Activities: {
    //   sql: `${CUBE}.id = ${Activities}.tenantId`,
    //   relationship: `hasOne`,
    // },
  },

  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name],
    },
  },

  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true,
    },

    name: {
      sql: `name`,
      type: `string`,
    },
  },
});
