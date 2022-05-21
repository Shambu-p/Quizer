import React from 'react';
import { Card, CardContent, Typography} from "@mui/material";

export default function (props: {title: string, subTitle: string}){
    return (
        <Card className="card" sx={{mb: 3}}>
            <CardContent className="card-body">
                <Typography variant="h4" component="div" className="card-title">{props.title}</Typography>
                <Typography variant="h5" component="div" className="card-subtitle" sx={{mb: 3}}>{props.subTitle}</Typography>
            </CardContent>
        </Card>
    );
}