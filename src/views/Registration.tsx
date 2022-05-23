import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {loginAuth, registration} from '../API.Interaction/AuthAPI';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Box, Avatar, Button, Typography, TextField } from "@mui/material";

export default function (){

    const [inputs, setInputs] = useState({
        name: "",
        confirm_password: "",
        grade: "",
        age: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();


    useEffect(() => {

        let checkAuth = async () => {
            let auth = await loginAuth();
            if(auth.status){
                navigate("/exam/show", {replace: true});
            }
        };

        checkAuth();

    }, []);


    let emailOnChange = (event: any) => {
        setInputs({...inputs, email: event.target.value});
    };

    let passwordOnChange = (event: any) => {
        setInputs({...inputs, password: event.target.value});
    };

    let agedOnChange = (event: any) => {
        setInputs({...inputs, age: event.target.value});
    };

    let nameOnChange = (event: any) => {
        setInputs({...inputs, name: event.target.value});
    };

    let confirmOnChange = (event: any) => {
        setInputs({...inputs, confirm_password: event.target.value});
    };

    let gradeOnChange = (event: any) => {
        setInputs({...inputs, grade: event.target.value});
    };


    let submitForm = async (event: any) => {
        event.preventDefault();
        try {

            let response = await registration({
                name: inputs.name,
                email: inputs.email,
                age: parseInt(inputs.age),
                grade: parseInt(inputs.grade),
                password: inputs.password,
                confirm_password: inputs.confirm_password
            });

            navigate("/login");

        }catch ({message}){
            alert(message);
        }
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className="d-flex justify-content-between p-3 mb-5">
                <button className="btn btn-link" onClick={()=>{navigate("/",{replace: true})}}> Back to Home</button>
                <button className="btn btn-link" onClick={()=>{navigate("/login",{replace: true})}}> Back to Login</button>
            </div>
            <Container component="main" maxWidth="xs">
                
                <CssBaseline />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={nameOnChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={emailOnChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            name="age"
                            autoComplete="age"
                            autoFocus
                            onChange={agedOnChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="grade"
                            label="grade"
                            name="grade"
                            autoComplete="grade"
                            autoFocus
                            onChange={gradeOnChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordOnChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="conf_password"
                            label="Confirm Password"
                            type="password"
                            id="conf_password"
                            autoComplete="confirm-password"
                            onChange={confirmOnChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className="bg-dark"
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

}