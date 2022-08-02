import axios from "axios";
import {
  API_INSTRUMENT,
  API_INSTRUMENTS,
  API_LOGIN,
  API_VERIFY_SESSION,
} from "../../app/constants";
import Router from "next/router";
import { store } from "../../app/redux/store";

const { token } = store.getState().auth;

export const instanceAuth = axios.create({
  baseURL: "http://localhost:3000/users/",
  timeout: 2000,
});

export const instanceMain = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 2000,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export const loginUser = async (email, password) => {
  try {
    const { data } = await instanceAuth.post(API_LOGIN, {
      email,
      password,
    });

    return { err: null, userData: data };
  } catch (error) {
    return { err: error.response.data };
  }
};

export const getAllInstruments = async () => {
  try {
    const { data } = await instanceMain.get(API_INSTRUMENTS);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneInstrument = async (symbol) => {
  try {
    const { data } = await instanceMain.get(API_INSTRUMENT(symbol));
    return { err: null, instrumentData: data };
  } catch (error) {
    return { err: error.response.data };
  }
};

export const verifyToken = async () => {
  return await instanceAuth.get(API_VERIFY_SESSION, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
