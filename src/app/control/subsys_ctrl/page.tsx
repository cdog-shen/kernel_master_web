"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { FetchAllSubsys, NewSubsys, EditSubsys } from "@/fetch/control/subsys";

export default function App() {
  const [subsysData, setsubsysData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  const [info, setInfo] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    const fetchSubsyssInfo = async () => {
      try {
        setLoading(true);
        const jwt = localStorage.getItem("JWT") || "";
        const data = await FetchAllSubsys(jwt);
        setsubsysData(data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubsyssInfo();
  }, []);

  const EditSubsysHandler = (data: {
    id: number;
    subsys_name?: string;
    url?: string;
    is_enable?: boolean;
    relate_service?: number;
    token?: string;
  }) => {
    const jwt = localStorage.getItem("JWT") || "";
    EditSubsys(jwt, data)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("Error when updating data:", resp.msg);
          setInfo(resp);
        }
        setEditStatus(true);
        setInfo(resp);
      })
      .catch((err) => {
        console.error("Error when updating data:", err);
        setInfo({
          code: 500,
          msg: "Error when updating data",
          data: String(err),
        });
      });
    return [editStatus, info];
  };

  const NewSubsysHandler = (data: {
    subsys_name?: string;
    url?: string;
    is_enable?: boolean;
    relate_service?: number;
    token?: string;
  }) => {
    const jwt = localStorage.getItem("JWT") || "";
    NewSubsys(jwt, data)
      .then((resp) => {
        if (resp.code !== 200) {
          console.error("Error when updating data:", resp.msg);
          setInfo(resp);
        }
        setNewStatus(true);
        setInfo(resp);
      })
      .catch((err) => {
        console.error("Error when updating data:", err);
        setInfo({
          code: 500,
          msg: "Error when updating data",
          data: String(err),
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

  const columns: GridColDef[] = transformJson2TableMeta(subsysData[0], {
    id: "子系统ID",
    subsys_name: "子系统名称",
    url: "请求URL",
    is_enable: "状态",
    relate_service: "所属服务",
    token: "Token",
    create_time: "创建时间",
  });
  const rows: readonly any[] | undefined = subsysData;

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4">子系统管理</Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Paper>
  );
}
