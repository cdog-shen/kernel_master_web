"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { FetchAllSubsys, NewSubsys, EditSubsys } from "@/fetchs/control/subsys";
import { useEffect, useState } from "react";

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
