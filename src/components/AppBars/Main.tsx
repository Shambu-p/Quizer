import {useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import store, {Logout, loginAuth} from '../../Auth';
import { Card, CardContent, ButtonGroup, Box, Button, Typography} from "@mui/material";

export default function (){


    const navigate = useNavigate();
    const [is_logged_in, setState] = useState(false);

    useEffect(function (){

        let checkAuth = async () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            setState(true);

        };

        checkAuth();

    }, []);

    const logout = async () => {

        try{

            // @ts-ignore
            await Logout(store.logged_user.token);
            store.logged_user = null;
            setState(false);
            navigate("/login");
    
        }catch({message}){
            console.log(message);
        }

    };

    // @ts-ignore
    return (
        <Card className="rounded mb-3 p-3">
            <CardContent className="d-flex justify-content-between">
                <Typography variant="h4" gutterBottom component="div" sx={{mb: 0}}> Absoft Examination Center </Typography>
                <Box>
                    <ButtonGroup variant="contained" size="small">
                        <Button className="bg-dark" sx={{display: (is_logged_in ? "" : "none")}} onClick={() => {navigate("/results")}}>Results</Button>
                        <Button className="bg-dark" sx={{display: ((is_logged_in && store.logged_user.role === "admin") ? "" : "none")}} onClick={() => {navigate("/exam/create")}}>Add Exam</Button>
                        <Button className="bg-dark" sx={{display: (is_logged_in ? "" : "none")}} onClick={() => {navigate("/exam/show")}}>Exams</Button>
                        <Button className="bg-dark" sx={{display: (is_logged_in ? "" : "none")}} onClick={logout}>Logout</Button>
                    </ButtonGroup>
                </Box>
            </CardContent>
        </Card>
    );

}