import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getOneInstrument } from "../api/services";
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { selectLoading, setLoading } from "../../app/redux/reducers/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthorizedLayout from "../../app/components/AuthorizedLayout";
const Instrument = () => {
  const router = useRouter();
  const [symbol, setSymbol] = useState(router.query.instrument);
  const [instrument, setInstrument] = useState({});
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    setSymbol(router.query.instrument);
  }, [router.query.instrument]);

  useEffect(() => {
    dispatch(setLoading(true));
    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  async function fetchData() {
    const { err, instrumentData } = await getOneInstrument(symbol);
    if (err) {
      setError(err);
    } else {
      setInstrument(instrumentData);
      setError(false);
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  }

  if (loading || !instrument.id) {
    return (
      <Paper sx={{ maxWidth: 400, margin: "auto", padding: 2, marginTop: 10 }}>
        <CircularProgress />;
      </Paper>
    );
  }

  return (
      <Paper sx={{ maxWidth: 400, margin: "auto", padding: 2, marginTop: 10 }}>
        {error && <Typography color="error">{error}</Typography>}
        <Typography align="center">{instrument.instrument_name}</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>USD Price</TableCell>
              <TableCell align="right">{instrument.usd_price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Instrument Name</TableCell>
              <TableCell align="right">{instrument.instrument_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Instrument Symbol</TableCell>
              <TableCell align="right">
                {instrument.instrument_symbol}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">{instrument.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Created At</TableCell>
              <TableCell align="right">
                {format(new Date(instrument.created_at), "yyyy-MM-dd  hh:mm a")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Updated At</TableCell>
              <TableCell align="right">
                {format(new Date(instrument.updated_at), "yyyy-MM-dd  hh:mm a")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
  );
};

export default Instrument;
