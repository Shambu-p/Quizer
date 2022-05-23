import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Question from "../../components/Question/Question";
import {loginAuth} from "../../API.Interaction/AuthAPI";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import { Card, CardContent, Typography} from "@mui/material";
import ExamResult from "../../Models/ExamResult";
import Exam from "../../Models/Exam";
import ResultsAPI from "../../API.Interaction/ResultsAPI";
import ExamResultQuestion from "../../Models/ExamResultQuestion";
import useGlobalState from "../../GlobalState";
import Users from "../../Models/Users";

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
    const [questions, setQuestions] = useState<ExamResultQuestion[]>([]);
    const [logged_user, setLog] = useState<Users | null>(null);
    const params: any = useParams();
    const navigate = useNavigate();

    useEffect(function (){

        let getExam = async  () => {

            let auth = await loginAuth();
            if(!auth.status){
                navigate("/login", {replace: true});
                return;
            }

            setLog(auth.data);

            try {

                let response = await ResultsAPI.find(params.result_id, (logged_user && logged_user.token) ? logged_user.token : "");

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