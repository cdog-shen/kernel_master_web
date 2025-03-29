"use client";

import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

import { transformJson2TableMeta } from "@/util/data_format";

import { useEffect, useState } from "react";

export default function app() {
  // const [accesssData, setAccesssData] = useState({});
  const [loading, setLoading] = useState(true);
  // const [editStatus, seteditStatus] = useState(false);
  // const [newStatus, setnewStatus] = useState(false);
  // const [info, setInfo] = useState(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(false);
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

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <Typography variant="h5" color="primary" px={2} py={1}>
        CMDB subsystem Configuration
      </Typography>
      <Paper sx={{ height: 400, width: "100%" }}>
        <Typography variant="body1" color="primary" px={2} py={1}>
          <InfoIcon color="primary" />
          CMDB subsystem has no configuration yet.
        </Typography>
      </Paper>
    </Paper>
  );
}
