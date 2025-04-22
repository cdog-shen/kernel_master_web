"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import EditableDataGrid from "@/component/editable-data-grid";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { FetchAllUser, NewUser, EditUser } from "@/fetch/control/user";

export default function app() {
  const [usersData, setUsersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  const [info, setInfo] = useState<{
    code: number;
    msg: string;
    data: string;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllUser(localStorage.getItem("JWT") || "");
        setUsersData(data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersInfo();
  }, []);

  const EditUserHandler = (data: {
    id: string;
    username?: string;
    is_active?: boolean;
    full_name?: string;
    contact?: string;
  }) => {
    EditUser(localStorage.getItem("JWT") || "", data)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("Error when updating data:", resp.msg);
          setInfo(resp);
        }
        setEditStatus(true);
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

  const NewUserHandler = (data: {
    username: string;
    passwd: string;
    is_active?: boolean;
  }) => {
    NewUser(localStorage.getItem("JWT") || "", data)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("Error when creating user:", resp.msg);
          setInfo(resp);
        }
        setNewStatus(true);
        setInfo(resp);
      })
      .catch((error) => {
        console.error("Error when creating user:", error);
        setInfo({
          code: 500,
          msg: "Error when creating user",
          data: String(error),
        });
      });
    return [newStatus, info];
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <ErrorIcon color="error" />
        <Typography variant="h5" color="error">
          {error.message}
        </Typography>
      </Box>
    );
  }

  const columns = transformJson2TableMeta(usersData[0], {
    id: "ID",
    username: "用户名",
    is_active: "状态",
    full_name: "全名",
    contact: "联系方式",
    created_at: "创建时间",
    updated_at: "上一次修改",
  });
  const rows: readonly any[] | undefined = usersData;

  return <EditableDataGrid rows={rows} columns={columns} />;
}
