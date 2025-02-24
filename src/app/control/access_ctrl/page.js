"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { useEffect, useState } from "react";

async function FetchAllAccess(jwt) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/all_access`,
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

async function EditAccess(jwt, data) {
  try {
    const params = {
      id: data.id,
      service_id: data.service_id ? Number(data.service_id) : null,
      group_id: data.group_id ? Number(data.group_id) : null,
      group_access: data.group_access ? Number(data.group_access) : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      comment: data.comment ? data.comment : null,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/update_access`,
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
    console.error("Error when update access data:", error);
    return {
      code: 500,
      msg: "Error when update access data",
      data: String(error),
    };
  }
}

async function NewAccess(jwt, data) {
  try {
    const params = {
      service_id: data.service_id ? Number(data.service_id) : null,
      group_id: data.group_id ? Number(data.group_id) : null,
      group_access: data.group_access ? Number(data.group_access) : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      comment: data.comment ? data.comment : null,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/access_control/new_access`,
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
    console.error("Error when update access data:", error);
    return {
      code: 500,
      msg: "Error when update access data",
      data: String(error),
    };
  }
}

export default function app() {
  const [accesssData, setAccesssData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccesssInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllAccess(localStorage.getItem("JWT"));
        setAccesssData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccesssInfo();
  }, []);

  const EditAccessHandler = (data) => {
    EditAccess(localStorage.getItem("JWT"), data)
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

  const NewAccessHandler = (data) => {
    NewAccess(localStorage.getItem("JWT"), data)
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
      <h1 className="text-2xl font-semibold mb-4">Access Management</h1>
      <PopOutDialog
        head={`new access`}
        hint={`is_enable 可选状态(0/1) ; 当前权限可选 (0:无, 1:读, 2:可写) `}
        headerArr={["服务ID", "用户组ID", "当前权限", "状态", "注释"]}
        newEffect={NewAccessHandler}
      />
      <DynEditableForm
        title={"用户组信息"}
        headerArr={[
          "ID",
          "服务ID",
          "用户组ID",
          "当前权限",
          "状态",
          "修改时间",
          "注释",
          "修改",
        ]}
        dataArr={accesssData.data}
        editEffect={EditAccessHandler}
      />
    </div>
  );
}
