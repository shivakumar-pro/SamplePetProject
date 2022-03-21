import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

const EditPets = () => {
    const [data, setData] = React.useState({
        name: "a",
        age: 0,
        description: "",
        type: "",
        pic: ""
    });
    const navigate = useNavigate();
    // GETTING ID FROM URL, ID IS MAPPED IN APP.JS
    const { id } = useParams();

    // this runs before the page render
    React.useEffect(()=>{
        // getting object by id
        fetch("http://localhost:5000/getPet/"+id).then(a=>a.json()).then(data=> {
            setData(data);
        });
    },[])

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
                    setData({...data, [id]: convertedData});
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

    const apiCall = (data) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:5000/editpet/"+id, requestOptions)
            .then(response => response.text())
            .then(result => {
                navigate('/home/list')
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    console.log("RENDER = ", data)

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
                    value={data.type}
                />
                <br />
                <TextField
                    id="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    value={data.name}
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
                    value={data.age}
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
                    value={data.description}
                // maxRows={6}
                />
                <br />
                <br />
                <img src={data.pic} style={{width: "100px", height: "100px"}}/>
                <br />
                <br />
                <Button
                    variant="outlined"
                    component="label"
                    onChange={handleChange}
                >
                    Upload New File
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

export { EditPets };