import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, Providers } from "../../config/firebase";
import { Button, Typography, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Center from "../utils/Center";


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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



      {/* Email or Phone Number and Password Sign In */}
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      {/* <TextField
        fullWidth
        label="Lastname"
        variant="outlined"
        margin="normal"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      /> */}
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
        label="Phone number"
        variant="outlined"
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
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
      {/* <TextField
        fullWidth
        label="Confirm password"
        type="password"
        variant="outlined"
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      /> */}
      <Typography sx={{ mt: 2 }} color={"red"}>
        {errorMessage}
      </Typography>
      <Button
        fullWidth
        size="large"
        disabled={disabled}
        variant="contained"
        onClick={signInWithEmailAndPasswordHandler}
      >
        Register
      </Button>
    </Center>
  );
};

export default Register;
