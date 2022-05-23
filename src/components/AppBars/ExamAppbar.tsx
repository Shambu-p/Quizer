import React from 'react';
import { Card, CardContent, Typography} from "@mui/material";
import Exam from "../../Models/Exam";

export default function(props: {exam: Exam}){
    return(
        <Card sx={{p: 3, mb: 4}} className="rounded" >
            <CardContent>
                <Typography variant="h5" gutterBottom component="div" className="card-title">{props.exam.title}</Typography>
                <Typography variant="subtitle1" component="div" sx={{mb: 0}} className="text-muted">{props.exam.subject} Subject</Typography>
            </CardContent>
        </Card>
    );
}