"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { useEffect, useState } from "react";

async function FetchAllGroup(jwt) {
  try {
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/all_group`,
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

async function EditGroup(jwt, data) {
  try {
    const user_id_arr = JSON.parse(data.user_ids ? `[${data.user_ids}]` : "[]");
    const params = {
      id: data.id,
      name: data.name ? data.name : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      user_ids: user_id_arr,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/update_group`,
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
    console.error("Error when update group data:", error);
    return {
      code: 500,
      msg: "Error when update group data",
      data: String(error),
    };
  }
}

async function NewGroup(jwt, data) {
  try {
    const user_id_arr = JSON.parse(data.user_ids ? `[${data.user_ids}]` : "[]");
    const params = {
      name: data.name ? data.name : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      user_ids: user_id_arr,
    };
    console.log(params);
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/group_control/new_group`,
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
    console.error("Error when update group data:", error);
    return {
      code: 500,
      msg: "Error when update group data",
      data: String(error),
    };
  }
}

export default function app() {
  const [groupsData, setGroupsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupsInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllGroup(localStorage.getItem("JWT"));
        setGroupsData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupsInfo();
  }, []);

  const EditGroupHandler = (data) => {
    EditGroup(localStorage.getItem("JWT"), data)
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

  const NewGroupHandler = (data) => {
    NewGroup(localStorage.getItem("JWT"), data)
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
      <h1 className="text-2xl font-semibold mb-4">Group Management</h1>
      <PopOutDialog
        head={`new group`}
        hint={`is_enable 可选状态(0/1) ; user_ids 逗号分隔`}
        headerArr={["name", "is_enable", "user_ids"]}
        newEffect={NewGroupHandler}
      />
      <DynEditableForm
        title={"用户组信息"}
        headerArr={["ID", "组名", "状态", "修改时间", "用户ID", "修改"]}
        dataArr={groupsData.data}
        editEffect={EditGroupHandler}
      />
    </div>
  );
}
