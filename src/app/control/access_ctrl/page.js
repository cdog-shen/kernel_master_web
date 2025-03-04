"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { FetchAllAccess, NewAccess, EditAccess } from "@/fetchs/control/access";
import { useEffect, useState } from "react";

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
        headerArr={[
          "service_id",
          "group_id",
          "group_access",
          "is_enable",
          "comment",
        ]}
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
