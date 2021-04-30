import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import {useSelector} from "react-redux"

//meterail
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { Container } from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";

// component
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/page/Login";
import Register from "./components/page/Register";
import Stock from "./components/page/Stock";
import StockCreate from "./components/page/StockCreate";
import StockEdit from "./components/page/StockEdit";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(10)
  }
}));

export default function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const loginReducer = useSelector(state => state.loginReducer)

  return (
    <Router>
      <div className={classes.root}>
        {loginReducer.result && <Header open={openDrawer} handleDrawerOpen={handleDrawerOpen} />}
        {loginReducer.result && <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />}
        
        <Container className={classes.content}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/stock" component={Stock} />
            <Route exact path="/stock/create" component={StockCreate} />
            <Route exact path="/stock/edit/:id" component={StockEdit} />
            <Route
              exact
              path="/"
              component={() => <Redirect to="login" />}
            ></Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
