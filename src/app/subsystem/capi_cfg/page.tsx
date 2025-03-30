"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { CallSubsys } from "@/fetch/control/subsys";

export default function app() {
  const [keyData, setkeyData] = useState<any[]>([]);
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
    const fetchKeysInfo = async () => {
      try {
        setLoading(true);
        const data = await CallSubsys(
          localStorage.getItem("JWT") || "",
          "cloud_api",
          {
            target: "account_db",
            operation: "get",
            data: {},
          }
        );
        setkeyData(data.data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchKeysInfo();
  }, []);

  const NewKey = (data: any) => {
    return CallSubsys(localStorage.getItem("JWT") || "", "cloud_api", {
      target: "account_db",
      operation: "new",
      data: data,
    });
  };

  const EditKey = (data: any) => {
    return CallSubsys(localStorage.getItem("JWT") || "", "cloud_api", {
      target: "account_db",
      operation: "update",
      data: data,
    });
  };

  const EditKeyHandler = (data: any) => {
    EditKey(data)
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

  const NewKeyHandler = (data: any) => {
    NewKey(data)
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

  const columns = transformJson2TableMeta(keyData[0], {
    id: "ID",
    cloud_provider: "云厂商",
    nick_name: "别名",
    ak: "AK",
    sk: "SK",
    comment: "备注",
    update_time: "更新时间",
    is_enable: "状态",
  });
  const rows: readonly any[] | undefined = keyData;

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4">云API 权限管理</Typography>
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
