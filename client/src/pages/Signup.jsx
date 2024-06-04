import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let err = false;

    if (username === "") {
      err = true;
      setUsernameErrText("Please fill this field");
    }
    if (password === "") {
      err = true;
      setPasswordErrText("Please fill this field");
    }
    if (confirmPassword === "") {
      err = true;
      setConfirmPasswordErrText("Please fill this field");
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErrText("Confirm password does not match");
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.signup({
        username,
        password,
        confirmPassword,
      });
      setLoading(false);
      localStorage.setItem("token", res.token);
      navigate("/");
    } catch (err) {
      const errors = err.data.errors;
      errors.forEach((e) => {
        if (e.param === "username") {
          setUsernameErrText(e.msg);
        }
        if (e.param === "password") {
          setPasswordErrText(e.msg);
        }
        if (e.param === "confirmPassword") {
          setConfirmPasswordErrText(e.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        sx={{ mt: 1, mb: 1, textAlign: "center" }}
      >
        TaskMaster
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
      >
        Manage Your Tasks Efficiently
      </Typography>
      <Card sx={{ maxWidth: 400, width: "100%", p: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Signup
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              disabled={loading}
              error={usernameErrText !== ""}
              helperText={usernameErrText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              disabled={loading}
              error={passwordErrText !== ""}
              helperText={passwordErrText}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              disabled={loading}
              error={confirmPasswordErrText !== ""}
              helperText={confirmPasswordErrText}
            />
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              variant="contained"
              fullWidth
              color="primary"
              type="submit"
              loading={loading}
            >
              Signup
            </LoadingButton>
          </Box>
          <Button
            component={Link}
            to="/login"
            sx={{
              textTransform: "none",
              mt: 2,
              display: "block",
              textAlign: "center",
            }}
          >
            Already have an account? Login
          </Button>
        </CardContent>
      </Card>
      <Box sx={{ mt: 5, textAlign: "center", color: "text.secondary" }}>
        <Typography variant="body2" component="p">
          "TaskMaster has transformed the way I organize my tasks!" - Happy User
        </Typography>
        <Typography variant="body2" component="p" sx={{ mt: 1 }}>
          <Link
            to="/terms"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Terms of Service
          </Link>{" "}
          |{" "}
          <Link
            to="/privacy"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            Privacy Policy
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
