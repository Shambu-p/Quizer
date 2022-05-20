import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import store, {Login, loginAuth} from '../Auth';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Box, Avatar, Button, Typography, TextField } from "@mui/material";

export default function (){

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    useEffect(() => {

        let checkAuth = async () => {
            if(await loginAuth()){
                navigate("/exam/show", {replace: true});
            }
        };

        checkAuth();

    }, []);


    let usernameOnChange = (event: any) => {
        setInputs({
            email: event.target.value,
            password: inputs.password
        });
    };

    let passwordOnChange = (event: any) => {
        setInputs({
            password: event.target.value,
            email: inputs.email
        });
    };

    let submitForm = async (event: any) => {
        event.preventDefault();
        try {

            store.logged_user = await Login(inputs.email, inputs.password);
            navigate("/exam/show");

        }catch ({message}){
            alert(message);
        }
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <div className="p-3 mb-5">
                <button className="btn btn-link" onClick={()=>{navigate("/",{replace: true})}}> Back to Home</button>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={usernameOnChange}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className="bg-dark"
                        >
                            Sign In
                        </Button>
                        <Button onClick={()=>{navigate("/register");}} variant="body2">
                            Register First
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>        
    );
}