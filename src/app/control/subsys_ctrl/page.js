"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { useEffect, useState } from "react";

async function FetchAllSubsys(jwt) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/all_subsystem`,
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

async function EditSubsys(jwt, data) {
  try {
    const params = {
      id: data.id,
      subsys_name: data.subsys_name ? data.subsys_name : null,
      url: data.url ? data.url : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      relate_service: data.relate_service ? Number(data.relate_service) : null,
      token: data.token ? data.token : null,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/update_subsystem`,
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
    console.error("Error when update subsys data:", error);
    return {
      code: 500,
      msg: "Error when update subsys data",
      data: String(error),
    };
  }
}

async function NewSubsys(jwt, data) {
  try {
    const params = {
      subsys_name: data.subsys_name ? data.subsys_name : null,
      url: data.url ? data.url : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      relate_service: data.relate_service ? Number(data.relate_service) : null,
      token: data.token ? data.token : null,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/subsystem_control/new_subsystem`,
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
    console.error("Error when update subsys data:", error);
    return {
      code: 500,
      msg: "Error when update subsys data",
      data: String(error),
    };
  }
}

export default function app() {
  const [subsyssData, setSubsyssData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubsyssInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllSubsys(localStorage.getItem("JWT"));
        setSubsyssData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubsyssInfo();
  }, []);

  const EditSubsysHandler = (data) => {
    EditSubsys(localStorage.getItem("JWT"), data)
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

  const NewSubsysHandler = (data) => {
    NewSubsys(localStorage.getItem("JWT"), data)
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
      <h1 className="text-2xl font-semibold mb-4">Subsys Management</h1>
      <PopOutDialog
        head={`new subsys`}
        hint={`is_enable 可选状态(0/1) ; url 为到达该子系统服务的URL ; relate_service是与其关联的服务ID ; token 为该子系统的token (通常为UUID)`}
        headerArr={[
          "subsys_name",
          "url",
          "is_enable",
          "relate_service",
          "token",
        ]}
        newEffect={NewSubsysHandler}
      />
      <DynEditableForm
        title={"用户组信息"}
        headerArr={[
          "ID",
          "子系统名",
          "请求URL",
          "状态",
          "所属服务",
          "修改时间",
          "token",
          "修改",
        ]}
        dataArr={subsyssData.data}
        editEffect={EditSubsysHandler}
      />
    </div>
  );
}
