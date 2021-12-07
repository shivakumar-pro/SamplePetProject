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

function createData(name, type, desc, age, pic) {
    return { name, type, desc, age, pic };
}


const data = [
    createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
    createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
    createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
    createData('Luffy', "Dog", "Nam nayi", 2, "PIC"),
    createData('Meow', "cat", "bekku", 4, "PIC")
];

function ListPets() {

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        // API call to backend
        setTimeout(() => {
            setRows(data);
        },2000)
    }, []);

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
                            <TableCell align="right">{row.desc}</TableCell>
                            <TableCell align="right">{row.age}</TableCell>
                            <TableCell align="right"><img style={{height: "50px"}} src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*" alt={row.pic} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export { ListPets }