"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { FetchAllUser, NewUser, EditUser } from "@/fetchs/control/user";
import { useEffect, useState } from "react";

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
