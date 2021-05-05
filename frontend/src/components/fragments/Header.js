import React from "react";
import {NavLink} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

import {withRouter} from "react-router-dom"
import * as logoutAction from "../../redux/actions/login.action"
import { useDispatch } from "react-redux";
import { ListItem, ListItemText } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function Header(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: props.open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* <Link to="/stock">CM-Stock</Link> */}
            <ListItem
              component={NavLink}
              to="/stock"
              button
            >
              <ListItemText primary="CM-Stock"/>
            </ListItem>
          </Typography>
          <Button color="inherit" onClick={() => {
            dispatch(logoutAction.logout(props.history))
          }}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header)
