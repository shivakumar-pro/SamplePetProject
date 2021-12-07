import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, CardHeader, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

const AddPets = () => {
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
                    id="type"
                    renderInput={(params) => (
                        <TextField {...params} label="Type" variant="outlined" />
                    )}
                />
                <br />
                <TextField
                    id="outlined-required"
                    label="Name"
                    fullWidth
                    variant="outlined"
                />
                <br />
                <br />
                <TextField
                    id="age"
                    label="age"
                    type="number"
                    fullWidth
                    variant="outlined"
                />
                <br />
                <br />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    fullWidth
                    minRows={4}
                // maxRows={6}
                />
                <br />
                <br />
                <Button
                    variant="outlined" 
                    component="label"
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                    />
                </Button>
                <br />
                <br />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                >
                    Submit
                </Button>
            </Paper>
        </Grid>
    </Grid>
}

export { AddPets };