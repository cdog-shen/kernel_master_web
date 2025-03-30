"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

import { CallSubsys } from "@/fetch/control/subsys";

export default function app() {
  const [insData, setinsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<{
    code: number;
    msg: string;
    data: string;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSubsysInfo = async () => {
      try {
        setLoading(true);
        const data = await CallSubsys(
          localStorage.getItem("JWT") || "",
          "cmdb",
          {
            target: "table",
            operation: "get",
            data: {
              table: "light_ecs",
              query: {},
            },
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
  }, []);

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

  const columns: GridColDef[] = transformJson2TableMeta(insData[0], {
    bandwidth: "带宽",
    cloud_account: "云账户",
    cloud_name: "云名称",
    create_at: "创建时间",
    id: "编号",
    image_id: "镜像编号",
    instance_id: "实例编号",
    instance_name: "实例名称",
    instance_type: "实例类型",
    internet_charge_type: "网络计费类型",
    is_link_server: "是否链接服务器",
    nip: "内网IP",
    os_name: "操作系统名称",
    os_type: "操作系统类型",
    project: "项目",
    region: "区域",
    status: "状态",
    subnet_id: "子网编号",
    update_at: "更新时间",
    vpc_id: "虚拟私有云编号",
    wip: "外网IP",
    zone: "可用区",
  });
  const rows = insData;

  return (
    <Paper elevation={10} sx={{ padding: 2 }}>
      <Typography variant="h4" px={2} py={1}>
        轻量云服务器 - 实例管理
      </Typography>
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
