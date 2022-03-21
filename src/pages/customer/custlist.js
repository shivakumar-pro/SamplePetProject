// import * as React from 'react';

// const ListPets = () => {
//     return <span>This is list pets</span>
// }

// export { ListPets};


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { base64toBlob } from '../../util/base64toblobconverter';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { CUST_LIST } from '../../util/constants'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Custlist() {

    const navigate = useNavigate();

    const [rows, setRows] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        window.scrollTo(0, 0)


        fetch(CUST_LIST).then((data) => data.json()).then((obj) => {
            const newData = obj.map(a => {
                const o = JSON.parse(a);
                return o;
            })
            setRows(newData);
        });

        // // API call to backend
        // setTimeout(() => {
        //     setRows(data);
        // },2000)
    }, []);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    console.log('rows -> ', rows);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow style={{ backgroundColor: "#BDB76B", fontWeight: "bold" }}>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>Id</TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>Profuct</TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>Price</TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>Contact</TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: '#C0C0C0' }}>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.product}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.contact}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Successfully deleted
                </Alert>
            </Snackbar>
        </TableContainer>
    );
}


export { Custlist }