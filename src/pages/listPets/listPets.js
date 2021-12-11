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

// function createData(name, type, desc, age, pic) {
//     return { name, type, desc, age, pic };
// }


// const data = [
//     createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
//     createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
//     createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
//     createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
//     createData('Meow', "cat", "bekku", 4, "PIC")
// ];

function ListPets() {

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        fetch("http://localhost:5000/getPets").then((data) => data.json()).then((obj) => {
            const newData = obj.map(a => {
                const o = JSON.parse(a);
                const [contentType, base64] = o.pic.split(';base64,');
                const blobData = base64toBlob(contentType, base64);
                console.log('blobdata', blobData)
                const src = URL.createObjectURL(blobData)
                console.log('blobdata', src)
                o.pic = src;
                return o;
            })
            setRows(newData);
        });

        // // API call to backend
        // setTimeout(() => {
            //     setRows(data);
            // },2000)
        }, []);
        const del = (id) => {
            fetch("http://localhost:5000/deletePets/" + id, {
                method: 'DELETE',
            })
                .then(res => res.text()) // or res.json()
                .then(res => console.log(res))
        }
    console.log('rows -> ', rows);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">photo</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell align="right"><img style={{ height: "50px" }} src={row.pic} alt={row.pic} /></TableCell>
                            <TableCell align="right"><button onClick={() => del(row.id)}>Delete</button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export { ListPets }