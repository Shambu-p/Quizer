import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {loginAuth} from "../../Auth";
import { Exams } from "../../Fetch";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import { Box, Button, Typography} from "@mui/material";
import Exam from "../../Models/Exam";
import useGlobalState from "../../GlobalState";
import ResultsAPI from "../../API.Interaction/ResultsAPI";


let examPlaceholder: Exam = {
    id: 0,
    title: "",
    data: 0,
    subject: "",
    description: "",
    count: 0
};

export default function () {

    const [exam, setExam] = useState<Exam>();
    const [logged_user, setLog] = useGlobalState<"logged_user" | "is_logged_in">("logged_user");
    const params: any = useParams();
    const navigate = useNavigate();

    useEffect(function () {

        let getExam = async () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try {

                let response = await Exams.detail(params.exam_id);
                setExam(response);

            } catch ({message}) {
                console.log(message);
            }

        };

        getExam();

    }, []);

    let startExam = async () => {

        try {
            let response = await ResultsAPI.addResult(params.exam_id, ((typeof logged_user !== "boolean" && logged_user) ? logged_user.token : ""));
            navigate("/take_exam/" + response.id + "/" + params.exam_id, {replace: true});
        }catch({message}){
            console.log(message);
        }

    };

    return (
        <div className="container mt-4">
            <ExamAppbar exam={exam ?? examPlaceholder} />
            
            <Box component="div" sx={{p: 3}}>
                <Typography variant="body1" component="div" sx={{mb: 5}} className="lead">
                    {exam ? exam.description : ""}
                </Typography>
                <Button variant="contained" className="bg-dark" onClick={() => {startExam();}}>Start Examination</Button>
            </Box>

        </div>
    );

}