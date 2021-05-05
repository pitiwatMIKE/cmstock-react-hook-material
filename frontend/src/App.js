import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//meterail
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

//action redux
import * as loginAction from "./redux/actions/login.action";

// component
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import Stock from "./components/page/Stock";
import StockCreate from "./components/page/StockCreate";
import StockEdit from "./components/page/StockEdit";
import Report from "./components/page/Report";
import AboutUs from "./components/page/AboutUs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(10),
  },
}));

//Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loginAction.isLogIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoggedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loginAction.isLogIn() ? <Redirect to="stock" /> : <Component {...props} />
    }
  />
);

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App create");
    dispatch(loginAction.reLogin());
  },[]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const loginReducer = useSelector((state) => state.loginReducer);

  return (
    <Router>
      <div className={classes.root}>
        {/* Header */}
        {loginReducer.result && !loginReducer.error && (
          <Header open={openDrawer} handleDrawerOpen={handleDrawerOpen} />
        )}
        {/* Menu */}
        {loginReducer.result && !loginReducer.error && (
          <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />
        )}

        <Container className={classes.content}>
          <Switch>
            <LoggedRoute exact path="/login" component={Login} />
            <LoggedRoute exact path="/register" component={Register} />
            <SecuredRoute exact path="/stock" component={Stock} />
            <SecuredRoute exact path="/report" component={Report} />
            <SecuredRoute exact path="/aboutus" component={AboutUs} />
            <SecuredRoute exact path="/stock/create" component={StockCreate} />
            <SecuredRoute exact path="/stock/edit/:id" component={StockEdit} />
            <Route
              exact
              path="/"
              component={() => <Redirect to="login" />}
            ></Route>
            <Route exact path="*" component={() => <Redirect to="login" />}/>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
