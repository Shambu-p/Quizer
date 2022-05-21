import { CardHeader, Card, CardContent, TextField, Button, Typography } from '@mui/material';
import React, {useState} from 'react';

export default function AddTodo(props: {add_question: Function}){

    const [inputs, setInputs] = useState({
        text: ""
    });

    let textOnChange = (event: any) => {
        setInputs({...inputs, text: event.target.value});
    };

    let formOnSubmit = async (event: any) => {
        event.preventDefault();
        props.add_question(inputs.text);
        event.target.reset();
    };

    return (
        <Card className='card'>
            <CardHeader className="card-header" title="Add New Question">
                <Typography variant="h5" component="div" className="card-title" sx={{mb: 0}}>Add New Question</Typography>
            </CardHeader>
            <CardContent component="form" id="add_new_form" onSubmit={formOnSubmit}>
                <TextField
                    label="Question Text"
                    multiline
                    fullWidth
                    sx={{mb: 3}}
                    rows={5}
                    onChange={textOnChange}
                />
                <Button 
                    variant="contained" 
                    className="bg-dark" 
                    fullWidth 
                    type="submit"
                >
                    Add Question
                </Button>
            </CardContent>
        </Card>
    );

}
