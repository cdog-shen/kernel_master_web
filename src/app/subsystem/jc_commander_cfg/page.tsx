"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import EditableDataGrid from "@/component/editable-data-grid";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { CallSubsys } from "@/fetch/control/subsys";

function CronJobTable() {
  const [insData, setinsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncFlag, setSyncFlag] = useState(false);
  const [info, setInfo] = useState<{
    code: number;
    msg: string;
    data: string;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSubsysInfo = async () => {
      try {
        const data = await CallSubsys(
          localStorage.getItem("JWT") || "",
          "job_center",
          {
            target: "cron",
            operation: "get",
            data: {},
          }
        );
        setinsData(data.data.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubsysInfo();
  }, [loading]);

  const reSync = async () => {
    setSyncFlag(true);
    try {
      const data = await CallSubsys(
        localStorage.getItem("JWT") || "",
        "job_center",
        {
          target: "cron",
          operation: "get",
          data: {},
        }
      );
      setinsData(data.data.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setSyncFlag(false);
    }
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
  const columns = transformJson2TableMeta(
    insData[0],
    {
      id: "脚本ID",
      script: "脚本",
      params: "参数",
      status: "状态",
      launch_at: "第一次启动",
      frequency: "运行频率(s)",
      times: "已执行(次)",
      update_time: "更新时间",
      create_time: "创建时间",
      comment: "信息",
    },
    1
  );
  const rows = insData;

  const operate = {
    new: () => {
      console.log("new");
      setLoading(true);
    },
    edit: () => {
      console.log("edit");
      setLoading(true);
    },
    delete: () => {
      console.log("delete");
      // setLoading(true);
    },
    refresh: () => {
      console.log("refresh");
      reSync();
      setLoading(true);
    },
  };

  return (
    <EditableDataGrid
      title="脚本中心控制器 - 定时任务管理"
      rows={rows}
      columns={columns}
      funObject={operate}
    />
  );
}

export default function App() {
  return (
    <>
      <CronJobTable />
    </>
  );
}
