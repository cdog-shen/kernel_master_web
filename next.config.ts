import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // BACKEND_BASE_URL:
    // process.env.BACKEND_BASE_URL || "http://localhost:8000/api", // localhost
    BACKEND_BASE_URL: "http://10.16.18.128:8000/api", // inner net

    SERVICE_ARRAY: JSON.stringify([
      {
        id: 1,
        outerTag: "Authentication Service",
        innerList: [
          {
            id: 1,
            tag: "Current User Information",
            path: "/control/home",
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
            path: "/control/user_info/user",
          },
          {
            id: 2,
            tag: "User Group Management",
            path: "/control/user_info/group",
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
            path: "/control/service_ctrl",
          },
        ],
      },
      {
        id: 4,
        outerTag: "Access Control",
        innerList: [
          { id: 1, tag: "Access Management", path: "/control/access_ctrl" },
        ],
      },
      {
        id: 5,
        outerTag: "Subsystem Control",
        innerList: [
          {
            id: 1,
            tag: "Subsystem Management",
            path: "/control/subsys_ctrl",
          },
        ],
      },
      {
        id: 6,
        outerTag: "Subsystem Configuration",
        innerList: [
          { id: 1, tag: "CMDB", path: "/subsystem/cmdb_cfg" },
          { id: 2, tag: "cloud-api", path: "/subsystem/capi_cfg" },
        ],
      },
      {
        id: 7,
        outerTag: "Business Process",
        innerList: [{ id: 1, tag: "Test Page", path: "/test/control" }],
      },
      {
        id: 99,
        outerTag: "Test",
        innerList: [{ id: 1, tag: "Test Page", path: "/test/control" }],
      },
    ]),
  },
};

export default nextConfig;
