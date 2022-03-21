// import * as React from 'react';

// const ListPets = () => {
//     return <span>This is list pets</span>
// }

// export { ListPets};

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { base64toBlob } from "../../util/base64toblobconverter";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GET_PETS } from "../../util/constants";
import { DEL_PETS } from "../../util/constants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ListPets() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    fetch(GET_PETS)
      .then((data) => data.json())
      .then((obj) => {
        const newData = obj.map((a) => {
          const o = JSON.parse(a);
          if (o.pic) {
            const [contentType, base64] = o.pic.split(";base64,");
            if (base64) {
              const blobData = base64toBlob(contentType, base64);
              console.log("blobdata", blobData);
              const src = URL.createObjectURL(blobData);
              console.log("blobdata", src);
              o.pic = src;
            }
          } else {
            o.pic = "";
          }
          return o;
        });
        const type = searchParams.get("type");
        setRows(type ? newData.filter((obj) => obj.type === type) : newData);
      });

    // // API call to backend
    // setTimeout(() => {
    //     setRows(data);
    // },2000)
  }, []);

  const edit = (petid) => {
    navigate("/home/edit/" + petid);
  };

  function handleRemove(petid) {
    fetch(DEL_PETS + petid, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        console.log(res);
        setOpen(true);
        navigate("/home/list");
        window.location.reload(false);
      });
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  console.log("rows -> ", rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{ backgroundColor: "#BDB76B", fontWeight: "bold" }}>
            <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Pet Id
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Breed
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Description
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Photo
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              EDIT
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: "#C0C0C0" }}>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell align="right">{row.petid}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.breed}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                <img style={{ height: "50px" }} src={row.pic} alt={row.pic} />
              </TableCell>
              <TableCell align="right">
                <IconButton title="Edit" onClick={() => edit(row.petid)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  title="Delete"
                  onClick={() => handleRemove(row.petid)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Successfully deleted
        </Alert>
      </Snackbar>
    </TableContainer>
  );
}

export { ListPets };
