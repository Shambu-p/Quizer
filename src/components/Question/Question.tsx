import React, {useEffect, useState} from "react";
import api from "../../api";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Questions } from "../../Fetch";
import Choice from "../../Models/Choice";
import Question from "../../Models/Question";


export default function (props: {view_type: any, question: any}){

    const [questions, setQuestion] = useState<Question>();
    const [choices, setChoices] = useState<Choice[]>([]);
    const [inputs, setInputs] = useState({
        text: "",
        choice: 0,
    });

    let choice_components: JSX.Element[];

    useEffect(function () {

        let getQuestions = async () => {
            try {

                let response = await Questions.find(props.question.question);

                setQuestion(response.question);
                setChoices(response.choices);

            }catch ({message}){
                console.log(message);
            }
        };

        getQuestions();

    }, []);

    let textOnChange = (event: any) => { setInputs({...inputs, text: event.target.value});};

    let addChoice = async (event: any) => {
        event.preventDefault();
        try {

            let data = new FormData();
            data.append("question_id", (questions ? questions.id.toString() : ""));
            data.append("text", inputs.text);
            let response = await api.post("/Question/add_choice", data);
            if(response.data.data.header === "true"){
                return;
            }

            setChoices([...choices, response.data.data]);
            event.target.reset();

        }catch ({message}){
            console.log(message);
        }
    }

    let chooseAnswer = async (choice_id: number) => {
        try {

            let data = new FormData();
            // @ts-ignore
            data.append("question_id", questions.id);
            data.append("answer", choice_id.toString());
            let response = await api.post("/Question/update_answer", data);
            if(response.data.data.header === "true"){
                alert(response.data.data.message);
            }

        }catch ({message}){
            console.log(message);
        }
    }

    choice_components = choices.map(choice => {
        
        // @ts-ignore
        let name = "choice_" + questions.id;

        if(props.view_type && props.view_type === "edit"){
            return (
                <Box key={choice.id} className="d-flex justify-content-between" sx={{mb: 2, pl: 3}}>
                    <Typography variant="body1" component="div" sx={{color: 'black', mr: 2}}>{choice.text}</Typography>
                    <Button variant="contained" className="bg-dark" size="small" onClick={() => {chooseAnswer(choice.id);}}>Answer</Button>
                </Box>
            );
        }else if(props.view_type && props.view_type === "view"){

            if(props.question.choice === choice.id){
                return (
                    <Typography 
                        key={choice.id} 
                        variant="body1"
                        component="div" 
                        sx={{mb: 3, color: ((questions && choice.id ===  questions.answer) ? "green" : "red")}}
                    >
                        <strong>{choice.text}</strong>
                    </Typography>
                );
            }
            //@ts-ignore
            else if(choice.id === questions.answer){
                return (
                    <Typography
                        key={choice.id}
                        variant="body1"
                        component="div"
                        sx={{mb: 3, color: "green"}}
                    >
                        <strong>{choice.text}</strong>
                    </Typography>
                );
            }else{
                return (
                    <Typography
                        key={choice.id}
                        variant="body1"
                        component="div"
                        sx={{mb: 3, color: 'black'}}
                    >
                        {choice.text}
                    </Typography>
                );
            }

        }else{
            return (
                <div key={choice.id} className="input-group mb-3">
                    <input type="radio" id={name} className="choice-normal"/>
                    <label htmlFor={name} className="ml-3 my-label">{choice.text}</label>
                </div>
            );
        }
    });

    let additional_form = (props.view_type === "view") ? "" : (
        <Box component="form" className="card-footer" onSubmit={addChoice} width="100%">
            <TextField
                label="Add Choice"
                multiline
                fullWidth
                rows={2}
                sx={{mb: 2}}
                onChange={textOnChange}
            />
            <Button type="submit" variant="contained" className="bg-dark">Add</Button>
        </Box>
    );
    
    return (
        <Card className="card mb-3">
            <CardHeader title={(questions ? questions.text : "")}/>
            <CardContent>
                {choice_components}
            </CardContent>
            {additional_form}
        </Card>
    );

}