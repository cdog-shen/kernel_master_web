"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { FetchAllGroup, NewGroup, EditGroup } from "@/fetch/control/group";
export default function app() {
  const [groupsData, setGroupsData] = useState<any[]>([]);
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
    const fetchGroupsInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchAllGroup(localStorage.getItem("JWT") || "");
        setGroupsData(data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupsInfo();
  }, []);

  const EditGroupHandler = (data: {
    id: string;
    user_ids?: string;
    name?: string;
    is_enable?: boolean;
  }) => {
    EditGroup(localStorage.getItem("JWT") || "", data)
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

  const NewGroupHandler = (data: {
    user_ids?: string;
    name?: string;
    is_enable?: boolean;
  }) => {
    NewGroup(localStorage.getItem("JWT") || "", data)
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

  const columns = transformJson2TableMeta(groupsData[0], {
    id: "ID",
    name: "组名",
    is_enable: "状态",
    update_time: "修改时间",
    user_ids: "用户ID",
  });
  const rows: readonly any[] | undefined = groupsData;

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4">用户组信息管理</Typography>
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
