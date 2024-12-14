import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography, Stack } from "@mui/material";
import SignInComponent from "../../components/auth/SignIn";

// const BrandImage = styled("img")`
//   margin-right: ${(props) => props.theme.spacing(2)};
//   width: 80px;
//   height: 90px;
// `;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function SignIn() {
  return (
    <React.Fragment>
      <Wrapper>
        <Helmet title="Sign In" />

        <Stack justifyContent="center" alignItems="center" spacing={6}>
          {/* <BrandImage src="/assets/logoa.png" alt="logoa" /> */}
          <Typography component="h1" variant="h1">
            Cohesion
          </Typography>
        </Stack>

        {/* <BigAvatar alt="John" src="/static/img/avatars/john.jpg" /> */}

        <SignInComponent />
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
