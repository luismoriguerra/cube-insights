import cube from "@cubejs-client/core";
const cubeRestApiDomain =
  import.meta.env.VITE_CUBE_API || "http://localhost:4000";
const cubeRestApiToken = import.meta.env.VITE_CUBE_TOKEN || "token";

const cubeRestApiEndpoint = "/cubejs-api/v1";
//http://localhost:4000/cubejs-api/v1/graphql

export const cubejsApi = cube(cubeRestApiToken, {
  apiUrl: cubeRestApiDomain + cubeRestApiEndpoint,
});
