import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import _ from "lodash";

import {
  Checkbox,
  FormControlLabel,
  Button,
  TextField as MuiTextField,
  Typography,
  Box,
  Grid,
  Alert as MuiAlert,
} from "@mui/material";
import { spacing } from "@mui/system";

import useAuth from "../../hooks/useAuth";

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [selectedSigninType, setSelectedSigninType] = useState<string>("");

  const handleChangeSignInOption = (type: string) => {
    setSelectedSigninType(type);
  };

  return (
    <Formik
      initialValues={{
        email: "demo@bootlab.io",
        password: "unsafepassword",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await signIn(values.email, values.password);
          navigate("/dashboard");
        } catch (error: any) {
          const message = error.message || "Something went wrong";
          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {!_.some(selectedSigninType) && (
            <Grid item gap={5}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                gutterBottom
                marginY={8}
              >
                Choose how to sign in to your Cohesion application
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  padding: 5,
                  margin: "10px 0",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                }}
                // onClick={() => handleChangeSignInOption("ad")}
              >
                <img src="/static/img/brands/azure.png" alt="Azure AD" />
                <Typography variant="h5">Login with Azure AD</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  border: "1px solid #ccc",
                  padding: 5,
                  margin: "10px 0",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                }}
                onClick={() => handleChangeSignInOption("normal")}
              >
                <img src="/static/img/brands/user.png" alt="User Login" />
                <Typography variant="h5">
                  Login with userId and password
                </Typography>
              </Box>
            </Grid>
          )}

          {selectedSigninType === "normal" && (
            <>
              <Box sx={{ mt: 3, mb: 3 }}>
                <MuiAlert severity="info">
                  Use <strong>user id</strong> and <strong>password</strong> to
                  sign in
                </MuiAlert>
              </Box>

              {errors.submit && (
                <Box sx={{ mt: 2, mb: 3 }}>
                  <MuiAlert severity="warning">{errors.submit}</MuiAlert>
                </Box>
              )}
              <TextField
                type="email"
                name="email"
                label="Email Address"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Sign in
              </Button>
              <Button
                component={Link}
                to="/auth/reset-password"
                fullWidth
                color="primary"
              >
                Forgot password
              </Button>
              <Button
                sx={{ color: "white" }}
                fullWidth
                onClick={() => handleChangeSignInOption("")}
              >
                Back to sign in options
              </Button>
            </>
          )}
        </form>
      )}
    </Formik>
  );
};

export default SignIn;
