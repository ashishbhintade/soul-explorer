import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const GetSoulNames = () => {
  const styleObj = {
    backgroundColor: "#3D3F35",
    color: "#FFFFFF",
    fontFamily: "Monospace",
  };

  const { data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      // console.log(data);
      setUsers(data.ethereum.smartContractCalls);
    }
  }, [data]);

  const newName = (_name) => {
    return `${_name.slice(0, 7)}...${_name.slice(-5)}`;
  };

  return (
    <div>
      <h1
        style={{
          marginLeft: "20px",
          color: "#E6DB74",
          fontFamily: "Monospace",
        }}
      >
        Soul Explorer
      </h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={styleObj}>Soul Name</TableCell>
              <TableCell style={styleObj} align="left">
                Owner
              </TableCell>
              <TableCell style={styleObj} align="left">
                Transaction hash
              </TableCell>
              <TableCell style={styleObj} align="left">
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((i) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  style={{ color: "#FFFFFF", fontFamily: "Monospace" }}
                >
                  {`${i.arguments[1].value}.celo`}
                </TableCell>
                <TableCell align="left" style={{ fontFamily: "Monospace" }}>
                  <a
                    href={`https://alfajores.celoscan.io/address/${i.arguments[0].value}`}
                  >
                    {newName(i.arguments[0].value)}
                  </a>
                </TableCell>
                <TableCell align="left" style={{ fontFamily: "Monospace" }}>
                  <a
                    href={`https://alfajores.celoscan.io/tx/${i.transaction.hash}`}
                  >
                    {newName(i.transaction.hash)}
                  </a>
                </TableCell>
                <TableCell align="left" style={{ fontFamily: "Monospace" }}>
                  <a href={i.arguments[3].value}>Link</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetSoulNames;
