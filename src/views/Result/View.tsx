import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Question from "../../components/Question/Question";
import variables, {loginAuth} from "../../Auth";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import { Card, CardContent, Typography} from "@mui/material";
import { Result } from "../../Fetch";
import ExamQuestionCombination from "../../Models/ExamQuestionCombination";
import ExamResult from "../../Models/ExamResult";
import Exam from "../../Models/Exam";

const examPlaceholder = {
    id: 0,
    title: "",
    data: 0,
    subject: "",
    description: "",
    count: 0
};

export default function (){

    const [exam, setExam] = useState<Exam>();
    const [result, setResult] = useState<ExamResult>();
    const [questions, setQuestions] = useState<ExamQuestionCombination[]>([]);
    const params: any = useParams();
    const navigate = useNavigate();

    useEffect(function (){

        let getExam = async  () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try {

                let response = await Result.find(params.result_id, variables.getUser().token);

                setExam(response.exam);
                setResult(response.result);
                setQuestions(response.questions);

            }catch ({message}){
                console.log(message);
            }
            
        };

        getExam();

    }, []);

    let question_list = (questions.length !== 0) ? questions.map(question => {
        return (<Question key={question.question} question={question} view_type="view" />);
    }): ("");

    return (
        <div className="container mt-4">

            <ExamAppbar exam={exam ?? examPlaceholder} />
            <Card sx={{mb: 3, p: 1, backgroundColor: 'black', color: "white"}} >
                <CardContent className="d-flex justify-content-between" sx={{m: 0}}>

                    <Typography variant="h5" component="div">All Questions and Answers</Typography>
                    <Typography sx={{m: 0}} variant="h5" component="span">
                        Correct answers
                        <span className="badge badge-primary ml-2" >
                            {result ? result.score : ""}
                        </span>
                    </Typography>
                    
                </CardContent>
            </Card>

            {question_list}

        </div>
    );
}