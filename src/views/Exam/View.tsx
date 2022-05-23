import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CreateQuestion from "../../components/Question/Create";
import Question from "../../components/Question/Question";
import {loginAuth} from "../../API.Interaction/AuthAPI";
import { Exams } from "../../Fetch";
import ExamAppbar from "../../components/AppBars/ExamAppbar";
import Exam from "../../Models/Exam";
import ExamQuestionCombination from "../../Models/ExamQuestionCombination";
import QuestionsAPI from "../../API.Interaction/QuestionsAPI";
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
    const [questions, setQuestions] = useState<ExamQuestionCombination[]>([]);
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

            let response = await QuestionsAPI.addQuestion({
                text: text,
                exam_id: params.exam_id,
                subject: (exam ? exam.subject : ""),
                token: ((logged_user && logged_user.token) ? logged_user.token : "")
            });

            setQuestions([...questions, response]);

        }catch ({message}){
            console.log(message);
        }

    };

    let question_list = (questions.length !== 0) ? questions.map(question => {
        return (<Question key={question.question} view_type="edit" question={question} />);
    }): ("");

    return (
        <div className="container mt-4">
            <ExamAppbar exam={exam ?? examPlaceholder} />
            
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