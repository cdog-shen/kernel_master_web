/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_BASE_URL:
      process.env.BACKEND_BASE_URL || "http://localhost:8000/api", // localhost

    SERVICE_ARRAY: process.env.SERVICE_ARRAY || [
      {
        id: 1,
        outerTag: "Authentication Service",
        innerList: [
          {
            id: 1,
            tag: "Current User Information",
            path: "/business/home",
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
            path: "/business/user_info/user",
          },
          {
            id: 2,
            tag: "User Group Management",
            path: "/business/user_info/group",
          },
        ],
      },
      {
        id: 3,
        outerTag: "Service Control",
        innerList: [
          { id: 1, tag: "Service Management", path: "/business/service_ctrl" },
        ],
      },
      {
        id: 4,
        outerTag: "Access Control",
        innerList: [
          { id: 1, tag: "Access Management", path: "/business/access_ctrl" },
        ],
      },
      {
        id: 5,
        outerTag: "Subsystem Control",
        innerList: [
          { id: 1, tag: "Subsystem Management", path: "/business/subsys_ctrl" },
        ],
      },
      {
        id: 6,
        outerTag: "Business Process",
        innerList: [{ id: 1, tag: "Test Page", path: "/test/business" }],
      },
    ],
  },
};

export default nextConfig;
