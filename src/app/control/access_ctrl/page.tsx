"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { FetchAllAccess, NewAccess, EditAccess } from "@/fetch/control/access";

export default function app() {
  const [accesssData, setAccesssData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStatus, seteditStatus] = useState(false);
  const [newStatus, setnewStatus] = useState(false);
  const [info, setInfo] = useState<{
    code: number;
    msg: string;
    data: string;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAccesssInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllAccess(localStorage.getItem("JWT") || "");
        setAccesssData(data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchAccesssInfo();
  }, []);

  const EditAccessHandler = (data: {
    id: number;
    service_id?: number;
    group_id?: number;
    group_access?: number;
    is_enable?: number;
    comment?: string;
  }) => {
    EditAccess(localStorage.getItem("JWT") || "", data)
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

  const NewAccessHandler = (data: {
    service_id?: number;
    group_id?: number;
    group_access?: number;
    is_enable?: number;
    comment?: string;
  }) => {
    NewAccess(localStorage.getItem("JWT") || "", data)
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

  const columns = transformJson2TableMeta(accesssData[0], {
    id: "ID",
    service_id: "服务ID",
    group_id: "用户组ID",
    group_access: "当前权限",
    is_enable: "状态",
    update_time: "修改时间",
    comment: "注释",
  });
  const rows: readonly any[] | undefined = accesssData;

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4">用户组权限管理</Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Paper>
  );
}
