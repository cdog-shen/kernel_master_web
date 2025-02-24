"use client";
import { DisplayCard } from "@/components/containers/display";
import { useEffect, useState } from "react";

async function FetchUsi(uid, jwt) {
  try {
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/me/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
    });

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    const data = await resp.json();
    return {
      code: 200,
      msg: "usi require success",
      data: data,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      code: 500,
      msg: "connection response error",
      data: String(error),
    };
  }
}

export default function UserIndex() {
  const [systemInfo, setSystemInfo] = useState({
    code: 200,
    msg: "success",
    data: {
      host: "0.0.0.0",
      uptime: "0",
      version: "0.0.0",
      os: "unknown",
      cpu: "unknown",
      memory: "unknown",
      disk: "unknown",
      time: "unknown",
    },
  });
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchUsi(
          localStorage.getItem("uid"),
          localStorage.getItem("JWT")
        );
        setUserData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <DisplayCard
        header="Kernel master server info"
        singleLayerObject={systemInfo.data}
      />
      <DisplayCard
        header="user basic info"
        singleLayerObject={userData.data.ubi}
      />
      <DisplayCard
        header="user group info"
        singleLayerObject={userData.data.ugi}
        valueMapFun={(data) => {
          return Object.entries(data).map(([key, value]) => {
            switch (key) {
              case "is_enable":
                return value === 0 ? (
                  <span
                    key={key}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    禁用
                  </span>
                ) : (
                  <span
                    key={key}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    <svg
                      className="w-4 h-4 mr-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    启用
                  </span>
                );

              case "user_ids":
                return null;

              default:
                return (
                  <div className="m-1" key={key}>
                    {key}: {value}
                  </div>
                );
            }
          });
        }}
      />
    </div>
  );
}
