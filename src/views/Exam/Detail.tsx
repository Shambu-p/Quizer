import React, {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import variables, {loginAuth} from "../../Auth";
import { Exams } from "../../Fetch";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import { Box, Button, Typography} from "@mui/material";
import Exam from "../../Models/Exam";


export default function () {

    //@ts-ignore
    const [exam, setExam] = useState<Exam>({});
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

            let data = new FormData();
            data.append("exam_id", params.exam_id);
            // @ts-ignore
            data.append("token", variables.logged_user.token);

            let response = await api.post("/ExamResult/save", data);
            if(response.data.data.header === "true"){
                return;
            }

            navigate("/take_exam/" + response.data.data.id + "/" + params.exam_id, {replace: true});

        }catch ({message}){
            console.log(message);
        }
    };

    return (
        <div className="container mt-4">
            <ExamAppbar exam={exam} />
            
            <Box component="div" sx={{p: 3}}>
                <Typography variant="p" component="div" sx={{mb: 5}} className="lead">
                    {exam.description ?? ""}
                </Typography>
                <Button variant="contained" size="big" className="bg-dark" onClick={() => {startExam();}}>Start Examination</Button>
            </Box>

        </div>
    );

}