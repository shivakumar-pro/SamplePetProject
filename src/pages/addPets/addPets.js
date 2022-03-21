import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ADD_PETS } from '../../util/constants';



const AddPets = () => {


    const myStyle = {
        backgroundImage: "url(/images/naayi.jfif)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: "0 15px 15px 15px"



    };


    const navigate = useNavigate();
    const [disableBtn, setDisableBtn] = React.useState(false);

    const [data, setData] = React.useState({
        name: "",
        description: "",
        breed: "",
        type: "",
        pic: "",
        price: ""
    });

    const handleClick = () => {
        if (Object.values(data).some((evry) => !evry)) {
            alert("fill all the fields")
        } else {
            apiCall(data);
        }
    }
    const handleChange = (event) => {
        const { id, value } = event.target
        if (id === 'pic') {
            console.log("hello michel", event.target.value, event.target.files)
            const file = event.target.files[0];
            if (file) {
                var reader = new FileReader();

                reader.onload = function (readerEvt) {
                    var binaryString = readerEvt.target.result;
                    const convertedData = binaryString;
                    setData({ ...data, [id]: convertedData });
                };
                reader.readAsDataURL(file);
            }
        } else {
            console.log("===>", id, value);
            setData({
                ...data,
                [id]: value
            })
        }

    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, []);



    const apiCall = (data) => {
        setDisableBtn(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(ADD_PETS, requestOptions)
            .then(response => response.text())
            .then(result => {
                navigate('/home/list')
                console.log(result)
            })

            .catch(error => {
                setDisableBtn(false);
                console.log('error', error)
            });
    }

    console.log("RENDER = ", data)
    return <Grid container={true} justifyContent="center">
        <Grid item={true} md={6} xs={12}>
            <Paper elevation={3} style={{ padding: "0 15px 15px 15px", ...myStyle }}>
                <CardHeader
                    title="Add pets"
                    style={{ backgroundColor: "#1875d1", margin: "0 -15px 10px -15px", height: "50px", color: "white", textAlign: "center" }}
                />

                <Autocomplete
                    options={[
                        { id: "dogs", "label": "Dogs", "value": "dogs" },
                        { id: "cats", "label": "Cats", "value": "cats" },
                        { id: "birds", "label": "Birds", "value": "birds" },
                        { id: "fish", "label": "Fish", "value": "fish" },
                    ]}
                    onChange={(event, nv) => handleChange({ target: { value: nv.value, id: "type" } })}
                    id="type"
                    renderInput={(params) => (
                        <TextField {...params} label="Type" variant="outlined" />
                    )}
                />
                <br />
                {/* 
                <TextField
                    id="id"
                    label="Pet Id"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}

                />
                <br /> */}
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
                    id="breed"
                    label="Breed"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}

                />
                <br />
                {/* <TextField
                    id="age"
                    label="age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                />
                <br /> */}
                <br />
                <TextField
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}

                />
                {/* <br />
                 <TextField
                    id="dob"
                    label="Date Of Birth"
                    type="date"
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}

                /> */}
                <br />
                <br />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    fullWidth
                    minRows={4}
                    onChange={handleChange}
                // maxRows={6}
                />
                <br />
                <br />


                <img style={{ height: "50px" }} src={data.pic} alt={data.pic} />
                <br />
                <Button
                    variant="outlined"
                    component="label"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        WebkitBoxSizing: 'border-box',
                        WebkitBorderRadius: '20px',
                        fontWeight: 'bold',

                    }}
                    onChange={handleChange}

                >
                    Upload File
                    <input
                        id="pic"
                        type="file"
                        hidden
                        accept='.png,.jpeg,.jpg,.jpe,.jfif,.jif'
                    />
                </Button>
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




export { AddPets };