"use client";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Collapse,
  MenuItem,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ReactNode } from "react";
import { useState, useEffect, Fragment } from "react";

import { LogoutFetch } from "@/fetch/control/user";

const serviceArray:
  | {
      id: string;
      innerList: { path: string; tag: string }[];
      outerTag: string;
    }[]
  | undefined = process.env.SERVICE_ARRAY
  ? JSON.parse(process.env.SERVICE_ARRAY)
  : undefined;
const settings = ["Dashboard", "Logout"];

export default function businessLayout({ children }: { children: ReactNode }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [title, settitle] = useState<String>("");
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(-1);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const toggleDrawer = (open: boolean) => setDrawer(open);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSecListOpen = (index: number) => {
    if (open === index) {
      setOpen(-1);
      return;
    }
    setOpen(index);
  };

  useEffect(() => {
    const path = new URL(window.location.href).pathname;
    serviceArray?.map((serv: { innerList: any[]; outerTag: string }) => {
      serv.innerList.map((inner, index) => {
        if (inner.path == path) {
          settitle(serv.outerTag);
        }
      });
    });
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Fragment>
              <SwipeableDrawer
                anchor={"left"}
                open={drawer}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
              >
                <List>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: "bold" }}>
                          Service List
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                  {serviceArray?.map((service, index) => (
                    <Fragment key={service.id}>
                      <ListItemButton onClick={() => handleSecListOpen(index)}>
                        {/* <ListItemIcon>
                        <SendIcon />
                        </ListItemIcon> */}
                        <ListItemText primary={service.outerTag} />
                        {open === index ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={open === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {service.innerList.map((inner, innerIndex) => (
                            <ListItemButton
                              key={innerIndex}
                              sx={{ pl: 4 }}
                              onClick={() => {
                                window.location.href = inner.path;
                              }}
                            >
                              <ListItemText primary={inner.tag} />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </Fragment>
                  ))}
                </List>
              </SwipeableDrawer>
            </Fragment>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="r" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box px={2} py={2} sx={{ maxWidth: "100vw" }}>
        {children}
      </Box>
    </>
  );
}
