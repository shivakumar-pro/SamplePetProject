import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

const AddPets = () => {
    const [data, setData] = React.useState({
        name: "a",
        age: 0,
        description: "",
        type: "",
        pic: ""
    });

    const handleClick = () => {
        if(Object.values(data).some((evry) => !evry)) {
            alert("fill all the fields")
        } else {
            apiCall(data);
        }
    }

    const handleChange = (event) => {
        const { id, value } = event.target
        console.log("===>", id, value);
        setData({
            ...data,
            [id]: value
        })

    }

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
        
        fetch("http://localhost:5000/post", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }

    console.log("RENDER = " ,data)

    return <Grid container={true} justifyContent="center">
        <Grid item={true} md={6} xs={12}>
            <Paper elevation={3} style={{ padding: "0 15px 15px 15px" }}>
                <CardHeader
                    title="Add pets"
                    style={{ backgroundColor: "#1875d1", margin: "0 -15px 10px -15px", height: "50px", color: "white", textAlign: "center" }}
                />
                <Autocomplete
                    options={[
                        { id: "dogs", "label": "Dogs", "value": "dogs" },
                        { id: "cats", "label": "Cats", "value": "cats" },
                        { id: "birds", "label": "Birds", "value": "birds" },
                    ]}
                    onChange={(event, nv) => handleChange({ target: { value: nv.value, id: "type" } })}
                    id="type"
                    renderInput={(params) => (
                        <TextField {...params} label="Type" variant="outlined" />
                    )}
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
                    id="age"
                    label="age"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                />
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
                <Button
                    variant="outlined"
                    component="label"
                    onChange={handleChange}
                >
                    Upload File
                    <input
                        id="pic"
                        type="file"
                        hidden
                        accept=".jpeg, .jpg, .jpe, .jfif, .jif"
                    />
                </Button>
                <br />
                <br />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    onClick={handleClick}
                >
                    Submit
                </Button>
            </Paper>
        </Grid>
    </Grid>
}

export { AddPets };