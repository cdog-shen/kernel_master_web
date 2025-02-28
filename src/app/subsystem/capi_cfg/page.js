"use client";
import { DynEditableForm } from "@/components/containers/forms";
import { PopOutDialog } from "@/components/containers/dialogs";
import { useEffect, useState } from "react";

export default function app() {
  const [keysData, setKeysData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKeysInfo = async () => {
      try {
        setLoading(true);
        // const data = await FetchAllKey(localStorage.getItem("JWT"));
        // setKeysData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchKeysInfo();
  }, []);

  const EditKeyHandler = (data) => {
    EditKey(localStorage.getItem("JWT"), data)
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

  const NewKeyHandler = (data) => {
    NewKey(localStorage.getItem("JWT"), data)
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
      <h1 className="text-2xl font-semibold mb-4">
        Cloud API ak-sk Configuration
      </h1>
      <PopOutDialog
        head={`new Key`}
        hint={`is_enable 可选状态(0/1) ;`}
        headerArr={["ID"]}
        newEffect={NewKeyHandler}
      />
      <DynEditableForm
        title={"用户组信息"}
        headerArr={["ID"]}
        dataArr={keysData.data}
        editEffect={EditKeyHandler}
      />
    </div>
  );
}
