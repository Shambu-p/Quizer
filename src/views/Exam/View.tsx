import React, {useEffect, useState} from "react";
import api from "../../api";
import {useNavigate, useParams} from "react-router-dom";
import CreateQuestion from "../../components/Question/Create";
import Question from "../../components/Question/Question";
import variables, {loginAuth} from "../../Auth";
import { Exams } from "../../Fetch";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import Exam from "../../Models/Exam";
import ExamQuestionCombination from "../../Models/ExamQuestionCombination";


export default function (){

    //@ts-ignore
    const [exam, setExam] = useState<Exam>({});
    const [questions, setQuestions] = useState<ExamQuestionCombination[]>([]);
    const params: any = useParams();
    const navigate = useNavigate();

    useEffect(function (){
        let getExam = async  () => {

            if(!await loginAuth()){
                navigate("/login", {replace: true});
                return;
            }

            try{

                let response = await Exams.find(params.exam_id);

                setExam(response.exam);
                setQuestions(response.questions);

            }catch ({message}){
                console.log(message);
            }
        };

        getExam();

    }, []);

    let createNewQuestion = async (text: string) => {
        try {

            let data = new FormData();
            data.append("text", text);
            data.append("exam_id", params.exam_id);
            data.append("subject", exam.subject);
            // @ts-ignore
            data.append("token", variables.logged_user.token);
            let response = await api.post("/Exam/add_question", data);
            if(response.data.data.header === "true"){
                return;
            }

            setQuestions([...questions, response.data.data]);

        }catch ({message}){
            console.log(message);
        }
    };

    let question_list = (questions.length !== 0) ? questions.map(question => {
        return (<Question key={question.question} view_type="edit" question={question} />);
    }): ("");

    return (
        <div className="container mt-4">
            <ExamAppbar exam={exam} />
            
            <div className="row">
                <div className="col-lg-8 col-md-6 col-sm-12">
                    {question_list}
                </div>
                <div className="col">
                    <CreateQuestion add_question={createNewQuestion} />
                </div>
            </div>

        </div>
    );
}