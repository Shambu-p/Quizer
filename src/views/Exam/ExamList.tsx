import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import EmptyMessage from "../../components/Extra/EmptyMessage";
import variables, {loginAuth} from "../../Auth";
import { Exams } from '../../Fetch';

import { Card, CardContent, Button, Typography} from "@mui/material";
import Exam from "../../Models/Exam";
import useGlobalState from "../../GlobalState";


export default function (){

    const navigate = useNavigate();
    const [exams, setExam] = useState<Exam[]>([]);
    const [logged_user, setLog] = useGlobalState<"logged_user" | "is_logged_in">("logged_user");

    useEffect(()=> {
        let getExams = async () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try {

                let response = await Exams.all();

                setExam(response);

            }catch ({message}){
                console.log(message);
            }
        };

        getExams();

    }, []);

    return exams.length === 0 ? (
        <EmptyMessage 
            title="No Exam Found" 
            subTitle="try to add one!"
        />
    ) : exams.map(exam => {

        return (
            <Card sx={{mb: 3}} className="card" key={exam.id}>
                <CardContent>
                    <Typography variant="h4" component="div" className="card-title">{exam.title}</Typography>
                    <Typography variant="h5" component="div" className="card-subtitle mb-3">
                        [{exam.count ?? 0}] {exam.subject ?? "unknown"} Subject Questions
                    </Typography>
                    {
                        ((typeof logged_user !== "boolean" && logged_user.role === "admin") ? (
                            <Button size="small" variant="contained" className="bg-dark" sx={{mr: 2}} onClick={() => {navigate("/exam_detail/" + exam.id)}}>
                                view
                            </Button>
                        ) : "")
                    }
                    <Button size="small" variant="contained" className="bg-dark" onClick={() => {navigate("/exam_view/" + exam.id)}}>
                        take exam
                    </Button>
                </CardContent>
            </Card>
        );
    });

}