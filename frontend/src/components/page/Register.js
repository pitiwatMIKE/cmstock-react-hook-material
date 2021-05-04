import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import * as registerAction from "../../redux/actions/register.action";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

export default function Register(props) {
  const registerReducer = useSelector((state) => state.registerReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          autoComplete="email"
          autoFocus
          value={values.username}
          onChange={handleChange}
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
          value={values.password}
          onChange={handleChange}
        />
        {registerReducer.error && (
          <Alert severity="error">Can't Register Try Again!</Alert>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className={classes.submit}
        >
          Register
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          onClick={() => {
            dispatch(registerAction.init());
            props.history.push("/login");
          }}
        >
          Cancel
        </Button>
      </form>
    );
  };

  return (
    <div>
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
            Register
          </Typography>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              axios
                .post("http://localhost:8085/api/v2/authen/register", values)
                .then((result) => {
                  if (result.data.result === "ok") {
                    dispatch(registerAction.register(result.data.result,  props.history));
                  } else {
                    dispatch(registerAction.register(result.data.result));
                  }
                  setSubmitting(false);
                });
            }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>

      <Dialog
        open={registerReducer.result === "ok"}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Successfully"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your Register is Successfully !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              dispatch(registerAction.init())
              props.history.push("/login");
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
