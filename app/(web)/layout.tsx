"use client"

import themeOptions from "@/@core/theme/themeOptions";
import { CardHeader, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar, Typography, createTheme } from "@mui/material"
import { useSettings } from "@/@core/hooks/useSettings";
import { useRouter } from "next/navigation";
import { makeStyles } from "@mui/styles";
import paper from "@/@core/theme/overrides/paper";
import PeopleIcon from '@mui/icons-material/People';
import BadgeIcon from '@mui/icons-material/Badge';

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 1200,
  },
  drawer: {
    width: 120,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    background:
      "linear-gradient(0deg, rgba(3,8,20,1) 60%, rgba(8,18,50,255) 100%)",
  },
  toolbar: {
    minHeight: 64,
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#eaecef",
    // padding: 8,
  },
  texticon: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "24px"
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
});

const Layout = ({ children }: any) => {
  const classes = useStyles();
  const router = useRouter();
  const { settings, saveSettings } = useSettings()
  let darkTheme = createTheme(themeOptions(settings, "dark"))
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <Toolbar>
            <Typography variant="h6" className={classes.texticon}>
              {/* <Typography variant="h6" className={classes.texticon}> */}
              Cat System
              {/* </Typography> */}
            </Typography>
          </Toolbar>
          <List sx={{ pl: 1 }} className={classes.texticon}>
            <ListItemButton onClick={() => router.push("/employee")}>
              <ListItemIcon style={{ color: "#CBD1D7"}}>
                <BadgeIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Employee</Typography>
            </ListItemButton>

            <ListItemButton onClick={() => router.push("/customer")}>
              <ListItemIcon style={{ color: "#CBD1D7"}}>
                <PeopleIcon />
              </ListItemIcon>
              <Typography style={{ color: "#CBD1D7", fontSize: "16px", fontWeight: 700 }}>Customer</Typography>
            </ListItemButton>
          </List>

        </Drawer>
        <main className={classes.content}>{children}</main>
        
      </div>
      
    </ThemeProvider>
  );

}
export default Layout;