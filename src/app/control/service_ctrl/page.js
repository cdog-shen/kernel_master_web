"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { useEffect, useState } from "react";

async function FetchAllService(jwt) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/all_service`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
      }
    );

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    return await resp.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      code: 500,
      msg: "connection response error",
      data: String(error),
    };
  }
}

async function EditService(jwt, data) {
  try {
    const params = {
      id: data.id,
      service_name: data.service_name ? data.service_name : null,
      service_point: data.service_point ? data.service_point : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/update_service`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify(params),
      }
    );

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    return await resp.json();
  } catch (error) {
    console.error("Error when update service data:", error);
    return {
      code: 500,
      msg: "Error when update service data",
      data: String(error),
    };
  }
}

async function NewService(jwt, data) {
  try {
    const params = {
      service_name: data.service_name ? data.service_name : null,
      service_point: data.service_point ? data.service_point : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/service_control/new_service`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt,
        },
        body: JSON.stringify(params),
      }
    );

    if (!resp.ok) {
      return {
        code: 500,
        msg: "http response error",
        data: await resp.text(),
      };
    }

    return await resp.json();
  } catch (error) {
    console.error("Error when update service data:", error);
    return {
      code: 500,
      msg: "Error when update service data",
      data: String(error),
    };
  }
}

export default function app() {
  const [servicesData, setServicesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllService(localStorage.getItem("JWT"));
        setServicesData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesInfo();
  }, []);

  const EditServiceHandler = (data) => {
    EditService(localStorage.getItem("JWT"), data)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("Error when updating data:", resp.msg);
          setInfo(resp);
        }
        seteditStatus(true);
        setInfo(resp);
      })
      .catch((error) => {
        console.error("Error when updating data:", error);
        setInfo({
          code: 500,
          msg: "Error when updating data",
          data: String(error),
        });
      });
    return [editStatus, info];
  };

  const NewServiceHandler = (data) => {
    NewService(localStorage.getItem("JWT"), data)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("Error when updating data:", resp.msg);
          setInfo(resp);
        }
        setnewStatus(true);
        setInfo(resp);
      })
      .catch((error) => {
        console.error("Error when updating data:", error);
        setInfo({
          code: 500,
          msg: "Error when updating data",
          data: String(error),
        });
      });
    return [newStatus, info];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-2xl font-semibold mb-4">Service Management</h1>
      <PopOutDialog
        head={`new service`}
        hint={`is_enable 可选状态(0/1) ; servce_point 为访问路径`}
        headerArr={["service_name", "service_point", "is_enable"]}
        newEffect={NewServiceHandler}
      />
      <DynEditableForm
        title={"用户组信息"}
        headerArr={["ID", "服务名", "请求路径", "状态", "修改时间", "修改"]}
        dataArr={servicesData.data}
        editEffect={EditServiceHandler}
      />
    </div>
  );
}
