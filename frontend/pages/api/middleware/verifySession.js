import { ROUTES } from "../../../app/constants";
import { verifyToken } from "../services";
import Router from "next/router";

export const verifySession = async (path) => {
  try {
    const { status } = await verifyToken();

    if (status !== 401) {
      Router.push(path);
    }
  } catch (error) {
    Router.push(ROUTES.LOGIN);
  }

  return path;
};
