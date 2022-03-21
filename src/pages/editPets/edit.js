import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, Grid, Input } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from 'react-router-dom';
import { base64toBlob } from '../../util/base64toblobconverter';
import { EDIT_PET, GET_PET } from '../../util/constants';



const Edit = () => {

    const [data, setData] = React.useState({
        petid: "",
        name: "",
        breed: "",
        price: "",
        description: "",
        type: "",
        pic: ""
    });
    const [disableBtn, setDisableBtn] = React.useState(false);

    const navigate = useNavigate();
    // GETTING ID FROM URL, ID IS MAPPED IN APP.JS
    const { petid } = useParams();

    React.useEffect(() => {

        window.scrollTo(0, 0)

        // getting object by id
        fetch(GET_PET + petid).then(a => a.json()).then(data => {
            setData(data);
        });
    }, [])


    const myStyle = {
        backgroundImage: "url(/images/naayi.jfif)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: "0 15px 15px 15px"



    };

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

    const apiCall = (data) => {
        setDisableBtn(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(data);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch( EDIT_PET+ petid, requestOptions)
            .then(response => response.text())
            .then(result => {
                navigate('/home/list')
                console.log(result)
            })
            .catch(error => {
                setDisableBtn(false);
                console.log('error', error)});
    }

    console.log("RENDER = ", data)


    return <Grid container={true} justifyContent="center">
        <Grid item={true} md={6} xs={12}>
            <Paper elevation={3} style={{ padding: "0 15px 15px 15px", ...myStyle }}>
                <CardHeader
                    title="Edit pets"
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
                    disabled={true}
                />
                <br />
                <TextField
                    id="breed"
                    label="breed"
                    fullWidth
                    variant="outlined"
                    onChange={handleChange}
                    value={data.breed}
                    fontsize="10px"
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
                    value={data.price}
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

                <Grid container={true} justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item={true}>

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
                            defaultValue={data.pic}
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
                    </Grid>
                    <Grid item={true} xs="auto">
                        <img style={{ width: "100px" }} src={data.pic} alt={data.pic} />
                    </Grid>
                </Grid>
                <br />
                <br />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    onClick={handleClick}
                    disabled={disableBtn}
                >
                    Submit
                </Button>
            </Paper>
        </Grid>
    </Grid >


}




export { Edit };