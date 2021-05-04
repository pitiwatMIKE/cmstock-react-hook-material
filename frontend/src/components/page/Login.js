import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { useDispatch, useSelector } from "react-redux";
import * as loginAction from "../../redux/actions/login.action";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const loginReducer = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const [account, setAcount] = React.useState({
    username: "",
    password: "",
  });

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="150"
        image={`${process.env.PUBLIC_URL}/images/React.jpg`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginAction.login({ ...account }, props.history));
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="email"
            autoFocus
            value={account.username}
            onChange={(e) => {
              setAcount({ ...account, username: e.target.value });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={account.password}
            onChange={(e) => {
              setAcount({ ...account, password: e.target.value });
            }}
          />
          {loginReducer.error && (
            <Alert severity="error">{loginReducer.result}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Button
            fullWidth
            size="small"
            color="primary"
            onClick={() => props.history.push("/register")}
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
