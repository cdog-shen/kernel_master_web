"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";
import {
  FetchAllService,
  NewService,
  EditService,
} from "@/fetch/control/service";
import { transformJson2TableMeta } from "@/util/data_format";
import { useEffect, useState } from "react";

export default function App() {
  const [servicesData, setServicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStatus, setEditStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(false);
  const [info, setInfo] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    const fetchServicesInfo = async () => {
      try {
        setLoading(true);
        const jwt = localStorage.getItem("JWT") || "";
        const data = await FetchAllService(jwt);
        setServicesData(data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesInfo();
  }, []);

  const EditServiceHandler = (data: {
    id: string;
    service_name?: string;
    service_point?: string;
    nick_name?: string;
    is_enable?: boolean;
  }) => {
    const jwt = localStorage.getItem("JWT") || "";
    EditService(jwt, data)
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

  const NewServiceHandler = (data: {
    service_name?: string;
    service_point?: string;
    nick_name?: string;
    is_enable?: boolean;
  }) => {
    const jwt = localStorage.getItem("JWT") || "";
    NewService(jwt, data)
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

  const columns = transformJson2TableMeta(servicesData[0], {
    id: "服务ID",
    service_name: "服务名称",
    nick_name: "服务别名",
    service_point: "服务点",
    is_enable: "状态",
    create_time: "创建时间",
  });
  const rows: readonly any[] | undefined = servicesData;

  return (
    <Paper elevation={10} sx={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h4" marginBottom="20px">服务控制</Typography>
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
