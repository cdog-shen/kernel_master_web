"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { useEffect, useState } from "react";

async function FetchAllUser(jwt) {
  try {
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/all_user`, {
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

async function EditUser(jwt, data) {
  try {
    const contact = JSON.parse(data.contact ? `${data.contact}` : "{}");
    const params = {
      id: data.id,
      username: data.username ? data.username : null,
      is_enable: data.is_enable ? Number(data.is_enable) : null,
      name: data.name ? data.name : null,
      contact: contact,
    };
    const resp = await fetch(
      `${process.env.BACKEND_BASE_URL}/auth/user_update`,
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

async function NewUser(jwt, data) {
  try {
    const params = {
      username: data.username ? data.username : null,
      passwd: data.passwd ? data.passwd : null,
    };
    console.log(params);
    const resp = await fetch(`${process.env.BACKEND_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify(params),
    });

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
  const [usersData, setGroupData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupsInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllUser(localStorage.getItem("JWT"));
        setGroupData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupsInfo();
  }, []);

  const EditUserHandler = (data) => {
    EditUser(localStorage.getItem("JWT"), data)
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

  const NewUserHandler = (data) => {
    NewUser(localStorage.getItem("JWT"), data)
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
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <PopOutDialog
        head={`new user`}
        headerArr={["username", "passwd"]}
        newEffect={NewUserHandler}
      />
      <DynEditableForm
        title={"用户信息"}
        headerArr={[
          "ID",
          "用户名",
          "状态",
          "全名",
          "联系方式",
          "创建时间",
          "上一次修改",
          "修改",
        ]}
        dataArr={usersData.data}
        editEffect={EditUserHandler}
      />
    </div>
  );
}
