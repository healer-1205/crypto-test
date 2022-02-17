import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./App.css";
const Web3 = require("web3");

const App: React.FunctionComponent = () => {
  const [nep, setNep] = useState<Number | null>(0.0);
  const [busd, setBUSD] = useState<Number | null>(0.0);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [address, setAddress] = useState<String | null>("");

  const calculateBUSD = (value: Number) => {
    setBUSD(Number(value) * 3);
  };
  const calculateNep = (value: Number) => {
    setNep(Math.round((Number(value) / 3) * 100) / 100);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const detailModalClose = () => {
    setOpenDetail(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getAccount = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const accountAddress = accounts[0];
      return accountAddress;
    }
  };

  const walletConnect = () => {
    getAccount().then((res) => {
      if (res !== false) {
        setAddress(res);
      }
    });
    handleClose();
    setOpenDetail(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card sx={{ minWidth: 375 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="#000" gutterBottom>
              Crypto Converter
            </Typography>
            <Typography sx={{ mb: 1.5 }}>NEP</Typography>
            <TextField
              id="nep"
              label="NEP"
              variant="outlined"
              type="number"
              value={nep}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNep(Number(event.target.value));
                calculateBUSD(Number(event.target.value));
              }}
            />
            <Typography sx={{ mb: 1.5, mt: 1.5 }}>BUSD</Typography>
            <TextField
              id="nep"
              label="BUSD"
              variant="outlined"
              type="number"
              value={busd}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBUSD(Number(event.target.value));
                calculateNep(Number(event.target.value));
              }}
            />
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleClickOpen();
              }}
            >
              Check Wallet Detail
            </Button>
          </CardActions>
        </Card>
      </header>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title">{"Wallet Detail"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Wallet not connected. Please click the "connect" button below.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              walletConnect();
            }}
            autoFocus
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>
      {/* wallet detail modal */}
      <Dialog
        open={openDetail}
        onClose={detailModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"sm"}
      >
        <DialogTitle id="alert-dialog-title">{"Wallet Detail"}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>KEY</TableCell>
                  <TableCell align="right">VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Account
                  </TableCell>
                  <TableCell align="right">111</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    ChainID
                  </TableCell>
                  <TableCell align="right">111</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Balance
                  </TableCell>
                  <TableCell align="right">111</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={detailModalClose}
          >
            Disconnect
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
