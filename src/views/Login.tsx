import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {loginAuth, Login} from "../API.Interaction/AuthAPI";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, CssBaseline, Box, Avatar, Button, Typography, TextField } from "@mui/material";
import Users from "../Models/Users";

export default function (){

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [logged_user, setLog] = useState<Users | null>(null);
    const [is_logged_in, setLogState] = useState<boolean>(false);
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

            let response = await Login(inputs.email, inputs.password);
            setLog(response);
            setLogState(true);

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
                        <Button onClick={()=>{navigate("/register");}} >
                            Register First
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>        
    );
}