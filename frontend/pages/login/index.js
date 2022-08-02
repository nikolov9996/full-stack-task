import { OutlinedInput, Grid, Typography, Paper, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AuthorizedLayout from "../../app/components/AuthorizedLayout";
import { authenticate } from "../../app/redux/reducers/authSlice";
import { loginUser } from "../api/services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const submit = async () => {
    const { err, userData } = await loginUser(email, password);
    if (err) {
      setError(err);
    } else {
      dispatch(authenticate(userData));
      setError(null);
    }
  };

  return (
    <AuthorizedLayout>
      <Paper
        elevation={4}
        sx={{ maxWidth: 400, margin: "auto", padding: 2, marginTop: 20 }}
      >
        <Grid display="flex" flexDirection="column">
          <Typography variant="h5" align="center">
            Login
          </Typography>
          <Typography>email</Typography>
          <OutlinedInput
            type="email"
            onChange={({ target }) => setEmail(target.value)}
            size="small"
          />
          <Typography>password</Typography>
          <OutlinedInput
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            size="small"
          />
          <Button onClick={submit} variant="contained" sx={{ mt: 3 }}>
            Submit
          </Button>
        </Grid>
        {error && <Typography color="error">{error}</Typography>}
      </Paper>
    </AuthorizedLayout>
  );
};

export default Login;
