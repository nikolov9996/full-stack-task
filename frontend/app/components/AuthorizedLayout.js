import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { verifySession } from "../../pages/api/middleware/verifySession";
import { verifyToken } from "../../pages/api/services";
import { ROUTES } from "../constants";
import { selectToken } from "../redux/reducers/authSlice";

const AuthorizedLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = useSelector(selectToken);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (!token.length || !token) {
      return router.push(ROUTES.LOGIN);
    }
    const { status } = await verifyToken();

    if (status === 401) {
      router.push(ROUTES.LOGIN);
    }
    setLoading(false)
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return <>{children}</>;
};

export default AuthorizedLayout;
