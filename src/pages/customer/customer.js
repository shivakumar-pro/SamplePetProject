import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import { POST_CUST } from '../../util/constants'




const Customer = () => {


    const myStyle = {
        backgroundImage: "url(/images/naayi.jfif)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: "0 15px 15px 15px"



    };

    const handleChange = (event) => {
        const { id, value } = event.target

        setData({
            ...data,
            [id]: value
        })

    }


    const navigate = useNavigate();
    const [disableBtn, setDisableBtn] = React.useState(false);

    const [data, setData] = React.useState({
        name: "",
        product: "",
        price: "",
        contact: "",
        address: ""
    });

    const handleClick = () => {

        apiCall(data);
        navigate('/home/list')

    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, []);



    const apiCall = (data) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(POST_CUST, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })

            .catch(error => console.log('error', error));
    }

    console.log("RENDER = ", data)
    return <Grid container={true} justifyContent="center">
        <Grid item={true} md={6} xs={12}>
            <Paper elevation={3} style={{ padding: "0 15px 15px 15px" }} style={myStyle}>
                <CardHeader
                    title="Customer Details"
                    style={{ backgroundColor: "#1875d1", margin: "0 -15px 10px -15px", height: "50px", color: "white", textAlign: "center" }}
                />


                <br />

                <TextField
                    id="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}


                />
                <br />
                <br />
                <TextField
                    id="product"
                    label="Product"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}

                />
                <br />
                <br />
                <TextField
                    id="price"
                    label="Price"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}

                />
                <br />
                <br />
                <TextField
                    id="contact"
                    label="Contact"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}

                />

                <br />
                <br />
                <TextField
                    id="address"
                    label="Address"
                    multiline
                    fullWidth
                    minRows={4}
                    onChange={handleChange}

                // maxRows={6}
                />
                <br />

                <br />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    //onClick={handleClick}
                    onClick={() => {
                        handleClick();
                    }}
                    disabled={disableBtn}
                >
                    Submit
                </Button>
            </Paper>
        </Grid>
    </Grid>
}




export { Customer };