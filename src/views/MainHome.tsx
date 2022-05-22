import React from "react";
import {Box, Typography} from "@mui/material";
import MainAppbar from '../components/AppBars/Main';

export default function (){

    return (
        <div className="container p-0 mt-4">
            <MainAppbar page="home" />

            <Box className="d-flex justify-content-center" style={{padding: "40px 10px"}}>

                <Typography variant="h2" component="div" className="text-center">
                    Hello Students! <br/>
                    Do you want to be Tested? <br/>
                    Then you are at the right place.
                </Typography>

            </Box>
        </div>
    );
    
}