"use client";

import {
  Box,
  CircularProgress,
  Typography,
  Card,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import ErrorIcon from "@mui/icons-material/Error";
import { FetchUsi } from "@/fetch/control/common";
import { transformJsonToKeyValueArray } from "@/util/data_format";
import { Fragment, useEffect, useState } from "react";

export default function UserIndex() {
  const [systemInfo, setSystemInfo] = useState({
    code: 200,
    msg: "success",
    data: {
      host: "0.0.0.0",
      uptime: "0",
      version: "0.0.0",
      os: "unknown",
      cpu: "unknown",
      memory: "unknown",
      disk: "unknown",
      time: "unknown",
    },
  });
  const [userData, setUserData] = useState<{
    code: number;
    msg: string;
    data: {
      ubi?: {
        id: number;
        username: string;
        name: string;
        is_enable: number;
        date_joined: string;
        last_login: string;
        contact: any[];
      };
      uai?: Array<{
        id: number;
        comment: string;
        group_access: number;
        group_id: number;
        is_enable: number;
        service_id: number;
        update_time: string;
      }>;
      usi?: Array<{
        id: number;
        service_name: string;
        nick_name: string;
        service_point: string;
        is_enable: number;
        create_time: string;
      }>;
      ugi?: Array<{
        id: number;
        name: string;
        is_enable: number;
        user_ids: string;
        date_update: string;
      }>;
    };
  }>({
    code: 200,
    msg: "success",
    data: {
      ubi: undefined,
      uai: [],
      usi: [],
      ugi: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const data = await FetchUsi(
          localStorage.getItem("uid") || "",
          localStorage.getItem("JWT") || ""
        );
        setUserData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const userBasicInfo = () => {
    const userInfoArray = transformJsonToKeyValueArray(userData.data.ubi || {});
    const userAccessArray = transformJsonToKeyValueArray(
      userData.data.uai || {}
    );
    const userGroupArray = userData.data.ugi?.map((element) => {
      transformJsonToKeyValueArray(element);
    });
    const userServiceArray = transformJsonToKeyValueArray(
      userData.data.usi || {}
    );

    // console.log("userInfoArray", userInfoArray);
    // console.log("userAccessArray", userAccessArray);
    // console.log("userGroupArray", userGroupArray);
    // console.log("userServiceArray", userServiceArray);

    return (
      <Grid>
        <Card sx={{ p: 2, mb: 2 }}>
          <CardContent>
            <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
              Current user basic info
            </Typography>
            <Stack useFlexGap spacing={2} direction={"row"}>
              {[
                "id",
                "name",
                "username",
                "contact",
                "date_joined",
                "last_login",
                "is_enable",
              ].map((key) => {
                const item = userInfoArray.find((info) => info.k === key);
                if (!item) return null;
                return (
                  <Paper key={item.k} elevation={3} sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6">{item.k}</Typography>
                    {typeof item.v === "number" && item.k === "is_enable" ? (
                      item.v === 1 ? (
                        <Chip label="Enable" color="success" />
                      ) : (
                        <Chip label="Disable" color="error" />
                      )
                    ) : typeof item.v === "object" ? (
                      JSON.stringify(item.v)
                    ) : (
                      item.v
                    )}
                  </Paper>
                );
              })}
            </Stack>
          </CardContent>
          <CardActions>
            <Typography variant="body2" color="text.secondary">
              User info
            </Typography>
          </CardActions>
        </Card>

        <Card sx={{ p: 2, mb: 2, maxWidth: "100vw" }}>
          <CardContent>
            <Typography variant="h5" color="inherit" sx={{ mb: 2 }}>
              User access info
            </Typography>
            <Stack useFlexGap spacing={2} direction={"row"}>
              {userAccessArray.map((item) => (
                <Paper key={item.k} elevation={3} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="h6">{item.k}</Typography>
                  {Array.isArray(item.v) &&
                    item.v
                      .sort((a, b) => {
                        const order = [
                          "id",
                          "group_id",
                          "service_id",
                          "group_access",
                          "comment",
                          "update_time",
                          "is_enable",
                        ];
                        return (
                          order.indexOf("k" in a ? a.k : a.key.toString()) -
                          order.indexOf("k" in b ? b.k : b.key.toString())
                        );
                      })
                      .map(
                        (value, index) =>
                          value && (
                            <Fragment key={index}>
                              {
                                <>
                                  {"k" in value ? (
                                    value.k === "is_enable" && value.v === 1 ? (
                                      <Chip label="Enable" color="success" />
                                    ) : (
                                      <Typography variant="body1">
                                        {`${value.k}: ${value.v}`}
                                      </Typography>
                                    )
                                  ) : String(value.key) === "is_enable" &&
                                    value.v === 1 ? (
                                    <Chip label="Enable" color="success" />
                                  ) : (
                                    <Typography variant="body1">
                                      {`${value.k}: ${value.v}`}
                                    </Typography>
                                  )}
                                  <br></br>
                                </>
                              }
                            </Fragment>
                          )
                      )}
                </Paper>
              ))}
            </Stack>
          </CardContent>
          <CardActions>
            <Typography variant="body2" color="text.secondary">
              User access info
            </Typography>
          </CardActions>
        </Card>
      </Grid>
    );
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

  return (
    <Box sx={{ display: "flex", px: 2, py: 2 }}>
      <Grid container spacing={2}>
        {userBasicInfo()}
      </Grid>
    </Box>
  );
}
