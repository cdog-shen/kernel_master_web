import type { NextConfig } from "next";

const BACKEND_BASE_URL = "http://10.16.18.128:8000/api";
const FRONT_ROOT_PATH = "";

const nextConfig: NextConfig = {
  env: {
    BACKEND_BASE_URL: BACKEND_BASE_URL,
    FRONT_ROOT_PATH: FRONT_ROOT_PATH,

    SERVICE_ARRAY: JSON.stringify([
      {
        id: 1,
        outerTag: "Authentication Service",
        innerList: [
          {
            id: 1,
            tag: "Current User Information",
            path: `${FRONT_ROOT_PATH}/control/home`,
          },
        ],
      },
      {
        id: 2,
        outerTag: "User Information Control",
        innerList: [
          {
            id: 1,
            tag: "User Information Management",
            path: `${FRONT_ROOT_PATH}/control/user_info/user`,
          },
          {
            id: 2,
            tag: "User Group Management",
            path: `${FRONT_ROOT_PATH}/control/user_info/group`,
          },
        ],
      },
      {
        id: 3,
        outerTag: "Service Control",
        innerList: [
          {
            id: 1,
            tag: "Service Management",
            path: `${FRONT_ROOT_PATH}/control/service_ctrl`,
          },
        ],
      },
      {
        id: 4,
        outerTag: "Access Control",
        innerList: [
          {
            id: 1,
            tag: "Access Management",
            path: `${FRONT_ROOT_PATH}/control/access_ctrl`,
          },
        ],
      },
      {
        id: 5,
        outerTag: "Subsystem Control",
        innerList: [
          {
            id: 1,
            tag: "Subsystem Management",
            path: `${FRONT_ROOT_PATH}/control/subsys_ctrl`,
          },
        ],
      },
      {
        id: 6,
        outerTag: "Subsystem Configuration",
        innerList: [
          { id: 1, tag: "CMDB", path: `${FRONT_ROOT_PATH}/subsystem/cmdb_cfg` },
          {
            id: 2,
            tag: "cloud-api",
            path: `${FRONT_ROOT_PATH}/subsystem/capi_cfg`,
          },
        ],
      },
      {
        id: 7,
        outerTag: "Business Process",
        innerList: [
          {
            id: 1,
            tag: "Light House Server managment",
            path: `${FRONT_ROOT_PATH}/business/light_house`,
          },
        ],
      },
      {
        id: 99,
        outerTag: "Test",
        innerList: [
          { id: 1, tag: "Test Page", path: `${FRONT_ROOT_PATH}/test` },
        ],
      },
    ]),
  },
};

export default nextConfig;
