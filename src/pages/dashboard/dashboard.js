import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import { base64toBlob } from '../../util/base64toblobconverter';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button } from '@mui/material';
import { GET_PETS } from '../../util/constants';

// MAIN code

function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const adminUser = {
        email: "admin@example.com",
        password: "password"
    }
    const navigate = useNavigate();

    React.useEffect(() => {

        let email = localStorage.getItem('email');
        let password = localStorage.getItem('password');
        if (email == adminUser.email && password == adminUser.password) {
            console.log("Logged in");
        }
        else {
            navigate('/signup')
        }

    }, []);

    const Logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");

    }

    const customerchange = () =>
    {
        navigate('/home/customer')
    }  

    const customerlist = () =>
    {
        navigate('/home/custlist')
    }  

    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        fetch(GET_PETS).then((data) => data.json()).then((obj) => {
            const newData = obj.map(a => {
                const o = JSON.parse(a);
                if (o.pic) {
                    const [contentType, base64] = o.pic.split(';base64,');
                    if (base64) {
                        const blobData = base64toBlob(contentType, base64);
                        console.log('blobdata', blobData)
                        const src = URL.createObjectURL(blobData)
                        console.log('blobdata', src)
                        o.pic = src;

                    }
                }
                else {
                    o.pic = "";
                }
                return o;
            })
            setRows(newData);
        });


    }, []);


    return (

        <Grid container={true} justifyContent="center" spacing={4} style={{ padding: "20px" }}>
            <Grid item={true} xs={12}>
            <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',
                        margin:'10px',

                    }}
                    //onChange={handleChange}

                >
                    Dogs
                </Button>
                <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',
                        margin:'10px',

                    }}
                    //onChange={handleChange}

                >
                    Cats
                </Button>
               
                <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',
                        margin:'10px',

                    }}
                    //onChange={handleChange}

                >
                    Birds
                </Button>
               
                <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',
                        margin:'10px',

                    }}
                    //onChange={handleChange}

                >
                    Fish
                </Button>
                
                <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',
                        margin:'10px',

                    }}
                    onClick={customerchange}

                >
                   Add Customer
                </Button>

                <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',
                        margin:'10px',

                    }}
                    onClick={customerlist}

                >
                   Customers
                </Button>
            </Grid>
            


            {rows.map((row) => (
                <Grid item={true} xs={12} md={3} style={{ textAlign: "center" }}>
                    <ImageListItem key={row.pic} style={{ width: "100%" }}>

                        key={row.pic}

                        <img src={row.pic} alt={row.pic} />
                        <ImageListItemBar
                            title={row.type}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${row.pic}`}
                                >

                                </IconButton>
                            }
                        />


                        )
                    </ImageListItem>
                </Grid>
            ))}

        </Grid>


    );
}


export { Dashboard };