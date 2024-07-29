"use client"

import themeOptions from "@/@core/theme/themeOptions";
import { Drawer, List, ListItemButton, ListItemIcon, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material";
import { useSettings } from "@/@core/hooks/useSettings";
import { useRouter } from "next/navigation";
import { makeStyles } from '@mui/styles';
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';
import { color } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // appBar: {
  //   zIndex: 1200,
  // },
  drawer: {
    width: 120,
    flexShrink: 0,
    background: "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
  },
  drawerPaper: {
    width: 240,
    background: "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
  },
  toolbar: {
    minHeight: 64,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    // marginLeft: 120,
    // padding: 3,
  },
  texticon: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "24px",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "17%",
  },
}));

const Layout = ({ children }: any) => {
  const classes = useStyles();
  const router = useRouter();
  const { settings, saveSettings } = useSettings();
  const darkTheme = createTheme(themeOptions(settings, "dark"));

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          style={{background:"linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)", width: 120,
            flexShrink: 0,}}
        >
          <Toolbar>
            <Typography variant="h6" className={classes.texticon}>
              Cat System
            </Typography>
          </Toolbar>
          <List sx={{ pl: 1 }} className={classes.texticon}>
            <ListItemButton onClick={() => router.push("/employee")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <BadgeIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Employee</Typography>
            </ListItemButton>

            <ListItemButton onClick={() => router.push("/customer")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Customer</Typography>
            </ListItemButton>

            <ListItemButton onClick={() => router.push("/customer/contract")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Contract</Typography>
            </ListItemButton>
            <ListItemButton onClick={() => router.push("/customer/contract/ticket")}>
              <ListItemIcon style={{ color: "#CBD1D7" }}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Ticket</Typography>
            </ListItemButton>
          </List>
        </Drawer>
        <main style={{background:"#f8f9fa"}} className={classes.content}>{children}</main>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
