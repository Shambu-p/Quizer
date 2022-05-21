import React, {useEffect, useState} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Questions } from "../../Fetch";
import Choice from "../../Models/Choice";
import Question from "../../Models/Question";
import ExamQuestionCombination from "../../Models/ExamQuestionCombination";

type myProp = {
    visibility_type: boolean,
    identifier: string,
    question: ExamQuestionCombination,
    answer_method: Function
};

export default function (props: myProp){

    const [questions, setQuestion] = useState<Question>();
    const [choices, setChoices] = useState<Choice[]>([]);
    const [inputs, setInputs] = useState({
        choice: "",
    });

    let choice_components = {};

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

    let choiceOnChange = (event: any) => {setInputs({...inputs, choice: event.target.value});};

    choice_components = choices.map(choice => {

        return (<Box key={choice.id}>
            <FormControlLabel value={choice.id} control={<Radio />} label={choice.text} />
        </Box>);
        
    });

    let answering = (event: any) => {
        event.preventDefault();
        props.answer_method(inputs.choice, (questions ? questions.id : null));
    }

    return (
        <Card className="card mb-3" sx={(props.visibility_type ? {}:{display: 'none'})} id={props.identifier}>
            <CardHeader title={(questions ? questions.text:"")}/>
            <CardContent>
                <Box component="form" onSubmit={answering}>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name={"choice_" + (questions ? questions.id : "")}
                            value={inputs.choice}
                            onChange={choiceOnChange}
                        >

                            {choice_components}
                            <Box component="div" className="d-flex justify-contents-end">
                                <Button color="primary" variant="contained" type="submit" sx={{align: "right"}}>Answer</Button>
                            </Box>

                        </RadioGroup>
                    </FormControl>
                </Box>
                
            </CardContent>
        </Card>
        
    );

}