import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Paper, Typography} from "@mui/material";
import axios, {AxiosResponse} from "axios";

function Index() {
    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        axios.get("http://localhost:5000/auth/getuser", { withCredentials: true }).then((res: AxiosResponse) => {
            if (res.data) {
                setUserObject(res.data);
            }
        })
    }, [])

    return (
        <div>
        <Box sx={{ marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}>
            <Paper  sx={{p:5, backgroundColor: 'lightblue'}}>
            <Button href="/login" variant={"contained"} sx={{m:1}}>Login</Button>
            <Button variant={"contained"} sx={{m:1}} onClick={() => {
                axios.post("http://localhost:5000/auth/logout", { withCredentials: true }).then((res:AxiosResponse) => console.log(res.data))
                setUserObject({});
            }}>Logout</Button>
        <Typography variant={"h5"} align={"center"}>
                {`You are${userObject? "":" not"} logged in ${userObject? userObject.firstName + " " + userObject.lastName: ""}`}
        </Typography>

            </Paper>

        </Box>
        </div>
    );
}

export default Index;