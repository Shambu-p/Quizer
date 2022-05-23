import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {loginAuth} from "../../API.Interaction/AuthAPI";
import MainAppbar from '../../components/AppBars/Main';
import EmptyMessage from '../../components/Extra/EmptyMessage';
import { Card, Button, CardContent, Typography} from "@mui/material";
import ResultsAPI from "../../API.Interaction/ResultsAPI";
import Users from "../../Models/Users";

export default function (){

    const navigate = useNavigate();
    let [results, setResults] = useState([]);
    const [logged_user, setLog] = useState<Users | null>(null);

    useEffect(()=> {
        let getExams = async () => {

            let auth = await loginAuth();
            if(!auth.status){
                navigate("/login", {replace: true});
                return;
            }

            setLog(auth.data);

            try {

                let response: never[] = await ResultsAPI.byUser(((logged_user && logged_user.token) ? logged_user.token : ""));
                setResults(response);

            }catch ({message}){
                console.log(message);
            }
        };

        getExams();

    }, []);

    let list = (results.length === 0) ? (
        <EmptyMessage 
            title="You did not take any Exam!" 
            subTitle="take some examinations"
        />
    ) : results.map(({ExamResult_id, ExamResult_score, exam_title}) => {
        return (
            <Card className="card" sx={{mb: 3}}>
                <CardContent className="card-body">
                    <Typography variant="h4" component="div" className="card-title">{exam_title}</Typography>
                    <Typography variant="h5" component="div" className="card-subtitle" sx={{mb: 3}}>
                        Score: <span className="badge badge-success">{ExamResult_score ?? 0}</span>
                    </Typography>
                    <Button variant="contained" size="small" className="bg-dark" onClick={() => {navigate("/result_view/" + ExamResult_id)}}>
                        view
                    </Button>
                </CardContent>
            </Card>
        );
    });

    return (
        <div className="container p-0 mt-4">
            <MainAppbar page="result" />
            <div>
                {list}
            </div>
        </div>
    );

}