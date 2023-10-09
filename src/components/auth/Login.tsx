import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Button, Typography, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";


const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    setDisabled(true);
    signInWithPopup(auth, Providers.google)
      .then(() => {
        setDisabled(false);
        console.info("TODO: navigate to authenticated screen");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  const signInWithEmailAndPasswordHandler = () => {
    setDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDisabled(false);
        console.info("TODO: navigate to authenticated screen");
        navigate("/");
      })
      .catch((error) => {
        setErrorMessage(error.code + ": " + error.message);
        setDisabled(false);
      });
  };

  return (
    <Center height={"auto"}>
      <Button
        startIcon={<GoogleIcon />}
        size="large"
        disabled={disabled}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>

      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>

      {/* Email or Phone Number and Password Sign In */}
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        size="large"
        disabled={disabled}
        variant="contained"
        onClick={signInWithEmailAndPasswordHandler}
      >
        Login
      </Button>
    </Center>
  );
};

export default Login;
