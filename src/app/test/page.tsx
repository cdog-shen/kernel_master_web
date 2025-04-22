"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

import EditableDataGrid from "@/component/editable-data-grid";

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

  // useEffect(() => {
  //   const fetchSubsysInfo = async () => {
  //     try {
  //       const data = await CallSubsys(
  //         localStorage.getItem("JWT") || "",
  //         "cmdb",
  //         {
  //           target: "table",
  //           operation: "get",
  //           data: {
  //             table: "light_ecs",
  //             query: {},
  //           },
  //         }
  //       );
  //       setinsData(data.data.data);
  //     } catch (error) {
  //       setError(error as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSubsysInfo();
  // }, [loading]);

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
      id: "编号",
    },
    0
  );
  const rows = insData;

  const operate = {
    // new: () => {
    //   console.log("new");
    //   setLoading(true);
    // },
    // edit: () => {
    //   console.log("edit");
    //   setLoading(true);
    // },
    // delete: () => {
    //   console.log("delete");
    //   // setLoading(true);
    // },
    // refresh: () => {
    //   console.log("refresh");
    //   reSync();
    //   setLoading(true);
    // },
  };

  return <></>;
}
