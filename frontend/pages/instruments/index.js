import { Button, Grid, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthorizedLayout from "../../app/components/AuthorizedLayout";
import { ROUTES } from "../../app/constants";
import {
  selectInstruments,
  setInstruments,
} from "../../app/redux/reducers/mainSlice";
import { getAllInstruments } from "../api/services";

const Instruments = () => {
  const dispatch = useDispatch();
  const allInstruments = useSelector(selectInstruments);
  const router = useRouter();

  const selectInstrument = ({ instrument_symbol }) => {
    console.log(instrument_symbol);
    router.push(ROUTES.INSTRUMENT(instrument_symbol));
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const resp = await getAllInstruments();
      dispatch(setInstruments(resp));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthorizedLayout>
      <Paper sx={{ maxWidth: 1200, margin: "auto", padding: 2, marginTop: 10 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 6, md: 10 }}
        >
          {allInstruments.map((instr, index) => (
            <Grid item xs={2} sm={2} md={2} key={index}>
              <Button
                onClick={() => selectInstrument(instr)}
                sx={{ fontSize: 11, minWidth: "90%" }}
                variant="outlined"
              >
                {instr.id}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </AuthorizedLayout>
  );
};

export default Instruments;
