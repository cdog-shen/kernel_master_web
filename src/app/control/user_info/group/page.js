"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { FetchAllGroup, NewGroup, EditGroup } from "@/fetchs/control/group";
import { useEffect, useState } from "react";

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
